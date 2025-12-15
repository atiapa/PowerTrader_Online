import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AccountGroupMaster, CreateAccountGroupMasterDto, UpdateAccountGroupMasterDto } from '../models/models';

/**
 * Service for managing account group master data (chart of accounts hierarchy)
 */
@Injectable({
  providedIn: 'root'
})
export class AccountGroupMasterService {
  private apiUrl = `${environment.apiUrl}/AccountGroupMaster`;

  constructor(private http: HttpClient) { }

  /**
   * Get all account groups
   */
  getAll(): Observable<AccountGroupMaster[]> {
    return this.http.get<AccountGroupMaster[]>(this.apiUrl);
  }

  /**
   * Get account group by ID (Under)
   */
  getByUnder(under: number): Observable<AccountGroupMaster> {
    return this.http.get<AccountGroupMaster>(`${this.apiUrl}/${under}`);
  }

  /**
   * Get account groups by primary group
   */
  getByPrimaryGroup(primaryGroup: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('primaryGroup', primaryGroup);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/by-primary-group`, { params });
  }

  /**
   * Get account groups by account type
   */
  getByAccountType(accountType: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('accountType', accountType);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/by-account-type`, { params });
  }

  /**
   * Get account groups by nature (Debit/Credit)
   */
  getByNature(nature: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('nature', nature);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/by-nature`, { params });
  }

  /**
   * Get account groups by status
   */
  getByStatus(accountStatus: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('status', accountStatus);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/by-status`, { params });
  }

  /**
   * Create new account group
   */
  create(accountGroup: CreateAccountGroupMasterDto): Observable<AccountGroupMaster> {
    return this.http.post<AccountGroupMaster>(this.apiUrl, accountGroup);
  }

  /**
   * Update existing account group
   */
  update(under: number, accountGroup: UpdateAccountGroupMasterDto): Observable<AccountGroupMaster> {
    return this.http.put<AccountGroupMaster>(`${this.apiUrl}/${under}`, accountGroup);
  }

  /**
   * Delete account group
   */
  delete(under: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${under}`);
  }

  /**
   * Search account groups by group name
   */
  search(searchTerm: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get hierarchical chart of accounts
   */
  getHierarchy(): Observable<AccountGroupMaster[]> {
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/hierarchy`);
  }

  /**
   * Get account groups by financial statement type (IS/BS/CF/RE)
   */
  getByFinancialStatement(statementType: string): Observable<AccountGroupMaster[]> {
    const params = new HttpParams().set('statementType', statementType);
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/by-statement`, { params });
  }

  /**
   * Get active account groups
   */
  getActive(): Observable<AccountGroupMaster[]> {
    return this.http.get<AccountGroupMaster[]>(`${this.apiUrl}/active`);
  }
}
