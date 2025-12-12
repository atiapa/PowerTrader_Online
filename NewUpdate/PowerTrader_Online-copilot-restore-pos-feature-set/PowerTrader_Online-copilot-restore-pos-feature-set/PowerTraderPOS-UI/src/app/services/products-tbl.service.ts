import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Products } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsTblService {
  private apiUrl = `${environment.apiUrl}/products-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Products[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Products[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }

  create(data: Products): Observable<Products> {
    return this.http.post<Products>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Products): Observable<Products> {
    return this.http.put<Products>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Products[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Products[]>(`${this.apiUrl}/search`, { params });
  }
}
