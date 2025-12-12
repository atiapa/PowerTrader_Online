import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExpensesExpenditure, ExpensesTable } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {
  private apiUrl = 'http://localhost:5000/api/Expenses';

  constructor(private http: HttpClient) { }

  // ============ EXPENSES EXPENDITURE ============

  // GET ALL Expenses
  getAll(): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(this.apiUrl);
  }

  // GET Expense by ID
  getById(refNo: number): Observable<ExpensesExpenditure> {
    return this.http.get<ExpensesExpenditure>(`${this.apiUrl}/${refNo}`);
  }

  // GET Expenses by Date Range
  getByDateRange(startDate: Date, endDate: Date): Observable<ExpensesExpenditure[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/daterange`, { params });
  }

  // GET Expenses by Branch
  getByBranchCode(branchCode: string): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Expenses by Organisation
  getByOrganisation(organisationCode: string): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // GET Expenses by Category
  getByCategory(category: string): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/category/${category}`);
  }

  // CREATE Expense
  create(expense: ExpensesExpenditure): Observable<ExpensesExpenditure> {
    return this.http.post<ExpensesExpenditure>(this.apiUrl, expense);
  }

  // UPDATE Expense
  update(refNo: number, expense: ExpensesExpenditure): Observable<ExpensesExpenditure> {
    return this.http.put<ExpensesExpenditure>(`${this.apiUrl}/${refNo}`, expense);
  }

  // DELETE Expense
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  // GET Today's Expenses
  getTodayExpenses(): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/today`);
  }

  // GET Monthly Expenses Summary
  getMonthlySummary(year: number, month: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/summary/${year}/${month}`);
  }

  // ============ EXPENSES TABLE (CATEGORIES) ============

  // GET ALL Expense Categories
  getAllCategories(): Observable<ExpensesTable[]> {
    return this.http.get<ExpensesTable[]>(`${this.apiUrl}/categories`);
  }

  // GET Expense Category by ID
  getCategoryById(refNo: number): Observable<ExpensesTable> {
    return this.http.get<ExpensesTable>(`${this.apiUrl}/categories/${refNo}`);
  }

  // CREATE Expense Category
  createCategory(category: ExpensesTable): Observable<ExpensesTable> {
    return this.http.post<ExpensesTable>(`${this.apiUrl}/categories`, category);
  }

  // UPDATE Expense Category
  updateCategory(refNo: number, category: ExpensesTable): Observable<ExpensesTable> {
    return this.http.put<ExpensesTable>(`${this.apiUrl}/categories/${refNo}`, category);
  }

  // DELETE Expense Category
  deleteCategory(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/categories/${refNo}`);
  }

  // ============ REPORTS ============

  // GET Expense Report
  getExpenseReport(startDate: Date, endDate: Date, groupBy: 'category' | 'branch' | 'date'): Observable<any> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString())
      .set('groupBy', groupBy);
    return this.http.get<any>(`${this.apiUrl}/report`, { params });
  }

  // GET Expense Comparison
  getExpenseComparison(year: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/comparison/${year}`);
  }

  // GET Pending Approvals
  getPendingApprovals(): Observable<ExpensesExpenditure[]> {
    return this.http.get<ExpensesExpenditure[]>(`${this.apiUrl}/pending-approvals`);
  }

  // APPROVE Expense
  approve(refNo: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/approve`, {});
  }

  // REJECT Expense
  reject(refNo: number, reason: string): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${refNo}/reject`, { reason });
  }
}
