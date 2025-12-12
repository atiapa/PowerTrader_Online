import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-empty-state',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  template: `
    <div class="empty-state">
      <div class="empty-state-content">
        <mat-icon class="empty-icon">{{ icon }}</mat-icon>
        <h3>{{ title }}</h3>
        <p>{{ message }}</p>
        @if (actionLabel) {
          <button mat-raised-button color="primary" (click)="onAction()">
            <mat-icon>{{ actionIcon }}</mat-icon>
            {{ actionLabel }}
          </button>
        }
      </div>
    </div>
  `,
  styles: [`
    .empty-state {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      padding: 40px;
    }

    .empty-state-content {
      text-align: center;
      max-width: 500px;
    }

    .empty-icon {
      font-size: 120px;
      width: 120px;
      height: 120px;
      color: #9e9e9e;
      margin-bottom: 24px;
    }

    h3 {
      font-size: 24px;
      margin: 0 0 12px 0;
      color: #424242;
    }

    p {
      font-size: 16px;
      color: #757575;
      margin: 0 0 24px 0;
      line-height: 1.6;
    }

    button {
      mat-icon {
        margin-right: 8px;
      }
    }
  `]
})
export class EmptyStateComponent {
  @Input() icon: string = 'inbox';
  @Input() title: string = 'No Data Available';
  @Input() message: string = 'There is no data to display at the moment.';
  @Input() actionLabel: string = '';
  @Input() actionIcon: string = 'add';
  @Input() action?: () => void;

  onAction(): void {
    if (this.action) {
      this.action();
    }
  }
}
