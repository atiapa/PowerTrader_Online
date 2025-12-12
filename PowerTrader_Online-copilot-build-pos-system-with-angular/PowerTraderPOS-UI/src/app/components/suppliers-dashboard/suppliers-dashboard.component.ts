import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-suppliers-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule, MatMenuModule, MatTooltipModule],
  templateUrl: './suppliers-dashboard.component.html',
  styleUrl: './suppliers-dashboard.component.scss'
})
export class SuppliersDashboardComponent {
  constructor(private authService: AuthService) {}
  get currentUser() { return this.authService.currentUserValue; }
  logout() { this.authService.logout(); }

  addSupplier(): void {
    console.log('Add supplier');
  }

  createPurchaseOrder(): void {
    console.log('Create purchase order');
  }

  recordPayment(): void {
    console.log('Record payment');
  }
}
