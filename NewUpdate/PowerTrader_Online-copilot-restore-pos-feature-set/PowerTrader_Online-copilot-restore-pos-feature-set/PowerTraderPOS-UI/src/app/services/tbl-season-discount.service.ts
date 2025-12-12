import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tbl_SeasonDiscount } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TblSeasonDiscountService {
  private apiUrl = `${environment.apiUrl}/tbl-season-discount`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Tbl_SeasonDiscount[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Tbl_SeasonDiscount[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Tbl_SeasonDiscount> {
    return this.http.get<Tbl_SeasonDiscount>(`${this.apiUrl}/${id}`);
  }

  create(data: Tbl_SeasonDiscount): Observable<Tbl_SeasonDiscount> {
    return this.http.post<Tbl_SeasonDiscount>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Tbl_SeasonDiscount): Observable<Tbl_SeasonDiscount> {
    return this.http.put<Tbl_SeasonDiscount>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Tbl_SeasonDiscount[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Tbl_SeasonDiscount[]>(`${this.apiUrl}/search`, { params });
  }
}
