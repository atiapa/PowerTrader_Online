import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RetailItems } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class RetailItemsService {
  private apiUrl = 'http://localhost:5000/api/RetailItems';

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

  // GET ALL Retail Items (scoped to tenant)
  getAll(): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Retail Item by ID (scoped to tenant)
  getById(refNo: number): Observable<RetailItems> {
    return this.http.get<RetailItems>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Retail Item by Product ID
  getByProductId(productId: string): Observable<RetailItems> {
    return this.http.get<RetailItems>(`${this.apiUrl}/product/${productId}`);
  }

  // GET Retail Item by Barcode
  getByBarcode(barcode: string): Observable<RetailItems> {
    return this.http.get<RetailItems>(`${this.apiUrl}/barcode/${barcode}`);
  }

  // GET Retail Items by Branch
  getByBranchCode(branchCode: string): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Retail Items by Organisation
  getByOrganisation(organisationCode: string): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // SEARCH Retail Items
  search(searchTerm: string): Observable<RetailItems[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<RetailItems[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Retail Item (auto-add tenant info)
  create(item: RetailItems): Observable<RetailItems> {
    const itemWithTenant = this.tenantContext.addTenantInfo(item);
    return this.http.post<RetailItems>(this.apiUrl, itemWithTenant);
  }

  // UPDATE Retail Item (scoped to tenant)
  update(refNo: number, item: RetailItems): Observable<RetailItems> {
    const itemWithTenant = this.tenantContext.addTenantInfo(item);
    return this.http.put<RetailItems>(`${this.apiUrl}/${refNo}`, itemWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Retail Item (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // UPDATE Stock Level (for sales/returns)
  updateStock(productId: string, quantityChange: number, type: 'SALE' | 'RETURN' | 'ADJUSTMENT'): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/stock/${productId}`, {
      quantityChange,
      type
    });
  }

  // GET Low Stock Items
  getLowStockItems(threshold?: number): Observable<RetailItems[]> {
    const url = threshold 
      ? `${this.apiUrl}/lowstock/${threshold}` 
      : `${this.apiUrl}/lowstock`;
    return this.http.get<RetailItems[]>(url);
  }

  // GET Out of Stock Items
  getOutOfStockItems(): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/outofstock`);
  }

  // GET Active Retail Items (Available for Sale)
  getActiveItems(): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/active`);
  }

  // GET Items by Category
  getByCategory(categoryId: number): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/category/${categoryId}`);
  }

  // GET Items by SubCategory
  getBySubCategory(subCategoryId: number): Observable<RetailItems[]> {
    return this.http.get<RetailItems[]>(`${this.apiUrl}/subcategory/${subCategoryId}`);
  }

  // CHECK Stock Availability
  checkStockAvailability(productId: string, quantity: number): Observable<{ available: boolean, currentStock: number }> {
    return this.http.get<{ available: boolean, currentStock: number }>(
      `${this.apiUrl}/check-stock/${productId}/${quantity}`
    );
  }
}
