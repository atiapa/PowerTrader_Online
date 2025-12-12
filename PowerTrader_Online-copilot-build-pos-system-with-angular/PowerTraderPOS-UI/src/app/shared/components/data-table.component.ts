import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectionModel } from '@angular/cdk/collections';

export interface ColumnConfig {
  key: string;
  label: string;
  sortable?: boolean;
  format?: (value: any) => string;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCheckboxModule
  ],
  template: `
    <div class="data-table-container">
      <div class="table-header">
        <mat-form-field appearance="outline" class="search-field">
          <mat-label>Search</mat-label>
          <input matInput [(ngModel)]="searchText" (input)="applyFilter()" placeholder="Search...">
          <mat-icon matSuffix>search</mat-icon>
        </mat-form-field>
        
        <div class="table-actions">
          @if (enableSelection && selection.hasValue()) {
            <span class="selection-count">{{ selection.selected.length }} selected</span>
          }
          <ng-content select="[actions]"></ng-content>
        </div>
      </div>

      <div class="table-wrapper">
        <table mat-table [dataSource]="dataSource" matSort class="data-table">
          @if (enableSelection) {
            <ng-container matColumnDef="select">
              <th mat-header-cell *matHeaderCellDef>
                <mat-checkbox
                  (change)="$event ? toggleAllRows() : null"
                  [checked]="selection.hasValue() && isAllSelected()"
                  [indeterminate]="selection.hasValue() && !isAllSelected()">
                </mat-checkbox>
              </th>
              <td mat-cell *matCellDef="let row">
                <mat-checkbox
                  (click)="$event.stopPropagation()"
                  (change)="$event ? selection.toggle(row) : null"
                  [checked]="selection.isSelected(row)">
                </mat-checkbox>
              </td>
            </ng-container>
          }

          @for (column of columns; track column.key) {
            <ng-container [matColumnDef]="column.key">
              @if (column.sortable !== false) {
                <th mat-header-cell *matHeaderCellDef [mat-sort-header]="column.key">
                  {{ column.label }}
                </th>
              } @else {
                <th mat-header-cell *matHeaderCellDef>
                  {{ column.label }}
                </th>
              }
              <td mat-cell *matCellDef="let row">
                {{ column.format ? column.format(row[column.key]) : row[column.key] }}
              </td>
            </ng-container>
          }

          @if (enableActions) {
            <ng-container matColumnDef="actions">
              <th mat-header-cell *matHeaderCellDef>Actions</th>
              <td mat-cell *matCellDef="let row">
                <button mat-icon-button (click)="onEdit(row)" matTooltip="Edit">
                  <mat-icon>edit</mat-icon>
                </button>
                <button mat-icon-button (click)="onDelete(row)" matTooltip="Delete" color="warn">
                  <mat-icon>delete</mat-icon>
                </button>
              </td>
            </ng-container>
          }

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;" (click)="onRowClick(row)" class="table-row"></tr>
        </table>
      </div>

      <mat-paginator
        [pageSizeOptions]="[10, 25, 50, 100]"
        showFirstLastButtons
        [pageSize]="pageSize">
      </mat-paginator>
    </div>
  `,
  styles: [`
    .data-table-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      gap: 16px;
      flex-wrap: wrap;
    }

    .search-field {
      min-width: 300px;
      flex: 1;
    }

    .table-actions {
      display: flex;
      gap: 12px;
      align-items: center;
    }

    .selection-count {
      padding: 8px 16px;
      background: #3f51b5;
      color: white;
      border-radius: 4px;
      font-weight: 500;
    }

    .table-wrapper {
      overflow-x: auto;
    }

    .data-table {
      width: 100%;

      th {
        background: #f5f5f5;
        font-weight: 600;
        color: #424242;
      }

      td, th {
        padding: 16px;
      }

      .table-row {
        cursor: pointer;
        transition: background-color 0.2s;

        &:hover {
          background-color: #f5f5f5;
        }
      }
    }

    mat-paginator {
      border-top: 1px solid #e0e0e0;
    }

    @media (max-width: 768px) {
      .table-header {
        flex-direction: column;
        align-items: stretch;
      }

      .search-field {
        min-width: auto;
        width: 100%;
      }

      .table-actions {
        justify-content: space-between;
      }
    }
  `]
})
export class DataTableComponent {
  @Input() columns: ColumnConfig[] = [];
  @Input() enableSelection: boolean = false;
  @Input() enableActions: boolean = false;
  @Input() pageSize: number = 25;
  
  @Input() set data(value: any[]) {
    this.dataSource.data = value || [];
  }

  @Output() rowClick = new EventEmitter<any>();
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() selectionChange = new EventEmitter<any[]>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  searchText: string = '';

  get displayedColumns(): string[] {
    const cols: string[] = [];
    if (this.enableSelection) cols.push('select');
    cols.push(...this.columns.map(c => c.key));
    if (this.enableActions) cols.push('actions');
    return cols;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(): void {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
    } else {
      this.dataSource.data.forEach(row => this.selection.select(row));
    }
    this.selectionChange.emit(this.selection.selected);
  }

  onRowClick(row: any): void {
    this.rowClick.emit(row);
  }

  onEdit(row: any): void {
    this.edit.emit(row);
  }

  onDelete(row: any): void {
    this.delete.emit(row);
  }
}
