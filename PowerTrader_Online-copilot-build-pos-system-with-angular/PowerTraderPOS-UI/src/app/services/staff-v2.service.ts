import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffInformation } from '../models/database-models';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';

/**
 * StaffService - Multi-Tenant Implementation
 * 
 * Extends BaseService for automatic multi-tenant data isolation.
 * All staff queries are filtered by OrganisationCode and BranchCode.
 * 
 * - Regular users: Can only see staff from their branch
 * - Organisation admins: Can see staff across all branches and manage transfers
 */
@Injectable({
  providedIn: 'root'
})
export class StaffServiceV2 extends BaseService<StaffInformation> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Staff');
  }

  /**
   * Get staff by employee ID (scoped to tenant)
   */
  getByEmployeeId(employeeId: string): Observable<StaffInformation> {
    const options = this.getRequestOptions();
    return this.http.get<StaffInformation>(`${this.apiUrl}/employee/${employeeId}`, options);
  }

  /**
   * Get staff by department (scoped to tenant)
   */
  getByDepartment(department: string): Observable<StaffInformation[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('department', department);
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/department`, { ...options, params });
  }

  /**
   * Get staff by position (scoped to tenant)
   */
  getByPosition(position: string): Observable<StaffInformation[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('position', position);
    return this.http.get<StaffInformation[]>(`${this.apiUrl}/position`, { ...options, params });
  }

  /**
   * Get active staff members (scoped to tenant)
   */
  getActiveStaff(): Observable<StaffInformation[]> {
    return this.getActive();
  }

  /**
   * Transfer staff to another branch (organisation admin only)
   */
  transferStaff(
    employeeId: string,
    toBranchCode: string,
    effectiveDate: Date,
    notes?: string
  ): Observable<{ success: boolean; message: string }> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Only organisation administrators can transfer staff between branches');
    }

    const options = this.getRequestOptions(false);
    return this.http.post<{ success: boolean; message: string }>(
      `${this.apiUrl}/transfer`,
      {
        employeeId,
        toBranchCode,
        effectiveDate: effectiveDate.toISOString(),
        notes,
        organisationCode: this.tenantContext.getOrganisationCode()
      },
      options
    );
  }

  /**
   * Get staff attendance records (scoped to tenant)
   */
  getAttendance(employeeId: string, fromDate: Date, toDate: Date): Observable<any[]> {
    const options = this.getRequestOptions();
    let params = options.params
      .set('fromDate', fromDate.toISOString())
      .set('toDate', toDate.toISOString());
    
    return this.http.get<any[]>(`${this.apiUrl}/${employeeId}/attendance`, { ...options, params });
  }

  /**
   * Get staff leave records (scoped to tenant)
   */
  getLeaveRecords(employeeId: string, year?: number): Observable<any[]> {
    const options = this.getRequestOptions();
    let params = options.params;
    
    if (year) {
      params = params.set('year', year.toString());
    }
    
    return this.http.get<any[]>(`${this.apiUrl}/${employeeId}/leave`, { ...options, params });
  }
}
