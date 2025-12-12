import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SuppliersService {
  private apiUrl = `${environment.apiUrl}/suppliers`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Suppliers[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Suppliers[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/${id}`);
  }

  create(data: Suppliers): Observable<Suppliers> {
    return this.http.post<Suppliers>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Suppliers): Observable<Suppliers> {
    return this.http.put<Suppliers>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Suppliers[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Suppliers[]>(`${this.apiUrl}/search`, { params });
  }
}
