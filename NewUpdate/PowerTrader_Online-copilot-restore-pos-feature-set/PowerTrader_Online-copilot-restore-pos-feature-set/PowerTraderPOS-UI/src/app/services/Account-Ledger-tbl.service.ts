import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account_Ledger_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountLedgerTblService {
  private apiUrl = `${environment.apiUrl}/Account-Ledger-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Account_Ledger_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Account_Ledger_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Account_Ledger_tbl> {
    return this.http.get<Account_Ledger_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Account_Ledger_tbl): Observable<Account_Ledger_tbl> {
    return this.http.post<Account_Ledger_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Account_Ledger_tbl): Observable<Account_Ledger_tbl> {
    return this.http.put<Account_Ledger_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Account_Ledger_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Account_Ledger_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
