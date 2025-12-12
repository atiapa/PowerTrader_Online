import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ReceiptVoucher } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class ReceiptVoucherService {
  private apiUrl = 'http://localhost:5000/api/ReceiptVoucher';

  constructor(private http: HttpClient) { }

  // GET ALL Receipt Vouchers
  getAll(): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(this.apiUrl);
  }

  // GET Receipt Voucher by ID
  getById(refNo: number): Observable<ReceiptVoucher> {
    return this.http.get<ReceiptVoucher>(`${this.apiUrl}/${refNo}`);
  }

  // GET Receipt Vouchers by Voucher Number
  getByVoucherNumber(voucherNo: string): Observable<ReceiptVoucher> {
    return this.http.get<ReceiptVoucher>(`${this.apiUrl}/voucher/${voucherNo}`);
  }

  // GET Receipt Vouchers by Received From
  getByReceivedFrom(name: string): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/receivedfrom/${name}`);
  }

  // GET Receipt Vouchers by Date Range
  getByDateRange(startDate: Date, endDate: Date): Observable<ReceiptVoucher[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/daterange`, { params });
  }

  // GET Receipt Vouchers by Branch
  getByBranchCode(branchCode: string): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Receipt Vouchers by Organisation
  getByOrganisation(organisationCode: string): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // GET Receipt Vouchers by Receipt Mode
  getByReceiptMode(receiptMode: string): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/receiptmode/${receiptMode}`);
  }

  // CREATE Receipt Voucher
  create(voucher: ReceiptVoucher): Observable<ReceiptVoucher> {
    return this.http.post<ReceiptVoucher>(this.apiUrl, voucher);
  }

  // UPDATE Receipt Voucher
  update(refNo: number, voucher: ReceiptVoucher): Observable<ReceiptVoucher> {
    return this.http.put<ReceiptVoucher>(`${this.apiUrl}/${refNo}`, voucher);
  }

  // DELETE Receipt Voucher
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Today's Receipts
  getTodayReceipts(): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/today`);
  }

  // GET Receipt Summary
  getReceiptSummary(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/summary`, { params });
  }

  // GET Pending Approvals
  getPendingApprovals(): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/pending-approvals`);
  }

  // APPROVE Receipt Voucher
  approve(refNo: number, approverName: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/approve`, { approverName });
  }

  // REJECT Receipt Voucher
  reject(refNo: number, reason: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/reject`, { reason });
  }

  // GET Receipts by Account
  getByAccount(accountCode: string): Observable<ReceiptVoucher[]> {
    return this.http.get<ReceiptVoucher[]>(`${this.apiUrl}/account/${accountCode}`);
  }

  // GET Receipt Report
  getReceiptReport(startDate: Date, endDate: Date, groupBy: 'customer' | 'mode' | 'account'): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString())
      .set('groupBy', groupBy);
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }

  // GET Cash Book Report
  getCashBookReport(startDate: Date, endDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/cashbook`, { params });
  }
}
