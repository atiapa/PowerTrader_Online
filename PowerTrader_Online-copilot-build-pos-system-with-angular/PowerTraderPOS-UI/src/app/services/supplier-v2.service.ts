import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

/**
 * SupplierService - Multi-Tenant Implementation
 * 
 * Extends BaseService for automatic multi-tenant data isolation.
 */
@Injectable({
  providedIn: 'root'
})
export class SupplierServiceV2 extends BaseService<Suppliers> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Suppliers');
  }

  /**
   * Get supplier by supplier code (scoped to tenant)
   */
  getBySupplierCode(supplierCode: string): Observable<Suppliers> {
    const options = this.getRequestOptions();
    return this.http.get<Suppliers>(`${this.apiUrl}/code/${supplierCode}`, options);
  }

  /**
   * Get suppliers by category (scoped to tenant)
   */
  getByCategory(category: string): Observable<Suppliers[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('category', category);
    return this.http.get<Suppliers[]>(`${this.apiUrl}/category`, { ...options, params });
  }

  /**
   * Get supplier outstanding balance (scoped to tenant)
   */
  getOutstandingBalance(refNo: number): Observable<{ balance: number }> {
    const options = this.getRequestOptions();
    return this.http.get<{ balance: number }>(`${this.apiUrl}/${refNo}/balance`, options);
  }

  /**
   * Get supplier transaction history (scoped to tenant)
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

    return this.http.get<any[]>(`${this.apiUrl}/${refNo}/transactions`, { ...options, params });
  }
}
