import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalesDetails, SalesReturnMaster } from '../models/database-models';
import { SalesDetailsTemp, SalesDetailsGifts } from '../models/models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class SalesDetailsService {
  private apiUrl = 'http://localhost:5000/api/SalesDetails';

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

  // ============ SALES DETAILS ============

  // GET ALL Sales (scoped to tenant)
  getAll(): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Sales by ID (scoped to tenant)
  getById(refNo: number): Observable<SalesDetails> {
    return this.http.get<SalesDetails>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Sales by Invoice Number
  getByInvoiceNumber(invoiceNo: string): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/invoice/${invoiceNo}`);
  }

  // GET Sales by Customer
  getByCustomer(customerCode: string): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/customer/${customerCode}`);
  }

  // GET Sales by Date Range
  getByDateRange(startDate: Date, endDate: Date): Observable<SalesDetails[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/daterange`, { params });
  }

  // GET Sales by Branch
  getByBranchCode(branchCode: string): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Sales by Store (Retail/Wholesale)
  getByStore(store: string): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/store/${store}`);
  }

  // CREATE Sales (auto-add tenant info)
  create(sales: SalesDetails): Observable<SalesDetails> {
    const salesWithTenant = this.tenantContext.addTenantInfo(sales);
    return this.http.post<SalesDetails>(this.apiUrl, salesWithTenant);
  }

  // UPDATE Sales
  update(refNo: number, sales: SalesDetails): Observable<SalesDetails> {
    return this.http.put<SalesDetails>(`${this.apiUrl}/${refNo}`, sales);
  }

  // DELETE Sales
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Today's Sales
  getTodaySales(): Observable<SalesDetails[]> {
    return this.http.get<SalesDetails[]>(`${this.apiUrl}/today`);
  }

  // GET Sales Summary by Date
  getSalesSummary(date: Date): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary/${date.toISOString()}`);
  }

  // ============ SALES DETAILS TEMP ============

  // GET Temporary Sales (Pending)
  getTempSales(): Observable<SalesDetailsTemp[]> {
    return this.http.get<SalesDetailsTemp[]>(`${this.apiUrl}/temp`);
  }

  // CREATE Temp Sales
  createTempSale(tempSale: SalesDetailsTemp): Observable<SalesDetailsTemp> {
    return this.http.post<SalesDetailsTemp>(`${this.apiUrl}/temp`, tempSale);
  }

  // CONVERT Temp to Final Sale
  convertTempToFinal(invoiceNo: string): Observable<SalesDetails[]> {
    return this.http.post<SalesDetails[]>(`${this.apiUrl}/temp/${invoiceNo}/convert`, {});
  }

  // DELETE Temp Sales
  deleteTempSale(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/temp/${refNo}`);
  }

  // ============ GIFT CARD SALES ============

  // GET Gift Card Sales
  getGiftCardSales(invoiceNo?: string): Observable<SalesDetailsGifts[]> {
    const url = invoiceNo 
      ? `${this.apiUrl}/gifts/invoice/${invoiceNo}` 
      : `${this.apiUrl}/gifts`;
    return this.http.get<SalesDetailsGifts[]>(url);
  }

  // CREATE Gift Card Sale
  createGiftCardSale(giftSale: SalesDetailsGifts): Observable<SalesDetailsGifts> {
    return this.http.post<SalesDetailsGifts>(`${this.apiUrl}/gifts`, giftSale);
  }

  // ============ SALES RETURNS ============

  // GET Sales Returns
  getSalesReturns(): Observable<SalesReturnMaster[]> {
    return this.http.get<SalesReturnMaster[]>(`${this.apiUrl}/returns`);
  }

  // GET Return by ID
  getReturnById(refNo: number): Observable<SalesReturnMaster> {
    return this.http.get<SalesReturnMaster>(`${this.apiUrl}/returns/${refNo}`);
  }

  // CREATE Sales Return
  createReturn(returnData: SalesReturnMaster): Observable<SalesReturnMaster> {
    return this.http.post<SalesReturnMaster>(`${this.apiUrl}/returns`, returnData);
  }

  // GET Returns by Original Invoice
  getReturnsByInvoice(invoiceNo: string): Observable<SalesReturnMaster[]> {
    return this.http.get<SalesReturnMaster[]>(`${this.apiUrl}/returns/invoice/${invoiceNo}`);
  }

  // ============ REPORTS ============

  // GET Sales Report by Product
  getSalesReportByProduct(productId: string, startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/report/product/${productId}`, { params });
  }

  // GET Daily Sales Report
  getDailySalesReport(date: Date): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/report/daily/${date.toISOString()}`);
  }

  // GET Monthly Sales Report
  getMonthlySalesReport(year: number, month: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/report/monthly/${year}/${month}`);
  }
}
