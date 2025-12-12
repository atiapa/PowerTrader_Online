import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiptPrintingSetup } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptPrintingSetupService {
  private apiUrl = `${environment.apiUrl}/receipt-printing-setup`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<ReceiptPrintingSetup[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<ReceiptPrintingSetup[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<ReceiptPrintingSetup> {
    return this.http.get<ReceiptPrintingSetup>(`${this.apiUrl}/${id}`);
  }

  create(data: ReceiptPrintingSetup): Observable<ReceiptPrintingSetup> {
    return this.http.post<ReceiptPrintingSetup>(`${this.apiUrl}`, data);
  }

  update(id: number, data: ReceiptPrintingSetup): Observable<ReceiptPrintingSetup> {
    return this.http.put<ReceiptPrintingSetup>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<ReceiptPrintingSetup[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<ReceiptPrintingSetup[]>(`${this.apiUrl}/search`, { params });
  }
}
