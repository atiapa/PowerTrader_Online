import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';

/**
 * Base Service Class with Multi-Tenant Isolation
 * 
 * All services should extend this class to inherit automatic tenant filtering.
 * The service automatically adds OrganisationCode and BranchCode to all queries,
 * ensuring complete data isolation between organisations and branches.
 * 
 * Organization admins can see all branches in their organisation.
 * Regular users only see their own branch data.
 * 
 * @example
 * ```typescript
 * @Injectable({ providedIn: 'root' })
 * export class ProductsService extends BaseService<Products> {
 *   constructor(http: HttpClient, tenantContext: TenantContextService, authService: AuthService) {
 *     super(http, tenantContext, authService, 'Products');
 *   }
 * }
 * ```
 */
export abstract class BaseService<T> {
  protected apiUrl: string;
  protected readonly entityName: string;

  constructor(
    protected http: HttpClient,
    protected tenantContext: TenantContextService,
    protected authService: AuthService,
    entityName: string,
    baseApiUrl: string = 'http://localhost:5000/api'
  ) {
    this.entityName = entityName;
    this.apiUrl = `${baseApiUrl}/${entityName}`;
  }

  // ==========================================
  // TENANT FILTERING METHODS
  // ==========================================

  /**
   * Get tenant parameters for HTTP requests
   * Automatically filters by branch for regular users
   * Filters by organisation only for organisation admins
   */
  protected getTenantParams(includeBranchFilter: boolean = true): HttpParams {
    const isOrgAdmin = this.isOrganisationAdmin();
    let params = new HttpParams();

    // Always filter by organisation
    params = params.set('organisationCode', this.tenantContext.getOrganisationCode());

    // Only filter by branch if user is not an org admin or if explicitly requested
    if (includeBranchFilter && !isOrgAdmin) {
      params = params.set('branchCode', this.tenantContext.getBranchCode());
    }

    return params;
  }

  /**
   * Get HTTP headers with authentication token
   */
  protected getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('token');
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  /**
   * Get request options with tenant params and headers
   */
  protected getRequestOptions(includeBranchFilter: boolean = true): { 
    params: HttpParams; 
    headers: HttpHeaders;
  } {
    return {
      params: this.getTenantParams(includeBranchFilter),
      headers: this.getHeaders()
    };
  }

  /**
   * Add tenant information to an entity
   * Automatically adds OrganisationCode, OrganisationName, BranchCode, BranchName
   */
  protected addTenantInfo(entity: Partial<T>): T {
    const context = this.tenantContext.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }

    return {
      ...entity,
      organisationCode: context.organisationCode,
      organisationName: context.organisationName,
      branchCode: context.branchCode,
      branchName: context.branchName,
    } as T;
  }

  /**
   * Check if current user is an organisation admin
   * Organisation admins have the role 'Admin' or 'OrganisationAdmin'
   */
  protected isOrganisationAdmin(): boolean {
    const user = this.authService.currentUserValue;
    if (!user) return false;
    
    const adminRoles = ['Admin', 'OrganisationAdmin', 'SuperAdmin'];
    return adminRoles.includes(user.role);
  }

  /**
   * Check if current user can access all branches
   */
  protected canAccessAllBranches(): boolean {
    return this.isOrganisationAdmin();
  }

  // ==========================================
  // STANDARD CRUD OPERATIONS
  // ==========================================

  /**
   * GET ALL - Retrieve all entities (filtered by tenant)
   * Organization admins see all branches in their organisation
   * Regular users see only their branch data
   */
  getAll(): Observable<T[]> {
    const options = this.getRequestOptions();
    return this.http.get<T[]>(this.apiUrl, options);
  }

  /**
   * GET BY ID - Retrieve entity by ID (filtered by tenant)
   */
  getById(id: number | string): Observable<T> {
    const options = this.getRequestOptions();
    return this.http.get<T>(`${this.apiUrl}/${id}`, options);
  }

  /**
   * GET BY REFERENCE NUMBER - Common pattern for database entities
   */
  getByRefNo(refNo: number): Observable<T> {
    const options = this.getRequestOptions();
    return this.http.get<T>(`${this.apiUrl}/${refNo}`, options);
  }

  /**
   * CREATE - Create new entity (auto-adds tenant info)
   */
  create(entity: Partial<T>): Observable<T> {
    const entityWithTenant = this.addTenantInfo(entity);
    const options = { headers: this.getHeaders() };
    return this.http.post<T>(this.apiUrl, entityWithTenant, options);
  }

  /**
   * UPDATE - Update entity (filtered by tenant)
   */
  update(id: number | string, entity: Partial<T>): Observable<T> {
    const entityWithTenant = this.addTenantInfo(entity);
    const options = this.getRequestOptions();
    return this.http.put<T>(`${this.apiUrl}/${id}`, entityWithTenant, options);
  }

  /**
   * DELETE - Delete entity (filtered by tenant)
   */
  delete(id: number | string): Observable<void> {
    const options = this.getRequestOptions();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, options);
  }

  // ==========================================
  // BRANCH-SPECIFIC OPERATIONS
  // ==========================================

  /**
   * GET BY BRANCH - Get entities for a specific branch
   * Only organisation admins can query other branches
   */
  getByBranchCode(branchCode: string): Observable<T[]> {
    if (!this.isOrganisationAdmin() && branchCode !== this.tenantContext.getBranchCode()) {
      throw new Error('Insufficient permissions to access other branch data');
    }

    let params = new HttpParams()
      .set('organisationCode', this.tenantContext.getOrganisationCode())
      .set('branchCode', branchCode);

    const options = { params, headers: this.getHeaders() };
    return this.http.get<T[]>(`${this.apiUrl}/branch/${branchCode}`, options);
  }

  /**
   * GET ALL BRANCHES - Get entities across all branches in organisation
   * Only available to organisation admins
   */
  getAllBranches(): Observable<T[]> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Only organisation administrators can access all branch data');
    }

    const options = this.getRequestOptions(false); // Don't filter by branch
    return this.http.get<T[]>(`${this.apiUrl}/organisation/${this.tenantContext.getOrganisationCode()}`, options);
  }

  // ==========================================
  // SEARCH & FILTER OPERATIONS
  // ==========================================

  /**
   * SEARCH - Search entities (filtered by tenant)
   */
  search(searchTerm: string, additionalParams?: Record<string, string>): Observable<T[]> {
    let params = this.getTenantParams();
    params = params.set('search', searchTerm);

    // Add any additional search parameters
    if (additionalParams) {
      Object.keys(additionalParams).forEach(key => {
        params = params.set(key, additionalParams[key]);
      });
    }

    const options = { params, headers: this.getHeaders() };
    return this.http.get<T[]>(`${this.apiUrl}/search`, options);
  }

  /**
   * FILTER - Generic filter method (filtered by tenant)
   */
  filter(filterParams: Record<string, string>): Observable<T[]> {
    let params = this.getTenantParams();

    // Add filter parameters
    Object.keys(filterParams).forEach(key => {
      params = params.set(key, filterParams[key]);
    });

    const options = { params, headers: this.getHeaders() };
    return this.http.get<T[]>(`${this.apiUrl}/filter`, options);
  }

  // ==========================================
  // UTILITY METHODS
  // ==========================================

  /**
   * GET ACTIVE - Get active entities (filtered by tenant)
   */
  getActive(): Observable<T[]> {
    const options = this.getRequestOptions();
    return this.http.get<T[]>(`${this.apiUrl}/active`, options);
  }

  /**
   * COUNT - Get count of entities (filtered by tenant)
   */
  count(filterParams?: Record<string, string>): Observable<{ count: number }> {
    let params = this.getTenantParams();

    if (filterParams) {
      Object.keys(filterParams).forEach(key => {
        params = params.set(key, filterParams[key]);
      });
    }

    const options = { params, headers: this.getHeaders() };
    return this.http.get<{ count: number }>(`${this.apiUrl}/count`, options);
  }

  /**
   * EXISTS - Check if entity exists (filtered by tenant)
   */
  exists(id: number | string): Observable<{ exists: boolean }> {
    const options = this.getRequestOptions();
    return this.http.get<{ exists: boolean }>(`${this.apiUrl}/${id}/exists`, options);
  }

  // ==========================================
  // BATCH OPERATIONS
  // ==========================================

  /**
   * BATCH CREATE - Create multiple entities (auto-adds tenant info)
   */
  batchCreate(entities: Partial<T>[]): Observable<T[]> {
    const entitiesWithTenant = entities.map(e => this.addTenantInfo(e));
    const options = { headers: this.getHeaders() };
    return this.http.post<T[]>(`${this.apiUrl}/batch`, entitiesWithTenant, options);
  }

  /**
   * BATCH UPDATE - Update multiple entities (filtered by tenant)
   */
  batchUpdate(entities: Partial<T>[]): Observable<T[]> {
    const entitiesWithTenant = entities.map(e => this.addTenantInfo(e));
    const options = this.getRequestOptions();
    return this.http.put<T[]>(`${this.apiUrl}/batch`, entitiesWithTenant, options);
  }

  /**
   * BATCH DELETE - Delete multiple entities (filtered by tenant)
   */
  batchDelete(ids: (number | string)[]): Observable<void> {
    const options = {
      ...this.getRequestOptions(),
      body: { ids }
    };
    return this.http.delete<void>(`${this.apiUrl}/batch`, options);
  }
}
