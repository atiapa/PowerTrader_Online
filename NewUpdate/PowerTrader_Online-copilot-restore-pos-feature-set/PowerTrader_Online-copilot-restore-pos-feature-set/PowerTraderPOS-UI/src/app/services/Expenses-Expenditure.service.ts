import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expenses_Expenditure } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExpensesExpenditureService {
  private apiUrl = `${environment.apiUrl}/Expenses-Expenditure`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Expenses_Expenditure[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Expenses_Expenditure[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Expenses_Expenditure> {
    return this.http.get<Expenses_Expenditure>(`${this.apiUrl}/${id}`);
  }

  create(data: Expenses_Expenditure): Observable<Expenses_Expenditure> {
    return this.http.post<Expenses_Expenditure>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Expenses_Expenditure): Observable<Expenses_Expenditure> {
    return this.http.put<Expenses_Expenditure>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Expenses_Expenditure[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Expenses_Expenditure[]>(`${this.apiUrl}/search`, { params });
  }
}
