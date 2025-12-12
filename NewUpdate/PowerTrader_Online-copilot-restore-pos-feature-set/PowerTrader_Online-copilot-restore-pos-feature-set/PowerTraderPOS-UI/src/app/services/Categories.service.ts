import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/Categories`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Categories[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Categories[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiUrl}/${id}`);
  }

  create(data: Categories): Observable<Categories> {
    return this.http.post<Categories>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Categories[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Categories[]>(`${this.apiUrl}/search`, { params });
  }
}
