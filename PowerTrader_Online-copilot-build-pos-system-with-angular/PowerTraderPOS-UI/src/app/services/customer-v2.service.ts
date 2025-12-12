import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerInfo } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

/**
 * CustomerService - Multi-Tenant Implementation
 * 
 * Extends BaseService for automatic multi-tenant data isolation.
 * All customer queries are filtered by OrganisationCode and BranchCode.
 * 
 * - Regular users: Can only see customers from their branch
 * - Organisation admins: Can see customers across all branches
 */
@Injectable({
  providedIn: 'root'
})
export class CustomerServiceV2 extends BaseService<CustomerInfo> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Customers');
  }

  // ==========================================
  // CUSTOMER-SPECIFIC METHODS
  // ==========================================

  /**
   * Get customer by customer code (scoped to tenant)
   */
  getByCustomerCode(customerCode: string): Observable<CustomerInfo> {
    const options = this.getRequestOptions();
    return this.http.get<CustomerInfo>(`${this.apiUrl}/code/${customerCode}`, options);
  }

  /**
   * Get customers by phone number (scoped to tenant)
   */
  getByPhone(phoneNumber: string): Observable<CustomerInfo[]> {
    const options = this.getRequestOptions();
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/phone/${phoneNumber}`, options);
  }

  /**
   * Get customer balance (scoped to tenant)
   */
  getBalance(refNo: number): Observable<{ balance: number }> {
    const options = this.getRequestOptions();
    return this.http.get<{ balance: number }>(`${this.apiUrl}/${refNo}/balance`, options);
  }

  /**
   * Get customer transaction history (scoped to tenant)
   */
  getTransactionHistory(refNo: number, fromDate?: Date, toDate?: Date): Observable<any[]> {
    const options = this.getRequestOptions();
    let params = options.params;
    
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }

    return this.http.get<any[]>(`${this.apiUrl}/${refNo}/transactions`, { 
      ...options, 
      params 
    });
  }

  /**
   * Get top customers by sales (scoped to tenant)
   * Organisation admins see top customers across all branches
   */
  getTopCustomers(limit: number = 10): Observable<CustomerInfo[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('limit', limit.toString());
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/top-customers`, { 
      ...options, 
      params 
    });
  }

  /**
   * Get customers with outstanding balance (scoped to tenant)
   */
  getCustomersWithBalance(): Observable<CustomerInfo[]> {
    const options = this.getRequestOptions();
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/with-balance`, options);
  }
}
