import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdersTbl } from '../models/models';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

/**
 * OrdersService - Multi-Tenant Implementation
 * 
 * Extends BaseService for automatic multi-tenant data isolation.
 * All order queries are filtered by OrganisationCode and BranchCode.
 * 
 * - Regular users: Can only see orders from their branch
 * - Organisation admins: Can see orders across all branches
 * 
 * @example
 * ```typescript
 * // Regular user - sees only their branch orders
 * this.ordersService.getAll().subscribe(orders => {
 *   // Returns orders from user's branch only
 * });
 * 
 * // Organisation admin - see all branch orders
 * this.ordersService.getAllBranches().subscribe(orders => {
 *   // Returns orders from all branches in organisation
 * });
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class OrdersServiceV2 extends BaseService<OrdersTbl> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Orders');
  }

  // ==========================================
  // ORDER-SPECIFIC METHODS
  // ==========================================

  /**
   * Get orders by invoice number (scoped to tenant)
   */
  getByInvoiceNumber(invoiceNr: string): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/invoice/${invoiceNr}`, options);
  }

  /**
   * Get orders by customer ID (scoped to tenant)
   */
  getByCustomerId(customerId: string): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/customer/${customerId}`, options);
  }

  /**
   * Get orders by product ID (scoped to tenant)
   */
  getByProductId(productId: string): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/product/${productId}`, options);
  }

  /**
   * Get orders by supplier ID (scoped to tenant)
   */
  getBySupplierId(supplierId: string): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/supplier/${supplierId}`, options);
  }

  /**
   * Get orders by status (scoped to tenant)
   */
  getByStatus(status: string): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('status', status);
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/by-status`, { ...options, params });
  }

  /**
   * Get orders by date range (scoped to tenant)
   */
  getByDateRange(fromDate: Date, toDate: Date): Observable<OrdersTbl[]> {
    const options = this.getRequestOptions();
    let params = options.params
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString());
    
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/date-range`, { ...options, params });
  }

  /**
   * Get pending orders (scoped to tenant)
   */
  getPendingOrders(): Observable<OrdersTbl[]> {
    return this.getByStatus('Pending');
  }

  /**
   * Get completed orders (scoped to tenant)
   */
  getCompletedOrders(): Observable<OrdersTbl[]> {
    return this.getByStatus('Completed');
  }

  /**
   * Update order status (scoped to tenant)
   */
  updateStatus(refNo: number, status: string, notes?: string): Observable<OrdersTbl> {
    const options = this.getRequestOptions();
    return this.http.put<OrdersTbl>(
      `${this.apiUrl}/${refNo}/status`,
      { status, notes },
      options
    );
  }

  /**
   * Cancel order (scoped to tenant)
   */
  cancelOrder(refNo: number, reason: string): Observable<OrdersTbl> {
    const options = this.getRequestOptions();
    return this.http.put<OrdersTbl>(
      `${this.apiUrl}/${refNo}/cancel`,
      { reason },
      options
    );
  }

  /**
   * Get order statistics (scoped to tenant)
   * Organisation admins see stats across all branches
   */
  getOrderStatistics(fromDate?: Date, toDate?: Date): Observable<{
    totalOrders: number;
    pendingOrders: number;
    completedOrders: number;
    cancelledOrders: number;
    totalRevenue: number;
    averageOrderValue: number;
  }> {
    const options = this.getRequestOptions();
    let params = options.params;
    
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }

    return this.http.get<any>(`${this.apiUrl}/statistics`, { ...options, params });
  }

  /**
   * Get top products by orders (scoped to tenant)
   */
  getTopProducts(limit: number = 10): Observable<Array<{
    productId: string;
    productName: string;
    orderCount: number;
    totalQuantity: number;
    totalRevenue: number;
  }>> {
    const options = this.getRequestOptions();
    const params = options.params.set('limit', limit.toString());
    return this.http.get<any[]>(`${this.apiUrl}/top-products`, { ...options, params });
  }

  /**
   * Get orders requiring approval (organisation admin only)
   */
  getOrdersRequiringApproval(): Observable<OrdersTbl[]> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Only organisation administrators can view approval queue');
    }

    const options = this.getRequestOptions(false);
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/pending-approval`, options);
  }

  /**
   * Approve order (organisation admin only)
   */
  approveOrder(refNo: number, notes?: string): Observable<OrdersTbl> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Only organisation administrators can approve orders');
    }

    const options = this.getRequestOptions(false);
    return this.http.put<OrdersTbl>(
      `${this.apiUrl}/${refNo}/approve`,
      { notes },
      options
    );
  }
}
