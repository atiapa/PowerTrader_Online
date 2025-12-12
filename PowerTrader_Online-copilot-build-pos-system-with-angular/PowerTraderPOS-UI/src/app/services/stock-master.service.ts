import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StockMaster, StockRecord } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class StockMasterService {
  private apiUrl = 'http://localhost:5000/api/StockMaster';

  constructor(private http: HttpClient) { }

  // ============ STOCK MASTER ============

  // GET ALL Stock
  getAll(): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(this.apiUrl);
  }

  // GET Stock by ID
  getById(refNo: number): Observable<StockMaster> {
    return this.http.get<StockMaster>(`${this.apiUrl}/${refNo}`);
  }

  // GET Stock by Product
  getByProductId(productId: string): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/product/${productId}`);
  }

  // GET Stock by Warehouse
  getByWarehouse(warehouseCode: string): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/warehouse/${warehouseCode}`);
  }

  // GET Stock by Branch
  getByBranchCode(branchCode: string): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Stock by Organisation
  getByOrganisation(organisationCode: string): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // SEARCH Stock
  search(searchTerm: string): Observable<StockMaster[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<StockMaster[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Stock Entry
  create(stock: StockMaster): Observable<StockMaster> {
    return this.http.post<StockMaster>(this.apiUrl, stock);
  }

  // UPDATE Stock Entry
  update(refNo: number, stock: StockMaster): Observable<StockMaster> {
    return this.http.put<StockMaster>(`${this.apiUrl}/${refNo}`, stock);
  }

  // DELETE Stock Entry
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Low Stock Items
  getLowStockItems(threshold: number = 10): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/lowstock/${threshold}`);
  }

  // GET Out of Stock Items
  getOutOfStockItems(): Observable<StockMaster[]> {
    return this.http.get<StockMaster[]>(`${this.apiUrl}/outofstock`);
  }

  // ADJUST Stock (IN/OUT)
  adjustStock(refNo: number, quantity: number, type: 'IN' | 'OUT', reason: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${refNo}/adjust`, { quantity, type, reason });
  }

  // TRANSFER Stock between Warehouses
  transferStock(fromWarehouse: string, toWarehouse: string, productId: string, quantity: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transfer`, {
      fromWarehouse,
      toWarehouse,
      productId,
      quantity
    });
  }

  // ============ STOCK RECORDS (History) ============

  // GET Stock Records by Product
  getStockRecordsByProduct(productId: string): Observable<StockRecord[]> {
    return this.http.get<StockRecord[]>(`${this.apiUrl}/records/product/${productId}`);
  }

  // GET Stock Records by Date Range
  getStockRecordsByDateRange(startDate: Date, endDate: Date): Observable<StockRecord[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<StockRecord[]>(`${this.apiUrl}/records`, { params });
  }

  // GET Stock Valuation
  getStockValuation(branchCode?: string): Observable<{ totalValue: number, items: any[] }> {
    const url = branchCode 
      ? `${this.apiUrl}/valuation/${branchCode}` 
      : `${this.apiUrl}/valuation`;
    return this.http.get<{ totalValue: number, items: any[] }>(url);
  }
}
