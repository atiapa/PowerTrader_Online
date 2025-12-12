import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account_Group_Master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AccountGroupMasterService {
  private apiUrl = `${environment.apiUrl}/Account-Group-Master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Account_Group_Master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Account_Group_Master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Account_Group_Master> {
    return this.http.get<Account_Group_Master>(`${this.apiUrl}/${id}`);
  }

  create(data: Account_Group_Master): Observable<Account_Group_Master> {
    return this.http.post<Account_Group_Master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Account_Group_Master): Observable<Account_Group_Master> {
    return this.http.put<Account_Group_Master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Account_Group_Master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Account_Group_Master[]>(`${this.apiUrl}/search`, { params });
  }
}
