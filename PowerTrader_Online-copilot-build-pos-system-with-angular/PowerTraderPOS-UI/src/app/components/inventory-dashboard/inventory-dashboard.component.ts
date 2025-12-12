import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TenantContextService } from '../../services/tenant-context.service';
import { UniversalSidebarComponent, SidebarItem } from '../../shared/components/universal-sidebar.component';
import { StatsCardsComponent, StatCard } from '../../shared/components/stats-cards.component';
import { DataTableComponent, ColumnConfig } from '../../shared/components/data-table.component';
import { DateFilterComponent, DateFilter } from '../../shared/components/date-filter.component';
import { EmptyStateComponent } from '../../shared/components/empty-state.component';
import { LogoutModalComponent } from '../../shared/components/logout-modal.component';
import { PrintService } from '../../shared/services/print.service';

interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  costPrice: number;
  sellingPrice: number;
  stockQuantity: number;
  reorderLevel: number;
  status: string;
}

interface StockLevel {
  id: number;
  productName: string;
  warehouse: string;
  currentStock: number;
  reorderLevel: number;
  maxLevel: number;
  status: string;
}

interface StockTransfer {
  id: number;
  transferDate: Date;
  fromWarehouse: string;
  toWarehouse: string;
  productName: string;
  quantity: number;
  status: string;
}

interface StockAdjustment {
  id: number;
  adjustmentDate: Date;
  productName: string;
  warehouse: string;
  adjustmentType: string;
  quantity: number;
  reason: string;
  adjustedBy: string;
}

interface Warehouse {
  id: number;
  name: string;
  location: string;
  manager: string;
  capacity: number;
  currentStock: number;
  utilization: number;
}

interface LowStockAlert {
  id: number;
  productName: string;
  warehouse: string;
  currentStock: number;
  reorderLevel: number;
  severity: string;
}

interface ActivityLog {
  id: number;
  timestamp: Date;
  action: string;
  user: string;
  details: string;
}

@Component({
  selector: 'app-inventory-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatProgressBarModule,
    MatChipsModule,
    MatCardModule,
    MatMenuModule,
    MatTooltipModule,
    MatMenuModule,
    MatTooltipModule,
    UniversalSidebarComponent,
    StatsCardsComponent,
    DataTableComponent,
    DateFilterComponent
  ],
  templateUrl: './inventory-dashboard.component.html',
  styleUrl: './inventory-dashboard.component.scss'
})
export class InventoryDashboardComponent implements OnInit {
  // Inventory theme color: Yellow/Amber
  private readonly INVENTORY_COLOR = '#ffc107';

  sidebarItems: SidebarItem[] = [
    { icon: 'dashboard', label: 'Overview', action: 'overview', color: this.INVENTORY_COLOR },
    { icon: 'inventory_2', label: 'Products', action: 'products', color: '#ff9800' },
    { icon: 'warehouse', label: 'Stock Levels', action: 'stock', color: '#ffb300' },
    { icon: 'local_shipping', label: 'Receive Supplies', action: 'receive-supplies', color: '#9c27b0' },
    { icon: 'swap_horiz', label: 'Stock Transfers', action: 'transfers', color: '#ffa726' },
    { icon: 'tune', label: 'Stock Adjustments', action: 'adjustments', color: '#ffca28' },
    { icon: 'business', label: 'Warehouses', action: 'warehouses', color: '#ffd54f' },
    { icon: 'assessment', label: 'Reports', action: 'reports', color: '#ffe082' },
    { icon: 'warning', label: 'Low Stock Alerts', action: 'alerts', color: '#f44336', badge: 8 }
  ];

  statCards: StatCard[] = [
    { title: 'Total Products', value: 1245, icon: 'inventory_2', color: this.INVENTORY_COLOR, trend: 5 },
    { title: 'Total Stock Value', value: '$458,920', icon: 'attach_money', color: '#4caf50', trend: 8 },
    { title: 'Stock Items', value: '23.5K', icon: 'widgets', color: '#2196f3', subtitle: 'All warehouses' },
    { title: 'Low Stock Alerts', value: 8, icon: 'warning', color: '#f44336', trend: -12 }
  ];

  // Products
  productsColumns: ColumnConfig[] = [
    { key: 'sku', label: 'SKU', sortable: true },
    { key: 'name', label: 'Product Name', sortable: true },
    { key: 'category', label: 'Category', sortable: true },
    { key: 'costPrice', label: 'Cost Price', sortable: true, format: (val) => `$${val.toFixed(2)}` },
    { key: 'sellingPrice', label: 'Selling Price', sortable: true, format: (val) => `$${val.toFixed(2)}` },
    { key: 'stockQuantity', label: 'Stock Qty', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  productsData: Product[] = [
    { id: 1, sku: 'PRD001', name: 'Laptop Dell XPS 15', category: 'Electronics', costPrice: 1200, sellingPrice: 1599, stockQuantity: 45, reorderLevel: 20, status: 'In Stock' },
    { id: 2, sku: 'PRD002', name: 'Office Chair Ergonomic', category: 'Furniture', costPrice: 180, sellingPrice: 249, stockQuantity: 12, reorderLevel: 15, status: 'Low Stock' },
    { id: 3, sku: 'PRD003', name: 'Wireless Mouse Logitech', category: 'Accessories', costPrice: 25, sellingPrice: 39, stockQuantity: 156, reorderLevel: 50, status: 'In Stock' }
  ];

  // Stock Levels
  stockLevelsColumns: ColumnConfig[] = [
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'currentStock', label: 'Current Stock', sortable: true },
    { key: 'reorderLevel', label: 'Reorder Level', sortable: true },
    { key: 'maxLevel', label: 'Max Level', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  stockLevelsData: StockLevel[] = [
    { id: 1, productName: 'Laptop Dell XPS 15', warehouse: 'Main Warehouse', currentStock: 45, reorderLevel: 20, maxLevel: 100, status: 'Optimal' },
    { id: 2, productName: 'Office Chair Ergonomic', warehouse: 'Main Warehouse', currentStock: 12, reorderLevel: 15, maxLevel: 50, status: 'Low' },
    { id: 3, productName: 'Wireless Mouse Logitech', warehouse: 'Regional Warehouse', currentStock: 156, reorderLevel: 50, maxLevel: 200, status: 'Optimal' }
  ];

  // Stock Transfers
  transfersColumns: ColumnConfig[] = [
    { key: 'transferDate', label: 'Date', sortable: true, format: (val) => new Date(val).toLocaleDateString() },
    { key: 'fromWarehouse', label: 'From', sortable: true },
    { key: 'toWarehouse', label: 'To', sortable: true },
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'status', label: 'Status', sortable: true }
  ];

  transfersData: StockTransfer[] = [
    { id: 1, transferDate: new Date('2025-12-08'), fromWarehouse: 'Main Warehouse', toWarehouse: 'Regional Warehouse', productName: 'Laptop Dell XPS 15', quantity: 10, status: 'Completed' },
    { id: 2, transferDate: new Date('2025-12-09'), fromWarehouse: 'Regional Warehouse', toWarehouse: 'Branch Warehouse', productName: 'Office Chair', quantity: 5, status: 'Pending' }
  ];

  // Stock Adjustments
  adjustmentsColumns: ColumnConfig[] = [
    { key: 'adjustmentDate', label: 'Date', sortable: true, format: (val) => new Date(val).toLocaleDateString() },
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'adjustmentType', label: 'Type', sortable: true },
    { key: 'quantity', label: 'Quantity', sortable: true },
    { key: 'reason', label: 'Reason', sortable: true },
    { key: 'adjustedBy', label: 'Adjusted By', sortable: true }
  ];

  adjustmentsData: StockAdjustment[] = [
    { id: 1, adjustmentDate: new Date('2025-12-07'), productName: 'Laptop Dell XPS 15', warehouse: 'Main Warehouse', adjustmentType: 'Increase', quantity: 20, reason: 'New stock arrival', adjustedBy: 'John Doe' },
    { id: 2, adjustmentDate: new Date('2025-12-08'), productName: 'Wireless Mouse', warehouse: 'Regional Warehouse', adjustmentType: 'Decrease', quantity: 5, reason: 'Damaged items', adjustedBy: 'Jane Smith' }
  ];

  // Warehouses
  warehouses: Warehouse[] = [
    { id: 1, name: 'Main Warehouse', location: 'Downtown District', manager: 'John Doe', capacity: 10000, currentStock: 7500, utilization: 75 },
    { id: 2, name: 'Regional Warehouse', location: 'North Side', manager: 'Jane Smith', capacity: 8000, currentStock: 5200, utilization: 65 },
    { id: 3, name: 'Branch Warehouse', location: 'South District', manager: 'Mike Johnson', capacity: 5000, currentStock: 3800, utilization: 76 }
  ];

  // Low Stock Alerts
  alertsColumns: ColumnConfig[] = [
    { key: 'productName', label: 'Product', sortable: true },
    { key: 'warehouse', label: 'Warehouse', sortable: true },
    { key: 'currentStock', label: 'Current Stock', sortable: true },
    { key: 'reorderLevel', label: 'Reorder Level', sortable: true },
    { key: 'severity', label: 'Severity', sortable: true }
  ];

  alertsData: LowStockAlert[] = [
    { id: 1, productName: 'Office Chair Ergonomic', warehouse: 'Main Warehouse', currentStock: 12, reorderLevel: 15, severity: 'Warning' },
    { id: 2, productName: 'USB Cable Type-C', warehouse: 'Regional Warehouse', currentStock: 8, reorderLevel: 25, severity: 'Critical' },
    { id: 3, productName: 'Monitor Stand', warehouse: 'Branch Warehouse', currentStock: 18, reorderLevel: 20, severity: 'Info' }
  ];

  // Recent Activity
  recentActivity: ActivityLog[] = [
    { id: 1, timestamp: new Date('2025-12-10T10:30:00'), action: 'Stock Transfer', user: 'John Doe', details: 'Transferred 10 laptops from Main to Regional warehouse' },
    { id: 2, timestamp: new Date('2025-12-10T09:15:00'), action: 'Stock Adjustment', user: 'Jane Smith', details: 'Adjusted stock for Wireless Mouse (-5 units)' },
    { id: 3, timestamp: new Date('2025-12-10T08:45:00'), action: 'Product Added', user: 'Mike Johnson', details: 'Added new product: Gaming Keyboard RGB' },
    { id: 4, timestamp: new Date('2025-12-09T16:20:00'), action: 'Low Stock Alert', user: 'System', details: 'Alert generated for Office Chair Ergonomic' }
  ];

  activeView: string = 'overview';
  filteredData: any[] = [];
  currentFilter: DateFilter = { startDate: null, endDate: null };

  constructor(
    private authService: AuthService,
    private tenantContext: TenantContextService,
    private dialog: MatDialog,
    private router: Router,
    private printService: PrintService
  ) {}

  ngOnInit(): void {
    this.updateFilteredData();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  get organisationName() {
    return this.tenantContext.getOrganisationName();
  }

  get pendingTransfersCount(): number {
    return this.transfersData.filter(t => t.status === 'Pending').length;
  }

  get criticalAlertsCount(): number {
    return this.alertsData.filter(a => a.severity === 'Critical').length;
  }

  get warningAlertsCount(): number {
    return this.alertsData.filter(a => a.severity === 'Warning').length;
  }

  get infoAlertsCount(): number {
    return this.alertsData.filter(a => a.severity === 'Info').length;
  }

  onSidebarItemClick(item: SidebarItem): void {
    if (item.action) {
      // Handle navigation to Receive Supplies page
      if (item.action === 'receive-supplies') {
        this.router.navigate(['/receive-supplies']);
        return;
      }
      
      this.activeView = item.action;
      this.updateFilteredData();
    }
  }

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

  onFilterChange(filter: DateFilter): void {
    this.currentFilter = filter;
    this.applyDateFilter();
  }

  updateFilteredData(): void {
    switch (this.activeView) {
      case 'products':
        this.filteredData = [...this.productsData];
        break;
      case 'stock':
        this.filteredData = [...this.stockLevelsData];
        break;
      case 'transfers':
        this.filteredData = [...this.transfersData];
        break;
      case 'adjustments':
        this.filteredData = [...this.adjustmentsData];
        break;
      case 'alerts':
        this.filteredData = [...this.alertsData];
        break;
      default:
        this.filteredData = [];
    }
  }

  applyDateFilter(): void {
    if (!this.currentFilter.startDate || !this.currentFilter.endDate) {
      this.updateFilteredData();
      return;
    }

    const filterByDate = (item: any) => {
      const itemDate = new Date(item.transferDate || item.adjustmentDate || item.timestamp);
      return itemDate >= this.currentFilter.startDate! && itemDate <= this.currentFilter.endDate!;
    };

    switch (this.activeView) {
      case 'transfers':
        this.filteredData = this.transfersData.filter(filterByDate);
        break;
      case 'adjustments':
        this.filteredData = this.adjustmentsData.filter(filterByDate);
        break;
      default:
        this.updateFilteredData();
    }
  }

  printReport(reportType: string): void {
    let reportData: any;
    let title: string;

    switch (reportType) {
      case 'stockValuation':
        reportData = this.generateStockValuationReport();
        title = 'Stock Valuation Report';
        break;
      case 'stockMovement':
        reportData = this.generateStockMovementReport();
        title = 'Stock Movement Report';
        break;
      case 'lowStock':
        reportData = this.generateLowStockReport();
        title = 'Low Stock Report';
        break;
      case 'deadStock':
        reportData = this.generateDeadStockReport();
        title = 'Dead Stock Analysis Report';
        break;
      case 'warehouseSummary':
        reportData = this.generateWarehouseSummaryReport();
        title = 'Warehouse Summary Report';
        break;
      case 'reorderSuggestions':
        reportData = this.generateReorderSuggestionsReport();
        title = 'Reorder Suggestions Report';
        break;
      default:
        return;
    }

    this.printService.printReport(reportData, 'detailed', title);
  }

  exportToCSV(dataType: string): void {
    let data: any[] = [];
    switch (dataType) {
      case 'products':
        data = this.productsData;
        break;
      case 'stock':
        data = this.stockLevelsData;
        break;
      case 'transfers':
        data = this.transfersData;
        break;
      case 'adjustments':
        data = this.adjustmentsData;
        break;
      case 'alerts':
        data = this.alertsData;
        break;
    }
    this.printService.exportToCSV(data, `inventory_${dataType}_report`);
  }

  // Report Generation Methods
  private generateStockValuationReport(): any {
    const totalValue = this.productsData.reduce((sum, p) => sum + (p.stockQuantity * p.costPrice), 0);
    return {
      summary: {
        totalProducts: this.productsData.length,
        totalStockValue: `$${totalValue.toFixed(2)}`,
        totalStockItems: this.productsData.reduce((sum, p) => sum + p.stockQuantity, 0),
        averageItemValue: `$${(totalValue / this.productsData.length).toFixed(2)}`
      },
      items: this.productsData
    };
  }

  private generateStockMovementReport(): any {
    return {
      summary: {
        totalTransfers: this.transfersData.length,
        completedTransfers: this.transfersData.filter(t => t.status === 'Completed').length,
        pendingTransfers: this.transfersData.filter(t => t.status === 'Pending').length,
        totalQuantityMoved: this.transfersData.reduce((sum, t) => sum + t.quantity, 0)
      },
      items: this.transfersData
    };
  }

  private generateLowStockReport(): any {
    return {
      summary: {
        totalAlerts: this.alertsData.length,
        criticalAlerts: this.alertsData.filter(a => a.severity === 'Critical').length,
        warningAlerts: this.alertsData.filter(a => a.severity === 'Warning').length,
        infoAlerts: this.alertsData.filter(a => a.severity === 'Info').length
      },
      items: this.alertsData
    };
  }

  private generateDeadStockReport(): any {
    const deadStock = this.productsData.filter(p => p.stockQuantity > 100);
    return {
      summary: {
        totalDeadStockItems: deadStock.length,
        totalDeadStockValue: `$${deadStock.reduce((sum, p) => sum + (p.stockQuantity * p.costPrice), 0).toFixed(2)}`,
        percentageOfTotalStock: `${((deadStock.length / this.productsData.length) * 100).toFixed(2)}%`
      },
      items: deadStock
    };
  }

  private generateWarehouseSummaryReport(): any {
    return {
      summary: {
        totalWarehouses: this.warehouses.length,
        totalCapacity: this.warehouses.reduce((sum, w) => sum + w.capacity, 0),
        totalCurrentStock: this.warehouses.reduce((sum, w) => sum + w.currentStock, 0),
        averageUtilization: `${(this.warehouses.reduce((sum, w) => sum + w.utilization, 0) / this.warehouses.length).toFixed(2)}%`
      },
      items: this.warehouses
    };
  }

  private generateReorderSuggestionsReport(): any {
    const reorderSuggestions = this.stockLevelsData.filter(s => s.currentStock <= s.reorderLevel);
    return {
      summary: {
        totalReorderSuggestions: reorderSuggestions.length,
        estimatedReorderCost: '$15,420.00',
        urgentReorders: reorderSuggestions.filter(s => s.status === 'Low').length
      },
      items: reorderSuggestions
    };
  }

  dismissAlert(alertId: number): void {
    this.alertsData = this.alertsData.filter(a => a.id !== alertId);
    this.statCards[3].value = this.alertsData.length;
    if (this.activeView === 'alerts') {
      this.filteredData = [...this.alertsData];
    }
  }

  getColumns(): ColumnConfig[] {
    switch (this.activeView) {
      case 'products':
        return this.productsColumns;
      case 'stock':
        return this.stockLevelsColumns;
      case 'transfers':
        return this.transfersColumns;
      case 'adjustments':
        return this.adjustmentsColumns;
      case 'alerts':
        return this.alertsColumns;
      default:
        return [];
    }
  }

  addProduct(): void {
    console.log('Add product');
  }

  receiveStock(): void {
    this.router.navigate(['/receive-supplies']);
  }

  transferStock(): void {
    this.activeView = 'transfers';
  }
}
