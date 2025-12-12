import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { systemuserpro } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SystemuserproService {
  private apiUrl = `${environment.apiUrl}/systemuserpro`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<systemuserpro[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<systemuserpro[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<systemuserpro> {
    return this.http.get<systemuserpro>(`${this.apiUrl}/${id}`);
  }

  create(data: systemuserpro): Observable<systemuserpro> {
    return this.http.post<systemuserpro>(`${this.apiUrl}`, data);
  }

  update(id: number, data: systemuserpro): Observable<systemuserpro> {
    return this.http.put<systemuserpro>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<systemuserpro[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<systemuserpro[]>(`${this.apiUrl}/search`, { params });
  }
}
