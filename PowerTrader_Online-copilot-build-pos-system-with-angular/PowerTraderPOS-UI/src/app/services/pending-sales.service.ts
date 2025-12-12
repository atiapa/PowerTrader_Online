import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CashSalesPending } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

/**
 * ====================================
 * PHASE 1C: PENDING SALES (HOLD ORDERS) SERVICE
 * ====================================
 * Manages hold/parked orders in POS system
 * Allows cashiers to pause transactions and retrieve them later
 * Multi-tenant architecture with session and till tracking
 */

export interface HoldOrderRequest {
  ordernr: string; // Unique order identifier (auto-generated or manual)
  customerID?: string;
  customerName?: string;
  customerAccountNr?: string;
  items: HoldOrderItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  attendant: string;
  tillName: string;
  session: string;
  notes?: string;
  holdReason?: string;
  expectedReturnDate?: Date;
}

export interface HoldOrderItem {
  productID: string;
  productName: string;
  barcodenr?: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  tax: number;
  extendedprice: number;
  itemType?: string;
  sellingUnit?: string;
  batchNo?: string;
  categoryID?: string;
  subcategory?: string;
}

export interface RetrieveOrderResponse {
  ordernr: string;
  items: CashSalesPending[];
  summary: {
    itemCount: number;
    subtotal: number;
    discount: number;
    tax: number;
    total: number;
  };
  orderInfo: {
    customerName?: string;
    attendant: string;
    holdDate: Date;
    notes?: string;
  };
}

export interface HoldOrderSummary {
  ordernr: string;
  customerName?: string;
  itemCount: number;
  total: number;
  attendant: string;
  tillName: string;
  holdDate: Date;
  holdTime: string;
  notes?: string;
  canRetrieve: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class PendingSalesService {
  private apiUrl = 'http://localhost:5000/api/PendingSales';

  constructor(
    private http: HttpClient,
    private tenantContext: TenantContextService
  ) { }

  private getTenantParams(): HttpParams {
    const tenant = this.tenantContext.getTenantParams();
    return new HttpParams()
      .set('organisationCode', tenant.organisationCode)
      .set('branchCode', tenant.branchCode);
  }

  // ====================================
  // HOLD ORDER (Park Transaction)
  // ====================================
  holdOrder(request: HoldOrderRequest): Observable<{ success: boolean, ordernr: string, message: string }> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<{ success: boolean, ordernr: string, message: string }>(
      `${this.apiUrl}/hold`,
      requestWithTenant
    );
  }

  // ====================================
  // RETRIEVE ORDER (Resume Transaction)
  // ====================================
  retrieveOrder(ordernr: string): Observable<RetrieveOrderResponse> {
    return this.http.get<RetrieveOrderResponse>(
      `${this.apiUrl}/retrieve/${ordernr}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET ALL PENDING ORDERS (Current Session/Till)
  // ====================================
  getPendingOrders(
    tillName?: string,
    session?: string,
    attendant?: string
  ): Observable<HoldOrderSummary[]> {
    let params = this.getTenantParams();
    
    if (tillName) {
      params = params.set('tillName', tillName);
    }
    if (session) {
      params = params.set('session', session);
    }
    if (attendant) {
      params = params.set('attendant', attendant);
    }
    
    return this.http.get<HoldOrderSummary[]>(this.apiUrl, { params });
  }

  // ====================================
  // GET PENDING ORDERS BY CUSTOMER
  // ====================================
  getPendingOrdersByCustomer(customerID: string): Observable<HoldOrderSummary[]> {
    return this.http.get<HoldOrderSummary[]>(
      `${this.apiUrl}/customer/${customerID}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // SEARCH PENDING ORDERS
  // ====================================
  searchPendingOrders(searchTerm: string): Observable<HoldOrderSummary[]> {
    return this.http.get<HoldOrderSummary[]>(
      `${this.apiUrl}/search`,
      {
        params: this.getTenantParams().set('search', searchTerm)
      }
    );
  }

  // ====================================
  // CANCEL/DELETE PENDING ORDER
  // ====================================
  cancelPendingOrder(
    ordernr: string,
    reason: string,
    cancelledBy: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/cancel/${ordernr}`,
      { reason, cancelledBy },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // UPDATE PENDING ORDER (Modify Items)
  // ====================================
  updatePendingOrder(
    ordernr: string,
    items: HoldOrderItem[]
  ): Observable<{ success: boolean, message: string }> {
    return this.http.put<{ success: boolean, message: string }>(
      `${this.apiUrl}/update/${ordernr}`,
      { items },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // ADD ITEM TO PENDING ORDER
  // ====================================
  addItemToPendingOrder(
    ordernr: string,
    item: HoldOrderItem
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/add-item/${ordernr}`,
      item,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // REMOVE ITEM FROM PENDING ORDER
  // ====================================
  removeItemFromPendingOrder(
    ordernr: string,
    productID: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.delete<{ success: boolean, message: string }>(
      `${this.apiUrl}/remove-item/${ordernr}/${productID}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // TRANSFER PENDING ORDER (To Another Till/Attendant)
  // ====================================
  transferPendingOrder(
    ordernr: string,
    toTillName: string,
    toAttendant: string,
    transferredBy: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/transfer/${ordernr}`,
      { toTillName, toAttendant, transferredBy },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // COMPLETE PENDING ORDER (Convert to Sale)
  // ====================================
  completePendingOrder(
    ordernr: string,
    invoiceNr: string,
    paymentDetails: {
      paymentMethod: string;
      amountPaid: number;
      changeDue?: number;
    }
  ): Observable<{ success: boolean, invoiceNr: string, message: string }> {
    return this.http.post<{ success: boolean, invoiceNr: string, message: string }>(
      `${this.apiUrl}/complete/${ordernr}`,
      { invoiceNr, paymentDetails },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET PENDING ORDER COUNT (Dashboard Widget)
  // ====================================
  getPendingOrderCount(tillName?: string, session?: string): Observable<{ count: number }> {
    let params = this.getTenantParams();
    
    if (tillName) {
      params = params.set('tillName', tillName);
    }
    if (session) {
      params = params.set('session', session);
    }
    
    return this.http.get<{ count: number }>(
      `${this.apiUrl}/count`,
      { params }
    );
  }

  // ====================================
  // GET OLD PENDING ORDERS (Cleanup Alert)
  // ====================================
  getOldPendingOrders(daysOld: number = 7): Observable<HoldOrderSummary[]> {
    return this.http.get<HoldOrderSummary[]>(
      `${this.apiUrl}/old`,
      {
        params: this.getTenantParams().set('daysOld', daysOld.toString())
      }
    );
  }

  // ====================================
  // BULK CANCEL OLD PENDING ORDERS
  // ====================================
  bulkCancelOldOrders(
    daysOld: number,
    cancelledBy: string,
    reason: string
  ): Observable<{ success: boolean, cancelledCount: number, message: string }> {
    return this.http.post<{ success: boolean, cancelledCount: number, message: string }>(
      `${this.apiUrl}/bulk-cancel`,
      { daysOld, cancelledBy, reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET PENDING ORDER STATISTICS
  // ====================================
  getPendingOrderStats(
    startDate?: Date,
    endDate?: Date
  ): Observable<{
    totalPendingOrders: number;
    totalValue: number;
    averageValue: number;
    byAttendant: Array<{ attendant: string, count: number, value: number }>;
    byTill: Array<{ tillName: string, count: number, value: number }>;
    completionRate: number;
    averageHoldTime: string;
  }> {
    let params = this.getTenantParams();
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    return this.http.get<any>(`${this.apiUrl}/stats`, { params });
  }

  // ====================================
  // PRINT HOLD ORDER RECEIPT
  // ====================================
  printHoldOrderReceipt(ordernr: string): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/print/${ordernr}`,
      {
        params: this.getTenantParams(),
        responseType: 'blob'
      }
    );
  }

  // ====================================
  // EXPORT PENDING ORDERS REPORT
  // ====================================
  exportPendingOrdersReport(format: 'EXCEL' | 'PDF'): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/export`,
      {
        params: this.getTenantParams().set('format', format),
        responseType: 'blob'
      }
    );
  }

  // ====================================
  // AUTO-SAVE DRAFT ORDER (Background Save)
  // ====================================
  autoSaveDraft(
    ordernr: string,
    items: HoldOrderItem[],
    lastModified: Date
  ): Observable<{ success: boolean, saved: boolean }> {
    return this.http.post<{ success: boolean, saved: boolean }>(
      `${this.apiUrl}/auto-save/${ordernr}`,
      { items, lastModified },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // CHECK ORDER AVAILABILITY (Before Retrieve)
  // ====================================
  checkOrderAvailability(ordernr: string): Observable<{
    exists: boolean;
    canRetrieve: boolean;
    reason?: string;
    currentTill?: string;
    currentAttendant?: string;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/check-availability/${ordernr}`,
      { params: this.getTenantParams() }
    );
  }
}
