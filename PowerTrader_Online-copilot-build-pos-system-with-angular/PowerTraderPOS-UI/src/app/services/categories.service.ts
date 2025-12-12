import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categories, SubCategory } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:5000/api/Categories';

  constructor(private http: HttpClient) { }

  // ============ CATEGORIES ============

  // GET ALL Categories
  getAllCategories(): Observable<Categories[]> {
    return this.http.get<Categories[]>(this.apiUrl);
  }

  // GET Category by ID
  getCategoryById(refNo: number): Observable<Categories> {
    return this.http.get<Categories>(`${this.apiUrl}/${refNo}`);
  }

  // GET Categories by Branch
  getCategoriesByBranch(branchCode: string): Observable<Categories[]> {
    return this.http.get<Categories[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // CREATE Category
  createCategory(category: Categories): Observable<Categories> {
    return this.http.post<Categories>(this.apiUrl, category);
  }

  // UPDATE Category
  updateCategory(refNo: number, category: Categories): Observable<Categories> {
    return this.http.put<Categories>(`${this.apiUrl}/${refNo}`, category);
  }

  // DELETE Category
  deleteCategory(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // ============ SUBCATEGORIES ============

  // GET ALL SubCategories
  getAllSubCategories(): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}/subcategories`);
  }

  // GET SubCategory by ID
  getSubCategoryById(refNo: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(`${this.apiUrl}/subcategories/${refNo}`);
  }

  // GET SubCategories by Category
  getSubCategoriesByCategory(categoryId: number): Observable<SubCategory[]> {
    return this.http.get<SubCategory[]>(`${this.apiUrl}/${categoryId}/subcategories`);
  }

  // CREATE SubCategory
  createSubCategory(subCategory: SubCategory): Observable<SubCategory> {
    return this.http.post<SubCategory>(`${this.apiUrl}/subcategories`, subCategory);
  }

  // UPDATE SubCategory
  updateSubCategory(refNo: number, subCategory: SubCategory): Observable<SubCategory> {
    return this.http.put<SubCategory>(`${this.apiUrl}/subcategories/${refNo}`, subCategory);
  }

  // DELETE SubCategory
  deleteSubCategory(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/subcategories/${refNo}`);
  }
}
