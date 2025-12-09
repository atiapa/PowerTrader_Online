# POS Frontend Implementation Plan

## Overview
Comprehensive touchscreen-optimized Point of Sales system implementation for Angular 19 frontend.

---

## Phase 1: Core POS Layout & Product Grid (Priority: HIGH)

### 1.1 Main POS Layout Enhancement
**File**: `sales-point.component.html` + `sales-point.component.scss`

**Changes:**
- Split-screen design with products (left 60%) and cart (right 40%)
- Responsive grid layout optimized for tablets (10-15 inch screens)
- Touch-friendly spacing (minimum 44x44px touch targets)
- High contrast color scheme

**Implementation:**
```scss
.pos-main-container {
  display: grid;
  grid-template-columns: 60fr 40fr;
  gap: 16px;
  min-height: calc(100vh - 64px);
}

.touch-button {
  min-width: 44px;
  min-height: 44px;
  font-size: 18px;
  padding: 12px 24px;
}
```

---

### 1.2 Product Grid with Images
**Component**: Enhanced `sales-point.component.ts`

**Features:**
- Grid layout with product cards (4-6 columns based on screen size)
- Product image display (150x150px thumbnails)
- Product name, code, and price display
- Stock quantity indicator
- Out-of-stock visual indicator
- Touch-friendly product selection

**New Models** (`models.ts`):
```typescript
export interface ProductDisplay extends Product {
  imageUrl?: string;
  categoryName?: string;
  subcategoryName?: string;
  inStock: boolean;
}
```

---

### 1.3 Category & Subcategory Filters
**New Component**: `category-filter/category-filter.component.ts`

**Features:**
- Horizontal scrollable category buttons
- Touch-friendly category tiles (100x80px minimum)
- Active category highlighting
- "All Categories" option
- Subcategory dropdown on category selection
- Visual category icons (Material Icons)

**API Integration:**
- GET /api/Categories
- Filter products by CategoryID

---

### 1.4 Enhanced Search Bar
**Component**: Search bar in `sales-point.component.html`

**Features:**
- Product search with autocomplete (debounced to 300ms)
- Search by: Product Name, Code, Barcode
- Dropdown suggestions showing: Image, Name, Code, Price
- Enter key to add first result to cart
- Clear button (X icon)

**Barcode Scanner Input:**
- Dedicated barcode input field (reads USB barcode scanner)
- Auto-submit on barcode complete (barcode ends with Enter)
- Visual feedback on successful scan

**Layout:**
```html
<div class="search-bar-row">
  <mat-form-field class="search-field">
    <input matInput placeholder="Search products..." [matAutocomplete]="auto">
    <mat-autocomplete #auto="matAutocomplete">
      <!-- Product suggestions -->
    </mat-autocomplete>
  </mat-form-field>
  
  <mat-form-field class="barcode-field">
    <input matInput placeholder="Scan Barcode" (keyup.enter)="addByBarcode()">
  </mat-form-field>
</div>
```

---

### 1.5 Enhanced Shopping Cart
**Component**: Cart section in `sales-point.component.html`

**Features:**
- Large, touch-friendly cart table
- Inline quantity adjustment buttons (+/-)
- Remove item button (swipe gesture alternative)
- Item discount per line (manual entry)
- Real-time total recalculation
- Empty cart visual state

**Cart Item Actions:**
```html
<div class="quantity-controls">
  <button mat-icon-button (click)="decrementQty(item)" class="qty-btn">
    <mat-icon>remove</mat-icon>
  </button>
  <span class="qty-display">{{item.quantity}}</span>
  <button mat-icon-button (click)="incrementQty(item)" class="qty-btn">
    <mat-icon>add</mat-icon>
  </button>
</div>
```

---

### 1.6 Numeric Keypad
**New Component**: `numeric-keypad/numeric-keypad.component.ts`

**Features:**
- Large number buttons (60x60px minimum)
- Decimal point support
- Backspace and Clear buttons
- Enter/OK button
- Used for: Quantity entry, Price override, Discount entry
- Modal/overlay display

**Layout:**
```
[7] [8] [9] [←]
[4] [5] [6] [C]
[1] [2] [3]
[0] [.] [OK]
```

---

## Phase 2: Advanced Features (Priority: MEDIUM)

### 2.1 Manual Discount Management

**Discount Types:**
- Percentage discount (e.g., 10%)
- Fixed amount discount (e.g., $5.00)
- Applied to: Single item OR Entire cart

**UI Components:**
```html
<button mat-button (click)="openDiscountDialog(item)">
  Apply Discount
</button>

<!-- Discount Dialog -->
<mat-dialog>
  <mat-radio-group [(ngModel)]="discountType">
    <mat-radio-button value="percentage">Percentage</mat-radio-button>
    <mat-radio-button value="fixed">Fixed Amount</mat-radio-button>
  </mat-radio-group>
  
  <app-numeric-keypad (valueChange)="discountValue=$event"></app-numeric-keypad>
  
  <div mat-dialog-actions>
    <button mat-button (click)="applyDiscount()">Apply</button>
    <button mat-button mat-dialog-close>Cancel</button>
  </div>
</mat-dialog>
```

**Implementation:**
```typescript
applyDiscount(item: SaleItem, type: 'percentage' | 'fixed', value: number): void {
  if (type === 'percentage') {
    item.discountAmount = (item.unitPrice * item.quantity) * (value / 100);
  } else {
    item.discountAmount = value;
  }
  item.netPrice = item.totalPrice - item.discountAmount;
  this.recalculateTotals();
}
```

---

### 2.2 Promotional Sales (Time-Based)

**Database Table**: `Tbl_SeasonDiscount`
```typescript
export interface Promotion {
  id: number;
  seasonName: string;
  seasonStartDate: Date;
  seasonEndDate: Date;
  seasonDiscountRate: number;
  seasonPurchaseValue: number;
  store: string;
  isActive: boolean;
}
```

**Service Method:**
```typescript
getActivePromotions(): Observable<Promotion[]> {
  const now = new Date();
  return this.http.get<Promotion[]>(`${this.apiUrl}/Promotions/active`);
}
```

**Auto-Apply Logic:**
```typescript
checkPromotions(cartTotal: number): void {
  this.promotionService.getActivePromotions().subscribe(promos => {
    const applicable = promos.find(p => 
      cartTotal >= p.seasonPurchaseValue &&
      this.isWithinDateRange(p.seasonStartDate, p.seasonEndDate)
    );
    
    if (applicable) {
      this.applyPromotionalDiscount(applicable.seasonDiscountRate);
      this.showPromoNotification(applicable.seasonName);
    }
  });
}
```

---

### 2.3 Clearance Sales (Product-Level)

**Product Property**:
```typescript
export interface Product {
  // ... existing properties
  clearanceDiscount?: number;
  isClearance: boolean;
  clearanceEndDate?: Date;
}
```

**Visual Indicator:**
```html
<mat-card class="product-card" [class.clearance]="product.isClearance">
  @if (product.isClearance) {
    <div class="clearance-badge">
      CLEARANCE {{product.clearanceDiscount}}% OFF
    </div>
  }
  <img [src]="product.imageUrl" alt="{{product.name}}">
  <h3>{{product.name}}</h3>
  <p class="price">
    @if (product.isClearance) {
      <span class="original-price">${{product.price}}</span>
      <span class="clearance-price">${{getClearancePrice(product)}}</span>
    } @else {
      ${{product.price}}
    }
  </p>
</mat-card>
```

**Auto-Apply on Add to Cart:**
```typescript
addProductToCart(product: Product): void {
  const unitPrice = product.isClearance 
    ? product.price * (1 - product.clearanceDiscount / 100)
    : product.price;
    
  // Add to cart with adjusted price
}
```

---

### 2.4 Loyalty Points Redemption

**Models:**
```typescript
export interface LoyaltyAccount {
  cardNumber: string;
  customerName: string;
  pointsBalance: number;
  pointsEarned: number;
  pointsRedeemed: number;
}

export interface LoyaltySettings {
  pointsPerTransaction: number;
  valuePerPoint: number;
  pointsToRedeem: number;
  redeemPointThreshold: number;
  purchasedPerPoint: number;
}
```

**UI Component:**
```html
<mat-expansion-panel class="loyalty-panel">
  <mat-expansion-panel-header>
    <mat-panel-title>
      Loyalty Card
    </mat-panel-title>
  </mat-expansion-panel-header>
  
  <mat-form-field>
    <input matInput placeholder="Loyalty Card Number" 
           [(ngModel)]="loyaltyCardNumber"
           (change)="loadLoyaltyAccount()">
  </mat-form-field>
  
  @if (loyaltyAccount) {
    <div class="loyalty-info">
      <p>Customer: {{loyaltyAccount.customerName}}</p>
      <p>Available Points: {{loyaltyAccount.pointsBalance}}</p>
      <p>Redeemable Value: ${{getRedeemableValue()}}</p>
      
      <button mat-raised-button color="accent"
              [disabled]="!canRedeemPoints()"
              (click)="redeemPoints()">
        Redeem Points as Discount
      </button>
    </div>
  }
</mat-expansion-panel>
```

**Implementation:**
```typescript
redeemPoints(): void {
  if (!this.loyaltyAccount || !this.loyaltySettings) return;
  
  const pointsToRedeem = Math.floor(
    this.loyaltyAccount.pointsBalance / this.loyaltySettings.pointsToRedeem
  ) * this.loyaltySettings.pointsToRedeem;
  
  const discountValue = pointsToRedeem * this.loyaltySettings.valuePerPoint;
  
  // Apply as cart-level discount
  this.cartDiscount = discountValue;
  this.loyaltyPointsRedeemed = pointsToRedeem;
  
  this.snackBar.open(
    `${pointsToRedeem} points redeemed for $${discountValue.toFixed(2)} discount`,
    'Close',
    { duration: 5000 }
  );
}

calculateLoyaltyPointsEarned(netAmount: number): number {
  if (!this.loyaltySettings) return 0;
  return Math.floor(netAmount / this.loyaltySettings.purchasedPerPoint) 
    * this.loyaltySettings.pointsPerTransaction;
}
```

---

## Phase 3: Checkout & Payment Processing (Priority: HIGH)

### 3.1 Checkout Modal
**New Component**: `checkout-modal/checkout-modal.component.ts`

**Features:**
- Full-screen modal overlay
- Order summary display
- Payment method selection (large touch-friendly buttons)
- Customer information capture
- Terms acceptance checkbox

**Layout:**
```html
<div class="checkout-modal-overlay">
  <div class="checkout-modal">
    <div class="modal-header">
      <h2>Checkout</h2>
      <button mat-icon-button (click)="close()">
        <mat-icon>close</mat-icon>
      </button>
    </div>
    
    <div class="modal-body">
      <!-- Order Summary -->
      <mat-card class="order-summary">
        <h3>Order Summary</h3>
        <div class="summary-items">
          @for (item of cartItems; track item.productCode) {
            <div class="summary-item">
              <span>{{item.productName}} x{{item.quantity}}</span>
              <span>${{item.netPrice.toFixed(2)}}</span>
            </div>
          }
        </div>
        
        <div class="summary-totals">
          <div class="total-line">
            <span>Subtotal:</span>
            <span>${{subtotal.toFixed(2)}}</span>
          </div>
          <div class="total-line">
            <span>Discount:</span>
            <span class="discount">-${{totalDiscount.toFixed(2)}}</span>
          </div>
          <div class="total-line">
            <span>Tax ({{taxRate}}%):</span>
            <span>${{tax.toFixed(2)}}</span>
          </div>
          <div class="total-line grand-total">
            <span>Total:</span>
            <span>${{grandTotal.toFixed(2)}}</span>
          </div>
        </div>
      </mat-card>
      
      <!-- Payment Method Selection -->
      <div class="payment-methods">
        <h3>Select Payment Method</h3>
        <div class="payment-buttons">
          <button mat-raised-button class="payment-btn"
                  [class.selected]="selectedPayment === 'cash'"
                  (click)="selectPayment('cash')">
            <mat-icon>payments</mat-icon>
            <span>Cash</span>
          </button>
          
          <button mat-raised-button class="payment-btn"
                  [class.selected]="selectedPayment === 'card'"
                  (click)="selectPayment('card')">
            <mat-icon>credit_card</mat-icon>
            <span>Card</span>
          </button>
          
          <button mat-raised-button class="payment-btn"
                  [class.selected]="selectedPayment === 'mobile'"
                  (click)="selectPayment('mobile')">
            <mat-icon>phone_android</mat-icon>
            <span>Mobile Money</span>
          </button>
          
          <button mat-raised-button class="payment-btn"
                  [class.selected]="selectedPayment === 'split'"
                  (click)="selectPayment('split')">
            <mat-icon>call_split</mat-icon>
            <span>Split Payment</span>
          </button>
        </div>
      </div>
    </div>
    
    <div class="modal-footer">
      <button mat-raised-button color="warn" (click)="close()">
        Cancel
      </button>
      <button mat-raised-button color="primary" 
              [disabled]="!selectedPayment"
              (click)="processPayment()">
        Proceed to Payment
      </button>
    </div>
  </div>
</div>
```

---

### 3.2 Cash Payment Calculator
**New Component**: `cash-payment/cash-payment.component.ts`

**Features:**
- Display amount due
- Numeric keypad for cash received entry
- Real-time change calculation
- Quick amount buttons ($10, $20, $50, $100, Exact)
- Large, clear display

**Implementation:**
```typescript
export class CashPaymentComponent {
  amountDue: number = 0;
  cashReceived: number = 0;
  change: number = 0;
  
  onCashReceived(amount: number): void {
    this.cashReceived = amount;
    this.change = this.cashReceived - this.amountDue;
  }
  
  setQuickAmount(amount: number): void {
    this.cashReceived = amount;
    this.calculateChange();
  }
  
  setExactAmount(): void {
    this.cashReceived = this.amountDue;
    this.change = 0;
  }
  
  calculateChange(): void {
    this.change = Math.max(0, this.cashReceived - this.amountDue);
  }
  
  canComplete(): boolean {
    return this.cashReceived >= this.amountDue;
  }
}
```

**UI:**
```html
<div class="cash-payment">
  <div class="amount-display">
    <div class="amount-due">
      <label>Amount Due:</label>
      <span class="amount">${{amountDue.toFixed(2)}}</span>
    </div>
    
    <div class="cash-received">
      <label>Cash Received:</label>
      <span class="amount">${{cashReceived.toFixed(2)}}</span>
    </div>
    
    <div class="change" [class.negative]="change < 0">
      <label>Change:</label>
      <span class="amount">${{change.toFixed(2)}}</span>
    </div>
  </div>
  
  <div class="quick-amounts">
    <button mat-raised-button (click)="setQuickAmount(10)">$10</button>
    <button mat-raised-button (click)="setQuickAmount(20)">$20</button>
    <button mat-raised-button (click)="setQuickAmount(50)">$50</button>
    <button mat-raised-button (click)="setQuickAmount(100)">$100</button>
    <button mat-raised-button color="accent" (click)="setExactAmount()">
      Exact Amount
    </button>
  </div>
  
  <app-numeric-keypad (valueChange)="onCashReceived($event)"></app-numeric-keypad>
  
  <button mat-raised-button color="primary" 
          class="complete-btn"
          [disabled]="!canComplete()"
          (click)="complete()">
    Complete Payment
  </button>
</div>
```

---

### 3.3 Card Payment Interface
**New Component**: `card-payment/card-payment.component.ts`

**Features:**
- Amount confirmation display
- Card type selection (Visa, MasterCard, etc.)
- Manual card entry or "Swipe/Insert Card" prompt
- Authorization code entry
- Processing status indicator

**UI:**
```html
<div class="card-payment">
  <div class="amount-display">
    <label>Amount to Charge:</label>
    <span class="amount">${{amount.toFixed(2)}}</span>
  </div>
  
  <mat-form-field appearance="outline">
    <mat-label>Card Type</mat-label>
    <mat-select [(ngModel)]="cardType">
      <mat-option value="visa">Visa</mat-option>
      <mat-option value="mastercard">MasterCard</mat-option>
      <mat-option value="amex">American Express</mat-option>
    </mat-select>
  </mat-form-field>
  
  <mat-form-field appearance="outline">
    <mat-label>Last 4 Digits</mat-label>
    <input matInput maxlength="4" [(ngModel)]="last4Digits">
  </mat-form-field>
  
  <mat-form-field appearance="outline">
    <mat-label>Authorization Code</mat-label>
    <input matInput [(ngModel)]="authCode">
  </mat-form-field>
  
  @if (processing) {
    <div class="processing">
      <mat-spinner></mat-spinner>
      <p>Processing payment...</p>
    </div>
  }
  
  <button mat-raised-button color="primary" 
          class="process-btn"
          [disabled]="!isValid() || processing"
          (click)="processCard()">
    Process Card Payment
  </button>
</div>
```

---

### 3.4 Mobile Money Interface
**New Component**: `mobile-money-payment/mobile-money-payment.component.ts`

**Features:**
- Provider selection (MTN, Vodafone, AirtelTigo)
- Phone number entry with validation
- Amount confirmation
- Transaction ID entry
- Status checking

**UI:**
```html
<div class="mobile-money-payment">
  <div class="amount-display">
    <label>Amount to Pay:</label>
    <span class="amount">${{amount.toFixed(2)}}</span>
  </div>
  
  <mat-form-field appearance="outline">
    <mat-label>Mobile Money Provider</mat-label>
    <mat-select [(ngModel)]="provider">
      <mat-option value="mtn">MTN Mobile Money</mat-option>
      <mat-option value="vodafone">Vodafone Cash</mat-option>
      <mat-option value="airteltigo">AirtelTigo Money</mat-option>
    </mat-select>
  </mat-form-field>
  
  <mat-form-field appearance="outline">
    <mat-label>Phone Number</mat-label>
    <input matInput placeholder="0XX XXX XXXX" [(ngModel)]="phoneNumber">
  </mat-form-field>
  
  <button mat-raised-button color="accent" 
          [disabled]="!canSendPrompt()"
          (click)="sendPaymentPrompt()">
    Send Payment Prompt
  </button>
  
  @if (promptSent) {
    <div class="prompt-sent">
      <mat-icon color="primary">check_circle</mat-icon>
      <p>Payment prompt sent to {{phoneNumber}}</p>
      <p>Waiting for customer confirmation...</p>
      
      <mat-form-field appearance="outline">
        <mat-label>Transaction Reference</mat-label>
        <input matInput [(ngModel)]="transactionRef">
      </mat-form-field>
      
      <button mat-raised-button color="primary"
              [disabled]="!transactionRef"
              (click)="confirmPayment()">
        Confirm Payment
      </button>
    </div>
  }
</div>
```

---

### 3.5 Split Payment Handler
**New Component**: `split-payment/split-payment.component.ts`

**Features:**
- Display total amount due
- Add multiple payment methods
- Track remaining balance
- Validate total matches amount due

**Implementation:**
```typescript
export interface PaymentPart {
  method: string;
  amount: number;
  reference?: string;
}

export class SplitPaymentComponent {
  totalDue: number = 0;
  payments: PaymentPart[] = [];
  
  get totalPaid(): number {
    return this.payments.reduce((sum, p) => sum + p.amount, 0);
  }
  
  get remainingBalance(): number {
    return this.totalDue - this.totalPaid;
  }
  
  addPayment(method: string, amount: number, reference?: string): void {
    if (amount > this.remainingBalance) {
      this.snackBar.open('Amount exceeds remaining balance', 'Close');
      return;
    }
    
    this.payments.push({ method, amount, reference });
  }
  
  removePayment(index: number): void {
    this.payments.splice(index, 1);
  }
  
  canComplete(): boolean {
    return Math.abs(this.remainingBalance) < 0.01; // Account for floating point
  }
}
```

**UI:**
```html
<div class="split-payment">
  <div class="balance-display">
    <div class="total-due">
      <label>Total Due:</label>
      <span>${{totalDue.toFixed(2)}}</span>
    </div>
    <div class="total-paid">
      <label>Total Paid:</label>
      <span>${{totalPaid.toFixed(2)}}</span>
    </div>
    <div class="remaining" [class.complete]="remainingBalance === 0">
      <label>Remaining:</label>
      <span>${{remainingBalance.toFixed(2)}}</span>
    </div>
  </div>
  
  <div class="payments-list">
    <h3>Payments</h3>
    @for (payment of payments; track $index) {
      <div class="payment-item">
        <mat-icon>{{getPaymentIcon(payment.method)}}</mat-icon>
        <span class="method">{{payment.method}}</span>
        <span class="amount">${{payment.amount.toFixed(2)}}</span>
        <button mat-icon-button (click)="removePayment($index)">
          <mat-icon>delete</mat-icon>
        </button>
      </div>
    }
  </div>
  
  <div class="add-payment">
    <h3>Add Payment</h3>
    
    <mat-form-field appearance="outline">
      <mat-label>Payment Method</mat-label>
      <mat-select [(ngModel)]="newPaymentMethod">
        <mat-option value="Cash">Cash</mat-option>
        <mat-option value="Card">Card</mat-option>
        <mat-option value="MobileMoney">Mobile Money</mat-option>
      </mat-select>
    </mat-form-field>
    
    <mat-form-field appearance="outline">
      <mat-label>Amount</mat-label>
      <input matInput type="number" [(ngModel)]="newPaymentAmount" 
             [max]="remainingBalance">
    </mat-form-field>
    
    <button mat-raised-button color="primary"
            [disabled]="!canAddPayment()"
            (click)="addCurrentPayment()">
      Add Payment
    </button>
  </div>
  
  <button mat-raised-button color="primary" 
          class="complete-btn"
          [disabled]="!canComplete()"
          (click)="completePayment()">
    Complete Split Payment
  </button>
</div>
```

---

### 3.6 Receipt Preview & Print
**New Component**: `receipt-preview/receipt-preview.component.ts`

**Features:**
- Receipt layout preview
- Company logo and information
- Transaction details
- Itemized list
- Payment breakdown
- Barcode/QR code
- Print button (browser print API)
- Email button
- SMS button

**UI:**
```html
<div class="receipt-preview">
  <div class="receipt-container" #receiptContent>
    <div class="receipt-header">
      <img [src]="companyLogo" alt="Company Logo">
      <h2>{{companyName}}</h2>
      <p>{{companyAddress}}</p>
      <p>Tel: {{companyPhone}}</p>
      <p>TIN: {{companyTIN}}</p>
    </div>
    
    <div class="receipt-info">
      <p>Transaction #: {{transactionNumber}}</p>
      <p>Date: {{transactionDate | date:'medium'}}</p>
      <p>Cashier: {{cashierName}}</p>
      @if (customerName) {
        <p>Customer: {{customerName}}</p>
      }
    </div>
    
    <table class="receipt-items">
      <thead>
        <tr>
          <th>Item</th>
          <th>Qty</th>
          <th>Price</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        @for (item of items; track item.productCode) {
          <tr>
            <td>{{item.productName}}</td>
            <td>{{item.quantity}}</td>
            <td>${{item.unitPrice.toFixed(2)}}</td>
            <td>${{item.totalPrice.toFixed(2)}}</td>
          </tr>
          @if (item.discountAmount > 0) {
            <tr class="discount-row">
              <td colspan="3">Discount</td>
              <td>-${{item.discountAmount.toFixed(2)}}</td>
            </tr>
          }
        }
      </tbody>
    </table>
    
    <div class="receipt-totals">
      <div class="total-line">
        <span>Subtotal:</span>
        <span>${{subtotal.toFixed(2)}}</span>
      </div>
      @if (totalDiscount > 0) {
        <div class="total-line">
          <span>Total Discount:</span>
          <span class="discount">-${{totalDiscount.toFixed(2)}}</span>
        </div>
      }
      <div class="total-line">
        <span>Tax ({{taxRate}}%):</span>
        <span>${{tax.toFixed(2)}}</span>
      </div>
      <div class="total-line grand-total">
        <span>Total:</span>
        <span>${{grandTotal.toFixed(2)}}</span>
      </div>
    </div>
    
    <div class="receipt-payment">
      <p>Payment Method: {{paymentMethod}}</p>
      @if (payments.length > 1) {
        <p>Split Payment:</p>
        @for (payment of payments; track $index) {
          <p>{{payment.method}}: ${{payment.amount.toFixed(2)}}</p>
        }
      }
      @if (change > 0) {
        <p>Cash Received: ${{cashReceived.toFixed(2)}}</p>
        <p>Change: ${{change.toFixed(2)}}</p>
      }
    </div>
    
    @if (loyaltyPointsEarned > 0) {
      <div class="receipt-loyalty">
        <p>Loyalty Points Earned: {{loyaltyPointsEarned}}</p>
        <p>Total Points Balance: {{loyaltyBalance}}</p>
      </div>
    }
    
    <div class="receipt-footer">
      <p>Thank you for your business!</p>
      <p>Please keep this receipt for your records</p>
      <img [src]="receiptBarcode" alt="Transaction Barcode">
    </div>
  </div>
  
  <div class="receipt-actions">
    <button mat-raised-button color="primary" (click)="print()">
      <mat-icon>print</mat-icon>
      Print Receipt
    </button>
    
    <button mat-raised-button (click)="emailReceipt()">
      <mat-icon>email</mat-icon>
      Email Receipt
    </button>
    
    <button mat-raised-button (click)="smsReceipt()">
      <mat-icon>sms</mat-icon>
      SMS Receipt
    </button>
    
    <button mat-raised-button (click)="close()">
      Close
    </button>
  </div>
</div>
```

**Print Implementation:**
```typescript
print(): void {
  const printContent = document.getElementById('receiptContent');
  const printWindow = window.open('', '_blank');
  
  printWindow.document.write(`
    <html>
      <head>
        <title>Receipt - ${this.transactionNumber}</title>
        <style>
          @media print {
            @page { size: 80mm auto; margin: 0; }
            body { margin: 10mm; font-family: monospace; }
            .receipt-container { width: 60mm; }
          }
        </style>
      </head>
      <body>
        ${printContent.innerHTML}
      </body>
    </html>
  `);
  
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}
```

---

### 3.7 Email Receipt
**Implementation:**
```typescript
emailReceipt(): void {
  const dialogRef = this.dialog.open(EmailDialogComponent, {
    width: '400px',
    data: { transactionNumber: this.transactionNumber }
  });
  
  dialogRef.afterClosed().subscribe(email => {
    if (email) {
      this.apiService.emailReceipt(this.transactionId, email).subscribe({
        next: () => {
          this.snackBar.open('Receipt sent to ' + email, 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Failed to send email', 'Close', {
            duration: 3000
          });
        }
      });
    }
  });
}
```

**API Endpoint Required:**
```csharp
[HttpPost("{id}/email")]
public async Task<IActionResult> EmailReceipt(int id, [FromBody] EmailRequest request)
{
    var sale = await _context.Sales.FindAsync(id);
    if (sale == null) return NotFound();
    
    // Send email with receipt
    await _emailService.SendReceiptAsync(sale, request.Email);
    
    return Ok();
}
```

---

### 3.8 SMS Confirmation
**Implementation:**
```typescript
smsReceipt(): void {
  const dialogRef = this.dialog.open(SmsDialogComponent, {
    width: '400px',
    data: { transactionNumber: this.transactionNumber, amount: this.grandTotal }
  });
  
  dialogRef.afterClosed().subscribe(phone => {
    if (phone) {
      this.apiService.smsReceipt(this.transactionId, phone).subscribe({
        next: () => {
          this.snackBar.open('SMS sent to ' + phone, 'Close', {
            duration: 3000
          });
        },
        error: () => {
          this.snackBar.open('Failed to send SMS', 'Close', {
            duration: 3000
          });
        }
      });
    }
  });
}
```

**SMS Message Template:**
```
Thank you for shopping with us!
Transaction: {transactionNumber}
Date: {date}
Amount: ${grandTotal}
Points Earned: {loyaltyPoints}

{companyName}
{companyPhone}
```

---

## Phase 4: UI/UX Enhancements (Priority: MEDIUM)

### 4.1 Touch Target Optimization

**Global Styles** (`styles.scss`):
```scss
// Touch-friendly sizing
.touch-btn {
  min-width: 44px;
  min-height: 44px;
  padding: 12px 24px;
  font-size: 18px;
}

.touch-input {
  min-height: 48px;
  font-size: 16px;
}

.touch-card {
  min-height: 100px;
  padding: 16px;
}

// Touch feedback
.touch-feedback {
  transition: transform 0.1s, background-color 0.1s;
  
  &:active {
    transform: scale(0.95);
    background-color: rgba(0, 0, 0, 0.1);
  }
}
```

---

### 4.2 Swipe Gestures

**Hammer.js Integration:**
```typescript
import { HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';

@Injectable()
export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    swipe: { direction: Hammer.DIRECTION_ALL }
  };
}

// In component
@HostListener('swipeleft', ['$event'])
onSwipeLeft(event: any): void {
  // Remove item from cart
}

@HostListener('swiperight', ['$event'])
onSwipeRight(event: any): void {
  // Undo last action
}
```

---

### 4.3 High Contrast Mode

**Toggle in Settings:**
```typescript
export class AccessibilityService {
  private highContrastMode = new BehaviorSubject<boolean>(false);
  
  toggleHighContrast(): void {
    const enabled = !this.highContrastMode.value;
    this.highContrastMode.next(enabled);
    
    if (enabled) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
  }
}
```

**CSS:**
```scss
body.high-contrast {
  --primary-color: #000000;
  --background-color: #FFFFFF;
  --text-color: #000000;
  --border-color: #000000;
  --button-color: #000000;
  
  * {
    border-width: 2px !important;
    font-weight: 600 !important;
  }
  
  .mat-card {
    border: 2px solid var(--border-color);
  }
  
  button {
    border: 2px solid var(--button-color);
  }
}
```

---

### 4.4 Loading States & Progress

**Global Loading Interceptor:**
```typescript
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loadingService.show();
    
    return next.handle(req).pipe(
      finalize(() => this.loadingService.hide())
    );
  }
}
```

**Loading Component:**
```html
<div class="loading-overlay" *ngIf="loadingService.loading$ | async">
  <mat-spinner></mat-spinner>
  <p>Processing...</p>
</div>
```

---

### 4.5 Error Handling

**User-Friendly Error Messages:**
```typescript
export class ErrorHandlerService {
  private errorMessages: {[key: string]: string} = {
    'PRODUCT_NOT_FOUND': 'Product not found. Please scan again.',
    'INSUFFICIENT_STOCK': 'Insufficient stock available.',
    'PAYMENT_FAILED': 'Payment processing failed. Please try again.',
    'NETWORK_ERROR': 'Network connection lost. Please check your connection.',
    'INVALID_DISCOUNT': 'Invalid discount amount entered.',
    'EXPIRED_PROMOTION': 'This promotion has expired.'
  };
  
  getErrorMessage(error: any): string {
    const errorCode = error.error?.code || 'UNKNOWN_ERROR';
    return this.errorMessages[errorCode] || 'An error occurred. Please try again.';
  }
}
```

---

### 4.6 Responsive Layout

**Breakpoints:**
```scss
// Tablet (Portrait)
@media (max-width: 1024px) and (orientation: portrait) {
  .pos-main-container {
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }
}

// Tablet (Landscape)
@media (min-width: 1024px) and (max-width: 1366px) {
  .pos-main-container {
    grid-template-columns: 65fr 35fr;
  }
}

// Kiosk/Large Display
@media (min-width: 1920px) {
  .pos-main-container {
    max-width: 1800px;
    margin: 0 auto;
  }
  
  .product-grid {
    grid-template-columns: repeat(6, 1fr);
  }
}
```

---

### 4.7 Consistent Color Scheme

**Theme Configuration:**
```scss
$pos-primary: #1976d2;
$pos-accent: #ff9800;
$pos-warn: #f44336;
$pos-success: #4caf50;
$pos-background: #f5f5f5;
$pos-card-bg: #ffffff;
$pos-text: #212121;
$pos-text-secondary: #757575;
$pos-border: #e0e0e0;

.pos-theme {
  --primary-color: #{$pos-primary};
  --accent-color: #{$pos-accent};
  --warn-color: #{$pos-warn};
  --success-color: #{$pos-success};
  --background-color: #{$pos-background};
  --card-background: #{$pos-card-bg};
  --text-color: #{$pos-text};
  --text-secondary: #{$pos-text-secondary};
  --border-color: #{$pos-border};
}
```

---

## Implementation Priority Summary

### Phase 1: Core POS (MUST HAVE) - Week 1
- [ ] Split-screen layout
- [ ] Product grid with images
- [ ] Category filters
- [ ] Search with autocomplete
- [ ] Barcode scanner input
- [ ] Enhanced cart with quantity controls
- [ ] Numeric keypad component

### Phase 2: Advanced Features (SHOULD HAVE) - Week 2
- [ ] Manual discount (item and cart level)
- [ ] Promotional sales (time-based)
- [ ] Clearance sales (product-level)
- [ ] Loyalty points redemption

### Phase 3: Payment & Checkout (MUST HAVE) - Week 3
- [ ] Checkout modal
- [ ] Cash payment with calculator
- [ ] Card payment interface
- [ ] Mobile money interface
- [ ] Split payment handler
- [ ] Receipt preview and print
- [ ] Email receipt
- [ ] SMS confirmation

### Phase 4: UX Polish (NICE TO HAVE) - Week 4
- [ ] Touch target optimization
- [ ] Swipe gestures
- [ ] High contrast mode
- [ ] Loading states
- [ ] Error handling
- [ ] Responsive breakpoints
- [ ] Consistent theming

---

## Technical Requirements

### Backend API Endpoints Needed

**Products:**
- GET /api/ProductsTbl - Get all products with images
- GET /api/ProductsTbl/search?term={term} - Search products
- GET /api/ProductsTbl/barcode/{barcode} - Get by barcode
- GET /api/Categories - Get all categories
- GET /api/ProductsTbl/category/{categoryId} - Get products by category

**Promotions:**
- GET /api/Promotions/active - Get active promotions
- GET /api/Promotions/check - Check applicable promotions

**Loyalty:**
- GET /api/Loyalty/{cardNumber} - Get loyalty account
- POST /api/Loyalty/redeem - Redeem points
- POST /api/Loyalty/earn - Award points

**Sales:**
- POST /api/Sales - Create sale (enhanced with discounts, payments)
- POST /api/Sales/{id}/email - Email receipt
- POST /api/Sales/{id}/sms - SMS receipt

**Settings:**
- GET /api/Settings - Get POS settings (tax rate, loyalty config)

---

## File Structure

```
src/app/
├── components/
│   ├── sales-point/              # Main POS (enhanced)
│   ├── category-filter/          # New
│   ├── numeric-keypad/           # New
│   ├── checkout-modal/           # New
│   ├── cash-payment/             # New
│   ├── card-payment/             # New
│   ├── mobile-money-payment/    # New
│   ├── split-payment/            # New
│   ├── receipt-preview/          # New
│   └── dialogs/
│       ├── discount-dialog/      # New
│       ├── email-dialog/         # New
│       └── sms-dialog/           # New
├── services/
│   ├── product.service.ts
│   ├── promotion.service.ts      # New
│   ├── loyalty.service.ts        # New
│   ├── payment.service.ts        # New
│   ├── receipt.service.ts        # New
│   ├── loading.service.ts        # New
│   ├── error-handler.service.ts  # New
│   └── accessibility.service.ts  # New
├── models/
│   ├── product.model.ts          # Enhanced
│   ├── promotion.model.ts        # New
│   ├── loyalty.model.ts          # New
│   ├── payment.model.ts          # New
│   └── receipt.model.ts          # New
└── styles/
    ├── touch-optimization.scss   # New
    ├── high-contrast.scss        # New
    └── pos-theme.scss            # New
```

---

## Testing Checklist

### Phase 1 Testing
- [ ] Product grid loads correctly
- [ ] Category filters work
- [ ] Search returns correct results
- [ ] Barcode scanner input works
- [ ] Cart quantity adjustment works
- [ ] Cart calculations are accurate
- [ ] Numeric keypad inputs correctly
- [ ] Touch targets are minimum 44x44px
- [ ] Responsive on tablets (10-15 inch)

### Phase 2 Testing
- [ ] Manual discounts apply correctly
- [ ] Promotional discounts auto-apply
- [ ] Clearance prices calculate correctly
- [ ] Loyalty points load and redeem
- [ ] Points calculation is accurate
- [ ] Discount combinations work

### Phase 3 Testing
- [ ] Checkout modal displays correctly
- [ ] Cash payment calculates change correctly
- [ ] Card payment processes
- [ ] Mobile money processes
- [ ] Split payment totals correctly
- [ ] Receipt displays all information
- [ ] Print functionality works
- [ ] Email sends successfully
- [ ] SMS sends successfully

### Phase 4 Testing
- [ ] Touch feedback is responsive
- [ ] Swipe gestures work
- [ ] High contrast mode switches
- [ ] Loading indicators show
- [ ] Error messages are clear
- [ ] Layout adapts to screen sizes
- [ ] Theme is consistent throughout

---

## Estimated Development Time

**Total: 3-4 weeks (120-160 hours)**

- Phase 1: 40-50 hours
- Phase 2: 30-40 hours
- Phase 3: 30-40 hours
- Phase 4: 20-30 hours

---

## Notes

1. This is a comprehensive implementation plan requiring significant development effort
2. Features should be implemented incrementally and tested thoroughly
3. Backend API endpoints must be implemented alongside frontend features
4. Touch optimization is critical for kiosk/tablet deployment
5. Performance testing required for large product catalogs
6. Security considerations for payment processing
7. Consider offline mode for network interruptions
8. Database migrations needed for new tables/columns
9. User training documentation required
10. Regular backups of sales data essential

---

**This plan provides a complete roadmap for building a production-ready, touchscreen-optimized POS system.**
