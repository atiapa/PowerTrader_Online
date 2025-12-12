import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TenantInfoComponent } from './components/tenant-info/tenant-info.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TenantInfoComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PowerTraderPOS-UI';

  constructor(public authService: AuthService) {}

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
