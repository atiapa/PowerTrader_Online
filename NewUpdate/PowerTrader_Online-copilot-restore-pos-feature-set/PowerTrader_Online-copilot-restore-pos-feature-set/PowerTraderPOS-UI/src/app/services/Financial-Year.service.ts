import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Financial_Year } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FinancialYearService {
  private apiUrl = `${environment.apiUrl}/Financial-Year`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Financial_Year[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Financial_Year[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Financial_Year> {
    return this.http.get<Financial_Year>(`${this.apiUrl}/${id}`);
  }

  create(data: Financial_Year): Observable<Financial_Year> {
    return this.http.post<Financial_Year>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Financial_Year): Observable<Financial_Year> {
    return this.http.put<Financial_Year>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Financial_Year[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Financial_Year[]>(`${this.apiUrl}/search`, { params });
  }
}
