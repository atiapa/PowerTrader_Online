import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { OrganisationInformation, CreateOrganisationDto, UpdateOrganisationDto } from '../models/models';

/**
 * Service for managing organisation information
 * Handles CRUD operations and queries for Organisation_Information
 */
@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  private apiUrl = `${environment.apiUrl}/api/Organisation`;

  constructor(private http: HttpClient) { }

  /**
   * Get all organisations
   */
  getAll(): Observable<OrganisationInformation[]> {
    return this.http.get<OrganisationInformation[]>(this.apiUrl);
  }

  /**
   * Get organisation by reference number
   */
  getByRefNo(refNo: number): Observable<OrganisationInformation> {
    return this.http.get<OrganisationInformation>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Get organisation by organisation code
   */
  getByOrganisationCode(organisationCode: string): Observable<OrganisationInformation> {
    return this.http.get<OrganisationInformation>(`${this.apiUrl}/code/${organisationCode}`);
  }

  /**
   * Get organisations by country
   */
  getByCountry(country: string): Observable<OrganisationInformation[]> {
    const params = new HttpParams().set('country', country);
    return this.http.get<OrganisationInformation[]>(`${this.apiUrl}/by-country`, { params });
  }

  /**
   * Get organisations by region
   */
  getByRegion(region: string): Observable<OrganisationInformation[]> {
    const params = new HttpParams().set('region', region);
    return this.http.get<OrganisationInformation[]>(`${this.apiUrl}/by-region`, { params });
  }

  /**
   * Create new organisation
   */
  create(organisation: CreateOrganisationDto): Observable<OrganisationInformation> {
    return this.http.post<OrganisationInformation>(this.apiUrl, organisation);
  }

  /**
   * Update existing organisation
   */
  update(refNo: number, organisation: UpdateOrganisationDto): Observable<OrganisationInformation> {
    return this.http.put<OrganisationInformation>(`${this.apiUrl}/${refNo}`, organisation);
  }

  /**
   * Delete organisation
   */
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Search organisations
   */
  search(searchTerm: string): Observable<OrganisationInformation[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<OrganisationInformation[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get active organisations
   */
  getActive(): Observable<OrganisationInformation[]> {
    return this.http.get<OrganisationInformation[]>(`${this.apiUrl}/active`);
  }

  /**
   * Get branches for organisation
   */
  getBranches(organisationCode: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${organisationCode}/branches`);
  }
}
