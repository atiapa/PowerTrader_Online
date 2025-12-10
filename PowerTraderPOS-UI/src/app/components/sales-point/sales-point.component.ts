import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Product, SaleItem, CreateSaleRequest } from '../../models/models';

@Component({
  selector: 'app-sales-point',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule
  ],
  templateUrl: './sales-point.component.html',
  styleUrl: './sales-point.component.scss'
})
export class SalesPointComponent implements OnInit {
  products: Product[] = [];
  cartItems: SaleItem[] = [];
  productCode: string = '';
  quantity: number = 1;
  paymentMethod: string = 'Cash';
  customerName: string = '';
  customerPhone: string = '';
  displayedColumns: string[] = ['product', 'quantity', 'unitPrice', 'total', 'actions'];
  
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.apiService.getProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (error) => {
        this.snackBar.open('Error loading products', 'Close', { duration: 3000 });
      }
    });
  }

  addToCart(): void {
    if (!this.productCode) {
      this.snackBar.open('Please scan or enter product code', 'Close', { duration: 3000 });
      return;
    }

    this.apiService.getProductByCode(this.productCode).subscribe({
      next: (product) => {
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
        
        this.productCode = '';
        this.quantity = 1;
        this.snackBar.open('Product added to cart', 'Close', { duration: 2000 });
      },
      error: (error) => {
        this.snackBar.open('Product not found', 'Close', { duration: 3000 });
      }
    });
  }

  removeFromCart(item: SaleItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
    }
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + item.totalPrice, 0);
  }

  getTax(): number {
    return this.getSubtotal() * 0.1; // 10% tax
  }

  getTotal(): number {
    return this.getSubtotal() + this.getTax();
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
        this.clearCart();
      },
      error: (error) => {
        this.snackBar.open('Error completing sale', 'Close', { duration: 3000 });
      }
    });
  }

  clearCart(): void {
    this.cartItems = [];
    this.customerName = '';
    this.customerPhone = '';
    this.paymentMethod = 'Cash';
  }

  logout(): void {
    this.authService.logout();
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }
}
