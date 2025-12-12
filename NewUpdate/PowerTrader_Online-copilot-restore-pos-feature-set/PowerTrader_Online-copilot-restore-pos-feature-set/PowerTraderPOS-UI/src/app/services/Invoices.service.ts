import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoices } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  private apiUrl = `${environment.apiUrl}/Invoices`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Invoices[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Invoices[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Invoices> {
    return this.http.get<Invoices>(`${this.apiUrl}/${id}`);
  }

  create(data: Invoices): Observable<Invoices> {
    return this.http.post<Invoices>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Invoices): Observable<Invoices> {
    return this.http.put<Invoices>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Invoices[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Invoices[]>(`${this.apiUrl}/search`, { params });
  }
}
