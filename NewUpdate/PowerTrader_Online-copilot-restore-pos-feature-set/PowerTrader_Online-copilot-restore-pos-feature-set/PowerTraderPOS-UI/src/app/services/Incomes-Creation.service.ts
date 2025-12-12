import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incomes_Creation } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IncomesCreationService {
  private apiUrl = `${environment.apiUrl}/Incomes-Creation`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Incomes_Creation[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Incomes_Creation[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Incomes_Creation> {
    return this.http.get<Incomes_Creation>(`${this.apiUrl}/${id}`);
  }

  create(data: Incomes_Creation): Observable<Incomes_Creation> {
    return this.http.post<Incomes_Creation>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Incomes_Creation): Observable<Incomes_Creation> {
    return this.http.put<Incomes_Creation>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Incomes_Creation[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Incomes_Creation[]>(`${this.apiUrl}/search`, { params });
  }
}
