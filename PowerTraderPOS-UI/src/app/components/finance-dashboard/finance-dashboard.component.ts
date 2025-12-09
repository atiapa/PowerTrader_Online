import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-finance-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Finance Dashboard - {{currentUser?.fullName}}</span>
      <span class="spacer"></span>
      <button mat-raised-button color="accent" (click)="logout()">Logout</button>
    </mat-toolbar>
    <div class="dashboard-container">
      <h1>Finance Dashboard</h1>
      <div class="dashboard-grid">
        <mat-card>
          <mat-card-header><mat-card-title>Revenue Reports</mat-card-title></mat-card-header>
          <mat-card-content><p>View revenue and sales reports</p></mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-header><mat-card-title>Expenses</mat-card-title></mat-card-header>
          <mat-card-content><p>Track and manage expenses</p></mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-header><mat-card-title>Payments</mat-card-title></mat-card-header>
          <mat-card-content><p>Process and track payments</p></mat-card-content>
        </mat-card>
        <mat-card>
          <mat-card-header><mat-card-title>Financial Reports</mat-card-title></mat-card-header>
          <mat-card-content><p>Generate financial statements</p></mat-card-content>
        </mat-card>
      </div>
    </div>
  `,
  styles: [`
    .spacer { flex: 1 1 auto; }
    .dashboard-container { padding: 20px; }
    .dashboard-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin-top: 20px; }
    mat-card { cursor: pointer; transition: transform 0.2s; }
    mat-card:hover { transform: translateY(-5px); box-shadow: 0 8px 16px rgba(0,0,0,0.2); }
  `]
})
export class FinanceDashboardComponent {
  constructor(private authService: AuthService) {}
  get currentUser() { return this.authService.currentUserValue; }
  logout() { this.authService.logout(); }
}
