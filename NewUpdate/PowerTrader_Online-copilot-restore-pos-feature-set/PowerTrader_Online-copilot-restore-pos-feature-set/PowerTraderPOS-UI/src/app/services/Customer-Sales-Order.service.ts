import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer_Sales_Order } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerSalesOrderService {
  private apiUrl = `${environment.apiUrl}/Customer-Sales-Order`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Customer_Sales_Order[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Customer_Sales_Order[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Customer_Sales_Order> {
    return this.http.get<Customer_Sales_Order>(`${this.apiUrl}/${id}`);
  }

  create(data: Customer_Sales_Order): Observable<Customer_Sales_Order> {
    return this.http.post<Customer_Sales_Order>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Customer_Sales_Order): Observable<Customer_Sales_Order> {
    return this.http.put<Customer_Sales_Order>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Customer_Sales_Order[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Customer_Sales_Order[]>(`${this.apiUrl}/search`, { params });
  }
}
