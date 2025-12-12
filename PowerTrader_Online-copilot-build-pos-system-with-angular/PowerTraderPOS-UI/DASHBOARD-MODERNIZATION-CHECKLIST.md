# Dashboard Modernization Checklist

Use this checklist when updating each remaining dashboard with universal UI features.

## 📋 Pre-Implementation

- [ ] Read UNIVERSAL-DASHBOARD-FEATURES.md
- [ ] Review UNIVERSAL-DASHBOARD-QUICK-START.md
- [ ] Study Admin Dashboard implementation
- [ ] Identify module-specific requirements
- [ ] Plan 6 report types for the module
- [ ] Backup existing dashboard files

---

## 🔧 Implementation Steps

### Step 1: TypeScript Component (30 minutes)

- [ ] Import all shared components:
  ```typescript
  import { UniversalSidebarComponent, SidebarItem } from '../../shared/components/universal-sidebar.component';
  import { StatsCardsComponent, StatCard } from '../../shared/components/stats-cards.component';
  import { DataTableComponent, ColumnConfig } from '../../shared/components/data-table.component';
  import { DateFilterComponent, DateFilter } from '../../shared/components/date-filter.component';
  import { EmptyStateComponent } from '../../shared/components/empty-state.component';
  import { LogoutModalComponent } from '../../shared/components/logout-modal.component';
  import { PrintService } from '../../shared/services/print.service';
  ```

- [ ] Import Material modules:
  ```typescript
  import { MatDialog, MatDialogModule } from '@angular/material/dialog';
  import { MatButtonModule } from '@angular/material/button';
  import { MatIconModule } from '@angular/material/icon';
  import { MatTabsModule } from '@angular/material/tabs';
  ```

- [ ] Add components to imports array (standalone components)

- [ ] Inject services in constructor:
  ```typescript
  constructor(
    private authService: AuthService,
    private tenantContext: TenantContextService,
    private dialog: MatDialog,
    private router: Router,
    private printService: PrintService
  ) {}
  ```

- [ ] Create sidebar items (4-6 items with colors):
  ```typescript
  sidebarItems: SidebarItem[] = [
    { icon: 'dashboard', label: 'Overview', action: 'overview', color: '#3f51b5' },
    // Add 3-5 more items
  ];
  ```

- [ ] Design statistics cards (4 cards):
  ```typescript
  statCards: StatCard[] = [
    { title: 'Metric 1', value: 0, icon: 'icon_name', color: '#3f51b5', trend: 0 },
    // Add 3 more cards
  ];
  ```

- [ ] Configure table columns:
  ```typescript
  tableColumns: ColumnConfig[] = [
    { key: 'column1', label: 'Label 1', sortable: true },
    { key: 'date', label: 'Date', sortable: true, format: (val) => new Date(val).toLocaleDateString() },
    // Add more columns
  ];
  ```

- [ ] Add sample data array
- [ ] Create activeView property
- [ ] Add filtered data array
- [ ] Implement ngOnInit()
- [ ] Add currentUser getter
- [ ] Add organisationName getter
- [ ] Implement onSidebarItemClick()
- [ ] Implement onLogout() with modal:
  ```typescript
  onLogout(): void {
    const dialogRef = this.dialog.open(LogoutModalComponent, {
      width: '400px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.logout();
        this.router.navigate(['/login']);
      }
    });
  }
  ```

- [ ] Implement onFilterChange()
- [ ] Implement applyDateFilter()

- [ ] Create 6 report methods:
  ```typescript
  printReport(reportType: string): void {
    let reportData: any;
    let title: string;
    switch (reportType) {
      case 'report1': 
        reportData = this.generateReport1();
        title = 'Report 1 Title';
        break;
      // Add 5 more cases
    }
    this.printService.printReport(reportData, 'detailed', title);
  }
  ```

- [ ] Implement 6 report generation methods:
  ```typescript
  private generateReport1(): any {
    return {
      summary: {
        key1: 'value1',
        // Add more summary items
      },
      items: this.filteredData
    };
  }
  // Add 5 more methods
  ```

- [ ] Add exportToCSV() method

### Step 2: HTML Template (30 minutes)

- [ ] Replace entire template with universal layout:
  ```html
  <div class="dashboard-layout">
    <app-universal-sidebar
      [title]="'Dashboard Name'"
      [items]="sidebarItems"
      [activeItem]="activeView"
      (itemClick)="onSidebarItemClick($event)"
      (logoutClick)="onLogout()">
    </app-universal-sidebar>

    <div class="main-content">
      <!-- Content here -->
    </div>
  </div>
  ```

- [ ] Add content header:
  ```html
  <div class="content-header">
    <div class="header-info">
      <h1>Dashboard Name</h1>
      <p class="subtitle">{{ organisationName }} - {{ currentUser?.fullName }}</p>
    </div>
  </div>
  ```

- [ ] Add overview section:
  ```html
  @if (activeView === 'overview') {
    <div class="overview-section">
      <app-stats-cards [cards]="statCards"></app-stats-cards>
      
      <div class="reports-section">
        <div class="section-header">
          <h2>6 Core Reports</h2>
          <div class="report-actions">
            <button mat-raised-button color="primary" (click)="printReport('report1')">
              <mat-icon>print</mat-icon> Report 1
            </button>
            <!-- Add 5 more report buttons -->
          </div>
        </div>
      </div>
    </div>
  }
  ```

- [ ] Add reports view:
  ```html
  @if (activeView === 'reports') {
    <div class="reports-view">
      <app-date-filter (filterChange)="onFilterChange($event)"></app-date-filter>
      
      @if (filteredData.length > 0) {
        <app-data-table
          [columns]="tableColumns"
          [data]="filteredData"
          [enableActions]="true"
          [enableSelection]="true">
          <div actions>
            <button mat-raised-button color="primary" (click)="exportToCSV('data')">
              <mat-icon>download</mat-icon> Export CSV
            </button>
          </div>
        </app-data-table>
      } @else {
        <app-empty-state
          [icon]="'inbox'"
          [title]="'No Data'"
          [message]="'No data available for the selected date range.'">
        </app-empty-state>
      }
    </div>
  }
  ```

- [ ] Add empty state sections for other views:
  ```html
  @if (activeView === 'section1') {
    <div class="section1-view">
      <h2>Section 1</h2>
      <app-empty-state
        [icon]="'icon_name'"
        [title]="'Title'"
        [message]="'Description of what will be here.'"
        [actionLabel]="'Action Button'"
        [actionIcon]="'add'">
      </app-empty-state>
    </div>
  }
  ```

- [ ] Repeat empty state sections for all sidebar items

### Step 3: SCSS Styles (20 minutes)

- [ ] Replace entire SCSS with universal layout:
  ```scss
  .dashboard-layout {
    display: flex;
    min-height: 100vh;
    background: #f5f7fa;
  }

  .main-content {
    margin-left: 250px;
    flex: 1;
    padding: 24px;
    transition: margin-left 0.3s ease;

    @media (max-width: 1024px) {
      margin-left: 70px;
    }

    @media (max-width: 768px) {
      margin-left: 0;
      padding: 16px;
    }
  }
  ```

- [ ] Add content header styles:
  ```scss
  .content-header {
    margin-bottom: 32px;

    .header-info {
      h1 {
        font-size: 32px;
        font-weight: 700;
        color: #1e293b;
        margin: 0 0 8px 0;
      }

      .subtitle {
        font-size: 16px;
        color: #64748b;
        margin: 0;
      }
    }
  }
  ```

- [ ] Add overview section styles:
  ```scss
  .overview-section {
    .reports-section {
      margin-top: 24px;
      padding: 24px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);

      .section-header {
        h2 {
          font-size: 20px;
          font-weight: 600;
          margin: 0 0 20px 0;
          color: #1e293b;
        }

        .report-actions {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;

          button {
            height: 56px;
            font-size: 14px;
            font-weight: 500;

            mat-icon {
              margin-right: 8px;
            }
          }
        }
      }
    }
  }
  ```

- [ ] Add section heading styles:
  ```scss
  .reports-view,
  .section1-view,
  .section2-view {
    h2 {
      font-size: 24px;
      font-weight: 600;
      margin: 0 0 24px 0;
      color: #1e293b;
    }
  }
  ```

- [ ] Add mobile responsive styles:
  ```scss
  @media (max-width: 768px) {
    .content-header {
      .header-info h1 {
        font-size: 24px;
      }

      .subtitle {
        font-size: 14px;
      }
    }

    .overview-section {
      .reports-section {
        padding: 16px;

        .section-header {
          .report-actions {
            grid-template-columns: 1fr;
          }
        }
      }
    }
  }
  ```

- [ ] Add print styles:
  ```scss
  @media print {
    .dashboard-layout {
      display: block;
    }

    app-universal-sidebar {
      display: none;
    }

    .main-content {
      margin-left: 0;
      padding: 0;
    }

    button {
      display: none;
    }
  }
  ```

---

## 🧪 Testing (20 minutes)

- [ ] Check TypeScript compilation (no errors)
- [ ] Test sidebar navigation (all items)
- [ ] Verify stats cards display correctly
- [ ] Test collapsible sidebar
- [ ] Click all 6 report buttons
- [ ] Test date filter (all presets)
- [ ] Test table sorting (all columns)
- [ ] Test table search/filter
- [ ] Test table pagination
- [ ] Test row selection
- [ ] Test CSV export
- [ ] Test logout modal (cancel and confirm)
- [ ] Test on desktop (1920x1080)
- [ ] Test on tablet (768x1024)
- [ ] Test on mobile (375x667)
- [ ] Test print preview
- [ ] Verify multi-tenant data filtering
- [ ] Check console for errors/warnings
- [ ] Verify responsive breakpoints
- [ ] Test all empty state displays

---

## 📝 Documentation (10 minutes)

- [ ] Update component JSDoc comments
- [ ] Document module-specific features
- [ ] Add inline code comments for complex logic
- [ ] List the 6 reports in comments
- [ ] Document any custom formatters
- [ ] Note any special configurations

---

## ✅ Final Verification

- [ ] Run `ng build` - no errors
- [ ] Run `ng serve` - application loads
- [ ] All routes accessible
- [ ] No console errors
- [ ] No console warnings
- [ ] Stats show correct data
- [ ] Reports generate correctly
- [ ] Tables sort and filter properly
- [ ] Export works correctly
- [ ] Mobile view is functional
- [ ] Print preview looks good
- [ ] Logout works properly

---

## 📊 Dashboard-Specific Requirements

### Finance Dashboard
**Sidebar Items**: Overview, Revenue, Expenses, Reports, Budget, Settings  
**Stats Cards**: Total Revenue, Total Expenses, Net Profit, Cash Balance  
**6 Reports**: Income Statement, Balance Sheet, Cash Flow, Expense Analysis, Revenue by Category, Tax Summary

### HR Dashboard
**Sidebar Items**: Overview, Employees, Attendance, Leave, Payroll, Reports  
**Stats Cards**: Total Employees, Present Today, Leave Pending, Payroll This Month  
**6 Reports**: Employee Directory, Attendance Report, Leave Balance, Payroll Summary, Performance Review, Department Headcount

### Fleet Dashboard
**Sidebar Items**: Overview, Vehicles, Maintenance, Trips, Fuel, Reports  
**Stats Cards**: Total Vehicles, Active Trips, Maintenance Due, Fuel This Month  
**6 Reports**: Fleet Overview, Maintenance History, Fuel Consumption, Trip Details, Driver Performance, Vehicle Utilization

### Service Dashboard
**Sidebar Items**: Overview, Orders, Customers, Technicians, Parts, Reports  
**Stats Cards**: Active Orders, Completed Today, Customer Requests, Available Technicians  
**6 Reports**: Service Orders, Customer History, Technician Performance, Parts Usage, Service Revenue, Pending Jobs

### Suppliers Dashboard
**Sidebar Items**: Overview, Suppliers, Orders, Payments, Deliveries, Reports  
**Stats Cards**: Total Suppliers, Active POs, Payment Due, On-Time Delivery Rate  
**6 Reports**: Supplier Directory, Purchase Orders, Payment Due, Delivery Performance, Quality Assessment, Supplier Comparison

### Customers Dashboard
**Sidebar Items**: Overview, Customers, Sales, Receivables, Loyalty, Reports  
**Stats Cards**: Total Customers, Active Customers, Outstanding Balance, Loyalty Members  
**6 Reports**: Customer Directory, Sales by Customer, Outstanding Receivables, Loyalty Points, Customer Segmentation, Top Customers

---

## 🎯 Time Estimates

- **Step 1 (TypeScript)**: 30 minutes
- **Step 2 (HTML)**: 30 minutes
- **Step 3 (SCSS)**: 20 minutes
- **Testing**: 20 minutes
- **Documentation**: 10 minutes
- **Buffer**: 10 minutes

**Total per dashboard**: ~2 hours

---

## 💡 Tips

1. **Copy from Admin Dashboard**: Use admin dashboard as template
2. **Consistent Colors**: Use the established color palette
3. **Meaningful Icons**: Choose appropriate Material icons
4. **Real Data**: Replace mock data with actual service calls later
5. **Test Early**: Test after each step, don't wait until end
6. **Mobile First**: Check mobile responsiveness as you build
7. **Documentation**: Add comments as you code, not after
8. **Commit Often**: Git commit after each major step

---

## 🐛 Common Issues

**Issue**: Sidebar not showing  
**Solution**: Check import statement and component usage in template

**Issue**: Stats cards empty  
**Solution**: Verify statCards array has all required properties

**Issue**: Table not sorting  
**Solution**: Check MatSortModule import and ViewChild configuration

**Issue**: Print opens but blank  
**Solution**: Verify report data structure and PrintService configuration

**Issue**: Mobile layout broken  
**Solution**: Check responsive breakpoints and media queries

**Issue**: TypeScript errors  
**Solution**: Ensure all interfaces imported correctly

---

## 📦 Helpful Code Snippets

### Quick Report Template
```typescript
private generateSampleReport(): any {
  return {
    summary: {
      totalCount: this.filteredData.length,
      totalAmount: this.filteredData.reduce((sum, item) => sum + (item.amount || 0), 0),
      date: new Date().toLocaleDateString()
    },
    items: this.filteredData
  };
}
```

### Date Formatter
```typescript
format: (val) => val ? new Date(val).toLocaleDateString() : '-'
```

### Currency Formatter
```typescript
format: (val) => val ? `$${val.toFixed(2)}` : '$0.00'
```

### Number Formatter
```typescript
format: (val) => val ? val.toLocaleString() : '0'
```

---

## ✨ Quality Checklist

- [ ] Code is clean and readable
- [ ] No hardcoded values (use constants)
- [ ] Proper TypeScript types everywhere
- [ ] Consistent naming conventions
- [ ] No console.log statements
- [ ] Error handling implemented
- [ ] Loading states handled
- [ ] Empty states appropriate
- [ ] Responsive on all screen sizes
- [ ] Accessible (keyboard navigation)
- [ ] Print-friendly
- [ ] Multi-tenant aware
- [ ] Performance optimized

---

**Last Updated**: ${new Date().toLocaleDateString()}  
**Use this checklist for**: Finance, HR, Fleet, Service, Suppliers, Customers dashboards  
**Reference Implementation**: Admin Dashboard (src/app/components/admin-dashboard/)
