import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WarehouseTbl } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class WarehouseService {
  private apiUrl = 'http://localhost:5000/api/Warehouse';

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

  // GET ALL Warehouses (scoped to tenant)
  getAll(): Observable<WarehouseTbl[]> {
    return this.http.get<WarehouseTbl[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Warehouse by ID (scoped to tenant)
  getById(refNo: number): Observable<WarehouseTbl> {
    return this.http.get<WarehouseTbl>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Warehouse by Code
  getByWarehouseCode(warehouseCode: string): Observable<WarehouseTbl> {
    return this.http.get<WarehouseTbl>(`${this.apiUrl}/code/${warehouseCode}`);
  }

  // GET Warehouses by Branch
  getByBranchCode(branchCode: string): Observable<WarehouseTbl[]> {
    return this.http.get<WarehouseTbl[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Warehouses by Organisation
  getByOrganisation(organisationCode: string): Observable<WarehouseTbl[]> {
    return this.http.get<WarehouseTbl[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // SEARCH Warehouses
  search(searchTerm: string): Observable<WarehouseTbl[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<WarehouseTbl[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Warehouse (auto-add tenant info)
  create(warehouse: WarehouseTbl): Observable<WarehouseTbl> {
    const warehouseWithTenant = this.tenantContext.addTenantInfo(warehouse);
    return this.http.post<WarehouseTbl>(this.apiUrl, warehouseWithTenant);
  }

  // UPDATE Warehouse (scoped to tenant)
  update(refNo: number, warehouse: WarehouseTbl): Observable<WarehouseTbl> {
    const warehouseWithTenant = this.tenantContext.addTenantInfo(warehouse);
    return this.http.put<WarehouseTbl>(`${this.apiUrl}/${refNo}`, warehouseWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Warehouse (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Active Warehouses
  getActiveWarehouses(): Observable<WarehouseTbl[]> {
    return this.http.get<WarehouseTbl[]>(`${this.apiUrl}/active`);
  }

  // GET Warehouse Capacity Info
  getCapacityInfo(refNo: number): Observable<{ used: number, total: number, available: number }> {
    return this.http.get<{ used: number, total: number, available: number }>(`${this.apiUrl}/${refNo}/capacity`);
  }

  // GET Warehouse Inventory Summary
  getInventorySummary(refNo: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${refNo}/inventory`);
  }
}
