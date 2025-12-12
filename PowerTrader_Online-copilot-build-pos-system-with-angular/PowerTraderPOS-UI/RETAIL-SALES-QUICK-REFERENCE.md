# Retail Sales Point - Quick Reference Guide

## Quick Access Features

### 🎯 Main Actions
| Action | Button/Location | Shortcut |
|--------|----------------|----------|
| Add Product | Left Panel → Product Code | Enter key |
| Hold Order | Bottom → Hold Order button | - |
| View Holds | Toolbar → Hold Orders (with badge) | - |
| Process Return | Toolbar → Returns button | - |
| Complete Sale | Bottom → Complete Sale button | - |

## 📦 Stock Management
- ✅ Automatic stock validation before adding to cart
- ✅ Real-time stock reduction on sale completion
- ✅ Automatic stock restoration on returns
- ✅ Stock updates in `Retail_Items` table

## 💳 Payment Methods
1. **Cash** - Standard cash payment
2. **Card** - Credit/Debit cards
3. **Mobile Money** - Mobile payment services
4. **Gift Card** - Prepaid gift cards (requires validation)
5. **Voucher** - Promotional vouchers (requires validation)

## 🔄 Hold Orders Workflow
```
1. Add items to cart
2. Click "Hold Order"
3. Order saved with unique number (HOLD-XXXXXXXX)
4. Cart cleared for next customer
5. Click "Hold Orders" badge to view all
6. Click restore icon to retrieve order
7. Complete payment when customer ready
```

## ↩️ Returns Workflow
```
1. Click "Returns" in toolbar
2. Enter original invoice number
3. Scan/enter product code
4. Enter quantity to return
5. Enter return reason
6. Click "Process Return"
7. Stock automatically restored
8. Refund posted to accounts ledger
```

## 💝 Gift Card Workflow
```
1. Add items to cart
2. Select "Gift Card" or "Voucher" payment method
3. Enter card/voucher number
4. Click "Validate" button
5. System shows balance
6. Complete sale if balance sufficient
7. Transaction saved to Sales_Details_Gifts table
```

## 📊 Database Tables Used

### Sales_Details_Temp
- Regular sales transactions
- Store = "Retail"
- Complete transaction history

### Sales_Details_Gifts
- Gift card/voucher sales
- Store = "Retail"
- Separate tracking for gift payments

### Accounts_Ledger
- All financial double entries
- Sales revenue postings
- Tax collection tracking
- Return/refund postings

### Retail_Items
- Inventory management
- Stock quantity tracking
- Automatic updates on sales/returns

## 🔢 Invoice Number Formats
- **Retail Sales**: `RET-20251210-123456`
- **Hold Orders**: `HOLD-12345678`

## 💰 Price Calculations
```
Subtotal = Sum of (Quantity × Unit Price)
Discount = Item-level discounts
Taxable Amount = Subtotal - Discount
Tax = Taxable Amount × 10%
Total = Subtotal - Discount + Tax
```

## 🎫 Discount Application
- Click in discount column of cart table
- Enter discount amount
- Maximum: Item total price
- Automatically recalculates totals

## 👥 Customer Information (Optional)
- Customer Account Number
- Customer Name
- Phone Number

## 🏪 Store Identifier
All transactions marked with **Store = "Retail"**

## 📈 Financial Reports Available
Via Accounts_Ledger table:
- Daily sales by store
- Payment method analysis
- Gift card sales
- Returns tracking
- Tax collected
- Attendant performance
- Product movement
- Customer history
- Profit/loss analysis

## ⚠️ Important Notes
- Stock checked BEFORE adding to cart
- Cannot exceed available quantity
- Hold orders saved locally (per terminal)
- All sales post to accounts ledger
- Attendant auto-recorded from login
- Unique invoice numbers for all transactions

## 🔐 Security Features
- User authentication required
- Attendant tracking on all transactions
- Complete audit trail
- Organisation/branch tracking
- Date/time stamps on all records

## 🚀 Quick Tips
1. Use barcode scanner for faster product entry
2. Hold orders when customer needs to get payment
3. Process returns immediately for accurate inventory
4. Validate gift cards before completing sale
5. Apply discounts before payment selection
6. Clear cart removes all items (use Hold instead)

---
**Pro Tip**: The Hold Orders badge shows real-time count of pending orders!
