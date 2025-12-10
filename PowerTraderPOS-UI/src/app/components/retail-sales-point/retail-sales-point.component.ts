import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Product, SaleItem, CreateSaleRequest } from '../../models/models';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-retail-sales-point',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatBadgeModule,
    MatDialogModule,
    MatGridListModule,
    MatChipsModule
  ],
  templateUrl: './retail-sales-point.component.html',
  styleUrl: './retail-sales-point.component.scss'
})
export class RetailSalesPointComponent implements OnInit {
  // Product and Category Management
  allProducts: Product[] = [];
  filteredProducts: Product[] = [];
  categories: Category[] = [
    { id: 1, name: 'All Products' },
    { id: 2, name: 'Electronics' },
    { id: 3, name: 'Groceries' },
    { id: 4, name: 'Clothing' },
    { id: 5, name: 'Home & Garden' },
    { id: 6, name: 'Sports' }
  ];
  selectedCategoryId: number = 1;
  
  // Cart Management
  cartItems: SaleItem[] = [];
  
  // Search and Input
  searchTerm: string = '';
  barcodeInput: string = '';
  
  // Payment
  paymentMethod: string = 'Cash';
  paymentMethods = ['Cash', 'Card', 'Mobile Money', 'Bank Transfer'];
  
  // Customer Info
  customerName: string = '';
  customerPhone: string = '';
  
  // UI State
  isLoading: boolean = false;
  showCheckout: boolean = false;
  
  // Numeric Keypad
  quantity: number = 1;
  
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.isLoading = true;
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filterProducts();
        this.isLoading = false;
      },
      error: (error) => {
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  filterProducts(): void {
    let products = this.allProducts;
    
    // Filter by category
    if (this.selectedCategoryId !== 1) {
      // In a real implementation, filter by actual category
      products = products;
    }
    
    // Filter by search term
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(term) ||
        p.code?.toLowerCase().includes(term)
      );
    }
    
    this.filteredProducts = products;
  }

  onCategoryChange(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.filterProducts();
  }

  onSearchChange(): void {
    this.filterProducts();
  }

  onBarcodeSearch(): void {
    if (!this.barcodeInput.trim()) {
      return;
    }
    
    this.apiService.getProductByCode(this.barcodeInput).subscribe({
      next: (product) => {
        this.addProductToCart(product);
        this.barcodeInput = '';
      },
      error: (error) => {
        this.snackBar.open('Product not found', 'Close', { duration: 3000 });
        this.barcodeInput = '';
      }
    });
  }

  addProductToCart(product: Product): void {
    const existingItem = this.cartItems.find(item => item.productCode === product.code);
    
    if (existingItem) {
      existingItem.quantity += this.quantity;
      existingItem.totalPrice = existingItem.quantity * existingItem.unitPrice;
      existingItem.netPrice = existingItem.totalPrice - existingItem.discountAmount;
    } else {
      const totalPrice = product.price * this.quantity;
      this.cartItems.push({
        productName: product.name,
        productCode: product.code,
        quantity: this.quantity,
        unitPrice: product.price,
        totalPrice: totalPrice,
        discountAmount: 0,
        netPrice: totalPrice
      });
    }
    
    this.quantity = 1;
    this.showFeedback('Product added to cart');
  }

  updateQuantity(item: SaleItem, change: number): void {
    item.quantity += change;
    if (item.quantity < 1) {
      item.quantity = 1;
    }
    item.totalPrice = item.quantity * item.unitPrice;
    item.netPrice = item.totalPrice - item.discountAmount;
  }

  removeFromCart(item: SaleItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.showFeedback('Item removed from cart');
    }
  }

  clearCart(): void {
    if (this.cartItems.length > 0) {
      if (confirm('Are you sure you want to clear the cart?')) {
        this.cartItems = [];
        this.customerName = '';
        this.customerPhone = '';
        this.showFeedback('Cart cleared');
      }
    }
  }

  // Numeric Keypad Functions
  setQuantity(value: number): void {
    this.quantity = value;
  }

  // Calculation Functions
  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.1; // 10% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }

  // Checkout Functions
  openCheckout(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Cart is empty', 'Close', { duration: 3000 });
      return;
    }
    this.showCheckout = true;
  }

  closeCheckout(): void {
    this.showCheckout = false;
  }

  completeSale(): void {
    if (this.cartItems.length === 0) {
      this.snackBar.open('Cart is empty', 'Close', { duration: 3000 });
      return;
    }

    if (!this.paymentMethod) {
      this.snackBar.open('Please select payment method', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;
    const subtotal = this.getSubtotal();
    const tax = this.getTax();
    const total = this.getTotal();

    const saleRequest: CreateSaleRequest = {
      totalAmount: subtotal,
      taxAmount: tax,
      discountAmount: 0,
      netAmount: total,
      paymentMethod: this.paymentMethod,
      customerName: this.customerName || undefined,
      customerPhone: this.customerPhone || undefined,
      items: this.cartItems
    };

    this.apiService.createSale(saleRequest).subscribe({
      next: (sale) => {
        this.snackBar.open(`Sale completed! Transaction: ${sale.transactionNumber}`, 'Close', { 
          duration: 5000 
        });
        this.resetSale();
      },
      error: (error) => {
        this.snackBar.open('Error completing sale. Please try again.', 'Close', { 
          duration: 3000 
        });
        this.isLoading = false;
      }
    });
  }

  resetSale(): void {
    this.cartItems = [];
    this.customerName = '';
    this.customerPhone = '';
    this.paymentMethod = 'Cash';
    this.showCheckout = false;
    this.isLoading = false;
  }

  // Utility Functions
  showFeedback(message: string): void {
    this.snackBar.open(message, '', { duration: 1500 });
  }

  logout(): void {
    this.authService.logout();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }
}
