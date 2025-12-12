import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { RetailItem, Category, Subcategory, ProductSearchRequest } from '../../models/models';

interface CartItem {
  product: RetailItem;
  quantity: number;
  subtotal: number;
}

interface Cart {
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  total: number;
}

@Component({
  selector: 'app-retail-sales-point',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  templateUrl: './retail-sales-point.component.html',
  styleUrl: './retail-sales-point.component.scss'
})
export class RetailSalesPointComponent implements OnInit {
  products = signal<RetailItem[]>([]);
  categories = signal<Category[]>([]);
  subcategories = signal<Subcategory[]>([]);
  
  selectedCategory = signal<Category | null>(null);
  selectedSubcategory = signal<Subcategory | null>(null);
  searchTerm = '';
  barcodeInput = '';
  showCheckout = signal(false);
  isLoading = signal(false);
  
  private cartItemsSignal = signal<CartItem[]>([]);
  cartItems = this.cartItemsSignal.asReadonly();
  
  currentUser = computed(() => this.authService.currentUserValue);
  
  cart = computed(() => {
    const items = this.cartItems();
    const subtotal = items.reduce((sum, item) => sum + item.subtotal, 0);
    const taxAmount = subtotal * 0.10; // 10% tax
    const total = subtotal + taxAmount;
    
    return {
      items,
      subtotal,
      taxAmount,
      total
    };
  });
  
  filteredSubcategories = computed(() => {
    const selected = this.selectedCategory();
    if (!selected) return [];
    
    // Filter by Category field in SubCategory table
    return this.subcategories().filter(s => s.Category === selected.CategoryName);
  });

  filteredProducts = computed(() => {
    let filtered = this.products();
    
    const selectedCat = this.selectedCategory();
    if (selectedCat) {
      // Use CategoryID from Retail_Items
      filtered = filtered.filter(p => p.CategoryID === selectedCat.CategoryID?.toString());
    }

    const selectedSub = this.selectedSubcategory();
    if (selectedSub) {
      // Use Subcategory from Retail_Items
      filtered = filtered.filter(p => p.Subcategory === selectedSub.Subcategory);
    }
    
    if (this.searchTerm) {
      const term = this.searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        (p.ProductName && p.ProductName.toLowerCase().includes(term)) ||
        (p.ProductID && p.ProductID.toLowerCase().includes(term)) ||
        (p.barcodenr && p.barcodenr.toLowerCase().includes(term))
      );
    }
    
    // Filter active items (Discontinued field is 'No' or empty)
    return filtered.filter(p => !p.Discontinued || p.Discontinued.toLowerCase() === 'no');
  });
  
  // Checkout state
  paymentMethod = 'Cash';
  paymentMethods = ['Cash', 'Card', 'Mobile Money', 'Bank Transfer'];
  customerName = '';
  customerPhone = '';
  cashReceived = 0;
  lastSaleReceipt: any = null;
  showPrintPrompt = signal(false);
  
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}
  
  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    this.isLoading.set(true);
    
    // Load all data from POS database Retail_Items table and related tables
    this.loadCategories();
    this.loadSubcategories();
    this.loadProducts();
  }
  
  loadCategories(): void {
    // Fetch categories from POS database Categories table
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        console.log('Loaded categories from POS database:', categories.length);
      },
      error: (err: any) => {
        console.error('Failed to load categories from POS database:', err);
        this.snackBar.open('Failed to load categories from database', 'Close', { duration: 3000 });
      }
    });
  }

  loadSubcategories(): void {
    // Fetch subcategories from POS database Subcategories table
    this.apiService.getSubcategories().subscribe({
      next: (subcategories) => {
        this.subcategories.set(subcategories);
        console.log('Loaded subcategories from POS database:', subcategories.length);
      },
      error: (err: any) => {
        console.error('Failed to load subcategories from POS database:', err);
        this.snackBar.open('Failed to load subcategories from database', 'Close', { duration: 3000 });
      }
    });
  }

  loadProducts(): void {
    // Fetch all retail items from POS database Retail_Items table
    this.isLoading.set(true);
    this.apiService.getRetailItems().subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
        console.log('Loaded retail items from POS database:', products.length);
      },
      error: (err: any) => {
        console.error('Failed to load retail items from POS database:', err);
        this.snackBar.open('Failed to load products from database', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }
  
  selectCategory(category: Category | null): void {
    this.selectedCategory.set(category);
    this.selectedSubcategory.set(null);
    
    // Optionally load products by category from database for better performance
    if (category && category.CategoryID) {
      this.loadProductsByCategory(category.CategoryID);
    } else {
      this.loadProducts();
    }
  }

  selectSubcategory(subcategory: Subcategory | null): void {
    this.selectedSubcategory.set(subcategory);
    
    // Optionally load products by subcategory from database for better performance
    if (subcategory && subcategory.Refno) {
      this.loadProductsBySubcategory(subcategory.Refno);
    } else if (this.selectedCategory() && this.selectedCategory()!.CategoryID) {
      this.loadProductsByCategory(this.selectedCategory()!.CategoryID!);
    } else {
      this.loadProducts();
    }
  }

  loadProductsByCategory(categoryId: number): void {
    // Fetch products filtered by category from POS database
    this.isLoading.set(true);
    this.apiService.getRetailItemsByCategory(categoryId).subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
        console.log(`Loaded ${products.length} products for category ${categoryId}`);
      },
      error: (err: any) => {
        console.error('Failed to load products by category:', err);
        this.isLoading.set(false);
        // Fallback to client-side filtering
        this.loadProducts();
      }
    });
  }

  loadProductsBySubcategory(subcategoryId: number): void {
    // Fetch products filtered by subcategory from POS database
    this.isLoading.set(true);
    this.apiService.getRetailItemsBySubcategory(subcategoryId).subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
        console.log(`Loaded ${products.length} products for subcategory ${subcategoryId}`);
      },
      error: (err: any) => {
        console.error('Failed to load products by subcategory:', err);
        this.isLoading.set(false);
        // Fallback to client-side filtering
        this.loadProducts();
      }
    });
  }
  
  onSearch(): void {
    // Triggers computed signal update
  }
  
  addToCart(product: RetailItem): void {
    if (!product.UnitsInStock || product.UnitsInStock <= 0) {
      this.snackBar.open('Product out of stock', 'Close', { duration: 2000 });
      return;
    }
    
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(i => i.product.Refno === product.Refno);
    
    if (existingItem) {
      if (existingItem.quantity < (product.UnitsInStock || 0)) {
        this.updateQuantity(product.Refno!, existingItem.quantity + 1);
      } else {
        this.snackBar.open('Not enough stock', 'Close', { duration: 2000 });
      }
    } else {
      const newItem: CartItem = {
        product,
        quantity: 1,
        subtotal: product.UnitPrice || 0
      };
      this.cartItemsSignal.set([...currentItems, newItem]);
    }
  }
  
  increaseQuantity(productId: number): void {
    const item = this.cartItems().find(i => i.product.Refno === productId);
    if (item && item.quantity < (item.product.UnitsInStock || 0)) {
      this.updateQuantity(productId, item.quantity + 1);
    } else {
      this.snackBar.open('Not enough stock', 'Close', { duration: 2000 });
    }
  }
  
  decreaseQuantity(productId: number): void {
    const item = this.cartItems().find(i => i.product.Refno === productId);
    if (item) {
      this.updateQuantity(productId, item.quantity - 1);
    }
  }
  
  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }
    
    const currentItems = this.cartItems();
    const updatedItems = currentItems.map(item => {
      if (item.product.Refno === productId) {
        return {
          ...item,
          quantity,
          subtotal: (item.product.UnitPrice || 0) * quantity
        };
      }
      return item;
    });
    
    this.cartItemsSignal.set(updatedItems);
  }
  
  removeFromCart(productId: number): void {
    const currentItems = this.cartItems();
    this.cartItemsSignal.set(currentItems.filter(i => i.product.Refno !== productId));
  }
  
  clearCart(): void {
    this.cartItemsSignal.set([]);
    this.snackBar.open('Cart cleared', 'Close', { duration: 2000 });
  }
  
  openCheckout(): void {
    this.showCheckout.set(true);
  }
  
  closeCheckout(): void {
    this.showCheckout.set(false);
  }
  
  getChange(): number {
    return Math.max(0, this.cashReceived - this.cart().total);
  }
  
  completeSale(): void {
    if (this.paymentMethod === 'Cash' && this.cashReceived < this.cart().total) {
      this.snackBar.open('Insufficient cash received', 'Close', { duration: 3000 });
      return;
    }
    
    const saleRequest = {
      totalAmount: this.cart().total,
      taxAmount: this.cart().taxAmount,
      discountAmount: 0,
      netAmount: this.cart().total,
      paymentMethod: this.paymentMethod,
      customerName: this.customerName || undefined,
      customerPhone: this.customerPhone || undefined,
      items: this.cartItems().map(item => ({
        productName: item.product.ProductName || '',
        productCode: item.product.ProductID || '',
        quantity: item.quantity,
        unitPrice: item.product.UnitPrice || 0,
        totalPrice: item.subtotal,
        discountAmount: 0,
        netPrice: item.subtotal
      }))
    };
    
    this.apiService.createSale(saleRequest).subscribe({
      next: (response: any) => {
        // Store receipt data
        this.lastSaleReceipt = {
          transactionNumber: response.transactionNumber || this.generateReceiptNumber(),
          transactionDate: new Date(),
          items: this.cartItems(),
          subtotal: this.cart().subtotal,
          taxAmount: this.cart().taxAmount,
          total: this.cart().total,
          paymentMethod: this.paymentMethod,
          customerName: this.customerName,
          customerPhone: this.customerPhone,
          cashReceived: this.cashReceived,
          change: this.getChange(),
          cashier: this.currentUser()?.fullName || 'Cashier'
        };
        
        this.snackBar.open('Sale completed successfully!', 'Close', { duration: 3000 });
        this.closeCheckout();
        this.showPrintPrompt.set(true);
        
        // Auto-print after 1 second if not dismissed
        setTimeout(() => {
          if (this.showPrintPrompt()) {
            this.printReceipt();
          }
        }, 1000);
        
        this.clearCart();
        this.resetCheckoutForm();
        this.loadProducts(); // Refresh inventory
      },
      error: (error: any) => {
        console.error('Sale error:', error);
        this.snackBar.open('Error completing sale', 'Close', { duration: 3000 });
      }
    });
  }
  
  resetCheckoutForm(): void {
    this.paymentMethod = 'Cash';
    this.customerName = '';
    this.customerPhone = '';
    this.cashReceived = 0;
  }
  
  searchProducts(): void {
    if (!this.searchTerm.trim()) {
      this.loadProducts();
      return;
    }

    this.isLoading.set(true);
    const searchRequest: ProductSearchRequest = {
      searchTerm: this.searchTerm
    };

    this.apiService.searchRetailItems(searchRequest).subscribe({
      next: (products) => {
        this.products.set(products);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Search failed:', err);
        this.snackBar.open('Search failed', 'Close', { duration: 3000 });
        this.isLoading.set(false);
      }
    });
  }

  scanBarcode(): void {
    if (!this.barcodeInput.trim()) {
      this.snackBar.open('Please enter a barcode', 'Close', { duration: 2000 });
      return;
    }

    this.isLoading.set(true);
    this.apiService.getRetailItemByBarcode(this.barcodeInput).subscribe({
      next: (product) => {
        this.addToCart(product);
        this.barcodeInput = '';
        this.isLoading.set(false);
        this.snackBar.open(`Added ${product.ProductName} to cart`, 'Close', { duration: 2000 });
      },
      error: (err: any) => {
        console.error('Barcode scan failed:', err);
        this.snackBar.open('Product not found', 'Close', { duration: 3000 });
        this.barcodeInput = '';
        this.isLoading.set(false);
      }
    });
  }

  generateReceiptNumber(): string {
    const now = new Date();
    const timestamp = now.getTime().toString().slice(-8);
    return `RCP-${timestamp}`;
  }

  printReceipt(): void {
    if (!this.lastSaleReceipt) {
      this.snackBar.open('No receipt to print', 'Close', { duration: 2000 });
      return;
    }

    this.showPrintPrompt.set(false);

    const receiptWindow = window.open('', '', 'width=300,height=600');
    if (!receiptWindow) {
      this.snackBar.open('Please allow pop-ups to print receipts', 'Close', { duration: 3000 });
      return;
    }

    const receipt = this.lastSaleReceipt;
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Receipt - ${receipt.transactionNumber}</title>
        <style>
          @media print {
            body { margin: 0; }
            .no-print { display: none; }
          }
          body {
            font-family: 'Courier New', monospace;
            font-size: 12px;
            padding: 20px;
            max-width: 300px;
            margin: 0 auto;
          }
          .receipt-header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #000;
            padding-bottom: 10px;
          }
          .receipt-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
          .receipt-header p {
            margin: 5px 0;
            font-size: 11px;
          }
          .receipt-info {
            margin-bottom: 15px;
            font-size: 11px;
          }
          .receipt-info div {
            display: flex;
            justify-content: space-between;
            margin: 3px 0;
          }
          .items-table {
            width: 100%;
            margin-bottom: 15px;
            border-top: 1px dashed #000;
            border-bottom: 1px dashed #000;
            padding: 10px 0;
          }
          .item-row {
            display: flex;
            justify-content: space-between;
            margin: 8px 0;
          }
          .item-name {
            flex: 1;
            font-weight: bold;
          }
          .item-details {
            display: flex;
            justify-content: space-between;
            font-size: 11px;
            color: #555;
            margin-left: 10px;
          }
          .totals {
            margin-top: 15px;
            border-top: 1px solid #000;
            padding-top: 10px;
          }
          .total-row {
            display: flex;
            justify-content: space-between;
            margin: 5px 0;
            font-size: 12px;
          }
          .total-row.grand-total {
            font-size: 16px;
            font-weight: bold;
            margin-top: 10px;
            padding-top: 10px;
            border-top: 2px solid #000;
          }
          .payment-info {
            margin-top: 15px;
            border-top: 1px dashed #000;
            padding-top: 10px;
          }
          .receipt-footer {
            text-align: center;
            margin-top: 20px;
            border-top: 2px solid #000;
            padding-top: 10px;
            font-size: 11px;
          }
          .print-button {
            margin: 20px auto;
            display: block;
            padding: 10px 30px;
            background: #4299e1;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 14px;
          }
          .print-button:hover {
            background: #3182ce;
          }
        </style>
      </head>
      <body>
        <div class="receipt-header">
          <h1>Adinkra PowerTrader</h1>
          <p>Point of Sale System</p>
          <p>Thank You For Your Purchase!</p>
        </div>

        <div class="receipt-info">
          <div><span>Receipt #:</span><span>${receipt.transactionNumber}</span></div>
          <div><span>Date:</span><span>${this.formatDate(receipt.transactionDate)}</span></div>
          <div><span>Time:</span><span>${this.formatTime(receipt.transactionDate)}</span></div>
          <div><span>Cashier:</span><span>${receipt.cashier}</span></div>
          ${receipt.customerName ? `<div><span>Customer:</span><span>${receipt.customerName}</span></div>` : ''}
          ${receipt.customerPhone ? `<div><span>Phone:</span><span>${receipt.customerPhone}</span></div>` : ''}
        </div>

        <div class="items-table">
          ${receipt.items.map((item: any) => `
            <div class="item-row">
              <div class="item-name">${item.product.itemName}</div>
            </div>
            <div class="item-details">
              <span>${item.quantity} x $${item.product.unitPrice.toFixed(2)}</span>
              <span>$${item.subtotal.toFixed(2)}</span>
            </div>
          `).join('')}
        </div>

        <div class="totals">
          <div class="total-row">
            <span>Subtotal:</span>
            <span>$${receipt.subtotal.toFixed(2)}</span>
          </div>
          <div class="total-row">
            <span>Tax (10%):</span>
            <span>$${receipt.taxAmount.toFixed(2)}</span>
          </div>
          <div class="total-row grand-total">
            <span>TOTAL:</span>
            <span>$${receipt.total.toFixed(2)}</span>
          </div>
        </div>

        <div class="payment-info">
          <div class="total-row">
            <span>Payment Method:</span>
            <span>${receipt.paymentMethod}</span>
          </div>
          ${receipt.paymentMethod === 'Cash' ? `
            <div class="total-row">
              <span>Cash Received:</span>
              <span>$${receipt.cashReceived.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Change:</span>
              <span>$${receipt.change.toFixed(2)}</span>
            </div>
          ` : ''}
        </div>

        <div class="receipt-footer">
          <p>*** Thank You! Come Again! ***</p>
          <p>For inquiries, please contact us</p>
          <p>Powered by Adinkra PowerTrader POS</p>
        </div>

        <button class="print-button no-print" onclick="window.print(); window.close();">Print Receipt</button>
      </body>
      </html>
    `;

    receiptWindow.document.write(receiptHTML);
    receiptWindow.document.close();
    
    // Auto-print after window loads
    receiptWindow.onload = () => {
      setTimeout(() => {
        receiptWindow.print();
      }, 250);
    };
  }

  skipPrint(): void {
    this.showPrintPrompt.set(false);
    this.lastSaleReceipt = null;
  }

  formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  formatTime(date: Date): string {
    const d = new Date(date);
    return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  }

  logout(): void {
    if (confirm('Are you sure you want to logout?')) {
      this.authService.logout();
    }
  }
}
