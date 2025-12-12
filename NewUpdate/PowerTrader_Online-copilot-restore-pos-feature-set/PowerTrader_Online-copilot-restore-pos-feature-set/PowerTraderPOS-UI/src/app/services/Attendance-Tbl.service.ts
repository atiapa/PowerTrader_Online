import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Attendance_Tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttendanceTblService {
  private apiUrl = `${environment.apiUrl}/Attendance-Tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<Attendance_Tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<Attendance_Tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<Attendance_Tbl> {
    return this.http.get<Attendance_Tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: Attendance_Tbl): Observable<Attendance_Tbl> {
    return this.http.post<Attendance_Tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: Attendance_Tbl): Observable<Attendance_Tbl> {
    return this.http.put<Attendance_Tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<Attendance_Tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<Attendance_Tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
