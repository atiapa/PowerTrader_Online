import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credit_Wholesale } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CreditWholesaleService {
  private apiUrl = `${environment.apiUrl}/Credit-Wholesale`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Credit_Wholesale[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Credit_Wholesale[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Credit_Wholesale> {
    return this.http.get<Credit_Wholesale>(`${this.apiUrl}/${id}`);
  }

  create(data: Credit_Wholesale): Observable<Credit_Wholesale> {
    return this.http.post<Credit_Wholesale>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Credit_Wholesale): Observable<Credit_Wholesale> {
    return this.http.put<Credit_Wholesale>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Credit_Wholesale[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Credit_Wholesale[]>(`${this.apiUrl}/search`, { params });
  }
}
