import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Suppliers } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {
  private apiUrl = 'http://localhost:5000/api/Suppliers';

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

  // GET ALL Suppliers (scoped to tenant)
  getAll(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Supplier by ID (scoped to tenant)
  getById(refNo: number): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Supplier by Code
  getBySupplierCode(supplierCode: string): Observable<Suppliers> {
    return this.http.get<Suppliers>(`${this.apiUrl}/code/${supplierCode}`);
  }

  // GET Suppliers by Branch
  getByBranchCode(branchCode: string): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Suppliers by Organisation
  getByOrganisation(organisationCode: string): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // SEARCH Suppliers
  search(searchTerm: string): Observable<Suppliers[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<Suppliers[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Supplier (auto-add tenant info)
  create(supplier: Suppliers): Observable<Suppliers> {
    const supplierWithTenant = this.tenantContext.addTenantInfo(supplier);
    return this.http.post<Suppliers>(this.apiUrl, supplierWithTenant);
  }

  // UPDATE Supplier (scoped to tenant)
  update(refNo: number, supplier: Suppliers): Observable<Suppliers> {
    const supplierWithTenant = this.tenantContext.addTenantInfo(supplier);
    return this.http.put<Suppliers>(`${this.apiUrl}/${refNo}`, supplierWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Supplier (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Supplier Balance
  getBalance(refNo: number): Observable<{ balance: number }> {
    return this.http.get<{ balance: number }>(`${this.apiUrl}/${refNo}/balance`);
  }

  // GET Supplier Purchase History
  getPurchaseHistory(refNo: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${refNo}/purchases`);
  }

  // GET Active Suppliers
  getActiveSuppliers(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl}/active`);
  }

  // GET Suppliers with Outstanding Balance
  getSuppliersWithBalance(): Observable<Suppliers[]> {
    return this.http.get<Suppliers[]>(`${this.apiUrl}/outstanding`);
  }
}
