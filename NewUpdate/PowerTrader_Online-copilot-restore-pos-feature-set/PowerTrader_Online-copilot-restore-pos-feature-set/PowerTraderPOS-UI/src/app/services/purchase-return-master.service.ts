import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase_Return_master } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnMasterService {
  private apiUrl = `${environment.apiUrl}/purchase-return-master`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Purchase_Return_master[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Purchase_Return_master[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Purchase_Return_master> {
    return this.http.get<Purchase_Return_master>(`${this.apiUrl}/${id}`);
  }

  create(data: Purchase_Return_master): Observable<Purchase_Return_master> {
    return this.http.post<Purchase_Return_master>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Purchase_Return_master): Observable<Purchase_Return_master> {
    return this.http.put<Purchase_Return_master>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Purchase_Return_master[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Purchase_Return_master[]>(`${this.apiUrl}/search`, { params });
  }
}
