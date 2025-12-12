import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation_Information } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganisationInformationService {
  private apiUrl = `${environment.apiUrl}/organisation-information`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Organisation_Information[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Organisation_Information[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Organisation_Information> {
    return this.http.get<Organisation_Information>(`${this.apiUrl}/${id}`);
  }

  create(data: Organisation_Information): Observable<Organisation_Information> {
    return this.http.post<Organisation_Information>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Organisation_Information): Observable<Organisation_Information> {
    return this.http.put<Organisation_Information>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Organisation_Information[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Organisation_Information[]>(`${this.apiUrl}/search`, { params });
  }
}
