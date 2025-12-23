import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { 
  AtcTbl, 
  CreateAtcDto, 
  UpdateAtcDto 
} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class AtcService {
  private apiUrl = `${environment.apiUrl}/api/ATC`;

  constructor(private http: HttpClient) {}

  /**
   * Get all ATC records
   * @param fromDate Optional start date filter
   * @param toDate Optional end date filter
   * @returns Observable of ATC list
   */
  getAll(fromDate?: Date, toDate?: Date): Observable<AtcTbl[]> {
    let params = new HttpParams();
    if (fromDate) {
      params = params.set('fromDate', fromDate.toISOString());
    }
    if (toDate) {
      params = params.set('toDate', toDate.toISOString());
    }
    return this.http.get<AtcTbl[]>(this.apiUrl, { params });
  }

  /**
   * Get ATC by reference number
   * @param refNo ATC reference number
   * @returns Observable of ATC record
   */
  getByRefNo(refNo: number): Observable<AtcTbl> {
    return this.http.get<AtcTbl>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Get ATC by ATC number
   * @param atcNumber ATC number
   * @returns Observable of ATC record
   */
  getByAtcNumber(atcNumber: string): Observable<AtcTbl> {
    return this.http.get<AtcTbl>(`${this.apiUrl}/number/${atcNumber}`);
  }

  /**
   * Get ATC records by invoice number
   * @param invoiceNr Invoice number
   * @returns Observable of ATC list
   */
  getByInvoiceNumber(invoiceNr: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('invoiceNr', invoiceNr);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/invoice`, { params });
  }

  /**
   * Get ATC records by driver
   * @param driversID Driver ID
   * @returns Observable of ATC list
   */
  getByDriver(driversID: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('driversID', driversID);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/driver`, { params });
  }

  /**
   * Get ATC records by vehicle plate number
   * @param plateNumber Vehicle plate number
   * @returns Observable of ATC list
   */
  getByPlateNumber(plateNumber: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('plateNumber', plateNumber);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/vehicle`, { params });
  }

  /**
   * Get ATC records by fleet number
   * @param fleetNumber Fleet number
   * @returns Observable of ATC list
   */
  getByFleetNumber(fleetNumber: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('fleetNumber', fleetNumber);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/fleet`, { params });
  }

  /**
   * Create new ATC record
   * @param atc ATC creation data
   * @returns Observable of created ATC
   */
  create(atc: CreateAtcDto): Observable<AtcTbl> {
    return this.http.post<AtcTbl>(this.apiUrl, atc);
  }

  /**
   * Update existing ATC record
   * @param refNo ATC reference number
   * @param atc Updated ATC data
   * @returns Observable of updated ATC
   */
  update(refNo: number, atc: UpdateAtcDto): Observable<AtcTbl> {
    return this.http.put<AtcTbl>(`${this.apiUrl}/${refNo}`, atc);
  }

  /**
   * Delete ATC record
   * @param refNo ATC reference number
   * @returns Observable of void
   */
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`);
  }

  /**
   * Search ATC records
   * @param searchTerm Search term (searches ATC number, driver name, plate number)
   * @returns Observable of ATC list
   */
  search(searchTerm: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('searchTerm', searchTerm);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/search`, { params });
  }

  /**
   * Get ATC records with expiring insurance
   * @param daysBeforeExpiry Number of days before expiry to check
   * @returns Observable of ATC list
   */
  getExpiringInsurance(daysBeforeExpiry: number = 30): Observable<AtcTbl[]> {
    const params = new HttpParams().set('days', daysBeforeExpiry.toString());
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/expiring-insurance`, { params });
  }

  /**
   * Get ATC records with expiring roadworthy certificate
   * @param daysBeforeExpiry Number of days before expiry to check
   * @returns Observable of ATC list
   */
  getExpiringRoadworthy(daysBeforeExpiry: number = 30): Observable<AtcTbl[]> {
    const params = new HttpParams().set('days', daysBeforeExpiry.toString());
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/expiring-roadworthy`, { params });
  }

  /**
   * Calculate fuel requirements for ATC
   * @param refNo ATC reference number
   * @returns Observable of fuel calculation result
   */
  calculateFuel(refNo: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${refNo}/calculate-fuel`, {});
  }

  /**
   * Get ATC report for date range
   * @param fromDate Start date
   * @param toDate End date
   * @returns Observable of ATC report
   */
  getReport(fromDate: Date, toDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString());
    return this.http.get(`${this.apiUrl}/report`, { params });
  }

  /**
   * Get ATC records by organization
   * @param organization Organization name
   * @returns Observable of ATC list
   */
  getByOrganization(organization: string): Observable<AtcTbl[]> {
    const params = new HttpParams().set('organization', organization);
    return this.http.get<AtcTbl[]>(`${this.apiUrl}/organization`, { params });
  }

  /**
   * Get distance summary for vehicle
   * @param plateNumber Vehicle plate number
   * @param fromDate Start date
   * @param toDate End date
   * @returns Observable of distance summary
   */
  getDistanceSummary(plateNumber: string, fromDate: Date, toDate: Date): Observable<any> {
    const params = new HttpParams()
      .set('plateNumber', plateNumber)
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString());
    return this.http.get(`${this.apiUrl}/distance-summary`, { params });
  }
}
