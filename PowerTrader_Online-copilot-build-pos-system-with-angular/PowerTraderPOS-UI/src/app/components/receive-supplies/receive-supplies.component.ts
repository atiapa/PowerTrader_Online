import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

interface SupplyItem {
  id: number;
  productName: string;
  sku: string;
  category: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  expiryDate?: string;
  batchNumber?: string;
}

interface UploadedInvoice {
  file: File;
  preview: string;
  size: string;
  uploadDate: Date;
}

@Component({
  selector: 'app-receive-supplies',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './receive-supplies.component.html',
  styleUrls: ['./receive-supplies.component.scss']
})
export class ReceiveSuppliesComponent implements OnInit {
  // Purchase Order Details
  invoiceRef: string = `INV-${Date.now().toString().slice(-8)}`;
  receiveDate: Date = new Date();
  supplierName: string = '';
  warehouseName: string = '';
  
  // Supply Items
  supplyItems: SupplyItem[] = [];
  
  // New Item Form
  newItem: SupplyItem = {
    id: 1,
    productName: '',
    sku: '',
    category: '',
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
    expiryDate: '',
    batchNumber: ''
  };
  
  // Invoice Upload
  uploadedInvoice: UploadedInvoice | null = null;
  isDragging: boolean = false;
  maxFileSize: number = 10 * 1024 * 1024; // 10MB
  
  // Dropdowns
  suppliers: string[] = [
    'ABC Suppliers Ltd.',
    'Global Trading Co.',
    'Premium Imports Inc.',
    'Local Distributors',
    'Quality Wholesale'
  ];
  
  warehouses: string[] = [
    'Main Warehouse',
    'Regional Warehouse',
    'Branch Warehouse',
    'Cold Storage Unit',
    'Distribution Center'
  ];
  
  categories: string[] = [
    'Electronics',
    'Office Supplies',
    'Furniture',
    'Consumables',
    'Equipment',
    'Raw Materials'
  ];
  
  // Table columns
  displayedColumns: string[] = [
    'productName',
    'sku',
    'category',
    'quantity',
    'unitPrice',
    'totalPrice',
    'expiryDate',
    'batchNumber',
    'actions'
  ];
  
  // Print Modal
  showPrintModal: boolean = false;

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Load sample data for demonstration
    this.loadSampleData();
  }

  loadSampleData(): void {
    this.supplierName = 'ABC Suppliers Ltd.';
    this.warehouseName = 'Main Warehouse';
    
    this.supplyItems = [
      {
        id: 1,
        productName: 'Wireless Mouse',
        sku: 'TECH-001',
        category: 'Electronics',
        quantity: 50,
        unitPrice: 25.00,
        totalPrice: 1250.00,
        expiryDate: '',
        batchNumber: 'BATCH-2024-001'
      },
      {
        id: 2,
        productName: 'Office Chair Executive',
        sku: 'FURN-045',
        category: 'Furniture',
        quantity: 20,
        unitPrice: 150.00,
        totalPrice: 3000.00,
        expiryDate: '',
        batchNumber: 'BATCH-2024-002'
      },
      {
        id: 3,
        productName: 'Printer Ink Cartridge',
        sku: 'CONS-089',
        category: 'Consumables',
        quantity: 100,
        unitPrice: 35.00,
        totalPrice: 3500.00,
        expiryDate: '2026-12-31',
        batchNumber: 'BATCH-2024-003'
      }
    ];
  }

  // Calculate totals
  get subtotal(): number {
    return this.supplyItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  get taxAmount(): number {
    return this.subtotal * 0.10; // 10% tax
  }

  get totalAmount(): number {
    return this.subtotal + this.taxAmount;
  }

  get totalItems(): number {
    return this.supplyItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Add new item to supplies
  addItem(): void {
    if (!this.newItem.productName || !this.newItem.sku || this.newItem.quantity <= 0 || this.newItem.unitPrice <= 0) {
      this.showNotification('Please fill all required fields', 'warning');
      return;
    }

    this.newItem.totalPrice = this.newItem.quantity * this.newItem.unitPrice;
    this.newItem.id = this.supplyItems.length + 1;
    
    this.supplyItems = [...this.supplyItems, { ...this.newItem }];
    
    // Reset form
    this.newItem = {
      id: this.supplyItems.length + 1,
      productName: '',
      sku: '',
      category: '',
      quantity: 0,
      unitPrice: 0,
      totalPrice: 0,
      expiryDate: '',
      batchNumber: ''
    };
    
    this.showNotification('Item added successfully', 'success');
  }

  // Remove item
  removeItem(id: number): void {
    this.supplyItems = this.supplyItems.filter(item => item.id !== id);
    this.showNotification('Item removed', 'info');
  }

  // Calculate total price when quantity or unit price changes
  calculateItemTotal(): void {
    this.newItem.totalPrice = this.newItem.quantity * this.newItem.unitPrice;
  }

  // Invoice Upload Handlers
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.processFile(input.files[0]);
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragging = false;

    if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
      this.processFile(event.dataTransfer.files[0]);
    }
  }

  processFile(file: File): void {
    // Validate file size
    if (file.size > this.maxFileSize) {
      this.showNotification('File size exceeds 10MB limit', 'error');
      return;
    }

    // Validate file type
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      this.showNotification('Only PNG, JPG, and PDF files are allowed', 'error');
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.uploadedInvoice = {
        file: file,
        preview: e.target.result,
        size: this.formatFileSize(file.size),
        uploadDate: new Date()
      };
      this.showNotification('Invoice uploaded successfully', 'success');
    };
    reader.readAsDataURL(file);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  }

  removeInvoice(): void {
    this.uploadedInvoice = null;
    this.showNotification('Invoice removed', 'info');
  }

  viewInvoice(): void {
    if (this.uploadedInvoice) {
      window.open(this.uploadedInvoice.preview, '_blank');
    }
  }

  printInvoice(): void {
    if (this.uploadedInvoice) {
      const printWindow = window.open(this.uploadedInvoice.preview, '_blank');
      printWindow?.print();
    }
  }

  triggerFileInput(): void {
    const fileInput = document.getElementById('invoice-file-input') as HTMLInputElement;
    fileInput?.click();
  }

  // Clear all data
  clearAll(): void {
    if (confirm('Are you sure you want to clear all items? This action cannot be undone.')) {
      this.supplyItems = [];
      this.uploadedInvoice = null;
      this.newItem = {
        id: 1,
        productName: '',
        sku: '',
        category: '',
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0,
        expiryDate: '',
        batchNumber: ''
      };
      this.showNotification('All data cleared', 'info');
    }
  }

  // Open print preview modal
  openPrintPreview(): void {
    this.showPrintModal = true;
    // Scroll to top when modal opens
    setTimeout(() => {
      document.querySelector('.print-modal')?.scrollTo(0, 0);
    }, 100);
  }

  // Close print modal
  closePrintModal(): void {
    this.showPrintModal = false;
  }

  // Print receipt report
  printReceipt(): void {
    window.print();
  }

  // Save receipt
  saveReceipt(): void {
    if (this.supplyItems.length === 0) {
      this.showNotification('Please add at least one item', 'warning');
      return;
    }

    if (!this.supplierName || !this.warehouseName) {
      this.showNotification('Please select supplier and warehouse', 'warning');
      return;
    }

    // Simulate save operation
    this.showNotification('Receipt saved successfully!', 'success');
    
    // Redirect after save
    setTimeout(() => {
      this.router.navigate(['/inventory']);
    }, 2000);
  }

  // Navigate back
  goBack(): void {
    this.router.navigate(['/inventory']);
  }

  // Show notification
  showNotification(message: string, type: 'success' | 'error' | 'warning' | 'info'): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: [`snackbar-${type}`]
    });
  }
}
