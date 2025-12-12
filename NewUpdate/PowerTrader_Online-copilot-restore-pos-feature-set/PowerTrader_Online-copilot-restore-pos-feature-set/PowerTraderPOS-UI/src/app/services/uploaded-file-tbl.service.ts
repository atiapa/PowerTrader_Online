import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadedFile_Tbl } from '../models/database-models';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UploadedFileTblService {
  private apiUrl = `${environment.apiUrl}/uploaded-file-tbl`;

  constructor(private http: HttpClient) {}

  getAll(organisationId?: number, branchId?: number): Observable<UploadedFile_Tbl[]> {
    let params = new HttpParams();
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    if (branchId) params = params.set('branchId', branchId.toString());
    return this.http.get<UploadedFile_Tbl[]>(`${this.apiUrl}`, { params });
  }

  getById(id: number): Observable<UploadedFile_Tbl> {
    return this.http.get<UploadedFile_Tbl>(`${this.apiUrl}/${id}`);
  }

  create(data: UploadedFile_Tbl): Observable<UploadedFile_Tbl> {
    return this.http.post<UploadedFile_Tbl>(`${this.apiUrl}`, data);
  }

  update(id: number, data: UploadedFile_Tbl): Observable<UploadedFile_Tbl> {
    return this.http.put<UploadedFile_Tbl>(`${this.apiUrl}/${id}`, data);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(searchTerm: string, organisationId?: number): Observable<UploadedFile_Tbl[]> {
    let params = new HttpParams().set('search', searchTerm);
    if (organisationId) params = params.set('organisationId', organisationId.toString());
    return this.http.get<UploadedFile_Tbl[]>(`${this.apiUrl}/search`, { params });
  }
}
