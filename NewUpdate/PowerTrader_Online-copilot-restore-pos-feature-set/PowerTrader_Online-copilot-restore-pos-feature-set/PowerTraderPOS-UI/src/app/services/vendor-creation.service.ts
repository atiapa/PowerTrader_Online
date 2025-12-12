import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vendor_Creation } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VendorCreationService {
  private apiUrl = `${environment.apiUrl}/vendor-creation`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Vendor_Creation[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Vendor_Creation[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Vendor_Creation> {
    return this.http.get<Vendor_Creation>(`${this.apiUrl}/${id}`);
  }

  create(data: Vendor_Creation): Observable<Vendor_Creation> {
    return this.http.post<Vendor_Creation>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Vendor_Creation): Observable<Vendor_Creation> {
    return this.http.put<Vendor_Creation>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Vendor_Creation[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Vendor_Creation[]>(`${this.apiUrl}/search`, { params });
  }
}
