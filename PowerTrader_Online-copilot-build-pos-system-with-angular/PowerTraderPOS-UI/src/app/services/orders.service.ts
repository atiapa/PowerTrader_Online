import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrdersTbl, CreateOrdersDto, UpdateOrdersDto } from '../models/models';

/**
 * Service for managing orders
 * Handles CRUD operations and queries for Orders_Tbl
 */
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private apiUrl = `${environment.apiUrl}/api/Orders`;

  constructor(private http: HttpClient) { }

  /**
   * Get all orders with optional filters
   */
  getAll(status?: string, fromDate?: Date, toDate?: Date): Observable<OrdersTbl[]> {
    let params = new HttpParams();
    if (status) {
      params = params.set('status', status);
    }
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }
    return this.http.get<OrdersTbl[]>(this.apiUrl, { params });
  }

  /**
   * Get order by reference number
   */
  getByRefNo(refNo: number): Observable<OrdersTbl> {
    return this.http.get<OrdersTbl>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Get orders by invoice number
   */
  getByInvoiceNumber(invoiceNr: string): Observable<OrdersTbl[]> {
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/invoice/${invoiceNr}`);
  }

  /**
   * Get orders by customer ID
   */
  getByCustomerId(customerId: string): Observable<OrdersTbl[]> {
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/customer/${customerId}`);
  }

  /**
   * Get orders by product ID
   */
  getByProductId(productId: string): Observable<OrdersTbl[]> {
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/product/${productId}`);
  }

  /**
   * Get orders by supplier ID
   */
  getBySupplierId(supplierId: string): Observable<OrdersTbl[]> {
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/supplier/${supplierId}`);
  }

  /**
   * Get orders by status
   */
  getByStatus(status: string): Observable<OrdersTbl[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/by-status`, { params });
  }

  /**
   * Create new order
   */
  create(order: CreateOrdersDto): Observable<OrdersTbl> {
    return this.http.post<OrdersTbl>(this.apiUrl, order);
  }

  /**
   * Update existing order
   */
  update(refNo: number, order: UpdateOrdersDto): Observable<OrdersTbl> {
    return this.http.put<OrdersTbl>(`${this.apiUrl}/${refNo}`, order);
  }

  /**
   * Delete order
   */
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Search orders
   */
  search(searchTerm: string): Observable<OrdersTbl[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Update order status
   */
  updateStatus(refNo: number, status: string, remarks?: string): Observable<OrdersTbl> {
    const body = { status, remarks };
    return this.http.put<OrdersTbl>(`${this.apiUrl}/${refNo}/status`, body);
  }

  /**
   * Get pending orders
   */
  getPendingOrders(): Observable<OrdersTbl[]> {
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/pending`);
  }

  /**
   * Get completed orders for date range
   */
  getCompletedOrders(fromDate: Date, toDate: Date): Observable<OrdersTbl[]> {
    const params = new HttpParams()
      .set('from', fromDate.toISOString())
      .set('to', toDate.toISOString());
    return this.http.get<OrdersTbl[]>(`${this.apiUrl}/completed`, { params });
  }

  /**
   * Generate orders report
   */
  getReport(fromDate: Date, toDate: Date, status?: string): Observable<any> {
    let params = new HttpParams()
      .set('from', fromDate.toISOString())
      .set('to', toDate.toISOString());
    if (status) {
      params = params.set('status', status);
    }
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }
}
