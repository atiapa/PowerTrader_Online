import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase_Order_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderTblService {
  private apiUrl = `${environment.apiUrl}/purchase-order-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Purchase_Order_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Purchase_Order_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Purchase_Order_tbl> {
    return this.http.get<Purchase_Order_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Purchase_Order_tbl): Observable<Purchase_Order_tbl> {
    return this.http.post<Purchase_Order_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Purchase_Order_tbl): Observable<Purchase_Order_tbl> {
    return this.http.put<Purchase_Order_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Purchase_Order_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Purchase_Order_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
