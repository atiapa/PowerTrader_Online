import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { 
  SalesDetailsTemp, 
  SalesDetailsGifts, 
  HoldOrder, 
  ReturnItem,
  CreateSalesDetailsTempDto,
  CreateSalesDetailsGiftsDto,
  RetailSaleItem
} from '../models/models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class RetailSalesService {
  private apiUrl = 'http://localhost:5000/api';
  private holdOrders: HoldOrder[] = [];

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

  // Sales Details Temp Methods (scoped to tenant)
  createSalesDetailsTemp(dto: CreateSalesDetailsTempDto): Observable<SalesDetailsTemp> {
    const dtoWithTenant = this.tenantContext.addTenantInfo(dto);
    return this.http.post<SalesDetailsTemp>(`${this.apiUrl}/SalesDetailsTemp`, dtoWithTenant);
  }

  getSalesDetailsTempByInvoice(invoiceNr: string): Observable<SalesDetailsTemp[]> {
    return this.http.get<SalesDetailsTemp[]>(`${this.apiUrl}/SalesDetailsTemp/invoice/${invoiceNr}`, { params: this.getTenantParams() });
  }

  getAllSalesDetailsTemp(): Observable<SalesDetailsTemp[]> {
    return this.http.get<SalesDetailsTemp[]>(`${this.apiUrl}/SalesDetailsTemp`, { params: this.getTenantParams() });
  }

  // Sales Details Gifts Methods (scoped to tenant)
  createSalesDetailsGifts(dto: CreateSalesDetailsGiftsDto): Observable<SalesDetailsGifts> {
    const dtoWithTenant = this.tenantContext.addTenantInfo(dto);
    return this.http.post<SalesDetailsGifts>(`${this.apiUrl}/SalesDetailsGifts`, dtoWithTenant);
  }

  getSalesDetailsGiftsByInvoice(invoiceNr: string): Observable<SalesDetailsGifts[]> {
    return this.http.get<SalesDetailsGifts[]>(`${this.apiUrl}/SalesDetailsGifts/invoice/${invoiceNr}`, { params: this.getTenantParams() });
  }

  getAllSalesDetailsGifts(): Observable<SalesDetailsGifts[]> {
    return this.http.get<SalesDetailsGifts[]>(`${this.apiUrl}/SalesDetailsGifts`, { params: this.getTenantParams() });
  }

  // Hold Order Methods (Local Storage)
  holdOrder(order: HoldOrder): void {
    const existingOrders = this.getHoldOrders();
    existingOrders.push(order);
    localStorage.setItem('holdOrders', JSON.stringify(existingOrders));
    this.holdOrders = existingOrders;
  }

  getHoldOrders(): HoldOrder[] {
    const stored = localStorage.getItem('holdOrders');
    return stored ? JSON.parse(stored) : [];
  }

  retrieveHoldOrder(orderId: string): HoldOrder | undefined {
    const orders = this.getHoldOrders();
    return orders.find(order => order.id === orderId);
  }

  removeHoldOrder(orderId: string): void {
    const orders = this.getHoldOrders().filter(order => order.id !== orderId);
    localStorage.setItem('holdOrders', JSON.stringify(orders));
    this.holdOrders = orders;
  }

  // Return Methods
  processReturn(returnItem: ReturnItem): Observable<any> {
    return this.http.post(`${this.apiUrl}/Returns`, returnItem);
  }

  getReturnsByInvoice(invoiceNr: string): Observable<ReturnItem[]> {
    return this.http.get<ReturnItem[]>(`${this.apiUrl}/Returns/invoice/${invoiceNr}`);
  }

  // Inventory Update Methods
  updateRetailItemsStock(productID: string, quantitySold: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/RetailItems/${productID}/reduce-stock`, { 
      quantity: quantitySold 
    });
  }

  restoreRetailItemsStock(productID: string, quantityReturned: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/RetailItems/${productID}/restore-stock`, { 
      quantity: quantityReturned 
    });
  }

  // Account Ledger Posting Methods
  postSalesToLedger(saleData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AccountLedger/post-sales`, saleData);
  }

  postReturnToLedger(returnData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/AccountLedger/post-return`, returnData);
  }

  // Gift Card Validation
  validateGiftCard(cardNumber: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/GiftCards/validate/${cardNumber}`);
  }

  processGiftCardPayment(cardNumber: string, amount: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/GiftCards/process-payment`, { 
      cardNumber, 
      amount 
    });
  }

  // Generate Invoice Number
  generateInvoiceNumber(): string {
    const date = new Date();
    const timestamp = date.getTime();
    return `RET-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}-${timestamp.toString().slice(-6)}`;
  }

  // Generate Order Number for Hold Orders
  generateOrderNumber(): string {
    const date = new Date();
    const timestamp = date.getTime();
    return `HOLD-${timestamp.toString().slice(-8)}`;
  }
}
