import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-hr-dashboard',
  standalone: true,
  imports: [
    CommonModule, 
    MatCardModule, 
    MatButtonModule, 
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  templateUrl: './hr-dashboard.component.html',
  styleUrl: './hr-dashboard.component.scss'
})
export class HrDashboardComponent {
  constructor(private authService: AuthService) {}
  
  get currentUser() { 
    return this.authService.currentUserValue; 
  }
  
  logout() { 
    this.authService.logout(); 
  }

  addEmployee(): void {
    console.log('Add employee');
  }

  recordAttendance(): void {
    console.log('Record attendance');
  }

  createLeaveRequest(): void {
    console.log('Create leave request');
  }
}
