import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fleet-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatToolbarModule],
  templateUrl: './fleet-dashboard.component.html',
  styleUrl: './fleet-dashboard.component.scss'
})
export class FleetDashboardComponent {
  constructor(private authService: AuthService) {}
  get currentUser() { return this.authService.currentUserValue; }
  logout() { this.authService.logout(); }
}
