import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tbl_MM } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TblMmService {
  private apiUrl = `${environment.apiUrl}/tbl-mm`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<tbl_MM[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<tbl_MM[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<tbl_MM> {
    return this.http.get<tbl_MM>(`${this.apiUrl}/${id}`);
  }

  create(data: tbl_MM): Observable<tbl_MM> {
    return this.http.post<tbl_MM>(`${this.apiUrl}`, data);
  }

  update(id: number, data: tbl_MM): Observable<tbl_MM> {
    return this.http.put<tbl_MM>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<tbl_MM[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<tbl_MM[]>(`${this.apiUrl}/search`, { params });
  }
}
