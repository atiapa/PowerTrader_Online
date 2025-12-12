import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoices_Temp } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoicesTempService {
  private apiUrl = `${environment.apiUrl}/Invoices-Temp`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Invoices_Temp[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Invoices_Temp[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Invoices_Temp> {
    return this.http.get<Invoices_Temp>(`${this.apiUrl}/${id}`);
  }

  create(data: Invoices_Temp): Observable<Invoices_Temp> {
    return this.http.post<Invoices_Temp>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Invoices_Temp): Observable<Invoices_Temp> {
    return this.http.put<Invoices_Temp>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Invoices_Temp[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Invoices_Temp[]>(`${this.apiUrl}/search`, { params });
  }
}
