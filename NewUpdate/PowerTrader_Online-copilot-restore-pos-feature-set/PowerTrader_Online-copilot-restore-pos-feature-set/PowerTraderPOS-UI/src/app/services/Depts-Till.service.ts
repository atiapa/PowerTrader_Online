import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Depts_Till } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DeptsTillService {
  private apiUrl = `${environment.apiUrl}/Depts-Till`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Depts_Till[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Depts_Till[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Depts_Till> {
    return this.http.get<Depts_Till>(`${this.apiUrl}/${id}`);
  }

  create(data: Depts_Till): Observable<Depts_Till> {
    return this.http.post<Depts_Till>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Depts_Till): Observable<Depts_Till> {
    return this.http.put<Depts_Till>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Depts_Till[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Depts_Till[]>(`${this.apiUrl}/search`, { params });
  }
}
