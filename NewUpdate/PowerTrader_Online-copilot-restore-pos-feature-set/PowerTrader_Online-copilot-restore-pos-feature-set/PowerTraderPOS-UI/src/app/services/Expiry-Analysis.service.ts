import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expiry_Analysis } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpiryAnalysisService {
  private apiUrl = `${environment.apiUrl}/Expiry-Analysis`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Expiry_Analysis[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Expiry_Analysis[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Expiry_Analysis> {
    return this.http.get<Expiry_Analysis>(`${this.apiUrl}/${id}`);
  }

  create(data: Expiry_Analysis): Observable<Expiry_Analysis> {
    return this.http.post<Expiry_Analysis>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Expiry_Analysis): Observable<Expiry_Analysis> {
    return this.http.put<Expiry_Analysis>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Expiry_Analysis[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Expiry_Analysis[]>(`${this.apiUrl}/search`, { params });
  }
}
