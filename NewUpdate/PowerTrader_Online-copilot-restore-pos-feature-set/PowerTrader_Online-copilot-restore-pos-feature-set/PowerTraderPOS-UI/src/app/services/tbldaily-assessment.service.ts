import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tblDaily_Assessment } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TbldailyAssessmentService {
  private apiUrl = `${environment.apiUrl}/tbldaily-assessment`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<tblDaily_Assessment[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<tblDaily_Assessment[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<tblDaily_Assessment> {
    return this.http.get<tblDaily_Assessment>(`${this.apiUrl}/${id}`);
  }

  create(data: tblDaily_Assessment): Observable<tblDaily_Assessment> {
    return this.http.post<tblDaily_Assessment>(`${this.apiUrl}`, data);
  }

  update(id: number, data: tblDaily_Assessment): Observable<tblDaily_Assessment> {
    return this.http.put<tblDaily_Assessment>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<tblDaily_Assessment[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<tblDaily_Assessment[]>(`${this.apiUrl}/search`, { params });
  }
}
