import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product, CreateSaleRequest, Sale, Category, Subcategory, RetailItem, ProductSearchRequest } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // Products
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/Products`);
  }

  getProductByCode(code: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/Products/search/${code}`);
  }

  // Sales
  getSales(): Observable<Sale[]> {
    return this.http.get<Sale[]>(`${this.apiUrl}/Sales`);
  }

  createSale(sale: CreateSaleRequest): Observable<Sale> {
    return this.http.post<Sale>(`${this.apiUrl}/Sales`, sale);
  }

  getSale(id: number): Observable<Sale> {
    return this.http.get<Sale>(`${this.apiUrl}/Sales/${id}`);
  }

  // Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/Categories`);
  }

  getCategory(id: number): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/Categories/${id}`);
  }

  // Subcategories
  getSubcategories(): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}/Subcategories`);
  }

  getSubcategoriesByCategory(categoryId: number): Observable<Subcategory[]> {
    return this.http.get<Subcategory[]>(`${this.apiUrl}/Subcategories/category/${categoryId}`);
  }

  getSubcategory(id: number): Observable<Subcategory> {
    return this.http.get<Subcategory>(`${this.apiUrl}/Subcategories/${id}`);
  }

  // Retail Items
  getRetailItems(): Observable<RetailItem[]> {
    return this.http.get<RetailItem[]>(`${this.apiUrl}/RetailItems`);
  }

  getRetailItem(id: number): Observable<RetailItem> {
    return this.http.get<RetailItem>(`${this.apiUrl}/RetailItems/${id}`);
  }

  searchRetailItems(request: ProductSearchRequest): Observable<RetailItem[]> {
    let params = new HttpParams();
    
    if (request.searchTerm) {
      params = params.set('searchTerm', request.searchTerm);
    }
    if (request.barcode) {
      params = params.set('barcode', request.barcode);
    }
    if (request.categoryID) {
      params = params.set('categoryID', request.categoryID.toString());
    }
    if (request.subcategory) {
      params = params.set('subcategory', request.subcategory.toString());
    }
    if (request.organisationId) {
      params = params.set('organisationId', request.organisationId.toString());
    }
    if (request.branchId) {
      params = params.set('branchId', request.branchId.toString());
    }

    return this.http.get<RetailItem[]>(`${this.apiUrl}/RetailItems/search`, { params });
  }

  getRetailItemByBarcode(barcode: string): Observable<RetailItem> {
    return this.http.get<RetailItem>(`${this.apiUrl}/RetailItems/barcode/${barcode}`);
  }

  getRetailItemsByCategory(categoryId: number): Observable<RetailItem[]> {
    return this.http.get<RetailItem[]>(`${this.apiUrl}/RetailItems/category/${categoryId}`);
  }

  getRetailItemsBySubcategory(subcategoryId: number): Observable<RetailItem[]> {
    return this.http.get<RetailItem[]>(`${this.apiUrl}/RetailItems/subcategory/${subcategoryId}`);
  }

  // Generic HTTP methods
  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${endpoint}`);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${endpoint}`, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${endpoint}`, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${endpoint}`);
  }
}
