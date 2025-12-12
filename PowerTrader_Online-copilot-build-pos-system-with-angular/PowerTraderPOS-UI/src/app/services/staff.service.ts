import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffInformation, AttendanceTbl, DutyRoaster } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = 'http://localhost:5000/api/Staff';

  constructor(
    private http: HttpClient,
    private tenantContext: TenantContextService
  ) { }

  private getTenantParams(): HttpParams {
    const tenant = this.tenantContext.getTenantParams();
    return new HttpParams()
      .set('organisationCode', tenant.organisationCode)
      .set('branchCode', tenant.branchCode);
  }

  // ============ STAFF INFORMATION ============

  // GET ALL Staff (scoped to tenant)
  getAll(): Observable<StaffInformation[]> {
    return this.http.get<StaffInformation[]>(this.apiUrl, { params: this.getTenantParams() });
  }

  // GET Staff by ID (scoped to tenant)
  getById(refNo: number): Observable<StaffInformation> {
    return this.http.get<StaffInformation>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Staff by Staff Code
  getByStaffCode(staffCode: string): Observable<StaffInformation> {
    return this.http.get<StaffInformation>(`${this.apiUrl}/code/${staffCode}`);
  }

  // GET Staff by Branch
  getByBranchCode(branchCode: string): Observable<StaffInformation[]> {
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/branch/${branchCode}`);
  }

  // GET Staff by Organisation
  getByOrganisation(organisationCode: string): Observable<StaffInformation[]> {
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/organisation/${organisationCode}`);
  }

  // GET Staff by Department
  getByDepartment(department: string): Observable<StaffInformation[]> {
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/department/${department}`);
  }

  // SEARCH Staff
  search(searchTerm: string): Observable<StaffInformation[]> {
    const params = new HttpParams().set('search', searchTerm);
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/search`, { params });
  }

  // CREATE Staff (auto-add tenant info)
  create(staff: StaffInformation): Observable<StaffInformation> {
    const staffWithTenant = this.tenantContext.addTenantInfo(staff);
    return this.http.post<StaffInformation>(this.apiUrl, staffWithTenant);
  }

  // UPDATE Staff (scoped to tenant)
  update(refNo: number, staff: StaffInformation): Observable<StaffInformation> {
    const staffWithTenant = this.tenantContext.addTenantInfo(staff);
    return this.http.put<StaffInformation>(`${this.apiUrl}/${refNo}`, staffWithTenant, { params: this.getTenantParams() });
  }

  // DELETE Staff (scoped to tenant)
  delete(refNo: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${refNo}`, { params: this.getTenantParams() });
  }

  // GET Active Staff
  getActiveStaff(): Observable<StaffInformation[]> {
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/active`);
  }

  // ============ ATTENDANCE ============

  // GET Attendance by Staff
  getAttendanceByStaff(staffCode: string, startDate?: Date, endDate?: Date): Observable<AttendanceTbl[]> {
    let params = new HttpParams();
    if (startDate) params = params.set('startDate', startDate.toISOString());
    if (endDate) params = params.set('endDate', endDate.toISOString());
    return this.http.get<AttendanceTbl[]>(`${this.apiUrl}/${staffCode}/attendance`, { params });
  }

  // MARK Attendance
  markAttendance(attendance: AttendanceTbl): Observable<AttendanceTbl> {
    return this.http.post<AttendanceTbl>(`${this.apiUrl}/attendance`, attendance);
  }

  // GET Today's Attendance
  getTodayAttendance(): Observable<AttendanceTbl[]> {
    return this.http.get<AttendanceTbl[]>(`${this.apiUrl}/attendance/today`);
  }

  // ============ DUTY ROASTER ============

  // GET Duty Roaster by Date Range
  getDutyRoaster(startDate: Date, endDate: Date): Observable<DutyRoaster[]> {
    const params = new HttpParams()
      .set('startDate', startDate.toISOString())
      .set('endDate', endDate.toISOString());
    return this.http.get<DutyRoaster[]>(`${this.apiUrl}/duty-roaster`, { params });
  }

  // CREATE Duty Roaster
  createDutyRoaster(roaster: DutyRoaster): Observable<DutyRoaster> {
    return this.http.post<DutyRoaster>(`${this.apiUrl}/duty-roaster`, roaster);
  }

  // UPDATE Duty Roaster
  updateDutyRoaster(refNo: number, roaster: DutyRoaster): Observable<DutyRoaster> {
    return this.http.put<DutyRoaster>(`${this.apiUrl}/duty-roaster/${refNo}`, roaster);
  }

  // GET Staff on Duty Today
  getStaffOnDutyToday(): Observable<DutyRoaster[]> {
    return this.http.get<DutyRoaster[]>(`${this.apiUrl}/duty-roaster/today`);
  }
}
