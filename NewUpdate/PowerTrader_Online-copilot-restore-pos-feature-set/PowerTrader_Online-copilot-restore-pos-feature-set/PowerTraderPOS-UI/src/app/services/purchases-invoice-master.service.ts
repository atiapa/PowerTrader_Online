import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchases_Invoice_master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchasesInvoiceMasterService {
  private apiUrl = `${environment.apiUrl}/purchases-invoice-master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Purchases_Invoice_master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Purchases_Invoice_master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Purchases_Invoice_master> {
    return this.http.get<Purchases_Invoice_master>(`${this.apiUrl}/${id}`);
  }

  create(data: Purchases_Invoice_master): Observable<Purchases_Invoice_master> {
    return this.http.post<Purchases_Invoice_master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Purchases_Invoice_master): Observable<Purchases_Invoice_master> {
    return this.http.put<Purchases_Invoice_master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Purchases_Invoice_master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Purchases_Invoice_master[]>(`${this.apiUrl}/search`, { params });
  }
}
