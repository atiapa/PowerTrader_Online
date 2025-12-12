import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bank_Accounts } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {
  private apiUrl = `${environment.apiUrl}/Bank-Accounts`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Bank_Accounts[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Bank_Accounts[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Bank_Accounts> {
    return this.http.get<Bank_Accounts>(`${this.apiUrl}/${id}`);
  }

  create(data: Bank_Accounts): Observable<Bank_Accounts> {
    return this.http.post<Bank_Accounts>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Bank_Accounts): Observable<Bank_Accounts> {
    return this.http.put<Bank_Accounts>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Bank_Accounts[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Bank_Accounts[]>(`${this.apiUrl}/search`, { params });
  }
}
