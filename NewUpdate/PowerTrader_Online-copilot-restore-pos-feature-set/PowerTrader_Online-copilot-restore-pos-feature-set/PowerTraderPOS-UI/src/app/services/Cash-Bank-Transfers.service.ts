import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cash_Bank_Transfers } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CashBankTransfersService {
  private apiUrl = `${environment.apiUrl}/Cash-Bank-Transfers`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Cash_Bank_Transfers[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Cash_Bank_Transfers[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Cash_Bank_Transfers> {
    return this.http.get<Cash_Bank_Transfers>(`${this.apiUrl}/${id}`);
  }

  create(data: Cash_Bank_Transfers): Observable<Cash_Bank_Transfers> {
    return this.http.post<Cash_Bank_Transfers>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Cash_Bank_Transfers): Observable<Cash_Bank_Transfers> {
    return this.http.put<Cash_Bank_Transfers>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Cash_Bank_Transfers[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Cash_Bank_Transfers[]>(`${this.apiUrl}/search`, { params });
  }
}
