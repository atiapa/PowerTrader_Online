import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depat } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DepatService {
  private apiUrl = `${environment.apiUrl}/Depat`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Depat[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Depat[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Depat> {
    return this.http.get<Depat>(`${this.apiUrl}/${id}`);
  }

  create(data: Depat): Observable<Depat> {
    return this.http.post<Depat>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Depat): Observable<Depat> {
    return this.http.put<Depat>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Depat[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Depat[]>(`${this.apiUrl}/search`, { params });
  }
}
