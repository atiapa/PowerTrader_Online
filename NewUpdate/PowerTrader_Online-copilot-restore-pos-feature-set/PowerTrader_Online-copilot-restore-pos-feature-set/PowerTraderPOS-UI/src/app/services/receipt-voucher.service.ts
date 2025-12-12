import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiptVoucher } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReceiptVoucherService {
  private apiUrl = `${environment.apiUrl}/receipt-voucher`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<ReceiptVoucher[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<ReceiptVoucher> {
    return this.http.get<ReceiptVoucher>(`${this.apiUrl}/${id}`);
  }

  create(data: ReceiptVoucher): Observable<ReceiptVoucher> {
    return this.http.post<ReceiptVoucher>(`${this.apiUrl}`, data);
  }

  update(id: number, data: ReceiptVoucher): Observable<ReceiptVoucher> {
    return this.http.put<ReceiptVoucher>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<ReceiptVoucher[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/search`, { params });
  }
}
