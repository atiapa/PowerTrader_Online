import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PurchaseOrderTbl, PurchasesInvoiceMaster } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private apiUrl = 'http://localhost:5000/api/PurchaseOrder';

  constructor(private http: HttpClient) { }

  // ============ PURCHASE ORDERS ============

  // GET ALL Purchase Orders
  getAll(): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(this.apiUrl);
  }

  // GET Purchase Order by ID
  getById(refNo: number): Observable<PurchaseOrderTbl> {
    return this.http.get<PurchaseOrderTbl>(`${this.apiUrl}/${refNo}`);
  }

  // GET Purchase Orders by Supplier
  getBySupplier(supplierCode: string): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/supplier/${supplierCode}`);
  }

  // GET Purchase Orders by Status
  getByStatus(status: string): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/status/${status}`);
  }

  // GET Purchase Orders by Date Range
  getByDateRange(startDate: Date, endDate: Date): Observable<PurchaseOrderTbl[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/daterange`, { params });
  }

  // GET Purchase Orders by Branch
  getByBranchCode(branchCode: string): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Purchase Orders by Organisation
  getByOrganisation(organisationCode: string): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // CREATE Purchase Order
  create(purchaseOrder: PurchaseOrderTbl): Observable<PurchaseOrderTbl> {
    return this.http.post<PurchaseOrderTbl>(this.apiUrl, purchaseOrder);
  }

  // UPDATE Purchase Order
  update(refNo: number, purchaseOrder: PurchaseOrderTbl): Observable<PurchaseOrderTbl> {
    return this.http.put<PurchaseOrderTbl>(`${this.apiUrl}/${refNo}`, purchaseOrder);
  }

  // DELETE Purchase Order
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // APPROVE Purchase Order
  approvePurchaseOrder(refNo: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/approve`, {});
  }

  // REJECT Purchase Order
  rejectPurchaseOrder(refNo: number, reason: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/reject`, { reason });
  }

  // GET Pending Purchase Orders
  getPendingOrders(): Observable<PurchaseOrderTbl[]> {
    return this.http.get<PurchaseOrderTbl[]>(`${this.apiUrl}/pending`);
  }

  // ============ PURCHASE INVOICES ============

  // GET ALL Purchase Invoices
  getAllInvoices(): Observable<PurchasesInvoiceMaster[]> {
    return this.http.get<PurchasesInvoiceMaster[]>(`${this.apiUrl}/invoices`);
  }

  // GET Purchase Invoice by ID
  getInvoiceById(refNo: number): Observable<PurchasesInvoiceMaster> {
    return this.http.get<PurchasesInvoiceMaster>(`${this.apiUrl}/invoices/${refNo}`);
  }

  // GET Invoices by Supplier
  getInvoicesBySupplier(supplierCode: string): Observable<PurchasesInvoiceMaster[]> {
    return this.http.get<PurchasesInvoiceMaster[]>(`${this.apiUrl}/invoices/supplier/${supplierCode}`);
  }

  // CREATE Purchase Invoice
  createInvoice(invoice: PurchasesInvoiceMaster): Observable<PurchasesInvoiceMaster> {
    return this.http.post<PurchasesInvoiceMaster>(`${this.apiUrl}/invoices`, invoice);
  }

  // UPDATE Purchase Invoice
  updateInvoice(refNo: number, invoice: PurchasesInvoiceMaster): Observable<PurchasesInvoiceMaster> {
    return this.http.put<PurchasesInvoiceMaster>(`${this.apiUrl}/invoices/${refNo}`, invoice);
  }

  // DELETE Purchase Invoice
  deleteInvoice(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/invoices/${refNo}`);
  }

  // GET Unpaid Invoices
  getUnpaidInvoices(): Observable<PurchasesInvoiceMaster[]> {
    return this.http.get<PurchasesInvoiceMaster[]>(`${this.apiUrl}/invoices/unpaid`);
  }

  // RECEIVE Goods from Purchase Order
  receiveGoods(refNo: number, receivedItems: any[]): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${refNo}/receive`, { receivedItems });
  }

  // ============ REPORTS ============

  // GET Purchase Summary
  getPurchaseSummary(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/summary`, { params });
  }

  // GET Purchase Report by Supplier
  getPurchaseReportBySupplier(supplierCode: string, startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/report/supplier/${supplierCode}`, { params });
  }
}
