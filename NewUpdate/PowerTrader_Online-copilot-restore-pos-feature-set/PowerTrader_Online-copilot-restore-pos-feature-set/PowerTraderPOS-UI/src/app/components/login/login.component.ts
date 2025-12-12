import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatGridListModule,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  pin: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  onPinInput(digit: string): void {
    if (this.pin.length < 4) {
      this.pin += digit;
      
      // Auto-login when 4 digits are entered
      if (this.pin.length === 4) {
        setTimeout(() => this.login(), 300);
      }
    }
  }

  clearPin(): void {
    this.pin = '';
  }

  login(): void {
    if (this.pin.length !== 4) {
      this.snackBar.open('Please enter 4-digit PIN', 'Close', {
        duration: 3000
      });
      return;
    }

    this.loading = true;
    this.authService.loginWithPin(this.pin).subscribe({
      next: (response) => {
        this.loading = false;
        // Route based on user role
        switch (response.user.role) {
          case 'Admin':
            this.router.navigate(['/admin']);
            break;
          case 'Finance':
            this.router.navigate(['/finance']);
            break;
          case 'HR':
            this.router.navigate(['/hr']);
            break;
          case 'Fleet':
            this.router.navigate(['/fleet']);
            break;
          case 'Service':
            this.router.navigate(['/service']);
            break;
          case 'Suppliers':
            this.router.navigate(['/suppliers']);
            break;
          case 'Customers':
            this.router.navigate(['/customers']);
            break;
          case 'Sales':
          default:
            this.router.navigate(['/sales']);
            break;
        }
      },
      error: (error: any) => {
        this.loading = false;
        this.snackBar.open('Invalid PIN', 'Close', {
          duration: 3000
        });
        this.clearPin();
      }
    });
  }
}
