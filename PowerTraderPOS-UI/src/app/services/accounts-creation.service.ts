import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  AccountsCreation, 
  CreateAccountsCreationDto, 
  UpdateAccountsCreationDto 
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AccountsCreationService {
  private apiUrl = `${environment.apiUrl}/api/AccountsCreation`;

  constructor(private http: HttpClient) {}

  /**
   * Get all accounts
   * @param accountGroup Optional filter by account group
   * @param accountType Optional filter by account type
   * @returns Observable of accounts list
   */
  getAll(accountGroup?: string, accountType?: string): Observable<AccountsCreation[]> {
    let params = new HttpParams();
    if (accountGroup) {
      params = params.set('accountGroup', accountGroup);
    }
    if (accountType) {
      params = params.set('accountType', accountType);
    }
    return this.http.get<AccountsCreation[]>(this.apiUrl, { params });
  }

  /**
   * Get account by reference number
   * @param refno Account reference number
   * @returns Observable of account
   */
  getByRefNo(refno: number): Observable<AccountsCreation> {
    return this.http.get<AccountsCreation>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Get account by account number
   * @param accountNr Account number
   * @returns Observable of account
   */
  getByAccountNumber(accountNr: string): Observable<AccountsCreation> {
    return this.http.get<AccountsCreation>(`${this.apiUrl}/account/${accountNr}`);
  }

  /**
   * Create new account
   * @param account Account creation data
   * @returns Observable of created account
   */
  create(account: CreateAccountsCreationDto): Observable<AccountsCreation> {
    return this.http.post<AccountsCreation>(this.apiUrl, account);
  }

  /**
   * Update existing account
   * @param refno Account reference number
   * @param account Updated account data
   * @returns Observable of updated account
   */
  update(refno: number, account: UpdateAccountsCreationDto): Observable<AccountsCreation> {
    return this.http.put<AccountsCreation>(`${this.apiUrl}/${refno}`, account);
  }

  /**
   * Delete account
   * @param refno Account reference number
   * @returns Observable of void
   */
  delete(refno: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refno}`);
  }

  /**
   * Search accounts by name or account number
   * @param searchTerm Search term
   * @returns Observable of accounts list
   */
  search(searchTerm: string): Observable<AccountsCreation[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<AccountsCreation[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get accounts by status
   * @param status Account status
   * @returns Observable of accounts list
   */
  getByStatus(status: string): Observable<AccountsCreation[]> {
    const params = new HttpParams().set('status', status);
    return this.http.get<AccountsCreation[]>(`${this.apiUrl}/status`, { params });
  }

  /**
   * Get account balance
   * @param accountNr Account number
   * @returns Observable of balance amount
   */
  getBalance(accountNr: string): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/balance/${accountNr}`);
  }

  /**
   * Get accounts by account group
   * @param accountGroup Account group
   * @returns Observable of accounts list
   */
  getByAccountGroup(accountGroup: string): Observable<AccountsCreation[]> {
    const params = new HttpParams().set('accountGroup', accountGroup);
    return this.http.get<AccountsCreation[]>(`${this.apiUrl}/group`, { params });
  }

  /**
   * Get chart of accounts structured by groups
   * @returns Observable of grouped accounts
   */
  getChartOfAccounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/chart-of-accounts`);
  }
}
