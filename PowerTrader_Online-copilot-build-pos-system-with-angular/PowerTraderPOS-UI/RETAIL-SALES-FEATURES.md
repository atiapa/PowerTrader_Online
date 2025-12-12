# Retail Sales Point - Feature Documentation

## Overview
The Retail Sales Point has been enhanced with comprehensive features for retail operations including inventory management, hold orders, returns processing, gift card payments, and financial accounting integration.

## Component Changes

### Component Name
- **Changed from:** "Sales Point"
- **Changed to:** "Retail Sales Point"

## New Features

### 1. Inventory Management
- **Real-time Stock Validation**: System checks available stock before adding items to cart
- **Automatic Stock Reduction**: When a sale is completed, the `Retail_Items` table is automatically updated
- **Stock Restoration on Returns**: Returned items automatically restore inventory levels

### 2. Hold Orders Feature
- **Hold Current Transaction**: Save current cart to process other customers
- **View Hold Orders**: Badge notification showing count of held orders
- **Retrieve Orders**: Load held orders back into cart to complete payment
- **Order Management**: Delete unnecessary hold orders
- **Order Details**: Each hold order shows:
  - Order number (HOLD-XXXXXXXX format)
  - Customer name (if provided)
  - Total amount
  - Number of items
  - Date/time held
  - Attendant name

### 3. Inward Returns Processing
- **Return Management Panel**: Dedicated interface for processing returns
- **Required Information**:
  - Original invoice number
  - Product code (scan or manual entry)
  - Quantity to return
  - Reason for return
- **Automatic Processing**:
  - Stock restoration in `Retail_Items` table
  - Financial posting to `Accounts_Ledger` for accounting reports
  - Return tracking and audit trail

### 4. Gift Card & Voucher Payments
- **Payment Types**: Support for both Gift Cards and Vouchers
- **Card Validation**: Real-time validation of gift card/voucher numbers
- **Balance Display**: Shows available balance after validation
- **Separate Transaction Recording**: 
  - Gift card sales saved to `Sales_Details_Gifts` table
  - Regular sales saved to `Sales_Details_Temp` table

### 5. Enhanced Customer Information
- **Customer Account Number**: Track customer accounts for loyalty/credit
- **Customer Name**: Optional customer identification
- **Phone Number**: Customer contact information

### 6. Discount Management
- **Item-level Discounts**: Apply discounts to individual cart items
- **Real-time Calculation**: Automatic recalculation of totals
- **Discount Tracking**: All discounts recorded in sales details

### 7. Financial Accounting Integration
- **Double Entry Posting**: All sales automatically posted to `Accounts_Ledger` table
- **Store Attribute**: All transactions marked with "Retail" store identifier
- **Comprehensive Tracking**:
  - Sales revenue
  - Tax collected
  - Discounts given
  - Returns/refunds
  - Payment methods

## Database Tables

### Sales_Details_Temp
Stores all completed retail sales with comprehensive details:
- Transaction details (invoice, date, time, session)
- Product information (ID, name, batch, quantities)
- Pricing (unit price, cost, discount, extended price)
- Customer data (ID, name, account number, details)
- Financial data (tax rates, amounts, profit/loss)
- Payment information (method, amount paid, change)
- Inventory tracking (previous stock, quantity remaining)
- Staff information (attendant, sales rep)
- Organization details (name, code, branch)
- **Store field**: Always set to "Retail"

### Sales_Details_Gifts
Stores gift card and voucher transactions:
- Same structure as Sales_Details_Temp
- Dedicated table for gift card payment tracking
- Enables separate reporting for gift card sales
- **Store field**: Always set to "Retail"

## Payment Methods

1. **Cash**: Traditional cash payment
2. **Card**: Credit/Debit card payment
3. **Mobile Money**: Mobile payment services
4. **Gift Card**: Pre-paid gift card redemption
5. **Voucher**: Promotional voucher redemption

## User Interface Features

### Toolbar
- Title: "Retail Sales Point" with attendant name
- Hold Orders button with badge showing count
- Returns button for processing inwards
- Logout button

### Main Interface
- **Left Panel**:
  - Product entry (code scanning/manual)
  - Quantity selection
  - Customer information form
  - Payment method selection
  - Gift card validation (conditional)

- **Right Panel**:
  - Shopping cart table with:
    - Product details
    - Quantity
    - Unit price
    - Editable discount field
    - Net total
    - Remove action
  - Totals display:
    - Subtotal
    - Total discount
    - Tax (10%)
    - Grand total
  - Action buttons:
    - Hold Order
    - Clear Cart
    - Complete Sale

### Hold Orders Panel (Toggle)
- Shows all held orders
- Order details display
- Retrieve order button
- Delete order button

### Returns Panel (Toggle)
- Invoice number input
- Product code scanner/entry
- Return quantity
- Return reason
- Process return button

## Invoice Number Format
- **Retail Sales**: `RET-YYYYMMDD-XXXXXX`
  - Example: `RET-20251210-123456`
- **Hold Orders**: `HOLD-XXXXXXXX`
  - Example: `HOLD-12345678`

## Tax Configuration
- Default tax rate: 10%
- Applied to: (Subtotal - Discounts)
- Separate tracking for multiple tax types (Tax1-4)

## Stock Management Rules
1. Stock checked before adding to cart
2. Warning shown if insufficient stock
3. Cannot exceed available quantity
4. Stock reduced only on sale completion
5. Stock restored on returns processing

## Financial Posting Rules

### On Sale Completion:
- Debit: Cash/Bank Account (Payment Method)
- Credit: Sales Revenue Account
- Debit: Tax Payable Account
- Credit: Accounts Ledger with full transaction details

### On Return Processing:
- Debit: Sales Returns Account
- Credit: Cash/Bank Account
- Adjustment to Tax Payable
- Full audit trail in Accounts Ledger

## Reports Available (Via Accounts_Ledger)
- Daily sales by store (filter Store = "Retail")
- Sales by payment method
- Gift card sales analysis
- Returns and refunds tracking
- Tax collected reports
- Attendant performance
- Product sales analysis
- Customer purchase history
- Profit/loss by transaction

## Security & Audit
- All transactions tracked with:
  - Attendant name (from logged-in user)
  - Entry date and time
  - Organisation and branch details
  - Unique invoice numbers
- Hold orders stored locally per terminal
- Complete transaction history maintained

## Usage Instructions

### Making a Sale:
1. Scan or enter product code
2. Adjust quantity if needed
3. Click "Add to Cart"
4. Repeat for all items
5. Apply item discounts if needed
6. Enter customer information (optional)
7. Select payment method
8. For gift cards: Enter and validate card number
9. Click "Complete Sale"

### Holding an Order:
1. Add items to cart
2. Click "Hold Order" button
3. Cart is saved and cleared for next customer
4. Continue with new transaction

### Retrieving a Hold Order:
1. Click "Hold Orders" button in toolbar
2. View list of held orders
3. Click retrieve icon to load order
4. Complete the transaction

### Processing a Return:
1. Click "Returns" button in toolbar
2. Enter original invoice number
3. Scan or enter product code
4. Enter quantity being returned
5. Enter reason for return
6. Click "Process Return"
7. Stock automatically restored
8. Refund processed and posted to ledger

### Using Gift Cards:
1. Select "Gift Card" or "Voucher" as payment method
2. Enter card/voucher number
3. Click "Validate" to check balance
4. If valid and sufficient balance, complete sale
5. Transaction saved to Sales_Details_Gifts table

## Technical Implementation

### Services Used:
- `RetailSalesService`: Manages retail-specific operations
- `ApiService`: Backend API communication
- `AuthService`: User authentication and details

### Key Methods:
- `addToCart()`: Stock validation and cart management
- `holdCurrentOrder()`: Save current transaction
- `retrieveHoldOrder()`: Load held transaction
- `completeSale()`: Process payment and update records
- `processReturn()`: Handle returns and stock restoration
- `validateGiftCard()`: Verify gift card validity

### Local Storage:
- Hold orders stored in browser localStorage
- Survives page refresh
- Cleared on logout

## Future Enhancements
- Receipt printing
- Customer loyalty points integration
- Advanced discount rules (bulk, promotional)
- Multiple payment methods per transaction
- Cash drawer integration
- Barcode scanner hardware support
- Offline mode capability
- Advanced reporting dashboard

## Troubleshooting

### Product not adding to cart:
- Check product code is correct
- Verify product exists in system
- Ensure sufficient stock available

### Hold order not retrieving:
- Check localStorage is enabled
- Verify order wasn't deleted
- Try refreshing the page

### Return not processing:
- Verify invoice number is correct
- Check product code matches original sale
- Ensure return quantity doesn't exceed sold quantity

### Gift card validation failing:
- Check card number is entered correctly
- Verify card is active in system
- Confirm sufficient balance

## Support
For technical support or feature requests, contact the development team.

---
**Version**: 2.0
**Last Updated**: December 10, 2025
**Component**: Retail Sales Point
