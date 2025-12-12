import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Staff_Information } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffInformationService {
  private apiUrl = `${environment.apiUrl}/staff-information`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Staff_Information[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Staff_Information[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Staff_Information> {
    return this.http.get<Staff_Information>(`${this.apiUrl}/${id}`);
  }

  create(data: Staff_Information): Observable<Staff_Information> {
    return this.http.post<Staff_Information>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Staff_Information): Observable<Staff_Information> {
    return this.http.put<Staff_Information>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Staff_Information[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Staff_Information[]>(`${this.apiUrl}/search`, { params });
  }
}
