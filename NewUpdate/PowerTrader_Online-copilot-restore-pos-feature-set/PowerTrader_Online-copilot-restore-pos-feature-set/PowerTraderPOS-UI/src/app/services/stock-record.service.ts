import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock_Record } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockRecordService {
  private apiUrl = `${environment.apiUrl}/stock-record`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Stock_Record[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Stock_Record[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Stock_Record> {
    return this.http.get<Stock_Record>(`${this.apiUrl}/${id}`);
  }

  create(data: Stock_Record): Observable<Stock_Record> {
    return this.http.post<Stock_Record>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Stock_Record): Observable<Stock_Record> {
    return this.http.put<Stock_Record>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Stock_Record[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Stock_Record[]>(`${this.apiUrl}/search`, { params });
  }
}
