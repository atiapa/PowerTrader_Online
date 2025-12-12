import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetailItems } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

/**
 * ====================================
 * PHASE 1B: INVENTORY MANAGEMENT SERVICE
 * ====================================
 * Handles real-time stock level updates during POS transactions
 * Provides stock inquiry, adjustments, and transfer operations
 * Multi-tenant architecture compliant with automatic stock reduction
 */

export interface StockAdjustmentRequest {
  productID: string;
  adjustmentType: 'SALE' | 'RETURN' | 'DAMAGE' | 'THEFT' | 'RECOUNT' | 'TRANSFER_OUT' | 'TRANSFER_IN' | 'RECEIVE' | 'ADJUSTMENT';
  quantityChange: number; // Positive for increase, negative for decrease
  reason: string;
  referenceNumber?: string; // Invoice, PO, Transfer ID
  costPrice?: number;
  notes?: string;
  adjustedBy: string;
  approvedBy?: string;
}

export interface StockTransferRequest {
  productID: string;
  fromBranchCode: string;
  toBranchCode: string;
  quantity: number;
  transferReason: string;
  requestedBy: string;
  approvedBy?: string;
  notes?: string;
}

export interface StockInquiryResponse {
  productID: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  maxStock: number;
  unitsOnOrder?: number;
  unitsInTransit?: number;
  availableForSale: number;
  stockStatus: 'IN_STOCK' | 'LOW_STOCK' | 'OUT_OF_STOCK' | 'OVERSTOCK';
  lastRestockDate?: Date;
  lastSaleDate?: Date;
  branchCode: string;
  branchName: string;
}

export interface LowStockAlert {
  productID: string;
  productName: string;
  currentStock: number;
  reorderLevel: number;
  shortage: number;
  recommendedOrderQty: number;
  supplierID?: string;
  supplierName?: string;
  lastPurchasePrice?: number;
  branchCode: string;
}

export interface StockMovementHistory {
  refNo: number;
  productID: string;
  productName: string;
  movementType: string;
  quantityBefore: number;
  quantityChange: number;
  quantityAfter: number;
  referenceNumber?: string;
  reason: string;
  performedBy: string;
  movementDate: Date;
  branchCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class InventoryManagementService {
  private apiUrl = 'http://localhost:5000/api/Inventory';

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
  // REAL-TIME STOCK REDUCTION (POS Sale)
  // ====================================
  reduceStockOnSale(
    productID: string, 
    quantity: number, 
    invoiceNr: string,
    attendantID: string
  ): Observable<{ success: boolean, newStock: number, message: string }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<{ success: boolean, newStock: number, message: string }>(
      `${this.apiUrl}/reduce-stock`,
      {
        productID,
        quantity,
        invoiceNr,
        attendantID,
        adjustmentType: 'SALE',
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // INCREASE STOCK (Return/Receive)
  // ====================================
  increaseStockOnReturn(
    productID: string, 
    quantity: number, 
    returnInvoiceNr: string,
    reason: string
  ): Observable<{ success: boolean, newStock: number, message: string }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<{ success: boolean, newStock: number, message: string }>(
      `${this.apiUrl}/increase-stock`,
      {
        productID,
        quantity,
        referenceNumber: returnInvoiceNr,
        reason,
        adjustmentType: 'RETURN',
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // STOCK ADJUSTMENT (Manual Correction)
  // ====================================
  adjustStock(request: StockAdjustmentRequest): Observable<{ success: boolean, newStock: number, message: string }> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<{ success: boolean, newStock: number, message: string }>(
      `${this.apiUrl}/adjust`,
      requestWithTenant
    );
  }

  // ====================================
  // BATCH STOCK UPDATE (Multiple Products)
  // ====================================
  batchStockUpdate(
    adjustments: StockAdjustmentRequest[]
  ): Observable<{ success: boolean, updatedCount: number, failures: any[] }> {
    const adjustmentsWithTenant = adjustments.map(adj => 
      this.tenantContext.addTenantInfo(adj)
    );
    
    return this.http.post<{ success: boolean, updatedCount: number, failures: any[] }>(
      `${this.apiUrl}/batch-adjust`,
      { adjustments: adjustmentsWithTenant }
    );
  }

  // ====================================
  // STOCK INQUIRY (Get Current Stock)
  // ====================================
  getStockLevel(productID: string): Observable<StockInquiryResponse> {
    return this.http.get<StockInquiryResponse>(
      `${this.apiUrl}/stock-level/${productID}`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // CHECK STOCK AVAILABILITY (Before Sale)
  // ====================================
  checkAvailability(
    productID: string, 
    requestedQuantity: number
  ): Observable<{ available: boolean, currentStock: number, canFulfill: boolean, message: string }> {
    return this.http.get<{ available: boolean, currentStock: number, canFulfill: boolean, message: string }>(
      `${this.apiUrl}/check-availability/${productID}`,
      {
        params: this.getTenantParams().set('quantity', requestedQuantity.toString())
      }
    );
  }

  // ====================================
  // LOW STOCK ALERTS
  // ====================================
  getLowStockItems(threshold?: number): Observable<LowStockAlert[]> {
    let params = this.getTenantParams();
    if (threshold) {
      params = params.set('threshold', threshold.toString());
    }
    
    return this.http.get<LowStockAlert[]>(
      `${this.apiUrl}/low-stock`,
      { params }
    );
  }

  // ====================================
  // OUT OF STOCK ITEMS
  // ====================================
  getOutOfStockItems(): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(
      `${this.apiUrl}/out-of-stock`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // OVERSTOCK ITEMS (Above Max Stock)
  // ====================================
  getOverstockItems(): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(
      `${this.apiUrl}/overstock`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // STOCK MOVEMENT HISTORY
  // ====================================
  getStockMovementHistory(
    productID: string,
    startDate?: Date,
    endDate?: Date
  ): Observable<StockMovementHistory[]> {
    let params = this.getTenantParams();
    
    if (startDate) {
      params = params.set('startDate', startDate.toISOString());
    }
    if (endDate) {
      params = params.set('endDate', endDate.toISOString());
    }
    
    return this.http.get<StockMovementHistory[]>(
      `${this.apiUrl}/movement-history/${productID}`,
      { params }
    );
  }

  // ====================================
  // STOCK TRANSFER (Branch to Branch)
  // ====================================
  initiateStockTransfer(request: StockTransferRequest): Observable<{ success: boolean, transferId: string, message: string }> {
    const requestWithTenant = this.tenantContext.addTenantInfo(request);
    return this.http.post<{ success: boolean, transferId: string, message: string }>(
      `${this.apiUrl}/transfer`,
      requestWithTenant
    );
  }

  // ====================================
  // APPROVE STOCK TRANSFER
  // ====================================
  approveStockTransfer(
    transferId: string,
    approvedBy: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/transfer/approve/${transferId}`,
      { approvedBy },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // REJECT STOCK TRANSFER
  // ====================================
  rejectStockTransfer(
    transferId: string,
    rejectedBy: string,
    reason: string
  ): Observable<{ success: boolean, message: string }> {
    return this.http.post<{ success: boolean, message: string }>(
      `${this.apiUrl}/transfer/reject/${transferId}`,
      { rejectedBy, reason },
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // GET PENDING TRANSFERS
  // ====================================
  getPendingTransfers(): Observable<any[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/transfers/pending`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // STOCK VALUATION (Current Value)
  // ====================================
  getStockValuation(): Observable<{
    totalItems: number,
    totalValue: number,
    costValue: number,
    retailValue: number,
    potentialProfit: number
  }> {
    return this.http.get<any>(
      `${this.apiUrl}/valuation`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // STOCK COUNT SHEET (For Physical Count)
  // ====================================
  generateStockCountSheet(
    categoryID?: string
  ): Observable<{
    products: Array<{
      productID: string,
      productName: string,
      systemStock: number,
      physicalStock?: number,
      variance?: number
    }>
  }> {
    let params = this.getTenantParams();
    if (categoryID) {
      params = params.set('categoryID', categoryID);
    }
    
    return this.http.get<any>(
      `${this.apiUrl}/stock-count-sheet`,
      { params }
    );
  }

  // ====================================
  // SUBMIT PHYSICAL STOCK COUNT
  // ====================================
  submitStockCount(
    counts: Array<{ productID: string, physicalStock: number }>,
    countedBy: string,
    notes?: string
  ): Observable<{ success: boolean, adjustmentsMade: number, discrepancies: any[] }> {
    const tenant = this.tenantContext.getTenantParams();
    return this.http.post<any>(
      `${this.apiUrl}/stock-count/submit`,
      {
        counts,
        countedBy,
        notes,
        organisationCode: tenant.organisationCode,
        branchCode: tenant.branchCode
      }
    );
  }

  // ====================================
  // REORDER RECOMMENDATIONS
  // ====================================
  getReorderRecommendations(): Observable<{
    productID: string,
    productName: string,
    currentStock: number,
    reorderLevel: number,
    recommendedOrderQty: number,
    supplierID?: string,
    estimatedCost: number
  }[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/reorder-recommendations`,
      { params: this.getTenantParams() }
    );
  }

  // ====================================
  // STOCK AGING REPORT (Slow Moving Items)
  // ====================================
  getStockAgingReport(
    days: number = 90
  ): Observable<{
    productID: string,
    productName: string,
    currentStock: number,
    lastSaleDate?: Date,
    daysWithoutSale: number,
    stockValue: number,
    recommendation: string
  }[]> {
    return this.http.get<any[]>(
      `${this.apiUrl}/stock-aging`,
      { params: this.getTenantParams().set('days', days.toString()) }
    );
  }

  // ====================================
  // EXPORT STOCK REPORT (Excel/PDF)
  // ====================================
  exportStockReport(
    format: 'EXCEL' | 'PDF',
    reportType: 'CURRENT' | 'LOW_STOCK' | 'MOVEMENT' | 'VALUATION'
  ): Observable<Blob> {
    return this.http.get(
      `${this.apiUrl}/export`,
      {
        params: this.getTenantParams()
          .set('format', format)
          .set('reportType', reportType),
        responseType: 'blob'
      }
    );
  }
}
