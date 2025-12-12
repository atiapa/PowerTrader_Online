import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Region_State } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegionStateService {
  private apiUrl = `${environment.apiUrl}/region-state`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Region_State[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Region_State[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Region_State> {
    return this.http.get<Region_State>(`${this.apiUrl}/${id}`);
  }

  create(data: Region_State): Observable<Region_State> {
    return this.http.post<Region_State>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Region_State): Observable<Region_State> {
    return this.http.put<Region_State>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Region_State[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Region_State[]>(`${this.apiUrl}/search`, { params });
  }
}
