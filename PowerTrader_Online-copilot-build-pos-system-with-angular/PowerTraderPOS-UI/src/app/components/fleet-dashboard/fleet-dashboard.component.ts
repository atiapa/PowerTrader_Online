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
  selector: 'app-fleet-dashboard',
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
  templateUrl: './fleet-dashboard.component.html',
  styleUrl: './fleet-dashboard.component.scss'
})
export class FleetDashboardComponent {
  constructor(private authService: AuthService) {}
  
  get currentUser() { 
    return this.authService.currentUserValue; 
  }
  
  logout() { 
    this.authService.logout(); 
  }

  addVehicle(): void {
    console.log('Add vehicle');
  }

  scheduleService(): void {
    console.log('Schedule service');
  }

  logFuelEntry(): void {
    console.log('Log fuel entry');
  }
}
