import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gift_Card_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GiftCardTblService {
  private apiUrl = `${environment.apiUrl}/Gift-Card-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Gift_Card_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Gift_Card_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Gift_Card_tbl> {
    return this.http.get<Gift_Card_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Gift_Card_tbl): Observable<Gift_Card_tbl> {
    return this.http.post<Gift_Card_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Gift_Card_tbl): Observable<Gift_Card_tbl> {
    return this.http.put<Gift_Card_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Gift_Card_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Gift_Card_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
