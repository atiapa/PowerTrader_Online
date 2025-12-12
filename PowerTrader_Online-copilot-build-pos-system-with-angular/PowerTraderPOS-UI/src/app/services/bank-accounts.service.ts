import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BankAccounts, ChequeTransaction, CashBankTransfers } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class BankAccountsService {
  private apiUrl = 'http://localhost:5000/api/BankAccounts';

  constructor(private http: HttpClient) { }

  // ============ BANK ACCOUNTS ============

  // GET ALL Bank Accounts
  getAll(): Observable<BankAccounts[]> {
    return this.http.get<BankAccounts[]>(this.apiUrl);
  }

  // GET Bank Account by ID
  getById(refNo: number): Observable<BankAccounts> {
    return this.http.get<BankAccounts>(`${this.apiUrl}/${refNo}`);
  }

  // GET Bank Accounts by Branch
  getByBranchCode(branchCode: string): Observable<BankAccounts[]> {
    return this.http.get<BankAccounts[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Bank Accounts by Organisation
  getByOrganisation(organisationCode: string): Observable<BankAccounts[]> {
    return this.http.get<BankAccounts[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // CREATE Bank Account
  create(account: BankAccounts): Observable<BankAccounts> {
    return this.http.post<BankAccounts>(this.apiUrl, account);
  }

  // UPDATE Bank Account
  update(refNo: number, account: BankAccounts): Observable<BankAccounts> {
    return this.http.put<BankAccounts>(`${this.apiUrl}/${refNo}`, account);
  }

  // DELETE Bank Account
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Account Balance
  getBalance(refNo: number): Observable<{ balance: number }> {
    return this.http.get<{ balance: number }>(`${this.apiUrl}/${refNo}/balance`);
  }

  // GET Active Bank Accounts
  getActiveAccounts(): Observable<BankAccounts[]> {
    return this.http.get<BankAccounts[]>(`${this.apiUrl}/active`);
  }

  // ============ CHEQUE TRANSACTIONS ============

  // GET ALL Cheque Transactions
  getAllCheques(): Observable<ChequeTransaction[]> {
    return this.http.get<ChequeTransaction[]>(`${this.apiUrl}/cheques`);
  }

  // GET Cheque by ID
  getChequeById(refNo: number): Observable<ChequeTransaction> {
    return this.http.get<ChequeTransaction>(`${this.apiUrl}/cheques/${refNo}`);
  }

  // GET Cheques by Bank Account
  getChequesByAccount(accountId: number): Observable<ChequeTransaction[]> {
    return this.http.get<ChequeTransaction[]>(`${this.apiUrl}/${accountId}/cheques`);
  }

  // GET Cheques by Status
  getChequesByStatus(status: string): Observable<ChequeTransaction[]> {
    return this.http.get<ChequeTransaction[]>(`${this.apiUrl}/cheques/status/${status}`);
  }

  // CREATE Cheque Transaction
  createCheque(cheque: ChequeTransaction): Observable<ChequeTransaction> {
    return this.http.post<ChequeTransaction>(`${this.apiUrl}/cheques`, cheque);
  }

  // UPDATE Cheque Status
  updateChequeStatus(refNo: number, status: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/cheques/${refNo}/status`, { status });
  }

  // GET Pending Cheques
  getPendingCheques(): Observable<ChequeTransaction[]> {
    return this.http.get<ChequeTransaction[]>(`${this.apiUrl}/cheques/pending`);
  }

  // ============ CASH/BANK TRANSFERS ============

  // GET ALL Transfers
  getAllTransfers(): Observable<CashBankTransfers[]> {
    return this.http.get<CashBankTransfers[]>(`${this.apiUrl}/transfers`);
  }

  // GET Transfer by ID
  getTransferById(refNo: number): Observable<CashBankTransfers> {
    return this.http.get<CashBankTransfers>(`${this.apiUrl}/transfers/${refNo}`);
  }

  // CREATE Transfer
  createTransfer(transfer: CashBankTransfers): Observable<CashBankTransfers> {
    return this.http.post<CashBankTransfers>(`${this.apiUrl}/transfers`, transfer);
  }

  // GET Transfers by Date Range
  getTransfersByDateRange(startDate: Date, endDate: Date): Observable<CashBankTransfers[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<CashBankTransfers[]>(`${this.apiUrl}/transfers/daterange`, { params });
  }

  // GET Bank Statement
  getBankStatement(accountId: number, startDate: Date, endDate: Date): Observable<any[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<any[]>(`${this.apiUrl}/${accountId}/statement`, { params });
  }
}
