import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrderReversed, CreateOrderReversedDto, UpdateOrderReversedDto } from '../models/models';

/**
 * Service for managing reversed orders
 * Handles CRUD operations and queries for Order_Reversed_tbl
 */
@Injectable({
  providedIn: 'root'
})
export class OrderReversedService {
  private apiUrl = `${environment.apiUrl}/api/OrderReversed`;

  constructor(private http: HttpClient) { }

  /**
   * Get all reversed orders with optional date range filter
   */
  getAll(fromDate?: Date, toDate?: Date): Observable<OrderReversed[]> {
    let params = new HttpParams();
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }
    return this.http.get<OrderReversed[]>(this.apiUrl, { params });
  }

  /**
   * Get reversed order by reference number
   */
  getByRefNo(refno: number): Observable<OrderReversed> {
    return this.http.get<OrderReversed>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Get reversed orders by invoice number
   */
  getByInvoiceNumber(invoicenr: string): Observable<OrderReversed[]> {
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/invoice/${invoicenr}`);
  }

  /**
   * Get reversed orders by product ID
   */
  getByProductId(productId: string): Observable<OrderReversed[]> {
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/product/${productId}`);
  }

  /**
   * Get reversed orders by attendant
   */
  getByAttendant(attendant: string): Observable<OrderReversed[]> {
    const params = new HttpParams().set('attendant', attendant);
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/by-attendant`, { params });
  }

  /**
   * Get reversed orders by supervisor
   */
  getBySupervisor(supervisor: string): Observable<OrderReversed[]> {
    const params = new HttpParams().set('supervisor', supervisor);
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/by-supervisor`, { params });
  }

  /**
   * Create new reversed order record
   */
  create(orderReversed: CreateOrderReversedDto): Observable<OrderReversed> {
    return this.http.post<OrderReversed>(this.apiUrl, orderReversed);
  }

  /**
   * Update existing reversed order
   */
  update(refno: number, orderReversed: UpdateOrderReversedDto): Observable<OrderReversed> {
    return this.http.put<OrderReversed>(`${this.apiUrl}/${refno}`, orderReversed);
  }

  /**
   * Delete reversed order
   */
  delete(refno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Search reversed orders
   */
  search(searchTerm: string): Observable<OrderReversed[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get reversed orders by session date
   */
  getBySession(sessionDate: Date): Observable<OrderReversed[]> {
    const params = new HttpParams().set('sessionDate', sessionDate.toISOString());
    return this.http.get<OrderReversed[]>(`${this.apiUrl}/by-session`, { params });
  }

  /**
   * Generate reversed orders report for date range
   */
  getReport(fromDate: Date, toDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('from', fromDate.toISOString())
      .set('to', toDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }
}
