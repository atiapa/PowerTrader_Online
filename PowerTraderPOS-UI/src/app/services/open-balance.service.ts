import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OpenBalance, CreateOpenBalanceDto, UpdateOpenBalanceDto } from '../models/models';

/**
 * Service for managing opening balances
 * Handles CRUD operations and queries for Open_Balance_tbl
 */
@Injectable({
  providedIn: 'root'
})
export class OpenBalanceService {
  private apiUrl = `${environment.apiUrl}/api/OpenBalance`;

  constructor(private http: HttpClient) { }

  /**
   * Get all opening balances with optional date range filter
   */
  getAll(fromDate?: Date, toDate?: Date): Observable<OpenBalance[]> {
    let params = new HttpParams();
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }
    return this.http.get<OpenBalance[]>(this.apiUrl, { params });
  }

  /**
   * Get opening balance by reference number
   */
  getByRefNo(refno: number): Observable<OpenBalance> {
    return this.http.get<OpenBalance>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Get opening balance by account number
   */
  getByAccountNumber(accountNr: string): Observable<OpenBalance[]> {
    return this.http.get<OpenBalance[]>(`${this.apiUrl}/account/${accountNr}`);
  }

  /**
   * Get opening balances by account type
   */
  getByAccountType(accountType: string): Observable<OpenBalance[]> {
    const params = new HttpParams().set('accountType', accountType);
    return this.http.get<OpenBalance[]>(`${this.apiUrl}/by-type`, { params });
  }

  /**
   * Create new opening balance
   */
  create(openBalance: CreateOpenBalanceDto): Observable<OpenBalance> {
    return this.http.post<OpenBalance>(this.apiUrl, openBalance);
  }

  /**
   * Update existing opening balance
   */
  update(refno: number, openBalance: UpdateOpenBalanceDto): Observable<OpenBalance> {
    return this.http.put<OpenBalance>(`${this.apiUrl}/${refno}`, openBalance);
  }

  /**
   * Delete opening balance
   */
  delete(refno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Search opening balances
   */
  search(searchTerm: string): Observable<OpenBalance[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<OpenBalance[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get total debit for account or all accounts
   */
  getTotalDebit(accountNr?: string): Observable<number> {
    let params = new HttpParams();
    if (accountNr) {
      params = params.set('accountNr', accountNr);
    }
    return this.http.get<number>(`${this.apiUrl}/total-debit`, { params });
  }

  /**
   * Get total credit for account or all accounts
   */
  getTotalCredit(accountNr?: string): Observable<number> {
    let params = new HttpParams();
    if (accountNr) {
      params = params.set('accountNr', accountNr);
    }
    return this.http.get<number>(`${this.apiUrl}/total-credit`, { params });
  }
}
