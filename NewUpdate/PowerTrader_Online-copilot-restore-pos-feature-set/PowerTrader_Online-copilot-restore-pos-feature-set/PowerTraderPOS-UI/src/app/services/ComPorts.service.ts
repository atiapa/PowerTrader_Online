import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComPorts } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ComportsService {
  private apiUrl = `${environment.apiUrl}/ComPorts`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<ComPorts[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<ComPorts[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<ComPorts> {
    return this.http.get<ComPorts>(`${this.apiUrl}/${id}`);
  }

  create(data: ComPorts): Observable<ComPorts> {
    return this.http.post<ComPorts>(`${this.apiUrl}`, data);
  }

  update(id: number, data: ComPorts): Observable<ComPorts> {
    return this.http.put<ComPorts>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<ComPorts[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<ComPorts[]>(`${this.apiUrl}/search`, { params });
  }
}
