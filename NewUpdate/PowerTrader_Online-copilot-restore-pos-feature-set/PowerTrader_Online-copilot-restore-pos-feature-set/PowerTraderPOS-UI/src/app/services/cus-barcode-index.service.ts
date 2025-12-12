import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { cus_barcode_index } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CusBarcodeIndexService {
  private apiUrl = `${environment.apiUrl}/cus-barcode-index`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<cus_barcode_index[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<cus_barcode_index[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<cus_barcode_index> {
    return this.http.get<cus_barcode_index>(`${this.apiUrl}/${id}`);
  }

  create(data: cus_barcode_index): Observable<cus_barcode_index> {
    return this.http.post<cus_barcode_index>(`${this.apiUrl}`, data);
  }

  update(id: number, data: cus_barcode_index): Observable<cus_barcode_index> {
    return this.http.put<cus_barcode_index>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<cus_barcode_index[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<cus_barcode_index[]>(`${this.apiUrl}/search`, { params });
  }
}
