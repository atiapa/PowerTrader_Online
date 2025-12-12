import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Retail_Items } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RetailItemsService {
  private apiUrl = `${environment.apiUrl}/retail-items`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Retail_Items[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Retail_Items[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Retail_Items> {
    return this.http.get<Retail_Items>(`${this.apiUrl}/${id}`);
  }

  create(data: Retail_Items): Observable<Retail_Items> {
    return this.http.post<Retail_Items>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Retail_Items): Observable<Retail_Items> {
    return this.http.put<Retail_Items>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Retail_Items[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Retail_Items[]>(`${this.apiUrl}/search`, { params });
  }
}
