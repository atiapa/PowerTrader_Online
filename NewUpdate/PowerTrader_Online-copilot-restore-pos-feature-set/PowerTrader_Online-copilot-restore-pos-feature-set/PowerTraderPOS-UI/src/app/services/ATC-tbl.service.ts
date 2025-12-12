import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ATC_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtcTblService {
  private apiUrl = `${environment.apiUrl}/ATC-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<ATC_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<ATC_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<ATC_tbl> {
    return this.http.get<ATC_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: ATC_tbl): Observable<ATC_tbl> {
    return this.http.post<ATC_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: ATC_tbl): Observable<ATC_tbl> {
    return this.http.put<ATC_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<ATC_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<ATC_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
