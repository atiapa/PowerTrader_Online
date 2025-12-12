import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { expenses_table } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesTableService {
  private apiUrl = `${environment.apiUrl}/expenses-table`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<expenses_table[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<expenses_table[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<expenses_table> {
    return this.http.get<expenses_table>(`${this.apiUrl}/${id}`);
  }

  create(data: expenses_table): Observable<expenses_table> {
    return this.http.post<expenses_table>(`${this.apiUrl}`, data);
  }

  update(id: number, data: expenses_table): Observable<expenses_table> {
    return this.http.put<expenses_table>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<expenses_table[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<expenses_table[]>(`${this.apiUrl}/search`, { params });
  }
}
