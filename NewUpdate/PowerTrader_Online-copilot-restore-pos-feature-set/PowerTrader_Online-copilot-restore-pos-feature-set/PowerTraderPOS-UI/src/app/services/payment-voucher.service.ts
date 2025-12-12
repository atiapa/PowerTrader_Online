import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentVoucher } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentVoucherService {
  private apiUrl = `${environment.apiUrl}/payment-voucher`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<PaymentVoucher[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<PaymentVoucher> {
    return this.http.get<PaymentVoucher>(`${this.apiUrl}/${id}`);
  }

  create(data: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.post<PaymentVoucher>(`${this.apiUrl}`, data);
  }

  update(id: number, data: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.put<PaymentVoucher>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<PaymentVoucher[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/search`, { params });
  }
}
