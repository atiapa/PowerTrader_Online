import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GiftCardTbl } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class GiftCardService {
  private apiUrl = 'http://localhost:5000/api/GiftCard';

  constructor(
    private http: HttpClient,
    private tenantContext: TenantContextService
  ) { }

  private getTenantParams(): HttpParams {
    const tenant = this.tenantContext.getTenantParams();
    return new HttpParams()
      .set('organisationCode', tenant.organisationCode)
      .set('branchCode', tenant.branchCode);
  }

  // GET ALL Gift Cards (scoped to tenant)
  getAll(): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Gift Card by ID (scoped to tenant)
  getById(refNo: number): Observable<GiftCardTbl> {
    return this.http.get<GiftCardTbl>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Gift Card by Card Number
  getByCardNumber(cardNumber: string): Observable<GiftCardTbl> {
    return this.http.get<GiftCardTbl>(`${this.apiUrl}/card/${cardNumber}`);
  }

  // VALIDATE Gift Card
  validateGiftCard(cardNumber: string, pin: string): Observable<{ valid: boolean, balance: number, message: string }> {
    return this.http.post<{ valid: boolean, balance: number, message: string }>(
      `${this.apiUrl}/validate`,
      { cardNumber, pin }
    );
  }

  // CHECK Gift Card Balance
  checkBalance(cardNumber: string): Observable<{ balance: number }> {
    return this.http.get<{ balance: number }>(`${this.apiUrl}/balance/${cardNumber}`);
  }

  // GET Gift Cards by Branch
  getByBranchCode(branchCode: string): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Gift Cards by Organisation
  getByOrganisation(organisationCode: string): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // GET Gift Cards by Status
  getByStatus(status: string): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/status/${status}`);
  }

  // CREATE Gift Card (auto-add tenant info)
  create(giftCard: GiftCardTbl): Observable<GiftCardTbl> {
    const giftCardWithTenant = this.tenantContext.addTenantInfo(giftCard);
    return this.http.post<GiftCardTbl>(this.apiUrl, giftCardWithTenant);
  }

  // ISSUE Gift Card (Activate)
  issueGiftCard(cardNumber: string, amount: number, issuedTo: string): Observable<GiftCardTbl> {
    return this.http.post<GiftCardTbl>(`${this.apiUrl}/issue`, {
      cardNumber,
      amount,
      issuedTo
    });
  }

  // UPDATE Gift Card
  update(refNo: number, giftCard: GiftCardTbl): Observable<GiftCardTbl> {
    return this.http.put<GiftCardTbl>(`${this.apiUrl}/${refNo}`, giftCard);
  }

  // DELETE Gift Card
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // REDEEM Gift Card (Use in Sale)
  redeemGiftCard(cardNumber: string, amount: number, invoiceNo: string): Observable<{ success: boolean, remainingBalance: number }> {
    return this.http.post<{ success: boolean, remainingBalance: number }>(
      `${this.apiUrl}/redeem`,
      { cardNumber, amount, invoiceNo }
    );
  }

  // RECHARGE Gift Card (Top Up)
  rechargeGiftCard(cardNumber: string, amount: number): Observable<GiftCardTbl> {
    return this.http.post<GiftCardTbl>(`${this.apiUrl}/recharge`, {
      cardNumber,
      amount
    });
  }

  // BLOCK/UNBLOCK Gift Card
  blockGiftCard(cardNumber: string, block: boolean, reason?: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/block/${cardNumber}`, {
      block,
      reason
    });
  }

  // GET Active Gift Cards
  getActiveGiftCards(): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/active`);
  }

  // GET Expired Gift Cards
  getExpiredGiftCards(): Observable<GiftCardTbl[]> {
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/expired`);
  }

  // GET Gift Card Transaction History
  getTransactionHistory(cardNumber: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${cardNumber}/history`);
  }

  // SEARCH Gift Cards
  search(searchTerm: string): Observable<GiftCardTbl[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<GiftCardTbl[]>(`${this.apiUrl}/search`, { params });
  }
}
