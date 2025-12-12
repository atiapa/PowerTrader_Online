import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, of, throwError } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/models';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import mockUsers from '../data/mock-users.json';
import { TenantContextService } from './tenant-context.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;
  private useMockData = true; // Set to false to use real API

  constructor(
    private http: HttpClient, 
    private router: Router,
    private tenantContext: TenantContextService
  ) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User | null {
    return this.currentUserSubject.value;
  }

  loginWithPin(pin: string): Observable<LoginResponse> {
    if (this.useMockData) {
      return this.mockLoginWithPin(pin);
    }
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login-pin`, { pin })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          const user: User = {
            userId: response.userId,
            username: response.username,
            fullName: response.fullName,
            role: response.role,
            tenantId: response.tenantId,
            tenantName: response.tenantName,
            organisationCode: response.organisationCode,
            organisationName: response.organisationName,
            branchCode: response.branchCode,
            branchName: response.branchName
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // Set tenant context with role and admin flag
          const adminRoles = ['Admin', 'OrganisationAdmin', 'SuperAdmin'];
          this.tenantContext.setTenantContext({
            organisationCode: response.organisationCode,
            organisationName: response.organisationName,
            branchCode: response.branchCode,
            branchName: response.branchName,
            userId: response.userId.toString(),
            userName: response.username,
            role: response.role,
            isOrganisationAdmin: adminRoles.includes(response.role)
          });
        })
      );
  }

  login(username: string, pin: string): Observable<LoginResponse> {
    if (this.useMockData) {
      return this.mockLogin(username, pin);
    }
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, { username, pin } as LoginRequest)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          const user: User = {
            userId: response.userId,
            username: response.username,
            fullName: response.fullName,
            role: response.role,
            tenantId: response.tenantId,
            tenantName: response.tenantName,
            organisationCode: response.organisationCode,
            organisationName: response.organisationName,
            branchCode: response.branchCode,
            branchName: response.branchName
          };
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          
          // Set tenant context with role and admin flag
          const adminRoles = ['Admin', 'OrganisationAdmin', 'SuperAdmin'];
          this.tenantContext.setTenantContext({
            organisationCode: response.organisationCode,
            organisationName: response.organisationName,
            branchCode: response.branchCode,
            branchName: response.branchName,
            userId: response.userId.toString(),
            userName: response.username,
            role: response.role,
            isOrganisationAdmin: adminRoles.includes(response.role)
          });
        })
      );
  }

  private mockLoginWithPin(pin: string): Observable<LoginResponse> {
    // Find user in mock data by PIN only
    const foundUser = mockUsers.users.find(u => u.pin === pin);

    // If user not found, return error
    if (!foundUser) {
      return throwError(() => new Error('Invalid PIN')).pipe(delay(500));
    }

    // Create response
    const response: LoginResponse = {
      token: foundUser.token,
      userId: foundUser.userId,
      username: foundUser.username,
      fullName: foundUser.fullName,
      role: foundUser.role,
      tenantId: foundUser.tenantId,
      tenantName: foundUser.tenantName,
      organisationCode: foundUser.organisationCode,
      organisationName: foundUser.organisationName,
      branchCode: foundUser.branchCode,
      branchName: foundUser.branchName
    };

    // Simulate network delay and store user data
    return of(response).pipe(
      delay(500),
      tap(response => {
        localStorage.setItem('token', response.token);
        const user: User = {
          userId: response.userId,
          username: response.username,
          fullName: response.fullName,
          role: response.role,
          tenantId: response.tenantId,
          tenantName: response.tenantName,
          organisationCode: response.organisationCode,
          organisationName: response.organisationName,
          branchCode: response.branchCode,
          branchName: response.branchName
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        // Set tenant context with role and admin flag
        const adminRoles = ['Admin', 'OrganisationAdmin', 'SuperAdmin'];
        this.tenantContext.setTenantContext({
          organisationCode: response.organisationCode,
          organisationName: response.organisationName,
          branchCode: response.branchCode,
          branchName: response.branchName,
          userId: response.userId.toString(),
          userName: response.username,
          role: response.role,
          isOrganisationAdmin: adminRoles.includes(response.role)
        });
      })
    );
  }

  private mockLogin(username: string, pin: string): Observable<LoginResponse> {
    // Find user in mock data
    const foundUser = mockUsers.users.find(
      u => u.username.toLowerCase() === username.toLowerCase() && u.pin === pin
    );

    // If user not found, return error
    if (!foundUser) {
      return throwError(() => new Error('Invalid username or PIN')).pipe(delay(500));
    }

    // Create response
    const response: LoginResponse = {
      token: foundUser.token,
      userId: foundUser.userId,
      username: foundUser.username,
      fullName: foundUser.fullName,
      role: foundUser.role,
      tenantId: foundUser.tenantId,
      tenantName: foundUser.tenantName,
      organisationCode: foundUser.organisationCode,
      organisationName: foundUser.organisationName,
      branchCode: foundUser.branchCode,
      branchName: foundUser.branchName
    };

    // Simulate network delay and store user data
    return of(response).pipe(
      delay(500),
      tap(resp => {
        localStorage.setItem('token', resp.token);
        const user: User = {
          userId: resp.userId,
          username: resp.username,
          fullName: resp.fullName,
          role: resp.role,
          tenantId: resp.tenantId,
          tenantName: resp.tenantName,
          organisationCode: resp.organisationCode,
          organisationName: resp.organisationName,
          branchCode: resp.branchCode,
          branchName: resp.branchName
        };
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        
        // Set tenant context with role and admin flag
        const adminRoles = ['Admin', 'OrganisationAdmin', 'SuperAdmin'];
        this.tenantContext.setTenantContext({
          organisationCode: resp.organisationCode,
          organisationName: resp.organisationName,
          branchCode: resp.branchCode,
          branchName: resp.branchName,
          userId: resp.userId.toString(),
          userName: resp.username,
          role: resp.role,
          isOrganisationAdmin: adminRoles.includes(resp.role)
        });
      })
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.tenantContext.clearTenantContext();
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
