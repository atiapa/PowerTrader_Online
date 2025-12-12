import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentVoucher } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class PaymentVoucherService {
  private apiUrl = 'http://localhost:5000/api/PaymentVoucher';

  constructor(private http: HttpClient) { }

  // GET ALL Payment Vouchers
  getAll(): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(this.apiUrl);
  }

  // GET Payment Voucher by ID
  getById(refNo: number): Observable<PaymentVoucher> {
    return this.http.get<PaymentVoucher>(`${this.apiUrl}/${refNo}`);
  }

  // GET Payment Vouchers by Voucher Number
  getByVoucherNumber(voucherNo: string): Observable<PaymentVoucher> {
    return this.http.get<PaymentVoucher>(`${this.apiUrl}/voucher/${voucherNo}`);
  }

  // GET Payment Vouchers by Payee
  getByPayee(payeeName: string): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/payee/${payeeName}`);
  }

  // GET Payment Vouchers by Date Range
  getByDateRange(startDate: Date, endDate: Date): Observable<PaymentVoucher[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/daterange`, { params });
  }

  // GET Payment Vouchers by Branch
  getByBranchCode(branchCode: string): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Payment Vouchers by Organisation
  getByOrganisation(organisationCode: string): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // GET Payment Vouchers by Payment Mode
  getByPaymentMode(paymentMode: string): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/paymentmode/${paymentMode}`);
  }

  // CREATE Payment Voucher
  create(voucher: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.post<PaymentVoucher>(this.apiUrl, voucher);
  }

  // UPDATE Payment Voucher
  update(refNo: number, voucher: PaymentVoucher): Observable<PaymentVoucher> {
    return this.http.put<PaymentVoucher>(`${this.apiUrl}/${refNo}`, voucher);
  }

  // DELETE Payment Voucher
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Today's Payments
  getTodayPayments(): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/today`);
  }

  // GET Payment Summary
  getPaymentSummary(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/summary`, { params });
  }

  // GET Pending Approvals
  getPendingApprovals(): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/pending-approvals`);
  }

  // APPROVE Payment Voucher
  approve(refNo: number, approverName: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/approve`, { approverName });
  }

  // REJECT Payment Voucher
  reject(refNo: number, reason: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/reject`, { reason });
  }

  // GET Payments by Account
  getByAccount(accountCode: string): Observable<PaymentVoucher[]> {
    return this.http.get<PaymentVoucher[]>(`${this.apiUrl}/account/${accountCode}`);
  }

  // GET Payment Report
  getPaymentReport(startDate: Date, endDate: Date, groupBy: 'payee' | 'mode' | 'account'): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString())
      .set('groupBy', groupBy);
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }
}
