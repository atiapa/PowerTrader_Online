import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReturnTransactions } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

/**
 * ====================================
 * PHASE 1D: RETURNS PROCESSING SERVICE
 * ====================================
 * Manages product returns with inventory adjustment
 * Supports full returns, partial returns, and exchanges
 * Multi-tenant architecture with approval workflow
 */

export interface ProcessReturnRequest {
  originalInvoiceNr: string;
  returnItems: ReturnItem[];
  returnReason: string;
  returnType: 'FULL' | 'PARTIAL' | 'EXCHANGE';
  customerID?: string;
  customerName?: string;
  processedByID: string;
  processedByName: string;
  tillName: string;
  refundMethod: 'CASH' | 'CARD' | 'STORE_CREDIT' | 'GIFT_CARD' | 'ORIGINAL_METHOD';
  notes?: string;
  exchangeItems?: ExchangeItem[];
}

export interface ReturnItem {
  productID: string;
  productName: string;
  barcode?: string;
  quantityReturned: number;
  quantitySold: number;
  unitPrice: number;
  originalPrice: number;
  returnAmount: number;
  taxAmount: number;
  productCondition: 'NEW' | 'USED' | 'DAMAGED' | 'DEFECTIVE';
  restockable: boolean;
  damageNotes?: string;
}

export interface ExchangeItem {
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  extendedPrice: number;
}

export interface ProcessReturnResponse {
  success: boolean;
  returnNumber: string;
  refNo: number;
  refundAmount: number;
  storeCreditAmount?: number;
  giftCardNumber?: string;
  receiptNumber: string;
  message: string;
  inventoryUpdated: boolean;
  ledgerPosted: boolean;
}

export interface ReturnApprovalRequest {
  refNo: number;
  approvedByID: string;
  approvedByName: string;
  approvalNotes?: string;
}

export interface ReturnSummary {
  returnNumber: string;
  refNo: number;
  originalInvoiceNr: string;
  returnDate: Date;
  returnType: string;
  returnStatus: string;
  customerName?: string;
  itemCount: number;
  totalRefund: number;
  processedBy: string;
  approvalRequired: boolean;
  approvedBy?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReturnsProcessingService {
  private apiUrl = 'http://localhost:5000/api/Returns';

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
  // PROCESS RETURN (Initiate Return)
  // ====================================
  processReturn(request: ProcessReturnRequest): Observable<ProcessReturnResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<ProcessReturnResponse>(
      `${this.apiUrl}/process`,
      requestWithTenant
    );
  }

  // ====================================
  // VALIDATE RETURN (Check Original Sale)
  // ====================================
  validateReturn(
    invoiceNr: string,
    productID?: string
  ): Observable<{
    valid: boolean;
    saleDate?: Date;
    items: Array<{
      productID: string;
      productName: string;
      quantitySold: number;
      unitPrice: number;
      canReturn: boolean;
      returnWindow: number;
      daysRemaining: number;
    }>;
    totalAmount: number;
    customerName?: string;
    message: string;
  }> {
    let params = this.getTenantParams().set('invoiceNr', invoiceNr);
    if (productID) {
      params = params.set('productID', productID);
    }
    
    return this.http.get<any>(`${this.apiUrl}/validate`, { params });
  }

  // ====================================
  // GET RETURN BY RETURN NUMBER
  // ====================================
  getReturnByNumber(returnNumber: string): Observable<ReturnTransactions> {
    return this.http.get<ReturnTransactions>(
      `${this.apiUrl}/return/${returnNumber}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET RETURN BY RefNo (Primary Key)
  // ====================================
  getReturnById(refNo: number): Observable<ReturnTransactions> {
    return this.http.get<ReturnTransactions>(
      `${this.apiUrl}/${refNo}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET RETURNS BY ORIGINAL INVOICE
  // ====================================
  getReturnsByInvoice(invoiceNr: string): Observable<ReturnTransactions[]> {
    return this.http.get<ReturnTransactions[]>(
      `${this.apiUrl}/invoice/${invoiceNr}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET ALL RETURNS (Tenant Scoped)
  // ====================================
  getAllReturns(
    startDate?: Date,
    endDate?: Date,
    status?: string
  ): Observable<ReturnSummary[]> {
    let params = this.getTenantParams();
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    if (status) {
      params = params.set('status', status);
    }
    
    return this.http.get<ReturnSummary[]>(this.apiUrl, { params });
  }

  // ====================================
  // GET PENDING APPROVALS
  // ====================================
  getPendingApprovals(): Observable<ReturnSummary[]> {
    return this.http.get<ReturnSummary[]>(
      `${this.apiUrl}/pending-approvals`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // APPROVE RETURN
  // ====================================
  approveReturn(request: ReturnApprovalRequest): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/approve`,
      request,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // REJECT RETURN
  // ====================================
  rejectReturn(
    refNo: number,
    rejectedByID: string,
    rejectedByName: string,
    reason: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/reject/${refNo}`,
      { rejectedByID, rejectedByName, reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // COMPLETE RETURN (Finalize & Post)
  // ====================================
  completeReturn(
    refNo: number,
    completedByID: string
  ): Observable<{ success: boolean, inventoryUpdated: boolean, ledgerPosted: boolean, message: string }> {
    return this.http.post<any>(
      `${this.apiUrl}/complete/${refNo}`,
      { completedByID },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // RESTOCK RETURNED ITEMS
  // ====================================
  restockReturnedItems(
    refNo: number,
    restockedBy: string,
    restockNotes?: string
  ): Observable<{ success: boolean, itemsRestocked: number, message: string }> {
    return this.http.post<any>(
      `${this.apiUrl}/restock/${refNo}`,
      { restockedBy, restockNotes },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // ISSUE STORE CREDIT
  // ====================================
  issueStoreCredit(
    refNo: number,
    customerID: string,
    amount: number,
    expiryDays?: number
  ): Observable<{ success: boolean, storeCreditNumber: string, message: string }> {
    return this.http.post<any>(
      `${this.apiUrl}/store-credit/${refNo}`,
      { customerID, amount, expiryDays: expiryDays || 365 },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // ISSUE GIFT CARD FOR RETURN
  // ====================================
  issueGiftCardForReturn(
    refNo: number,
    amount: number,
    issuedToName: string,
    issuedToPhone?: string
  ): Observable<{ success: boolean, giftCardNumber: string, message: string }> {
    return this.http.post<any>(
      `${this.apiUrl}/gift-card/${refNo}`,
      { amount, issuedToName, issuedToPhone },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // PROCESS EXCHANGE (Return + New Sale)
  // ====================================
  processExchange(
    returnRequest: ProcessReturnRequest,
    exchangeItems: ExchangeItem[]
  ): Observable<{
    success: boolean;
    returnNumber: string;
    newInvoiceNr: string;
    refundAmount: number;
    exchangeAmount: number;
    balanceDue: number;
    message: string;
  }> {
    const requestWithTenant = this.tenantContext.addTenantInfo({
      ...returnRequest,
      exchangeItems
    });
    
    return this.http.post<any>(
      `${this.apiUrl}/exchange`,
      requestWithTenant
    );
  }

  // ====================================
  // VOID/CANCEL RETURN
  // ====================================
  voidReturn(
    refNo: number,
    voidedBy: string,
    reason: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/void/${refNo}`,
      { voidedBy, reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET RETURNS BY CUSTOMER
  // ====================================
  getReturnsByCustomer(customerID: string): Observable<ReturnSummary[]> {
    return this.http.get<ReturnSummary[]>(
      `${this.apiUrl}/customer/${customerID}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET RETURNS BY PRODUCT
  // ====================================
  getReturnsByProduct(
    productID: string,
    startDate?: Date,
    endDate?: Date
  ): Observable<ReturnTransactions[]> {
    let params = this.getTenantParams().set('productID', productID);
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    return this.http.get<ReturnTransactions[]>(
      `${this.apiUrl}/product/${productID}`,
      { params }
    );
  }

  // ====================================
  // GET RETURN STATISTICS
  // ====================================
  getReturnStats(
    startDate?: Date,
    endDate?: Date
  ): Observable<{
    totalReturns: number;
    totalRefunded: number;
    returnRate: number;
    byReason: Array<{ reason: string, count: number, value: number }>;
    byProduct: Array<{ productID: string, productName: string, returnCount: number }>;
    byCondition: Array<{ condition: string, count: number }>;
    averageReturnValue: number;
    topReturnReasons: string[];
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
  // PRINT RETURN RECEIPT
  // ====================================
  printReturnReceipt(refNo: number): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/print/${refNo}`,
      {
        params: this.getTenantParams(),
        responseType: 'blob'
      }
    );
  }

  // ====================================
  // EMAIL RETURN RECEIPT
  // ====================================
  emailReturnReceipt(
    refNo: number,
    email: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/email-receipt/${refNo}`,
      { email },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // EXPORT RETURNS REPORT
  // ====================================
  exportReturnsReport(
    format: 'EXCEL' | 'PDF',
    startDate?: Date,
    endDate?: Date
  ): Observable<Blob> {
    let params = this.getTenantParams().set('format', format);
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    return this.http.get(
      `${this.apiUrl}/export`,
      { params, responseType: 'blob' }
    );
  }

  // ====================================
  // CHECK RETURN ELIGIBILITY
  // ====================================
  checkReturnEligibility(
    invoiceNr: string,
    productID: string
  ): Observable<{
    eligible: boolean;
    reason?: string;
    returnWindow: number;
    daysRemaining: number;
    quantitySold: number;
    quantityAlreadyReturned: number;
    maxReturnableQty: number;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/check-eligibility`,
      {
        params: this.getTenantParams()
          .set('invoiceNr', invoiceNr)
          .set('productID', productID)
      }
    );
  }
}
