import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';

export interface SidebarItem {
  icon: string;
  label: string;
  route?: string;
  action?: string;
  color?: string;
  badge?: number;
}

@Component({
  selector: 'app-universal-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule],
  template: `
    <div class="universal-sidebar" [class.collapsed]="collapsed">
      <div class="sidebar-header">
        <button mat-icon-button (click)="toggleSidebar()" class="toggle-btn">
          <mat-icon>{{ collapsed ? 'menu' : 'menu_open' }}</mat-icon>
        </button>
        @if (!collapsed) {
          <h3>{{ title }}</h3>
        }
      </div>

      <div class="sidebar-content">
        @for (item of items; track item.label) {
          <button 
            mat-button 
            class="sidebar-item"
            [class.active]="activeItem === item.label"
            [style.--item-color]="item.color || '#3f51b5'"
            (click)="onItemClick(item)"
            [matTooltip]="collapsed ? item.label : ''"
            matTooltipPosition="right">
            <mat-icon>{{ item.icon }}</mat-icon>
            @if (!collapsed) {
              <span class="item-label">{{ item.label }}</span>
              @if (item.badge) {
                <span class="badge">{{ item.badge }}</span>
              }
            }
          </button>
        }
      </div>

      <div class="sidebar-footer">
        <button 
          mat-button 
          class="sidebar-item logout-btn"
          (click)="onLogout()"
          [matTooltip]="collapsed ? 'Logout' : ''"
          matTooltipPosition="right">
          <mat-icon>logout</mat-icon>
          @if (!collapsed) {
            <span class="item-label">Logout</span>
          }
        </button>
      </div>
    </div>
  `,
  styles: [`
    .universal-sidebar {
      width: 250px;
      height: 100vh;
      background: linear-gradient(180deg, #1e3c72 0%, #2a5298 100%);
      color: white;
      display: flex;
      flex-direction: column;
      transition: width 0.3s ease;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
      position: fixed;
      left: 0;
      top: 0;
      z-index: 100;

      &.collapsed {
        width: 70px;

        .sidebar-header h3 {
          display: none;
        }

        .item-label, .badge {
          display: none;
        }
      }
    }

    .sidebar-header {
      padding: 20px;
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(255,255,255,0.1);

      .toggle-btn {
        color: white;
      }

      h3 {
        margin: 0;
        font-size: 18px;
        font-weight: 600;
      }
    }

    .sidebar-content {
      flex: 1;
      overflow-y: auto;
      padding: 16px 8px;

      &::-webkit-scrollbar {
        width: 6px;
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(255,255,255,0.3);
        border-radius: 3px;
      }
    }

    .sidebar-item {
      width: 100%;
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 12px 16px;
      margin-bottom: 8px;
      color: white;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 4px;
        background: var(--item-color, #3f51b5);
        transform: scaleY(0);
        transition: transform 0.3s ease;
      }

      &:hover {
        background: rgba(255,255,255,0.1);

        &::before {
          transform: scaleY(1);
        }
      }

      &.active {
        background: rgba(255,255,255,0.15);

        &::before {
          transform: scaleY(1);
        }
      }

      mat-icon {
        min-width: 24px;
      }

      .item-label {
        flex: 1;
        text-align: left;
      }

      .badge {
        background: #f44336;
        color: white;
        padding: 2px 8px;
        border-radius: 12px;
        font-size: 11px;
        font-weight: bold;
      }
    }

    .sidebar-footer {
      padding: 16px 8px;
      border-top: 1px solid rgba(255,255,255,0.1);

      .logout-btn {
        background: rgba(244, 67, 54, 0.2);

        &:hover {
          background: rgba(244, 67, 54, 0.3);
        }
      }
    }
  `]
})
export class UniversalSidebarComponent {
  @Input() title: string = 'Dashboard';
  @Input() items: SidebarItem[] = [];
  @Input() activeItem: string = '';
  @Output() itemClick = new EventEmitter<SidebarItem>();
  @Output() logoutClick = new EventEmitter<void>();

  collapsed: boolean = false;

  constructor(private router: Router) {}

  toggleSidebar(): void {
    this.collapsed = !this.collapsed;
  }

  onItemClick(item: SidebarItem): void {
    if (item.route) {
      this.router.navigate([item.route]);
    }
    this.itemClick.emit(item);
  }

  onLogout(): void {
    this.logoutClick.emit();
  }
}
