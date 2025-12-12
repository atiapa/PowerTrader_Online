import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sales_Details } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesDetailsService {
  private apiUrl = `${environment.apiUrl}/sales-details`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Sales_Details[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Sales_Details[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Sales_Details> {
    return this.http.get<Sales_Details>(`${this.apiUrl}/${id}`);
  }

  create(data: Sales_Details): Observable<Sales_Details> {
    return this.http.post<Sales_Details>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Sales_Details): Observable<Sales_Details> {
    return this.http.put<Sales_Details>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Sales_Details[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Sales_Details[]>(`${this.apiUrl}/search`, { params });
  }
}
