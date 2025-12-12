import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CustomerInfo } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private apiUrl = 'http://localhost:5000/api/Customers';

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

  // GET ALL Customers (scoped to tenant)
  getAll(): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Customer by ID (scoped to tenant)
  getById(refNo: number): Observable<CustomerInfo> {
    return this.http.get<CustomerInfo>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Customer by Code
  getByCustomerCode(customerCode: string): Observable<CustomerInfo> {
    return this.http.get<CustomerInfo>(`${this.apiUrl}/code/${customerCode}`);
  }

  // GET Customer by Phone
  getByPhone(phoneNumber: string): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/phone/${phoneNumber}`);
  }

  // GET Customers by Branch
  getByBranchCode(branchCode: string): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Customers by Organisation
  getByOrganisation(organisationCode: string): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // SEARCH Customers (scoped to tenant)
  search(searchTerm: string): Observable<CustomerInfo[]> {
    let params = this.getTenantParams();
    params = params.set('search', searchTerm);
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Customer (auto-add tenant info)
  create(customer: CustomerInfo): Observable<CustomerInfo> {
    const customerWithTenant = this.tenantContext.addTenantInfo(customer);
    return this.http.post<CustomerInfo>(this.apiUrl, customerWithTenant);
  }

  // UPDATE Customer (scoped to tenant)
  update(refNo: number, customer: CustomerInfo): Observable<CustomerInfo> {
    const customerWithTenant = this.tenantContext.addTenantInfo(customer);
    return this.http.put<CustomerInfo>(`${this.apiUrl}/${refNo}`, customerWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Customer (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Customer Balance
  getBalance(refNo: number): Observable<{ balance: number }> {
    return this.http.get<{ balance: number }>(`${this.apiUrl}/${refNo}/balance`);
  }

  // GET Customer Purchase History
  getPurchaseHistory(refNo: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${refNo}/purchases`);
  }

  // UPDATE Customer Credit Limit
  updateCreditLimit(refNo: number, creditLimit: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/creditlimit`, { creditLimit });
  }

  // GET Customers with Outstanding Balance
  getCustomersWithBalance(): Observable<CustomerInfo[]> {
    return this.http.get<CustomerInfo[]>(`${this.apiUrl}/outstanding`);
  }
}
