import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Health_Insurance_schemes } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HealthInsuranceSchemesService {
  private apiUrl = `${environment.apiUrl}/Health-Insurance-schemes`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Health_Insurance_schemes[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Health_Insurance_schemes[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Health_Insurance_schemes> {
    return this.http.get<Health_Insurance_schemes>(`${this.apiUrl}/${id}`);
  }

  create(data: Health_Insurance_schemes): Observable<Health_Insurance_schemes> {
    return this.http.post<Health_Insurance_schemes>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Health_Insurance_schemes): Observable<Health_Insurance_schemes> {
    return this.http.put<Health_Insurance_schemes>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Health_Insurance_schemes[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Health_Insurance_schemes[]>(`${this.apiUrl}/search`, { params });
  }
}
