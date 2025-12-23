import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountLedger, CreateAccountLedgerDto, UpdateAccountLedgerDto } from '../models/models';

/**
 * Service for managing account ledger transactions
 */
@Injectable({
  providedIn: 'root'
})
export class AccountLedgerService {
  private apiUrl = `${environment.apiUrl}/AccountLedger`;

  constructor(private http: HttpClient) { }

  /**
   * Get all ledger entries with optional date filters
   */
  getAll(fromDate?: Date, toDate?: Date): Observable<AccountLedger[]> {
    let params = new HttpParams();
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }
    return this.http.get<AccountLedger[]>(this.apiUrl, { params });
  }

  /**
   * Get ledger entry by reference number
   */
  getByRefNo(refno: number): Observable<AccountLedger> {
    return this.http.get<AccountLedger>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Get ledger entries by account number
   */
  getByAccountNumber(accountNr: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('accountNr', accountNr);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-account`, { params });
  }

  /**
   * Get ledger entries by voucher number
   */
  getByVoucherNumber(voucherNr: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('voucherNr', voucherNr);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-voucher`, { params });
  }

  /**
   * Get ledger entries by voucher type
   */
  getByVoucherType(voucherType: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('voucherType', voucherType);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-voucher-type`, { params });
  }

  /**
   * Get ledger entries by department
   */
  getByDepartment(department: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('department', department);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-department`, { params });
  }

  /**
   * Get ledger entries by month and year
   */
  getByMonth(month: string, year: number): Observable<AccountLedger[]> {
    const params = new HttpParams()
      .set('month', month)
      .set('year', year.toString());
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-month`, { params });
  }

  /**
   * Create new ledger entry
   */
  create(ledger: CreateAccountLedgerDto): Observable<AccountLedger> {
    return this.http.post<AccountLedger>(this.apiUrl, ledger);
  }

  /**
   * Update existing ledger entry
   */
  update(refno: number, ledger: UpdateAccountLedgerDto): Observable<AccountLedger> {
    return this.http.put<AccountLedger>(`${this.apiUrl}/${refno}`, ledger);
  }

  /**
   * Delete ledger entry
   */
  delete(refno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Search ledger entries by narration or account name
   */
  search(searchTerm: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get account balance (current or as of date)
   */
  getBalance(accountNr: string, asOfDate?: Date): Observable<number> {
    let params = new HttpParams().set('accountNr', accountNr);
    if (asOfDate) {
      params = params.set('asOfDate', asOfDate.toISOString());
    }
    return this.http.get<number>(`${this.apiUrl}/balance`, { params });
  }

  /**
   * Get trial balance (all accounts with balances)
   */
  getTrialBalance(asOfDate?: Date): Observable<any> {
    let params = new HttpParams();
    if (asOfDate) {
      params = params.set('asOfDate', asOfDate.toISOString());
    }
    return this.http.get<any>(`${this.apiUrl}/trial-balance`, { params });
  }

  /**
   * Get daybook (all transactions for a specific date)
   */
  getDaybook(date: Date): Observable<AccountLedger[]> {
    const params = new HttpParams().set('date', date.toISOString());
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/daybook`, { params });
  }

  /**
   * Get ledger entries by accounting status (Posted/Unposted)
   */
  getByAccountingStatus(status: string): Observable<AccountLedger[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<AccountLedger[]>(`${this.apiUrl}/by-accounting-status`, { params });
  }

  /**
   * Generate report for date range
   */
  getReport(fromDate: Date, toDate: Date, reportType: string): Observable<any> {
    const params = new HttpParams()
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString())
      .set('reportType', reportType);
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }
}
