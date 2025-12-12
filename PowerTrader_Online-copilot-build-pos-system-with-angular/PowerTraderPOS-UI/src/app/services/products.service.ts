import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private apiUrl = 'http://localhost:5000/api/Products';

  constructor(
    private http: HttpClient,
    private tenantContext: TenantContextService
  ) { }

  // Helper method to add tenant params
  private getTenantParams(): HttpParams {
    const tenant = this.tenantContext.getTenantParams();
    return new HttpParams()
      .set('organisationCode', tenant.organisationCode)
      .set('branchCode', tenant.branchCode);
  }

  // GET ALL Products (scoped to tenant)
  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Product by ID (scoped to tenant)
  getById(refNo: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Product by ProductID (scoped to tenant)
  getByProductId(productId: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/productId/${productId}`, { params: this.getTenantParams() });
  }

  // GET Products by Category (scoped to tenant)
  getByCategory(categoryId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/category/${categoryId}`, { params: this.getTenantParams() });
  }

  // GET Products by SubCategory (scoped to tenant)
  getBySubCategory(subCategoryId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/subcategory/${subCategoryId}`, { params: this.getTenantParams() });
  }

  // GET Products by Branch (optional - defaults to current branch)
  getByBranchCode(branchCode?: string): Observable<Products[]> {
    const params = branchCode 
      ? new HttpParams().set('organisationCode', this.tenantContext.getOrganisationCode()).set('branchCode', branchCode)
      : this.getTenantParams();
    return this.http.get<Products[]>(`${this.apiUrl}/branch/${branchCode || this.tenantContext.getBranchCode()}`, { params });
  }

  // GET Products by Organisation
  getByOrganisation(organisationCode?: string): Observable<Products[]> {
    const orgCode = organisationCode || this.tenantContext.getOrganisationCode();
    return this.http.get<Products[]>(`${this.apiUrl}/organisation/${orgCode}`);
  }

  // GET Active Products (scoped to tenant)
  getActiveProducts(): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/active`, { params: this.getTenantParams() });
  }

  // SEARCH Products (scoped to tenant)
  search(searchTerm: string): Observable<Products[]> {
    let params = this.getTenantParams();
    params = params.set('search', searchTerm);
    return this.http.get<Products[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Product (auto-add tenant info)
  create(product: Products): Observable<Products> {
    const productWithTenant = this.tenantContext.addTenantInfo(product);
    return this.http.post<Products>(this.apiUrl, productWithTenant);
  }

  // UPDATE Product (scoped to tenant)
  update(refNo: number, product: Products): Observable<Products> {
    const productWithTenant = this.tenantContext.addTenantInfo(product);
    return this.http.put<Products>(`${this.apiUrl}/${refNo}`, productWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Product (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // UPDATE Stock Level (scoped to tenant)
  updateStockLevel(refNo: number, quantity: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/stock`, { quantity }, { params: this.getTenantParams() });
  }

  // GET Low Stock Products (scoped to tenant)
  getLowStockProducts(threshold: number = 10): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/lowstock/${threshold}`, { params: this.getTenantParams() });
  }

  // GET Products by Supplier (scoped to tenant)
  getBySupplier(supplierId: number): Observable<Products[]> {
    return this.http.get<Products[]>(`${this.apiUrl}/supplier/${supplierId}`, { params: this.getTenantParams() });
  }
}
