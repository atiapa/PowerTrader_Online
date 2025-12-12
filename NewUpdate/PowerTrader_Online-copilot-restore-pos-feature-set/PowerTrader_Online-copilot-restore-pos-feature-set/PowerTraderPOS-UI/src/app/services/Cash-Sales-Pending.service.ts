import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cash_Sales_Pending } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashSalesPendingService {
  private apiUrl = `${environment.apiUrl}/Cash-Sales-Pending`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Cash_Sales_Pending[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Cash_Sales_Pending[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Cash_Sales_Pending> {
    return this.http.get<Cash_Sales_Pending>(`${this.apiUrl}/${id}`);
  }

  create(data: Cash_Sales_Pending): Observable<Cash_Sales_Pending> {
    return this.http.post<Cash_Sales_Pending>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Cash_Sales_Pending): Observable<Cash_Sales_Pending> {
    return this.http.put<Cash_Sales_Pending>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Cash_Sales_Pending[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Cash_Sales_Pending[]>(`${this.apiUrl}/search`, { params });
  }
}
