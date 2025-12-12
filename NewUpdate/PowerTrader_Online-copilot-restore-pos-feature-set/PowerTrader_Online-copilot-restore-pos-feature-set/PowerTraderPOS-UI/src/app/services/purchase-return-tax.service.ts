import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Purchase_Return_Tax } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PurchaseReturnTaxService {
  private apiUrl = `${environment.apiUrl}/purchase-return-tax`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Purchase_Return_Tax[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Purchase_Return_Tax[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Purchase_Return_Tax> {
    return this.http.get<Purchase_Return_Tax>(`${this.apiUrl}/${id}`);
  }

  create(data: Purchase_Return_Tax): Observable<Purchase_Return_Tax> {
    return this.http.post<Purchase_Return_Tax>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Purchase_Return_Tax): Observable<Purchase_Return_Tax> {
    return this.http.put<Purchase_Return_Tax>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Purchase_Return_Tax[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Purchase_Return_Tax[]>(`${this.apiUrl}/search`, { params });
  }
}
