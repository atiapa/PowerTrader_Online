import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bill_Sundry_Master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillSundryMasterService {
  private apiUrl = `${environment.apiUrl}/Bill-Sundry-Master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Bill_Sundry_Master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Bill_Sundry_Master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Bill_Sundry_Master> {
    return this.http.get<Bill_Sundry_Master>(`${this.apiUrl}/${id}`);
  }

  create(data: Bill_Sundry_Master): Observable<Bill_Sundry_Master> {
    return this.http.post<Bill_Sundry_Master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Bill_Sundry_Master): Observable<Bill_Sundry_Master> {
    return this.http.put<Bill_Sundry_Master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Bill_Sundry_Master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Bill_Sundry_Master[]>(`${this.apiUrl}/search`, { params });
  }
}
