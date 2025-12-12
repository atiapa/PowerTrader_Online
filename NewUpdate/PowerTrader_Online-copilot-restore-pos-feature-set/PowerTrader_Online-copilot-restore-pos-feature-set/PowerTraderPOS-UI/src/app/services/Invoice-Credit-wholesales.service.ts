import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice_Credit_wholesales } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceCreditWholesalesService {
  private apiUrl = `${environment.apiUrl}/Invoice-Credit-wholesales`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Invoice_Credit_wholesales[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Invoice_Credit_wholesales[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Invoice_Credit_wholesales> {
    return this.http.get<Invoice_Credit_wholesales>(`${this.apiUrl}/${id}`);
  }

  create(data: Invoice_Credit_wholesales): Observable<Invoice_Credit_wholesales> {
    return this.http.post<Invoice_Credit_wholesales>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Invoice_Credit_wholesales): Observable<Invoice_Credit_wholesales> {
    return this.http.put<Invoice_Credit_wholesales>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Invoice_Credit_wholesales[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Invoice_Credit_wholesales[]>(`${this.apiUrl}/search`, { params });
  }
}
