import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cheque_Transaction } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChequeTransactionService {
  private apiUrl = `${environment.apiUrl}/Cheque-Transaction`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Cheque_Transaction[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Cheque_Transaction[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Cheque_Transaction> {
    return this.http.get<Cheque_Transaction>(`${this.apiUrl}/${id}`);
  }

  create(data: Cheque_Transaction): Observable<Cheque_Transaction> {
    return this.http.post<Cheque_Transaction>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Cheque_Transaction): Observable<Cheque_Transaction> {
    return this.http.put<Cheque_Transaction>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Cheque_Transaction[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Cheque_Transaction[]>(`${this.apiUrl}/search`, { params });
  }
}
