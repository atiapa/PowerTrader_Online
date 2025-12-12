import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { sysuserstartup } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SysuserstartupService {
  private apiUrl = `${environment.apiUrl}/sysuserstartup`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<sysuserstartup[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<sysuserstartup[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<sysuserstartup> {
    return this.http.get<sysuserstartup>(`${this.apiUrl}/${id}`);
  }

  create(data: sysuserstartup): Observable<sysuserstartup> {
    return this.http.post<sysuserstartup>(`${this.apiUrl}`, data);
  }

  update(id: number, data: sysuserstartup): Observable<sysuserstartup> {
    return this.http.put<sysuserstartup>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<sysuserstartup[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<sysuserstartup[]>(`${this.apiUrl}/search`, { params });
  }
}
