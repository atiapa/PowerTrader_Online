import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock_Master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockMasterService {
  private apiUrl = `${environment.apiUrl}/stock-master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Stock_Master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Stock_Master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Stock_Master> {
    return this.http.get<Stock_Master>(`${this.apiUrl}/${id}`);
  }

  create(data: Stock_Master): Observable<Stock_Master> {
    return this.http.post<Stock_Master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Stock_Master): Observable<Stock_Master> {
    return this.http.put<Stock_Master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Stock_Master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Stock_Master[]>(`${this.apiUrl}/search`, { params });
  }
}
