import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { LoginRequest, LoginResponse, User } from '../models/models';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api';
  private currentUserSubject: BehaviorSubject<User | null>;
  public currentUser: Observable<User | null>;

  // Mock user accounts for testing (based on users_tbl entity from database-models.ts)
  private mockUsers: Array<User & { pin: string }> = [
    { pin: '0000', id: 1, staffID: 'STF001', username: 'admin', password: 'admin123', ulevel: 1, isActive: true, fullName: 'System Administrator', role: 'Admin', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '1111', id: 2, staffID: 'STF002', username: 'sales', password: 'sales123', ulevel: 2, isActive: true, fullName: 'Sales User', role: 'Sales', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '2222', id: 3, staffID: 'STF003', username: 'finance', password: 'finance123', ulevel: 2, isActive: true, fullName: 'Finance Manager', role: 'Finance', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '3333', id: 4, staffID: 'STF004', username: 'hr', password: 'hr123', ulevel: 2, isActive: true, fullName: 'HR Manager', role: 'HR', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '4444', id: 5, staffID: 'STF005', username: 'fleet', password: 'fleet123', ulevel: 2, isActive: true, fullName: 'Fleet Manager', role: 'Fleet', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '5555', id: 6, staffID: 'STF006', username: 'service', password: 'service123', ulevel: 2, isActive: true, fullName: 'Service Manager', role: 'Service', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '6666', id: 7, staffID: 'STF007', username: 'suppliers', password: 'suppliers123', ulevel: 2, isActive: true, fullName: 'Suppliers Manager', role: 'Suppliers', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 },
    { pin: '7777', id: 8, staffID: 'STF008', username: 'customers', password: 'customers123', ulevel: 2, isActive: true, fullName: 'Customers Manager', role: 'Customers', tenantId: 1, tenantName: 'Adinkra PowerTrader', organisationId: 1, branchId: 1 }
  ];

  constructor(private http: HttpClient, private router: Router) {
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
    // Check mock users first
    const mockUser = this.mockUsers.find(u => u.pin === pin);
    
    if (mockUser) {
      // Simulate successful login with mock user (using users_tbl entity structure)
      const { pin: _, ...userWithoutPin } = mockUser; // Remove pin from user object
      const user: User = userWithoutPin;

      const response: LoginResponse = {
        token: 'mock-token-' + Date.now(),
        user: user,
        expiresIn: 3600
      };

      localStorage.setItem('token', response.token);
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);

      return new Observable(observer => {
        observer.next(response);
        observer.complete();
      });
    }

    // Fallback to API call if no mock user found
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login-pin`, { pin })
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  login(username: string, pin: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/Auth/login`, { username, pin } as LoginRequest)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response.user));
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
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
