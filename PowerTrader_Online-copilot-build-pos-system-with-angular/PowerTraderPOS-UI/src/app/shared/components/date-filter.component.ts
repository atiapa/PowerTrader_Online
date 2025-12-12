import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

export interface DateFilter {
  startDate: Date | null;
  endDate: Date | null;
  preset?: string;
}

@Component({
  selector: 'app-date-filter',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule
  ],
  template: `
    <div class="date-filter-container">
      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>Preset</mat-label>
        <mat-select [(ngModel)]="selectedPreset" (selectionChange)="onPresetChange()">
          <mat-option value="today">Today</mat-option>
          <mat-option value="yesterday">Yesterday</mat-option>
          <mat-option value="last7days">Last 7 Days</mat-option>
          <mat-option value="last30days">Last 30 Days</mat-option>
          <mat-option value="thisMonth">This Month</mat-option>
          <mat-option value="lastMonth">Last Month</mat-option>
          <mat-option value="thisYear">This Year</mat-option>
          <mat-option value="custom">Custom Range</mat-option>
        </mat-select>
      </mat-form-field>

      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>Start Date</mat-label>
        <input matInput [matDatepicker]="startPicker" [(ngModel)]="filter.startDate" (dateChange)="onDateChange()">
        <mat-datepicker-toggle matIconSuffix [for]="startPicker"></mat-datepicker-toggle>
        <mat-datepicker #startPicker></mat-datepicker>
      </mat-form-field>

      <mat-form-field appearance="outline" class="filter-field">
        <mat-label>End Date</mat-label>
        <input matInput [matDatepicker]="endPicker" [(ngModel)]="filter.endDate" (dateChange)="onDateChange()">
        <mat-datepicker-toggle matIconSuffix [for]="endPicker"></mat-datepicker-toggle>
        <mat-datepicker #endPicker></mat-datepicker>
      </mat-form-field>

      <button mat-raised-button color="primary" (click)="applyFilter()">
        <mat-icon>filter_list</mat-icon>
        Apply Filter
      </button>

      <button mat-raised-button (click)="resetFilter()">
        <mat-icon>clear</mat-icon>
        Reset
      </button>
    </div>
  `,
  styles: [`
    .date-filter-container {
      display: flex;
      gap: 16px;
      align-items: center;
      flex-wrap: wrap;
      padding: 16px;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      margin-bottom: 24px;
    }

    .filter-field {
      min-width: 180px;
    }

    button {
      height: 56px;
    }

    @media (max-width: 768px) {
      .date-filter-container {
        flex-direction: column;
        align-items: stretch;
      }

      .filter-field, button {
        width: 100%;
      }
    }
  `]
})
export class DateFilterComponent {
  @Output() filterChange = new EventEmitter<DateFilter>();

  filter: DateFilter = {
    startDate: null,
    endDate: null,
    preset: 'thisMonth'
  };

  selectedPreset: string = 'thisMonth';

  ngOnInit(): void {
    this.onPresetChange();
  }

  onPresetChange(): void {
    const today = new Date();
    const start = new Date();
    const end = new Date();

    switch (this.selectedPreset) {
      case 'today':
        start.setHours(0, 0, 0, 0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'yesterday':
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);
        end.setDate(end.getDate() - 1);
        end.setHours(23, 59, 59, 999);
        break;
      case 'last7days':
        start.setDate(start.getDate() - 7);
        break;
      case 'last30days':
        start.setDate(start.getDate() - 30);
        break;
      case 'thisMonth':
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'lastMonth':
        start.setMonth(start.getMonth() - 1);
        start.setDate(1);
        start.setHours(0, 0, 0, 0);
        end.setDate(0);
        end.setHours(23, 59, 59, 999);
        break;
      case 'thisYear':
        start.setMonth(0, 1);
        start.setHours(0, 0, 0, 0);
        break;
      case 'custom':
        return;
    }

    this.filter.startDate = start;
    this.filter.endDate = end;
    this.filter.preset = this.selectedPreset;
  }

  onDateChange(): void {
    this.selectedPreset = 'custom';
    this.filter.preset = 'custom';
  }

  applyFilter(): void {
    this.filterChange.emit(this.filter);
  }

  resetFilter(): void {
    this.selectedPreset = 'thisMonth';
    this.onPresetChange();
    this.filterChange.emit(this.filter);
  }
}
