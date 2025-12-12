import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OnDuty } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OndutyService {
  private apiUrl = `${environment.apiUrl}/OnDuty`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<OnDuty[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<OnDuty[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<OnDuty> {
    return this.http.get<OnDuty>(`${this.apiUrl}/${id}`);
  }

  create(data: OnDuty): Observable<OnDuty> {
    return this.http.post<OnDuty>(`${this.apiUrl}`, data);
  }

  update(id: number, data: OnDuty): Observable<OnDuty> {
    return this.http.put<OnDuty>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<OnDuty[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<OnDuty[]>(`${this.apiUrl}/search`, { params });
  }
}
