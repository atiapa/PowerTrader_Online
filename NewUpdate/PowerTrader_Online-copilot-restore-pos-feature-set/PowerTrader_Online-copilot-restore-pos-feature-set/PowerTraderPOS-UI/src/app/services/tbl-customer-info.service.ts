import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tbl_Customer_Info } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TblCustomerInfoService {
  private apiUrl = `${environment.apiUrl}/tbl-customer-info`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<tbl_Customer_Info[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<tbl_Customer_Info[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<tbl_Customer_Info> {
    return this.http.get<tbl_Customer_Info>(`${this.apiUrl}/${id}`);
  }

  create(data: tbl_Customer_Info): Observable<tbl_Customer_Info> {
    return this.http.post<tbl_Customer_Info>(`${this.apiUrl}`, data);
  }

  update(id: number, data: tbl_Customer_Info): Observable<tbl_Customer_Info> {
    return this.http.put<tbl_Customer_Info>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<tbl_Customer_Info[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<tbl_Customer_Info[]>(`${this.apiUrl}/search`, { params });
  }
}
