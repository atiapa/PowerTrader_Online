import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

export interface StatCard {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: number;
  subtitle?: string;
}

@Component({
  selector: 'app-stats-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule],
  template: `
    <div class="stats-grid">
      @for (card of cards; track card.title) {
        <mat-card class="stat-card" [style.--card-color]="card.color">
          <div class="stat-content">
            <div class="stat-icon">
              <mat-icon>{{ card.icon }}</mat-icon>
            </div>
            <div class="stat-details">
              <p class="stat-title">{{ card.title }}</p>
              <h2 class="stat-value">{{ card.value }}</h2>
              @if (card.subtitle) {
                <p class="stat-subtitle">{{ card.subtitle }}</p>
              }
              @if (card.trend !== undefined) {
                <div class="stat-trend" [class.positive]="card.trend > 0" [class.negative]="card.trend < 0">
                  <mat-icon>{{ card.trend > 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
                  <span>{{ card.trend > 0 ? '+' : '' }}{{ card.trend }}%</span>
                </div>
              }
            </div>
          </div>
        </mat-card>
      }
    </div>
  `,
  styles: [`
    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 24px;
    }

    .stat-card {
      padding: 24px;
      cursor: pointer;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      background: linear-gradient(135deg, var(--card-color, #3f51b5) 0%, color-mix(in srgb, var(--card-color, #3f51b5) 80%, black) 100%);
      color: white;

      &:hover {
        transform: translateY(-4px);
        box-shadow: 0 8px 24px rgba(0,0,0,0.15);
      }
    }

    .stat-content {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }

    .stat-icon {
      width: 60px;
      height: 60px;
      background: rgba(255,255,255,0.2);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;

      mat-icon {
        font-size: 32px;
        width: 32px;
        height: 32px;
      }
    }

    .stat-details {
      flex: 1;
    }

    .stat-title {
      margin: 0 0 8px 0;
      font-size: 14px;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .stat-value {
      margin: 0 0 4px 0;
      font-size: 32px;
      font-weight: bold;
    }

    .stat-subtitle {
      margin: 0;
      font-size: 12px;
      opacity: 0.8;
    }

    .stat-trend {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-top: 8px;
      font-size: 14px;
      font-weight: 500;

      mat-icon {
        font-size: 18px;
        width: 18px;
        height: 18px;
      }

      &.positive {
        color: #4caf50;
      }

      &.negative {
        color: #f44336;
      }
    }

    @media (max-width: 768px) {
      .stats-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class StatsCardsComponent {
  @Input() cards: StatCard[] = [];
}
