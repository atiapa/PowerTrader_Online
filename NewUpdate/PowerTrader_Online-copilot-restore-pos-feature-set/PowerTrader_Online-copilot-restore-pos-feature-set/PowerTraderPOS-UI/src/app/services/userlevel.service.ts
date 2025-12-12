import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { uSERLEVEL } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserlevelService {
  private apiUrl = `${environment.apiUrl}/userlevel`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<uSERLEVEL[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<uSERLEVEL[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<uSERLEVEL> {
    return this.http.get<uSERLEVEL>(`${this.apiUrl}/${id}`);
  }

  create(data: uSERLEVEL): Observable<uSERLEVEL> {
    return this.http.post<uSERLEVEL>(`${this.apiUrl}`, data);
  }

  update(id: number, data: uSERLEVEL): Observable<uSERLEVEL> {
    return this.http.put<uSERLEVEL>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<uSERLEVEL[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<uSERLEVEL[]>(`${this.apiUrl}/search`, { params });
  }
}
