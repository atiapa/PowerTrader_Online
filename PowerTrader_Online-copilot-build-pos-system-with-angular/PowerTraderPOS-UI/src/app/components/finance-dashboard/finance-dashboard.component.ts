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
  selector: 'app-finance-dashboard',
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
  templateUrl: './finance-dashboard.component.html',
  styleUrl: './finance-dashboard.component.scss'
})
export class FinanceDashboardComponent {
  constructor(private authService: AuthService) {}
  
  get currentUser() { 
    return this.authService.currentUserValue; 
  }
  
  logout() { 
    this.authService.logout(); 
  }

  createTransaction(): void {
    console.log('Create transaction');
  }

  createInvoice(): void {
    console.log('Create invoice');
  }

  recordPayment(): void {
    console.log('Record payment');
  }
}
