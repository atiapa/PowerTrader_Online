import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AccountLedgerTbl } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

/**
 * ====================================
 * PHASE 1E: ACCOUNTING INTEGRATION SERVICE
 * ====================================
 * Automatic double-entry posting to Accounts_Ledger table
 * Posts retail sales, returns, and gift card transactions
 * Multi-tenant architecture with full audit trail
 */

export interface LedgerPostingRequest {
  voucherType: 'SALE' | 'RETURN' | 'GIFT_CARD' | 'PAYMENT' | 'RECEIPT' | 'JOURNAL';
  voucherNo: string; // Invoice/Return/GiftCard number
  transactionDate: Date;
  entries: LedgerEntry[];
  narration: string;
  referenceNo?: string;
  customerID?: string;
  customerName?: string;
  postedBy: string;
}

export interface LedgerEntry {
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  narration?: string;
}

export interface SalePostingRequest {
  invoiceNr: string;
  saleDate: Date;
  customerID?: string;
  customerName?: string;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  changeDue?: number;
  giftCardRedeemed?: number;
  attendantID: string;
  tillName: string;
}

export interface ReturnPostingRequest {
  returnNumber: string;
  originalInvoiceNr: string;
  returnDate: Date;
  customerID?: string;
  customerName?: string;
  returnAmount: number;
  taxAmount: number;
  refundMethod: string;
  refundAmount: number;
  restockingFee?: number;
  processedBy: string;
}

export interface GiftCardPostingRequest {
  giftCardNumber: string;
  transactionType: 'ISSUE' | 'REDEEM' | 'REFUND';
  amount: number;
  invoiceNr?: string;
  customerID?: string;
  performedBy: string;
}

export interface LedgerPostingResponse {
  success: boolean;
  voucherNo: string;
  entriesPosted: number;
  ledgerRefs: number[];
  message: string;
  balanceVerified: boolean;
}

export interface LedgerBalanceCheck {
  voucherNo: string;
  totalDebits: number;
  totalCredits: number;
  balanced: boolean;
  difference: number;
}

@Injectable({
  providedIn: 'root'
})
export class AccountingIntegrationService {
  private apiUrl = 'http://localhost:5000/api/AccountingIntegration';

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
  // POST RETAIL SALE TO LEDGER
  // ====================================
  postSaleToLedger(request: SalePostingRequest): Observable<LedgerPostingResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<LedgerPostingResponse>(
      `${this.apiUrl}/post-sale`,
      requestWithTenant
    );
  }

  // ====================================
  // POST RETURN TO LEDGER
  // ====================================
  postReturnToLedger(request: ReturnPostingRequest): Observable<LedgerPostingResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<LedgerPostingResponse>(
      `${this.apiUrl}/post-return`,
      requestWithTenant
    );
  }

  // ====================================
  // POST GIFT CARD TRANSACTION TO LEDGER
  // ====================================
  postGiftCardToLedger(request: GiftCardPostingRequest): Observable<LedgerPostingResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<LedgerPostingResponse>(
      `${this.apiUrl}/post-gift-card`,
      requestWithTenant
    );
  }

  // ====================================
  // GENERIC LEDGER POSTING (Manual Journal)
  // ====================================
  postToLedger(request: LedgerPostingRequest): Observable<LedgerPostingResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<LedgerPostingResponse>(
      `${this.apiUrl}/post`,
      requestWithTenant
    );
  }

  // ====================================
  // VERIFY LEDGER BALANCE (Double-Entry Check)
  // ====================================
  verifyLedgerBalance(voucherNo: string): Observable<LedgerBalanceCheck> {
    return this.http.get<LedgerBalanceCheck>(
      `${this.apiUrl}/verify-balance/${voucherNo}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET LEDGER ENTRIES BY VOUCHER
  // ====================================
  getLedgerEntriesByVoucher(voucherNo: string): Observable<AccountLedgerTbl[]> {
    return this.http.get<AccountLedgerTbl[]>(
      `${this.apiUrl}/entries/${voucherNo}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET LEDGER ENTRIES BY DATE RANGE
  // ====================================
  getLedgerEntriesByDate(
    startDate: Date,
    endDate: Date,
    accountCode?: string
  ): Observable<AccountLedgerTbl[]> {
    let params = this.getTenantParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    
    if (accountCode) {
      params = params.set('accountCode', accountCode);
    }
    
    return this.http.get<AccountLedgerTbl[]>(this.apiUrl, { params });
  }

  // ====================================
  // GET ACCOUNT BALANCE
  // ====================================
  getAccountBalance(
    accountCode: string,
    asOfDate?: Date
  ): Observable<{
    accountCode: string;
    accountName: string;
    debitTotal: number;
    creditTotal: number;
    balance: number;
    balanceType: 'DEBIT' | 'CREDIT';
  }> {
    let params = this.getTenantParams().set('accountCode', accountCode);
    
    if (asOfDate) {
      params = params.set('asOfDate', asOfDate.toISOString());
    }
    
    return this.http.get<any>(
      `${this.apiUrl}/account-balance`,
      { params }
    );
  }

  // ====================================
  // GET TRIAL BALANCE
  // ====================================
  getTrialBalance(
    startDate: Date,
    endDate: Date
  ): Observable<{
    accounts: Array<{
      accountCode: string;
      accountName: string;
      accountType: string;
      debitTotal: number;
      creditTotal: number;
      balance: number;
      balanceType: 'DEBIT' | 'CREDIT';
    }>;
    totalDebits: number;
    totalCredits: number;
    balanced: boolean;
    difference: number;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/trial-balance`,
      {
        params: this.getTenantParams()
          .set('startDate', startDate.toISOString())
          .set('endDate', endDate.toISOString())
      }
    );
  }

  // ====================================
  // POST END-OF-DAY SALES SUMMARY
  // ====================================
  postEndOfDaySummary(
    tillName: string,
    sessionDate: Date,
    summary: {
      totalSales: number;
      totalReturns: number;
      netSales: number;
      cashSales: number;
      cardSales: number;
      mobileMoneySales: number;
      giftCardSales: number;
      taxCollected: number;
      discountsGiven: number;
    }
  ): Observable<LedgerPostingResponse> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<LedgerPostingResponse>(
      `${this.apiUrl}/post-eod-summary`,
      {
        tillName,
        sessionDate,
        summary,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // REVERSE LEDGER ENTRY (Void Transaction)
  // ====================================
  reverseLedgerEntry(
    voucherNo: string,
    reversedBy: string,
    reason: string
  ): Observable<{ success: boolean, reversalVoucherNo: string, message: string }> {
    return this.http.post<any>(
      `${this.apiUrl}/reverse/${voucherNo}`,
      { reversedBy, reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET UNPOSTED TRANSACTIONS
  // ====================================
  getUnpostedTransactions(
    transactionType?: 'SALE' | 'RETURN' | 'GIFT_CARD'
  ): Observable<Array<{
    referenceNo: string;
    transactionType: string;
    transactionDate: Date;
    amount: number;
    reason: string;
  }>> {
    let params = this.getTenantParams();
    
    if (transactionType) {
      params = params.set('type', transactionType);
    }
    
    return this.http.get<any[]>(
      `${this.apiUrl}/unposted`,
      { params }
    );
  }

  // ====================================
  // BATCH POST TRANSACTIONS
  // ====================================
  batchPostTransactions(
    transactions: Array<{
      type: 'SALE' | 'RETURN' | 'GIFT_CARD';
      referenceNo: string;
    }>
  ): Observable<{
    success: boolean;
    postedCount: number;
    failedCount: number;
    failures: Array<{ referenceNo: string, reason: string }>;
  }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<any>(
      `${this.apiUrl}/batch-post`,
      {
        transactions,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // GET REVENUE REPORT (P&L)
  // ====================================
  getRevenueReport(
    startDate: Date,
    endDate: Date
  ): Observable<{
    totalRevenue: number;
    totalCost: number;
    grossProfit: number;
    grossMargin: number;
    byPaymentMethod: Array<{
      method: string;
      amount: number;
      percentage: number;
    }>;
    byCategory: Array<{
      category: string;
      revenue: number;
      cost: number;
      profit: number;
    }>;
    dailyBreakdown: Array<{
      date: Date;
      revenue: number;
      cost: number;
      profit: number;
    }>;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/revenue-report`,
      {
        params: this.getTenantParams()
          .set('startDate', startDate.toISOString())
          .set('endDate', endDate.toISOString())
      }
    );
  }

  // ====================================
  // GET CASH FLOW REPORT
  // ====================================
  getCashFlowReport(
    startDate: Date,
    endDate: Date
  ): Observable<{
    openingBalance: number;
    cashInflows: number;
    cashOutflows: number;
    closingBalance: number;
    bySource: Array<{
      source: string;
      inflow: number;
      outflow: number;
      net: number;
    }>;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/cash-flow-report`,
      {
        params: this.getTenantParams()
          .set('startDate', startDate.toISOString())
          .set('endDate', endDate.toISOString())
      }
    );
  }

  // ====================================
  // GET ACCOUNT STATEMENT
  // ====================================
  getAccountStatement(
    accountCode: string,
    startDate: Date,
    endDate: Date
  ): Observable<{
    accountCode: string;
    accountName: string;
    openingBalance: number;
    entries: Array<{
      date: Date;
      voucherNo: string;
      narration: string;
      debit: number;
      credit: number;
      balance: number;
    }>;
    closingBalance: number;
    totalDebits: number;
    totalCredits: number;
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/account-statement/${accountCode}`,
      {
        params: this.getTenantParams()
          .set('startDate', startDate.toISOString())
          .set('endDate', endDate.toISOString())
      }
    );
  }

  // ====================================
  // EXPORT LEDGER REPORT
  // ====================================
  exportLedgerReport(
    format: 'EXCEL' | 'PDF',
    reportType: 'TRIAL_BALANCE' | 'REVENUE' | 'CASH_FLOW' | 'ACCOUNT_STATEMENT',
    startDate: Date,
    endDate: Date,
    accountCode?: string
  ): Observable<Blob> {
    let params = this.getTenantParams()
      .set('format', format)
      .set('reportType', reportType)
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    
    if (accountCode) {
      params = params.set('accountCode', accountCode);
    }
    
    return this.http.get(
      `${this.apiUrl}/export`,
      { params, responseType: 'blob' }
    );
  }

  // ====================================
  // RECONCILE LEDGER (Data Integrity Check)
  // ====================================
  reconcileLedger(
    startDate: Date,
    endDate: Date
  ): Observable<{
    success: boolean;
    discrepancies: Array<{
      voucherNo: string;
      issue: string;
      debitTotal: number;
      creditTotal: number;
      difference: number;
    }>;
    totalDiscrepancies: number;
    message: string;
  }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<any>(
      `${this.apiUrl}/reconcile`,
      {
        startDate,
        endDate,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // GET POSTING SUMMARY (Dashboard Widget)
  // ====================================
  getPostingSummary(date?: Date): Observable<{
    date: Date;
    totalTransactions: number;
    totalPosted: number;
    totalUnposted: number;
    totalReversed: number;
    postingRate: number;
    byType: Array<{
      type: string;
      posted: number;
      unposted: number;
    }>;
  }> {
    let params = this.getTenantParams();
    
    if (date) {
      params = params.set('date', date.toISOString());
    }
    
    return this.http.get<any>(
      `${this.apiUrl}/posting-summary`,
      { params }
    );
  }
}
