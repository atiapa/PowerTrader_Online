import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuditT } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AudittService {
  private apiUrl = `${environment.apiUrl}/AuditT`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<AuditT[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<AuditT[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<AuditT> {
    return this.http.get<AuditT>(`${this.apiUrl}/${id}`);
  }

  create(data: AuditT): Observable<AuditT> {
    return this.http.post<AuditT>(`${this.apiUrl}`, data);
  }

  update(id: number, data: AuditT): Observable<AuditT> {
    return this.http.put<AuditT>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<AuditT[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<AuditT[]>(`${this.apiUrl}/search`, { params });
  }
}
