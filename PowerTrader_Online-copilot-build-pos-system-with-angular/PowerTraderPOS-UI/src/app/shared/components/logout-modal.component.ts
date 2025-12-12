import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-logout-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  template: `
    <div class="logout-modal">
      <div class="modal-header">
        <mat-icon class="warning-icon">logout</mat-icon>
        <h2 mat-dialog-title>Confirm Logout</h2>
      </div>
      <mat-dialog-content>
        <p>Are you sure you want to logout? Any unsaved changes will be lost.</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button (click)="onCancel()">
          <mat-icon>close</mat-icon>
          Cancel
        </button>
        <button mat-raised-button color="warn" (click)="onConfirm()">
          <mat-icon>logout</mat-icon>
          Logout
        </button>
      </mat-dialog-actions>
    </div>
  `,
  styles: [`
    .logout-modal {
      min-width: 400px;
    }

    .modal-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 16px;
      padding: 24px;

      .warning-icon {
        font-size: 64px;
        width: 64px;
        height: 64px;
        color: #f44336;
      }

      h2 {
        margin: 0;
        font-size: 24px;
      }
    }

    mat-dialog-content {
      text-align: center;
      padding: 0 24px 24px;

      p {
        font-size: 16px;
        color: #757575;
        line-height: 1.6;
      }
    }

    mat-dialog-actions {
      padding: 16px 24px;
      gap: 12px;

      button {
        mat-icon {
          margin-right: 8px;
        }
      }
    }

    @media (max-width: 768px) {
      .logout-modal {
        min-width: auto;
        width: 100%;
      }
    }
  `]
})
export class LogoutModalComponent {
  constructor(public dialogRef: MatDialogRef<LogoutModalComponent>) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
