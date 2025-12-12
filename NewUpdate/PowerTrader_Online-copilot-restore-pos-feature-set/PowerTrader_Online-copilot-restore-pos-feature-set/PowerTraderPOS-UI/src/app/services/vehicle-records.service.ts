import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle_Records } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleRecordsService {
  private apiUrl = `${environment.apiUrl}/vehicle-records`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Vehicle_Records[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Vehicle_Records[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Vehicle_Records> {
    return this.http.get<Vehicle_Records>(`${this.apiUrl}/${id}`);
  }

  create(data: Vehicle_Records): Observable<Vehicle_Records> {
    return this.http.post<Vehicle_Records>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Vehicle_Records): Observable<Vehicle_Records> {
    return this.http.put<Vehicle_Records>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Vehicle_Records[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Vehicle_Records[]>(`${this.apiUrl}/search`, { params });
  }
}
