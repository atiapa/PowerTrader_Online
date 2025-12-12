import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branches } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BranchesService {
  private apiUrl = `${environment.apiUrl}/Branches`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Branches[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Branches[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Branches> {
    return this.http.get<Branches>(`${this.apiUrl}/${id}`);
  }

  create(data: Branches): Observable<Branches> {
    return this.http.post<Branches>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Branches): Observable<Branches> {
    return this.http.put<Branches>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Branches[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Branches[]>(`${this.apiUrl}/search`, { params });
  }
}
