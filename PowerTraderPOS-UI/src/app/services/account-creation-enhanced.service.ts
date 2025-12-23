import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountCreationEnhanced, CreateAccountCreationEnhancedDto, UpdateAccountCreationEnhancedDto } from '../models/models';

/**
 * Service for managing enhanced account creation and management
 */
@Injectable({
  providedIn: 'root'
})
export class AccountCreationEnhancedService {
  private apiUrl = `${environment.apiUrl}/AccountCreation`;

  constructor(private http: HttpClient) { }

  /**
   * Get all accounts with optional account group filter
   */
  getAll(accountGroup?: string): Observable<AccountCreationEnhanced[]> {
    let params = new HttpParams();
    if (accountGroup) {
      params = params.set('accountGroup', accountGroup);
    }
    return this.http.get<AccountCreationEnhanced[]>(this.apiUrl, { params });
  }

  /**
   * Get account by S_No (primary key)
   */
  getBySNo(sNo: number): Observable<AccountCreationEnhanced> {
    return this.http.get<AccountCreationEnhanced>(`${this.apiUrl}/${sNo}`);
  }

  /**
   * Get account by account number
   */
  getByAccountNumber(accountnr: string): Observable<AccountCreationEnhanced> {
    const params = new HttpParams().set('accountnr', accountnr);
    return this.http.get<AccountCreationEnhanced>(`${this.apiUrl}/by-account-number`, { params });
  }

  /**
   * Get accounts by account group
   */
  getByAccountGroup(accountGroup: string): Observable<AccountCreationEnhanced[]> {
    const params = new HttpParams().set('accountGroup', accountGroup);
    return this.http.get<AccountCreationEnhanced[]>(`${this.apiUrl}/by-account-group`, { params });
  }

  /**
   * Get accounts by status
   */
  getByStatus(status: string): Observable<AccountCreationEnhanced[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<AccountCreationEnhanced[]>(`${this.apiUrl}/by-status`, { params });
  }

  /**
   * Create new account
   */
  create(account: CreateAccountCreationEnhancedDto): Observable<AccountCreationEnhanced> {
    return this.http.post<AccountCreationEnhanced>(this.apiUrl, account);
  }

  /**
   * Update existing account
   */
  update(sNo: number, account: UpdateAccountCreationEnhancedDto): Observable<AccountCreationEnhanced> {
    return this.http.put<AccountCreationEnhanced>(`${this.apiUrl}/${sNo}`, account);
  }

  /**
   * Delete account
   */
  delete(sNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${sNo}`);
  }

  /**
   * Search accounts by account name or number
   */
  search(searchTerm: string): Observable<AccountCreationEnhanced[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<AccountCreationEnhanced[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get opening balance for an account
   */
  getOpeningBalance(accountnr: string): Observable<number> {
    const params = new HttpParams().set('accountnr', accountnr);
    return this.http.get<number>(`${this.apiUrl}/opening-balance`, { params });
  }

  /**
   * Get closing balance for an account
   */
  getClosingBalance(accountnr: string): Observable<number> {
    const params = new HttpParams().set('accountnr', accountnr);
    return this.http.get<number>(`${this.apiUrl}/closing-balance`, { params });
  }

  /**
   * Get account statement for a date range
   */
  getAccountStatement(accountnr: string, fromDate: Date, toDate: Date): Observable<any> {
    let params = new HttpParams()
      .set('accountnr', accountnr)
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString());
    return this.http.get<any>(`${this.apiUrl}/statement`, { params });
  }

  /**
   * Get accounts by contact person
   */
  getByContactPerson(contactPerson: string): Observable<AccountCreationEnhanced[]> {
    const params = new HttpParams().set('contactPerson', contactPerson);
    return this.http.get<AccountCreationEnhanced[]>(`${this.apiUrl}/by-contact-person`, { params });
  }

  /**
   * Get active accounts
   */
  getActiveAccounts(): Observable<AccountCreationEnhanced[]> {
    return this.http.get<AccountCreationEnhanced[]>(`${this.apiUrl}/active`);
  }
}
