import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transport_Expenses } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportExpensesService {
  private apiUrl = `${environment.apiUrl}/transport-expenses`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Transport_Expenses[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Transport_Expenses[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Transport_Expenses> {
    return this.http.get<Transport_Expenses>(`${this.apiUrl}/${id}`);
  }

  create(data: Transport_Expenses): Observable<Transport_Expenses> {
    return this.http.post<Transport_Expenses>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Transport_Expenses): Observable<Transport_Expenses> {
    return this.http.put<Transport_Expenses>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Transport_Expenses[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Transport_Expenses[]>(`${this.apiUrl}/search`, { params });
  }
}
