import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Accounts_Creation } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountsCreationService {
  private apiUrl = `${environment.apiUrl}/Accounts-Creation`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Accounts_Creation[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Accounts_Creation[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Accounts_Creation> {
    return this.http.get<Accounts_Creation>(`${this.apiUrl}/${id}`);
  }

  create(data: Accounts_Creation): Observable<Accounts_Creation> {
    return this.http.post<Accounts_Creation>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Accounts_Creation): Observable<Accounts_Creation> {
    return this.http.put<Accounts_Creation>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Accounts_Creation[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Accounts_Creation[]>(`${this.apiUrl}/search`, { params });
  }
}
