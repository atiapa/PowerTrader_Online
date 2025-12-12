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
  selector: 'app-customers-dashboard',
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
  templateUrl: './customers-dashboard.component.html',
  styleUrl: './customers-dashboard.component.scss'
})
export class CustomersDashboardComponent {
  constructor(private authService: AuthService) {}
  
  get currentUser() { 
    return this.authService.currentUserValue; 
  }
  
  logout() { 
    this.authService.logout(); 
  }

  addCustomer(): void {
    console.log('Add customer');
  }

  createOrder(): void {
    console.log('Create order');
  }

  viewLoyalty(): void {
    console.log('View loyalty program');
  }
}
