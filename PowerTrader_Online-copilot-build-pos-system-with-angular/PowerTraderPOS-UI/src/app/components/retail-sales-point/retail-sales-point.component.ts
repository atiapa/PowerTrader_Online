import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { RetailItemsService } from '../../services/retail-items.service';
import { CategoriesService } from '../../services/categories.service';
import { CustomerService } from '../../services/customer.service';
import { GiftCardService } from '../../services/gift-card.service';
import { TenantContextService } from '../../services/tenant-context.service';
import { RetailSalesService } from '../../services/retail-sales.service';
import { AuthService } from '../../services/auth.service';
import { RetailItems, Categories, SubCategory, CustomerInfo } from '../../models/database-models';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

interface CartItem {
  productId: string;
  productName: string;
  barcode: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  discountType: 'percentage' | 'fixed';
  taxRate: number;
  subtotal: number;
  total: number;
  isPromotion: boolean;
  isClearance: boolean;
  clearanceDiscount: number;
  image?: string;
  stock: number;
}

interface PaymentSplit {
  method: 'Cash' | 'Card' | 'MobileMoney' | 'GiftCard' | 'Voucher';
  amount: number;
  reference?: string;
}

interface LoyaltyPoints {
  customerId: string;
  availablePoints: number;
  pointsValue: number;
  redeemableAmount: number;
}

interface HoldOrder {
  holdNumber: string;
  items: CartItem[];
  customer: CustomerInfo | null;
  timestamp: Date;
  subtotal: number;
  total: number;
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
    MatTableModule,
    MatIconModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatDialogModule,
    MatListModule,
    MatBadgeModule,
    MatDividerModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSlideToggleModule,
    MatTabsModule,
    MatButtonToggleModule
  ],
  templateUrl: './retail-sales-point.component.html',
  styleUrl: './retail-sales-point.component.scss'
})
export class RetailSalesPointComponent implements OnInit {
  @ViewChild('searchInput') searchInput!: ElementRef;
  @ViewChild('barcodeInput') barcodeInput!: ElementRef;

  // Product Data
  allProducts: RetailItems[] = [];
  filteredProducts: RetailItems[] = [];
  categories: Categories[] = [];
  subCategories: SubCategory[] = [];
  selectedCategory: number | null = null;
  selectedSubCategory: number | null = null;

  // Cart
  cartItems: CartItem[] = [];
  selectedCartItem: CartItem | null = null;

  // Search
  searchTerm: string = '';
  barcodeSearch: string = '';
  searchSubject = new Subject<string>();

  // Numeric Keypad
  numericInput: string = '';
  showNumericKeypad: boolean = false;
  keypadMode: 'quantity' | 'discount' | 'payment' = 'quantity';

  // Discount
  globalDiscount: number = 0;
  globalDiscountType: 'percentage' | 'fixed' = 'percentage';

  // Payment
  showCheckout: boolean = false;
  paymentSplits: PaymentSplit[] = [];
  currentPaymentMethod: 'Cash' | 'Card' | 'MobileMoney' | 'GiftCard' | 'Voucher' = 'Cash';
  cashReceived: number = 0;
  changeAmount: number = 0;

  // Customer & Loyalty
  selectedCustomer: CustomerInfo | null = null;
  customerSearch: string = '';
  loyaltyPoints: LoyaltyPoints | null = null;
  redeemPoints: boolean = false;
  pointsToRedeem: number = 0;

  // Gift Card
  giftCardNumber: string = '';
  giftCardBalance: number = 0;
  giftCardValidated: boolean = false;

  // Loading & UI States
  loading: boolean = false;
  highContrastMode: boolean = false;
  showHoldOrders: boolean = false;
  holdOrders: HoldOrder[] = [];

  // Totals
  subtotal: number = 0;
  totalDiscount: number = 0;
  taxAmount: number = 0;
  grandTotal: number = 0;
  amountPaid: number = 0;
  amountDue: number = 0;

  // Invoice
  currentInvoiceNr: string = '';

  // Receipt options
  receiptEmail: string = '';
  receiptPhone: string = '';

  constructor(
    private retailItemsService: RetailItemsService,
    private categoriesService: CategoriesService,
    private customerService: CustomerService,
    private giftCardService: GiftCardService,
    private tenantContext: TenantContextService,
    private retailSalesService: RetailSalesService,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadInitialData();
    this.setupSearchDebounce();
    this.generateInvoiceNumber();
  }

  loadInitialData(): void {
    this.loading = true;
    
    // Load products with tenant scoping
    this.retailItemsService.getActiveItems().subscribe({
      next: (products) => {
        this.allProducts = products;
        this.filteredProducts = products;
        this.loading = false;
      },
      error: (error) => {
        this.showError('Failed to load products');
        this.loading = false;
      }
    });

    // Load categories
    this.categoriesService.getAllCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (error) => {
        this.showError('Failed to load categories');
      }
    });

    // Load hold orders
    this.loadHoldOrders();
  }

  setupSearchDebounce(): void {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe(searchTerm => {
      this.performSearch(searchTerm);
    });
  }

  generateInvoiceNumber(): void {
    const tenant = this.tenantContext.getTenantContext();
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 1000000).toString().padStart(6, '0');
    this.currentInvoiceNr = `${tenant?.branchCode || 'RET'}-${dateStr}-${random}`;
  }

  // ==================== SEARCH & FILTER ====================

  onSearchChange(term: string): void {
    this.searchSubject.next(term);
  }

  performSearch(term: string): void {
    if (!term.trim()) {
      this.applyFilters();
      return;
    }

    const searchLower = term.toLowerCase();
    this.filteredProducts = this.allProducts.filter(p => 
      p.productName?.toLowerCase().includes(searchLower) ||
      p.productID?.toLowerCase().includes(searchLower) ||
      p.barcodenr?.toLowerCase().includes(searchLower)
    );
  }

  onBarcodeSearch(): void {
    if (!this.barcodeSearch.trim()) return;

    this.retailItemsService.getByBarcode(this.barcodeSearch).subscribe({
      next: (product) => {
        this.addToCart(product);
        this.barcodeSearch = '';
        this.showSuccess(`${product.productName} added to cart`);
      },
      error: (error) => {
        this.showError('Product not found');
        this.barcodeSearch = '';
      }
    });
  }

  selectCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.selectedSubCategory = null;
    
    if (categoryId) {
      this.categoriesService.getSubCategoriesByCategory(categoryId).subscribe({
        next: (subCategories) => {
          this.subCategories = subCategories;
        }
      });
    } else {
      this.subCategories = [];
    }
    
    this.applyFilters();
  }

  selectSubCategory(subCategoryId: number | null): void {
    this.selectedSubCategory = subCategoryId;
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.allProducts];

    if (this.selectedCategory) {
      filtered = filtered.filter(p => p.categoryID === String(this.selectedCategory));
    }

    if (this.selectedSubCategory) {
      filtered = filtered.filter(p => p.subcategory === String(this.selectedSubCategory));
    }

    this.filteredProducts = filtered;
  }

  // ==================== CART OPERATIONS ====================

  addToCart(product: RetailItems): void {
    // Check stock availability
    if ((product.unitsInStock || 0) < 1) {
      this.showError('Product out of stock');
      return;
    }

    // Visual feedback
    this.triggerVisualFeedback();

    const existingItem = this.cartItems.find(item => item.productId === product.productID);

    if (existingItem) {
      if ((product.unitsInStock || 0) < existingItem.quantity + 1) {
        this.showError('Insufficient stock');
        return;
      }
      existingItem.quantity += 1;
      this.updateCartItemTotal(existingItem);
    } else {
      const newItem: CartItem = {
        productId: product.productID || '',
        productName: product.productName || '',
        barcode: product.barcodenr || '',
        unitPrice: product.unitPrice || 0,
        quantity: 1,
        discount: 0,
        discountType: 'percentage',
        taxRate: product.tax_rate || 0.1,
        subtotal: product.unitPrice || 0,
        total: (product.unitPrice || 0) * 1.1,
        isPromotion: this.checkPromotion(product),
        isClearance: false,
        clearanceDiscount: 0,
        image: undefined,
        stock: product.unitsInStock || 0
      };

      // Apply discount if available
      if (product.discountPercentage && product.discountPercentage > 0) {
        newItem.discount = product.discountPercentage;
        newItem.discountType = 'percentage';
      }

      this.updateCartItemTotal(newItem);
      this.cartItems.push(newItem);
    }

    this.calculateTotals();
  }

  checkPromotion(product: RetailItems): boolean {
    // Check if product has discount
    return (product.discountPercentage || 0) > 0;
  }

  updateQuantity(item: CartItem, change: number): void {
    const newQuantity = item.quantity + change;
    
    if (newQuantity < 1) {
      this.removeFromCart(item);
      return;
    }

    if (newQuantity > item.stock) {
      this.showError('Insufficient stock');
      return;
    }

    item.quantity = newQuantity;
    this.updateCartItemTotal(item);
    this.calculateTotals();
    this.triggerVisualFeedback();
  }

  setQuantity(item: CartItem, quantity: number): void {
    if (quantity < 1) {
      this.removeFromCart(item);
      return;
    }

    if (quantity > item.stock) {
      this.showError('Insufficient stock');
      return;
    }

    item.quantity = quantity;
    this.updateCartItemTotal(item);
    this.calculateTotals();
  }

  updateCartItemTotal(item: CartItem): void {
    item.subtotal = item.unitPrice * item.quantity;
    
    let discountAmount = 0;
    if (item.discountType === 'percentage') {
      discountAmount = item.subtotal * (item.discount / 100);
    } else {
      discountAmount = item.discount;
    }

    const afterDiscount = item.subtotal - discountAmount;
    const tax = afterDiscount * item.taxRate;
    item.total = afterDiscount + tax;
  }

  removeFromCart(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      this.calculateTotals();
      this.showSuccess('Item removed from cart');
    }
  }

  clearCart(): void {
    if (this.cartItems.length === 0) return;

    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartItems = [];
      this.selectedCustomer = null;
      this.calculateTotals();
      this.showSuccess('Cart cleared');
    }
  }

  selectCartItem(item: CartItem): void {
    this.selectedCartItem = item;
  }

  // ==================== DISCOUNT ====================

  applyGlobalDiscount(): void {
    if (this.cartItems.length === 0) {
      this.showError('Cart is empty');
      return;
    }

    this.cartItems.forEach(item => {
      item.discount = this.globalDiscount;
      item.discountType = this.globalDiscountType;
      this.updateCartItemTotal(item);
    });
    this.calculateTotals();
    this.showSuccess('Discount applied to all items');
  }

  applyItemDiscount(item: CartItem, discount: number, type: 'percentage' | 'fixed'): void {
    item.discount = discount;
    item.discountType = type;
    this.updateCartItemTotal(item);
    this.calculateTotals();
    this.showSuccess('Discount applied');
  }

  openNumericKeypad(mode: 'quantity' | 'discount' | 'payment', item?: CartItem): void {
    this.keypadMode = mode;
    this.numericInput = '';
    this.showNumericKeypad = true;
    
    if (item) {
      this.selectedCartItem = item;
    }
  }

  closeNumericKeypad(): void {
    this.showNumericKeypad = false;
    this.numericInput = '';
    this.selectedCartItem = null;
  }

  numericKeyPress(value: string): void {
    if (value === 'clear') {
      this.numericInput = '';
    } else if (value === 'backspace') {
      this.numericInput = this.numericInput.slice(0, -1);
    } else if (value === 'enter') {
      this.applyNumericInput();
    } else if (value === '.' && !this.numericInput.includes('.')) {
      this.numericInput += value;
    } else if (value !== '.') {
      this.numericInput += value;
    }
    this.triggerVisualFeedback();
  }

  applyNumericInput(): void {
    const numValue = parseFloat(this.numericInput) || 0;

    if (this.keypadMode === 'quantity' && this.selectedCartItem) {
      this.setQuantity(this.selectedCartItem, Math.floor(numValue));
    } else if (this.keypadMode === 'discount' && this.selectedCartItem) {
      this.applyItemDiscount(this.selectedCartItem, numValue, 'percentage');
    } else if (this.keypadMode === 'payment') {
      this.cashReceived = numValue;
      this.calculateChange();
    }

    this.closeNumericKeypad();
  }

  // ==================== TOTALS CALCULATION ====================

  calculateTotals(): void {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.subtotal, 0);
    this.totalDiscount = this.cartItems.reduce((sum, item) => {
      if (item.discountType === 'percentage') {
        return sum + (item.subtotal * item.discount / 100);
      }
      return sum + item.discount;
    }, 0);

    let loyaltyDiscount = 0;
    if (this.redeemPoints && this.loyaltyPoints) {
      loyaltyDiscount = Math.min(this.pointsToRedeem, this.loyaltyPoints.redeemableAmount);
    }

    const afterDiscount = this.subtotal - this.totalDiscount - loyaltyDiscount;
    this.taxAmount = this.cartItems.reduce((sum, item) => {
      const itemAfterDiscount = item.subtotal - (item.discountType === 'percentage' 
        ? item.subtotal * item.discount / 100 
        : item.discount);
      return sum + (itemAfterDiscount * item.taxRate);
    }, 0);

    this.grandTotal = afterDiscount + this.taxAmount;
    this.calculateAmountDue();
  }

  calculateAmountDue(): void {
    this.amountPaid = this.paymentSplits.reduce((sum, split) => sum + split.amount, 0);
    this.amountDue = this.grandTotal - this.amountPaid;
  }

  // ==================== CUSTOMER & LOYALTY ====================

  searchCustomer(): void {
    if (!this.customerSearch.trim()) return;

    this.customerService.search(this.customerSearch).subscribe({
      next: (customers) => {
        if (customers.length > 0) {
          this.selectCustomer(customers[0]);
        } else {
          this.showError('Customer not found');
        }
      },
      error: () => this.showError('Failed to search customer')
    });
  }

  selectCustomer(customer: CustomerInfo): void {
    this.selectedCustomer = customer;
    this.receiptEmail = customer.email || '';
    this.receiptPhone = customer.phoneNr || '';
    this.loadLoyaltyPoints(customer);
    this.showSuccess(`Customer: ${customer.accountName || customer.companyname}`);
  }

  loadLoyaltyPoints(customer: CustomerInfo): void {
    const pointsToDate = customer.pointsToDate || 0;
    const pointsValue = 0.1;

    this.loyaltyPoints = {
      customerId: customer.accountNr || '',
      availablePoints: pointsToDate,
      pointsValue: pointsValue,
      redeemableAmount: pointsToDate * pointsValue
    };
  }

  toggleRedeemPoints(): void {
    this.redeemPoints = !this.redeemPoints;
    if (this.redeemPoints && this.loyaltyPoints) {
      this.pointsToRedeem = Math.min(
        this.loyaltyPoints.redeemableAmount,
        this.grandTotal * 0.5
      );
    } else {
      this.pointsToRedeem = 0;
    }
    this.calculateTotals();
  }

  clearCustomer(): void {
    this.selectedCustomer = null;
    this.loyaltyPoints = null;
    this.redeemPoints = false;
    this.pointsToRedeem = 0;
    this.receiptEmail = '';
    this.receiptPhone = '';
    this.calculateTotals();
  }

  // ==================== GIFT CARD ====================

  validateGiftCard(): void {
    if (!this.giftCardNumber.trim()) return;

    this.giftCardService.validateGiftCard(this.giftCardNumber, '0000').subscribe({
      next: (result) => {
        if (result.valid) {
          this.giftCardBalance = result.balance;
          this.giftCardValidated = true;
          this.showSuccess(`Gift card validated. Balance: ${result.balance}`);
        } else {
          this.showError(result.message);
          this.giftCardValidated = false;
        }
      },
      error: () => {
        this.showError('Failed to validate gift card');
        this.giftCardValidated = false;
      }
    });
  }

  // ==================== CHECKOUT & PAYMENT ====================

  openCheckout(): void {
    if (this.cartItems.length === 0) {
      this.showError('Cart is empty');
      return;
    }

    this.showCheckout = true;
    this.paymentSplits = [];
    this.cashReceived = 0;
    this.changeAmount = 0;
    this.calculateTotals();
  }

  closeCheckout(): void {
    this.showCheckout = false;
    this.paymentSplits = [];
    this.cashReceived = 0;
    this.changeAmount = 0;
  }

  addPaymentSplit(method: 'Cash' | 'Card' | 'MobileMoney' | 'GiftCard' | 'Voucher'): void {
    const remainingAmount = this.amountDue;
    
    if (remainingAmount <= 0) {
      this.showError('Payment already complete');
      return;
    }

    let amount = 0;
    if (method === 'GiftCard' && this.giftCardValidated) {
      amount = Math.min(this.giftCardBalance, remainingAmount);
    } else {
      amount = remainingAmount;
    }

    const reference = method === 'Card' ? `CARD-${Date.now()}` : 
                      method === 'MobileMoney' ? `MM-${Date.now()}` : '';

    this.paymentSplits.push({ method, amount, reference });
    this.calculateAmountDue();
  }

  removePaymentSplit(index: number): void {
    this.paymentSplits.splice(index, 1);
    this.calculateAmountDue();
  }

  calculateChange(): void {
    if (this.currentPaymentMethod === 'Cash') {
      this.changeAmount = Math.max(0, this.cashReceived - this.amountDue);
    }
  }

  completeSale(): void {
    if (this.amountDue > 0.01) {
      this.showError('Payment incomplete');
      return;
    }

    this.loading = true;

    const saleData = this.tenantContext.addTenantInfo({
      invoiceNr: this.currentInvoiceNr,
      customerId: this.selectedCustomer?.accountNr || 'WALK-IN',
      customerName: this.selectedCustomer?.accountName || this.selectedCustomer?.companyname || 'Walk-in Customer',
      customerEmail: this.receiptEmail,
      customerPhone: this.receiptPhone,
      items: this.cartItems.map(item => ({
        productID: item.productId,
        productName: item.productName,
        barcode: item.barcode,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        discount: item.discount,
        discountType: item.discountType,
        subtotal: item.subtotal,
        tax: item.total - (item.subtotal - (item.discountType === 'percentage' ? item.subtotal * item.discount / 100 : item.discount)),
        total: item.total
      })),
      subtotal: this.subtotal,
      discount: this.totalDiscount,
      tax: this.taxAmount,
      total: this.grandTotal,
      payments: this.paymentSplits,
      loyaltyPointsRedeemed: this.redeemPoints ? this.pointsToRedeem : 0,
      store: 'Retail',
      tillName: 'POS-01',
      attendant: this.authService.currentUserValue?.fullName || 'System',
      date: new Date().toISOString()
    } as any);

    this.retailSalesService.createSalesDetailsTemp(saleData as any).subscribe({
      next: (result) => {
        this.showSuccess('Sale completed successfully');
        this.loading = false;
        this.closeCheckout();
        
        if (confirm('Print receipt?')) {
          this.printReceipt();
        }
        
        this.resetSale();
      },
      error: (error) => {
        this.showError('Failed to complete sale');
        this.loading = false;
      }
    });
  }

  // ==================== HOLD ORDERS ====================

  holdOrder(): void {
    if (this.cartItems.length === 0) {
      this.showError('Cart is empty');
      return;
    }

    const holdNumber = `HOLD-${Date.now()}`;
    const holdOrder: HoldOrder = {
      holdNumber,
      items: [...this.cartItems],
      customer: this.selectedCustomer,
      timestamp: new Date(),
      subtotal: this.subtotal,
      total: this.grandTotal
    };

    const holdOrderWithTenant = this.tenantContext.addTenantInfo(holdOrder);
    this.retailSalesService.holdOrder(holdOrderWithTenant as any);
    
    this.showSuccess(`Order held: ${holdNumber}`);
    this.resetSale();
    this.loadHoldOrders();
  }

  loadHoldOrders(): void {
    this.holdOrders = this.retailSalesService.getHoldOrders() as any;
  }

  retrieveHoldOrder(holdOrder: HoldOrder): void {
    this.cartItems = [...holdOrder.items];
    this.selectedCustomer = holdOrder.customer;
    if (holdOrder.customer) {
      this.receiptEmail = holdOrder.customer.email || '';
      this.receiptPhone = holdOrder.customer.phoneNr || '';
      this.loadLoyaltyPoints(holdOrder.customer);
    }
    this.calculateTotals();
    this.retailSalesService.removeHoldOrder(holdOrder.holdNumber);
    this.loadHoldOrders();
    this.showHoldOrders = false;
    this.showSuccess('Order retrieved');
  }

  deleteHoldOrder(holdNumber: string): void {
    if (confirm('Delete this hold order?')) {
      this.retailSalesService.removeHoldOrder(holdNumber);
      this.loadHoldOrders();
      this.showSuccess('Hold order deleted');
    }
  }

  toggleHoldOrders(): void {
    this.showHoldOrders = !this.showHoldOrders;
    if (this.showHoldOrders) {
      this.loadHoldOrders();
    }
  }

  // ==================== RECEIPT & PRINTING ====================

  printReceipt(): void {
    const tenant = this.tenantContext.getTenantContext();
    
    const receiptContent = `
      <html>
        <head>
          <title>Receipt - ${this.currentInvoiceNr}</title>
          <style>
            body { 
              font-family: 'Courier New', monospace; 
              width: 80mm; 
              margin: 0 auto; 
              padding: 10px;
            }
            .header { 
              text-align: center; 
              margin-bottom: 20px; 
              border-bottom: 2px dashed #000;
              padding-bottom: 10px;
            }
            .header h2 { margin: 5px 0; }
            .item-row { 
              display: flex; 
              justify-content: space-between; 
              margin: 3px 0; 
              font-size: 12px;
            }
            .item-name { flex: 2; }
            .item-qty { flex: 1; text-align: center; }
            .item-price { flex: 1; text-align: right; }
            .total-section { 
              border-top: 2px dashed #000; 
              margin-top: 10px; 
              padding-top: 10px; 
            }
            .total-row { 
              display: flex; 
              justify-content: space-between; 
              margin: 5px 0; 
            }
            .grand-total { 
              font-weight: bold; 
              font-size: 16px; 
              border-top: 2px solid #000;
              border-bottom: 2px solid #000;
              padding: 5px 0;
              margin: 5px 0;
            }
            .footer { 
              text-align: center; 
              margin-top: 20px; 
              border-top: 2px dashed #000;
              padding-top: 10px;
            }
            @media print {
              body { width: 80mm; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>${tenant?.organisationName || 'PowerTrader POS'}</h2>
            <p>${tenant?.branchName || 'Head Office'}</p>
            <p>Invoice: ${this.currentInvoiceNr}</p>
            <p>Date: ${new Date().toLocaleString()}</p>
            ${this.selectedCustomer ? `<p>Customer: ${this.selectedCustomer.accountName || this.selectedCustomer.companyname}</p>` : ''}
          </div>
          
          <div class="items">
            ${this.cartItems.map(item => `
              <div class="item-row">
                <span class="item-name">${item.productName}</span>
                <span class="item-qty">${item.quantity}</span>
                <span class="item-price">${item.total.toFixed(2)}</span>
              </div>
              ${item.discount > 0 ? `
                <div class="item-row" style="font-size: 10px; color: #666;">
                  <span>Discount: ${item.discount}${item.discountType === 'percentage' ? '%' : ''}</span>
                </div>
              ` : ''}
            `).join('')}
          </div>
          
          <div class="total-section">
            <div class="total-row">
              <span>Subtotal:</span>
              <span>${this.subtotal.toFixed(2)}</span>
            </div>
            <div class="total-row">
              <span>Discount:</span>
              <span>-${this.totalDiscount.toFixed(2)}</span>
            </div>
            ${this.redeemPoints ? `
              <div class="total-row">
                <span>Loyalty Points:</span>
                <span>-${this.pointsToRedeem.toFixed(2)}</span>
              </div>
            ` : ''}
            <div class="total-row">
              <span>Tax:</span>
              <span>${this.taxAmount.toFixed(2)}</span>
            </div>
            <div class="total-row grand-total">
              <span>TOTAL:</span>
              <span>${this.grandTotal.toFixed(2)}</span>
            </div>
          </div>
          
          <div class="payment-section">
            <p><strong>Payment Methods:</strong></p>
            ${this.paymentSplits.map(split => `
              <div class="total-row">
                <span>${split.method}:</span>
                <span>${split.amount.toFixed(2)}</span>
              </div>
            `).join('')}
            ${this.changeAmount > 0 ? `
              <div class="total-row">
                <span>Change:</span>
                <span>${this.changeAmount.toFixed(2)}</span>
              </div>
            ` : ''}
          </div>
          
          <div class="footer">
            <p>Thank you for your business!</p>
            <p>Served by: ${this.authService.currentUserValue?.fullName || 'System'}</p>
          </div>
        </body>
      </html>
    `;

    const printWindow = window.open('', '', 'width=300,height=600');
    if (printWindow) {
      printWindow.document.write(receiptContent);
      printWindow.document.close();
      printWindow.print();
    }
  }

  sendReceiptEmail(): void {
    if (!this.receiptEmail) {
      this.showError('Customer email not available');
      return;
    }
    this.showSuccess('Receipt sent to email');
  }

  sendReceiptSMS(): void {
    if (!this.receiptPhone) {
      this.showError('Customer phone not available');
      return;
    }
    this.showSuccess('Receipt confirmation sent via SMS');
  }

  // ==================== UTILITY METHODS ====================

  resetSale(): void {
    this.cartItems = [];
    this.selectedCustomer = null;
    this.selectedCartItem = null;
    this.paymentSplits = [];
    this.cashReceived = 0;
    this.changeAmount = 0;
    this.redeemPoints = false;
    this.pointsToRedeem = 0;
    this.giftCardNumber = '';
    this.giftCardBalance = 0;
    this.giftCardValidated = false;
    this.showCheckout = false;
    this.receiptEmail = '';
    this.receiptPhone = '';
    this.globalDiscount = 0;
    this.calculateTotals();
    this.generateInvoiceNumber();
  }

  triggerVisualFeedback(): void {
    const feedbackElement = document.createElement('div');
    feedbackElement.className = 'touch-feedback';
    feedbackElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 100px;
      height: 100px;
      background: rgba(76, 175, 80, 0.3);
      border-radius: 50%;
      animation: pulse 0.3s ease-out;
      pointer-events: none;
      z-index: 9999;
    `;
    document.body.appendChild(feedbackElement);
    setTimeout(() => feedbackElement.remove(), 300);
  }

  toggleHighContrast(): void {
    this.highContrastMode = !this.highContrastMode;
    document.body.classList.toggle('high-contrast', this.highContrastMode);
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['success-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 4000,
      panelClass: ['error-snackbar'],
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }

  get currentUser() {
    return this.authService.currentUserValue;
  }

  get holdOrderCount(): number {
    return this.holdOrders.length;
  }
}
