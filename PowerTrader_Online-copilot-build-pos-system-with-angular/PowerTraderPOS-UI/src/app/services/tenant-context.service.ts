import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface TenantContext {
  organisationCode: string;
  organisationName: string;
  branchCode: string;
  branchName: string;
  userId: string;
  userName: string;
  role: string; // Added role for permission checks
  isOrganisationAdmin: boolean; // Flag to identify org admins
}

@Injectable({
  providedIn: 'root'
})
export class TenantContextService {
  private readonly STORAGE_KEY = 'tenant_context';
  private tenantContextSubject: BehaviorSubject<TenantContext | null>;
  public tenantContext$: Observable<TenantContext | null>;

  constructor() {
    const storedContext = this.getStoredContext();
    this.tenantContextSubject = new BehaviorSubject<TenantContext | null>(storedContext);
    this.tenantContext$ = this.tenantContextSubject.asObservable();
  }

  // Set tenant context (called after login)
  setTenantContext(context: TenantContext): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(context));
    this.tenantContextSubject.next(context);
  }

  // Get current tenant context
  getTenantContext(): TenantContext | null {
    return this.tenantContextSubject.value;
  }

  // Get organisation code
  getOrganisationCode(): string {
    const context = this.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }
    return context.organisationCode;
  }

  // Get branch code
  getBranchCode(): string {
    const context = this.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }
    return context.branchCode;
  }

  // Get organisation name
  getOrganisationName(): string {
    const context = this.getTenantContext();
    return context?.organisationName || '';
  }

  // Get branch name
  getBranchName(): string {
    const context = this.getTenantContext();
    return context?.branchName || '';
  }

  // Get user ID
  getUserId(): string {
    const context = this.getTenantContext();
    return context?.userId || '';
  }

  // Get user name
  getUserName(): string {
    const context = this.getTenantContext();
    return context?.userName || '';
  }

  // Get user role
  getUserRole(): string {
    const context = this.getTenantContext();
    return context?.role || '';
  }

  // Check if user is organisation admin
  isOrganisationAdmin(): boolean {
    const context = this.getTenantContext();
    return context?.isOrganisationAdmin || false;
  }

  // Check if context is set
  hasContext(): boolean {
    return this.tenantContextSubject.value !== null;
  }

  // Clear tenant context (called on logout)
  clearTenantContext(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.tenantContextSubject.next(null);
  }

  // Get stored context from localStorage
  private getStoredContext(): TenantContext | null {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return null;
      }
    }
    return null;
  }

  // Add tenant parameters to any object
  addTenantInfo<T extends object>(data: T): T & { organisationCode: string; branchCode: string; organisationName: string; branchName: string } {
    const context = this.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }
    return {
      ...data,
      organisationCode: context.organisationCode,
      organisationName: context.organisationName,
      branchCode: context.branchCode,
      branchName: context.branchName
    };
  }

  // Get tenant query parameters for HTTP requests
  getTenantParams(): { organisationCode: string; branchCode: string } {
    const context = this.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }
    return {
      organisationCode: context.organisationCode,
      branchCode: context.branchCode
    };
  }

  // Get tenant query parameters with optional branch filtering
  // Organisation admins can optionally exclude branch filtering to see all branches
  getTenantParamsWithFilter(includeBranchFilter: boolean = true): { organisationCode: string; branchCode?: string } {
    const context = this.getTenantContext();
    if (!context) {
      throw new Error('Tenant context not set. User must be logged in.');
    }

    const params: { organisationCode: string; branchCode?: string } = {
      organisationCode: context.organisationCode
    };

    // Only include branch filter if requested or if user is not an org admin
    if (includeBranchFilter || !context.isOrganisationAdmin) {
      params.branchCode = context.branchCode;
    }

    return params;
  }
}
