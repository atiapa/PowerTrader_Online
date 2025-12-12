import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Warehouse_Tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WarehouseTblService {
  private apiUrl = `${environment.apiUrl}/warehouse-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Warehouse_Tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Warehouse_Tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Warehouse_Tbl> {
    return this.http.get<Warehouse_Tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Warehouse_Tbl): Observable<Warehouse_Tbl> {
    return this.http.post<Warehouse_Tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Warehouse_Tbl): Observable<Warehouse_Tbl> {
    return this.http.put<Warehouse_Tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Warehouse_Tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Warehouse_Tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
