import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order_Reversed_tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderReversedTblService {
  private apiUrl = `${environment.apiUrl}/order-reversed-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Order_Reversed_tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Order_Reversed_tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Order_Reversed_tbl> {
    return this.http.get<Order_Reversed_tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Order_Reversed_tbl): Observable<Order_Reversed_tbl> {
    return this.http.post<Order_Reversed_tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Order_Reversed_tbl): Observable<Order_Reversed_tbl> {
    return this.http.put<Order_Reversed_tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Order_Reversed_tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Order_Reversed_tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
