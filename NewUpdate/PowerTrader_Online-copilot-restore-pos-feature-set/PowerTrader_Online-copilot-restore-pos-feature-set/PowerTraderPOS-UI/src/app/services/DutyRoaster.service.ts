import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DutyRoaster } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DutyroasterService {
  private apiUrl = `${environment.apiUrl}/DutyRoaster`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<DutyRoaster[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<DutyRoaster[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<DutyRoaster> {
    return this.http.get<DutyRoaster>(`${this.apiUrl}/${id}`);
  }

  create(data: DutyRoaster): Observable<DutyRoaster> {
    return this.http.post<DutyRoaster>(`${this.apiUrl}`, data);
  }

  update(id: number, data: DutyRoaster): Observable<DutyRoaster> {
    return this.http.put<DutyRoaster>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<DutyRoaster[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<DutyRoaster[]>(`${this.apiUrl}/search`, { params });
  }
}
