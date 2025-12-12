import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sales_Return_master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SalesReturnMasterService {
  private apiUrl = `${environment.apiUrl}/sales-return-master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Sales_Return_master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Sales_Return_master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Sales_Return_master> {
    return this.http.get<Sales_Return_master>(`${this.apiUrl}/${id}`);
  }

  create(data: Sales_Return_master): Observable<Sales_Return_master> {
    return this.http.post<Sales_Return_master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Sales_Return_master): Observable<Sales_Return_master> {
    return this.http.put<Sales_Return_master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Sales_Return_master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Sales_Return_master[]>(`${this.apiUrl}/search`, { params });
  }
}
