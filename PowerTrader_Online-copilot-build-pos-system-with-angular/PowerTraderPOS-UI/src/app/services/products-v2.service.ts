import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

/**
 * ProductsService - Multi-Tenant Implementation
 * 
 * This service extends BaseService to automatically handle multi-tenant data isolation.
 * All queries are filtered by OrganisationCode and BranchCode.
 * 
 * - Regular users: Can only see products from their branch
 * - Organisation admins: Can see products across all branches in their organisation
 * 
 * @example Regular user query
 * ```typescript
 * // Automatically filtered by current user's branch
 * this.productsService.getAll().subscribe(products => {
 *   // Returns only products from user's branch
 * });
 * ```
 * 
 * @example Organisation admin query
 * ```typescript
 * // Organisation admin can query all branches
 * this.productsService.getAllBranches().subscribe(products => {
 *   // Returns products from all branches in the organisation
 * });
 * 
 * // Or query a specific branch
 * this.productsService.getByBranchCode('BR002').subscribe(products => {
 *   // Returns products from BR002
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsServiceV2 extends BaseService<Products> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Products');
  }

  // ==========================================
  // PRODUCT-SPECIFIC METHODS
  // ==========================================

  /**
   * Get product by ProductID (scoped to tenant)
   */
  getByProductId(productId: string): Observable<Products> {
    const options = this.getRequestOptions();
    return this.http.get<Products>(`${this.apiUrl}/productId/${productId}`, options);
  }

  /**
   * Get products by category (scoped to tenant)
   */
  getByCategory(categoryId: number): Observable<Products[]> {
    const options = this.getRequestOptions();
    return this.http.get<Products[]>(`${this.apiUrl}/category/${categoryId}`, options);
  }

  /**
   * Get products by subcategory (scoped to tenant)
   */
  getBySubCategory(subCategoryId: number): Observable<Products[]> {
    const options = this.getRequestOptions();
    return this.http.get<Products[]>(`${this.apiUrl}/subcategory/${subCategoryId}`, options);
  }

  /**
   * Get low stock products (scoped to tenant)
   * Organisation admins see low stock across all branches
   */
  getLowStockProducts(threshold: number = 10): Observable<Products[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('threshold', threshold.toString());
    return this.http.get<Products[]>(`${this.apiUrl}/low-stock`, { 
      ...options, 
      params 
    });
  }

  /**
   * Get products by supplier (scoped to tenant)
   */
  getBySupplierId(supplierId: string): Observable<Products[]> {
    const options = this.getRequestOptions();
    return this.http.get<Products[]>(`${this.apiUrl}/supplier/${supplierId}`, options);
  }

  /**
   * Update product stock (scoped to tenant)
   */
  updateStock(refNo: number, quantity: number, action: 'add' | 'subtract'): Observable<Products> {
    const options = this.getRequestOptions();
    return this.http.put<Products>(
      `${this.apiUrl}/${refNo}/stock`, 
      { quantity, action },
      options
    );
  }

  /**
   * Transfer product between branches (organisation admin only)
   */
  transferBetweenBranches(
    productId: string,
    fromBranchCode: string,
    toBranchCode: string,
    quantity: number
  ): Observable<{ success: boolean; message: string }> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Only organisation administrators can transfer products between branches');
    }

    const options = this.getRequestOptions(false);
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/transfer`,
      {
        productId,
        fromBranchCode,
        toBranchCode,
        quantity,
        organisationCode: this.tenantContext.getOrganisationCode()
      },
      options
    );
  }
}
