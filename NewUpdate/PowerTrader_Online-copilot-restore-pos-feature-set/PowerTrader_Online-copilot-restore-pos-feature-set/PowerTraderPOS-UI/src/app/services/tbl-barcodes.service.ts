import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tbl_barcodes } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TblBarcodesService {
  private apiUrl = `${environment.apiUrl}/tbl-barcodes`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<tbl_barcodes[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<tbl_barcodes[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<tbl_barcodes> {
    return this.http.get<tbl_barcodes>(`${this.apiUrl}/${id}`);
  }

  create(data: tbl_barcodes): Observable<tbl_barcodes> {
    return this.http.post<tbl_barcodes>(`${this.apiUrl}`, data);
  }

  update(id: number, data: tbl_barcodes): Observable<tbl_barcodes> {
    return this.http.put<tbl_barcodes>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<tbl_barcodes[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<tbl_barcodes[]>(`${this.apiUrl}/search`, { params });
  }
}
