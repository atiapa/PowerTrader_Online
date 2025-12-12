import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Insurance_Sales_Pending } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InsuranceSalesPendingService {
  private apiUrl = `${environment.apiUrl}/Insurance-Sales-Pending`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Insurance_Sales_Pending[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Insurance_Sales_Pending[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Insurance_Sales_Pending> {
    return this.http.get<Insurance_Sales_Pending>(`${this.apiUrl}/${id}`);
  }

  create(data: Insurance_Sales_Pending): Observable<Insurance_Sales_Pending> {
    return this.http.post<Insurance_Sales_Pending>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Insurance_Sales_Pending): Observable<Insurance_Sales_Pending> {
    return this.http.put<Insurance_Sales_Pending>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Insurance_Sales_Pending[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Insurance_Sales_Pending[]>(`${this.apiUrl}/search`, { params });
  }
}
