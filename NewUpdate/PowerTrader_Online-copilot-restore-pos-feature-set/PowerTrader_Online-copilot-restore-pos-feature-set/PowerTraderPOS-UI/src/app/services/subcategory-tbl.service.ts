import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SubCategory } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryTblService {
  private apiUrl = `${environment.apiUrl}/subcategory-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<SubCategory[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<SubCategory[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.apiUrl}/${id}`);
  }

  create(data: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(`${this.apiUrl}`, data);
  }

  update(id: number, data: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<SubCategory[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<SubCategory[]>(`${this.apiUrl}/search`, { params });
  }
}
