import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesDetailsGifts, GiftCardTbl } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

/**
 * ====================================
 * PHASE 1A: GIFT CARD REDEMPTION SERVICE
 * ====================================
 * Tracks all gift card issuance, redemption, and balance operations
 * Integrates with POS for split payment support
 * Multi-tenant architecture compliant
 */

export interface GiftCardRedemptionRequest {
  giftCardNumber: string;
  giftCardBarcode?: string;
  amountToRedeem: number;
  invoiceNr: string;
  customerID?: string;
  customerName?: string;
  attendantID: string;
  attendantName: string;
  tillName: string;
  session: string;
  notes?: string;
}

export interface GiftCardIssuanceRequest {
  cardValue: number;
  issuedToName: string;
  issuedToPhone?: string;
  issuedToEmail?: string;
  paymentMethod: string;
  soldByID: string;
  soldByName: string;
  expiryDays?: number; // Default 365 days
  promotionCode?: string;
  batchNumber?: string;
  notes?: string;
}

export interface GiftCardBalanceResponse {
  giftCardNumber: string;
  currentBalance: number;
  originalBalance: number;
  status: string;
  expiryDate?: Date;
  isExpired: boolean;
  canRedeem: boolean;
  message: string;
}

export interface GiftCardRedemptionResponse {
  success: boolean;
  refNo: number;
  remainingBalance: number;
  amountRedeemed: number;
  transactionId: string;
  receiptNumber: string;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class GiftCardRedemptionService {
  private apiUrl = 'http://localhost:5000/api/GiftCardRedemption';

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
  // GIFT CARD ISSUANCE (Sale of Gift Card)
  // ====================================
  issueGiftCard(request: GiftCardIssuanceRequest): Observable<GiftCardRedemptionResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<GiftCardRedemptionResponse>(
      `${this.apiUrl}/issue`,
      requestWithTenant
    );
  }

  // ====================================
  // GIFT CARD VALIDATION (Before Redemption)
  // ====================================
  validateGiftCard(giftCardNumber: string, pin?: string): Observable<GiftCardBalanceResponse> {
    const params = pin 
      ? new HttpParams().set('pin', pin)
      : new HttpParams();
    
    return this.http.get<GiftCardBalanceResponse>(
      `${this.apiUrl}/validate/${giftCardNumber}`,
      { params }
    );
  }

  // ====================================
  // CHECK GIFT CARD BALANCE
  // ====================================
  checkBalance(giftCardNumber: string): Observable<GiftCardBalanceResponse> {
    return this.http.get<GiftCardBalanceResponse>(
      `${this.apiUrl}/balance/${giftCardNumber}`
    );
  }

  // ====================================
  // REDEEM GIFT CARD (Apply to Sale)
  // ====================================
  redeemGiftCard(request: GiftCardRedemptionRequest): Observable<GiftCardRedemptionResponse> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<GiftCardRedemptionResponse>(
      `${this.apiUrl}/redeem`,
      requestWithTenant
    );
  }

  // ====================================
  // PARTIAL REDEMPTION (Split Payment Scenario)
  // ====================================
  partialRedemption(
    giftCardNumber: string, 
    amountToRedeem: number, 
    invoiceNr: string,
    attendantID: string
  ): Observable<GiftCardRedemptionResponse> {
    const request: GiftCardRedemptionRequest = {
      giftCardNumber,
      amountToRedeem,
      invoiceNr,
      attendantID,
      attendantName: '', // Will be set by backend
      tillName: '', // Will be set by backend
      session: ''
    };
    
    return this.redeemGiftCard(request);
  }

  // ====================================
  // GET REDEMPTION HISTORY (by Gift Card)
  // ====================================
  getRedemptionHistory(giftCardNumber: string): Observable<SalesDetailsGifts[]> {
    return this.http.get<SalesDetailsGifts[]>(
      `${this.apiUrl}/history/${giftCardNumber}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET REDEMPTION BY INVOICE
  // ====================================
  getRedemptionByInvoice(invoiceNr: string): Observable<SalesDetailsGifts[]> {
    return this.http.get<SalesDetailsGifts[]>(
      `${this.apiUrl}/invoice/${invoiceNr}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET ALL REDEMPTIONS (Tenant Scoped)
  // ====================================
  getAllRedemptions(
    startDate?: Date, 
    endDate?: Date, 
    status?: string
  ): Observable<SalesDetailsGifts[]> {
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
    
    return this.http.get<SalesDetailsGifts[]>(this.apiUrl, { params });
  }

  // ====================================
  // GET REDEMPTION DETAILS BY RefNo
  // ====================================
  getRedemptionById(refNo: number): Observable<SalesDetailsGifts> {
    return this.http.get<SalesDetailsGifts>(
      `${this.apiUrl}/${refNo}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // REFUND GIFT CARD (Return Scenario)
  // ====================================
  refundGiftCard(
    giftCardNumber: string, 
    refundAmount: number, 
    returnInvoiceNr: string,
    reason: string
  ): Observable<GiftCardRedemptionResponse> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<GiftCardRedemptionResponse>(
      `${this.apiUrl}/refund`,
      {
        giftCardNumber,
        refundAmount,
        returnInvoiceNr,
        reason,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // VOID/REVERSE REDEMPTION
  // ====================================
  voidRedemption(refNo: number, reason: string): Observable<GiftCardRedemptionResponse> {
    return this.http.post<GiftCardRedemptionResponse>(
      `${this.apiUrl}/void/${refNo}`,
      { reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET GIFT CARDS BY CUSTOMER
  // ====================================
  getGiftCardsByCustomer(customerID: string): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(
      `${this.apiUrl}/customer/${customerID}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET GIFT CARD STATISTICS
  // ====================================
  getGiftCardStats(startDate?: Date, endDate?: Date): Observable<any> {
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
  // VERIFY GIFT CARD PIN (Security Check)
  // ====================================
  verifyPin(giftCardNumber: string, pin: string): Observable<{ valid: boolean, message: string }> {
    return this.http.post<{ valid: boolean, message: string }>(
      `${this.apiUrl}/verify-pin`,
      { giftCardNumber, pin }
    );
  }

  // ====================================
  // SEND GIFT CARD RECEIPT (Email/SMS)
  // ====================================
  sendReceipt(refNo: number, method: 'EMAIL' | 'SMS', recipient: string): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/send-receipt/${refNo}`,
      { method, recipient },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // EXPORT REDEMPTION REPORT (Excel/PDF)
  // ====================================
  exportRedemptionReport(
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
  // BATCH ISSUE GIFT CARDS (Bulk Creation)
  // ====================================
  batchIssueGiftCards(
    count: number,
    cardValue: number,
    batchNumber: string,
    expiryDays?: number
  ): Observable<{ success: boolean, cardsCreated: number, giftCards: GiftCardTbl[] }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<{ success: boolean, cardsCreated: number, giftCards: GiftCardTbl[] }>(
      `${this.apiUrl}/batch-issue`,
      {
        count,
        cardValue,
        batchNumber,
        expiryDays: expiryDays || 365,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }
}
