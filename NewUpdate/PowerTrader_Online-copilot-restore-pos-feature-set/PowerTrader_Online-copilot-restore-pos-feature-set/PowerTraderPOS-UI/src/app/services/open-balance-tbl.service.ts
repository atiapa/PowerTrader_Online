import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Open_Balance_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OpenBalanceTblService {
  private apiUrl = `${environment.apiUrl}/open-balance-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Open_Balance_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Open_Balance_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Open_Balance_tbl> {
    return this.http.get<Open_Balance_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Open_Balance_tbl): Observable<Open_Balance_tbl> {
    return this.http.post<Open_Balance_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Open_Balance_tbl): Observable<Open_Balance_tbl> {
    return this.http.put<Open_Balance_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Open_Balance_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Open_Balance_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
