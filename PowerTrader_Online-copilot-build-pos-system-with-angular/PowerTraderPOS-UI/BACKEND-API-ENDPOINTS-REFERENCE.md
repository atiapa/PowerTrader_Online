# 🔌 BACKEND API ENDPOINTS REFERENCE

## 📋 COMPLETE API SPECIFICATION
**Total Endpoints:** 89  
**Base URL:** `http://localhost:5000/api`  
**Authentication:** JWT Bearer Token (Required)  
**Multi-Tenant:** All endpoints filtered by `organisationCode` and `branchCode`

---

## 🎁 GIFT CARD REDEMPTION API (14 Endpoints)

### **Base Route:** `/api/GiftCardRedemption`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/issue` | Issue new gift card | `GiftCardIssuanceRequest` | `GiftCardRedemptionResponse` |
| GET | `/validate/{cardNumber}` | Validate gift card | Query: `?pin=xxxx` | `GiftCardBalanceResponse` |
| GET | `/balance/{cardNumber}` | Check balance | - | `GiftCardBalanceResponse` |
| POST | `/redeem` | Redeem gift card | `GiftCardRedemptionRequest` | `GiftCardRedemptionResponse` |
| GET | `/history/{cardNumber}` | Get redemption history | Tenant params | `SalesDetailsGifts[]` |
| GET | `/invoice/{invoiceNr}` | Get by invoice | Tenant params | `SalesDetailsGifts[]` |
| GET | `/` | Get all redemptions | Query: `?startDate&endDate&status` | `SalesDetailsGifts[]` |
| GET | `/{refNo}` | Get by RefNo | Tenant params | `SalesDetailsGifts` |
| POST | `/refund` | Refund gift card | Refund details | `GiftCardRedemptionResponse` |
| POST | `/void/{refNo}` | Void redemption | `{reason}` | `GiftCardRedemptionResponse` |
| GET | `/customer/{customerID}` | Get by customer | Tenant params | `GiftCardTbl[]` |
| GET | `/stats` | Get statistics | Query: `?startDate&endDate` | Stats object |
| POST | `/verify-pin` | Verify PIN | `{cardNumber, pin}` | `{valid, message}` |
| POST | `/send-receipt/{refNo}` | Send receipt | `{method, recipient}` | `{success, message}` |
| GET | `/export` | Export report | Query: `?format=EXCEL/PDF` | Blob (file) |
| POST | `/batch-issue` | Batch create cards | Batch details | `{success, cardsCreated, giftCards}` |

---

## 📦 INVENTORY MANAGEMENT API (18 Endpoints)

### **Base Route:** `/api/Inventory`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/reduce-stock` | Reduce stock on sale | `{productID, quantity, invoiceNr, attendantID}` | `{success, newStock, message}` |
| POST | `/increase-stock` | Increase stock on return | `{productID, quantity, referenceNumber, reason}` | `{success, newStock, message}` |
| POST | `/adjust` | Manual adjustment | `StockAdjustmentRequest` | `{success, newStock, message}` |
| POST | `/batch-adjust` | Batch adjustments | `{adjustments[]}` | `{success, updatedCount, failures}` |
| GET | `/stock-level/{productID}` | Get current stock | Tenant params | `StockInquiryResponse` |
| GET | `/check-availability/{productID}` | Check availability | Query: `?quantity=N` | `{available, currentStock, canFulfill}` |
| GET | `/low-stock` | Low stock items | Query: `?threshold=N` | `LowStockAlert[]` |
| GET | `/out-of-stock` | Out of stock items | Tenant params | `RetailItems[]` |
| GET | `/overstock` | Overstock items | Tenant params | `RetailItems[]` |
| GET | `/movement-history/{productID}` | Stock movements | Query: `?startDate&endDate` | `StockMovementHistory[]` |
| POST | `/transfer` | Branch transfer | `StockTransferRequest` | `{success, transferId, message}` |
| POST | `/transfer/approve/{transferId}` | Approve transfer | `{approvedBy}` | `{success, message}` |
| POST | `/transfer/reject/{transferId}` | Reject transfer | `{rejectedBy, reason}` | `{success, message}` |
| GET | `/transfers/pending` | Pending transfers | Tenant params | Transfer array |
| GET | `/valuation` | Stock valuation | Tenant params | Valuation object |
| GET | `/stock-count-sheet` | Physical count sheet | Query: `?categoryID` | Product list |
| POST | `/stock-count/submit` | Submit count | `{counts[], countedBy, notes}` | `{success, adjustmentsMade}` |
| GET | `/reorder-recommendations` | Reorder suggestions | Tenant params | Recommendations array |
| GET | `/stock-aging` | Slow moving items | Query: `?days=90` | Aging report |
| GET | `/export` | Export report | Query: `?format&reportType` | Blob (file) |

---

## 🔄 PENDING SALES API (17 Endpoints)

### **Base Route:** `/api/PendingSales`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/hold` | Hold order | `HoldOrderRequest` | `{success, ordernr, message}` |
| GET | `/retrieve/{ordernr}` | Retrieve order | Tenant params | `RetrieveOrderResponse` |
| GET | `/` | Get pending orders | Query: `?tillName&session&attendant` | `HoldOrderSummary[]` |
| GET | `/customer/{customerID}` | Get by customer | Tenant params | `HoldOrderSummary[]` |
| GET | `/search` | Search orders | Query: `?search=term` | `HoldOrderSummary[]` |
| POST | `/cancel/{ordernr}` | Cancel order | `{reason, cancelledBy}` | `{success, message}` |
| PUT | `/update/{ordernr}` | Update order | `{items[]}` | `{success, message}` |
| POST | `/add-item/{ordernr}` | Add item | `HoldOrderItem` | `{success, message}` |
| DELETE | `/remove-item/{ordernr}/{productID}` | Remove item | - | `{success, message}` |
| POST | `/transfer/{ordernr}` | Transfer order | `{toTillName, toAttendant, transferredBy}` | `{success, message}` |
| POST | `/complete/{ordernr}` | Complete order | `{invoiceNr, paymentDetails}` | `{success, invoiceNr, message}` |
| GET | `/count` | Get count | Query: `?tillName&session` | `{count}` |
| GET | `/old` | Old orders | Query: `?daysOld=7` | `HoldOrderSummary[]` |
| POST | `/bulk-cancel` | Bulk cancel old | `{daysOld, cancelledBy, reason}` | `{success, cancelledCount}` |
| GET | `/stats` | Statistics | Query: `?startDate&endDate` | Stats object |
| GET | `/print/{ordernr}` | Print receipt | Tenant params | Blob (PDF) |
| GET | `/export` | Export report | Query: `?format=EXCEL/PDF` | Blob (file) |
| POST | `/auto-save/{ordernr}` | Auto-save draft | `{items[], lastModified}` | `{success, saved}` |
| GET | `/check-availability/{ordernr}` | Check availability | Tenant params | `{exists, canRetrieve, reason}` |

---

## ↩️ RETURNS PROCESSING API (21 Endpoints)

### **Base Route:** `/api/Returns`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/process` | Process return | `ProcessReturnRequest` | `ProcessReturnResponse` |
| GET | `/validate` | Validate return | Query: `?invoiceNr&productID` | Validation result |
| GET | `/return/{returnNumber}` | Get by return number | Tenant params | `ReturnTransactions` |
| GET | `/{refNo}` | Get by RefNo | Tenant params | `ReturnTransactions` |
| GET | `/invoice/{invoiceNr}` | Get by invoice | Tenant params | `ReturnTransactions[]` |
| GET | `/` | Get all returns | Query: `?startDate&endDate&status` | `ReturnSummary[]` |
| GET | `/pending-approvals` | Pending approvals | Tenant params | `ReturnSummary[]` |
| POST | `/approve` | Approve return | `ReturnApprovalRequest` | `{success, message}` |
| POST | `/reject/{refNo}` | Reject return | `{rejectedByID, rejectedByName, reason}` | `{success, message}` |
| POST | `/complete/{refNo}` | Complete return | `{completedByID}` | `{success, inventoryUpdated, ledgerPosted}` |
| POST | `/restock/{refNo}` | Restock items | `{restockedBy, restockNotes}` | `{success, itemsRestocked}` |
| POST | `/store-credit/{refNo}` | Issue store credit | `{customerID, amount, expiryDays}` | `{success, storeCreditNumber}` |
| POST | `/gift-card/{refNo}` | Issue gift card | `{amount, issuedToName, issuedToPhone}` | `{success, giftCardNumber}` |
| POST | `/exchange` | Process exchange | Exchange request | `{returnNumber, newInvoiceNr, balanceDue}` |
| POST | `/void/{refNo}` | Void return | `{voidedBy, reason}` | `{success, message}` |
| GET | `/customer/{customerID}` | Get by customer | Tenant params | `ReturnSummary[]` |
| GET | `/product/{productID}` | Get by product | Query: `?startDate&endDate` | `ReturnTransactions[]` |
| GET | `/stats` | Statistics | Query: `?startDate&endDate` | Stats object |
| GET | `/print/{refNo}` | Print receipt | Tenant params | Blob (PDF) |
| POST | `/email-receipt/{refNo}` | Email receipt | `{email}` | `{success, message}` |
| GET | `/export` | Export report | Query: `?format&startDate&endDate` | Blob (file) |
| GET | `/check-eligibility` | Check eligibility | Query: `?invoiceNr&productID` | Eligibility object |

---

## 💰 ACCOUNTING INTEGRATION API (19 Endpoints)

### **Base Route:** `/api/AccountingIntegration`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| POST | `/post-sale` | Post sale to ledger | `SalePostingRequest` | `LedgerPostingResponse` |
| POST | `/post-return` | Post return to ledger | `ReturnPostingRequest` | `LedgerPostingResponse` |
| POST | `/post-gift-card` | Post gift card txn | `GiftCardPostingRequest` | `LedgerPostingResponse` |
| POST | `/post` | Generic posting | `LedgerPostingRequest` | `LedgerPostingResponse` |
| GET | `/verify-balance/{voucherNo}` | Verify balance | Tenant params | `LedgerBalanceCheck` |
| GET | `/entries/{voucherNo}` | Get entries | Tenant params | `AccountLedgerTbl[]` |
| GET | `/` | Get entries by date | Query: `?startDate&endDate&accountCode` | `AccountLedgerTbl[]` |
| GET | `/account-balance` | Get account balance | Query: `?accountCode&asOfDate` | Balance object |
| GET | `/trial-balance` | Trial balance | Query: `?startDate&endDate` | Trial balance object |
| POST | `/post-eod-summary` | End-of-day summary | EOD summary | `LedgerPostingResponse` |
| POST | `/reverse/{voucherNo}` | Reverse entry | `{reversedBy, reason}` | `{success, reversalVoucherNo}` |
| GET | `/unposted` | Unposted transactions | Query: `?type` | Unposted list |
| POST | `/batch-post` | Batch post | `{transactions[]}` | `{success, postedCount, failures}` |
| GET | `/revenue-report` | Revenue report (P&L) | Query: `?startDate&endDate` | Revenue object |
| GET | `/cash-flow-report` | Cash flow report | Query: `?startDate&endDate` | Cash flow object |
| GET | `/account-statement/{accountCode}` | Account statement | Query: `?startDate&endDate` | Statement object |
| GET | `/export` | Export report | Query: `?format&reportType&startDate&endDate` | Blob (file) |
| POST | `/reconcile` | Reconcile ledger | `{startDate, endDate}` | Reconciliation result |
| GET | `/posting-summary` | Posting summary | Query: `?date` | Summary object |

---

## 🔐 AUTHENTICATION & AUTHORIZATION

### **All Endpoints Require:**
```http
Authorization: Bearer <JWT_TOKEN>
```

### **HTTP Headers:**
```http
Content-Type: application/json
Accept: application/json
Authorization: Bearer eyJhbGc...
```

### **Multi-Tenant Query Params:**
All GET requests automatically include:
```
?organisationCode=ORG001&branchCode=BRANCH01
```

---

## 📊 RESPONSE FORMATS

### **Success Response (200 OK):**
```json
{
  "success": true,
  "data": { ... },
  "message": "Operation completed successfully"
}
```

### **Error Response (400 Bad Request):**
```json
{
  "success": false,
  "error": "Validation failed",
  "details": ["Field 'quantity' is required"],
  "message": "Request validation failed"
}
```

### **Error Response (404 Not Found):**
```json
{
  "success": false,
  "error": "Resource not found",
  "message": "Gift card GC-12345 not found"
}
```

### **Error Response (500 Internal Server Error):**
```json
{
  "success": false,
  "error": "Internal server error",
  "message": "An unexpected error occurred",
  "traceId": "00-abc123..."
}
```

---

## 🧪 EXAMPLE API CALLS

### **1. Issue Gift Card**
```http
POST /api/GiftCardRedemption/issue
Content-Type: application/json
Authorization: Bearer <token>

{
  "cardValue": 100.00,
  "issuedToName": "John Doe",
  "issuedToPhone": "+1234567890",
  "issuedToEmail": "john@example.com",
  "paymentMethod": "CASH",
  "soldByID": "USR001",
  "soldByName": "Jane Cashier",
  "expiryDays": 365,
  "organisationCode": "ORG001",
  "branchCode": "BRANCH01"
}
```

**Response:**
```json
{
  "success": true,
  "refNo": 12345,
  "remainingBalance": 100.00,
  "amountRedeemed": 0.00,
  "transactionId": "TXN-20240101-001",
  "receiptNumber": "RCP-001",
  "message": "Gift card issued successfully"
}
```

### **2. Reduce Stock on Sale**
```http
POST /api/Inventory/reduce-stock
Content-Type: application/json
Authorization: Bearer <token>

{
  "productID": "PROD001",
  "quantity": 5,
  "invoiceNr": "INV-20240101-001",
  "attendantID": "USR001",
  "adjustmentType": "SALE",
  "organisationCode": "ORG001",
  "branchCode": "BRANCH01"
}
```

**Response:**
```json
{
  "success": true,
  "newStock": 95,
  "message": "Stock reduced successfully. New stock: 95 units"
}
```

### **3. Process Return**
```http
POST /api/Returns/process
Content-Type: application/json
Authorization: Bearer <token>

{
  "originalInvoiceNr": "INV-20240101-001",
  "returnItems": [
    {
      "productID": "PROD001",
      "productName": "Widget A",
      "quantityReturned": 2,
      "quantitySold": 5,
      "unitPrice": 25.00,
      "originalPrice": 25.00,
      "returnAmount": 50.00,
      "taxAmount": 7.50,
      "productCondition": "NEW",
      "restockable": true
    }
  ],
  "returnReason": "Customer changed mind",
  "returnType": "PARTIAL",
  "processedByID": "USR001",
  "processedByName": "Jane Cashier",
  "tillName": "TILL-01",
  "refundMethod": "CASH",
  "organisationCode": "ORG001",
  "branchCode": "BRANCH01"
}
```

**Response:**
```json
{
  "success": true,
  "returnNumber": "RET-20240101-001",
  "refNo": 45678,
  "refundAmount": 57.50,
  "receiptNumber": "RET-RCP-001",
  "message": "Return processed successfully",
  "inventoryUpdated": true,
  "ledgerPosted": true
}
```

### **4. Post Sale to Ledger**
```http
POST /api/AccountingIntegration/post-sale
Content-Type: application/json
Authorization: Bearer <token>

{
  "invoiceNr": "INV-20240101-001",
  "saleDate": "2024-01-01T10:30:00Z",
  "customerID": "CUST001",
  "customerName": "John Doe",
  "subtotal": 100.00,
  "discount": 10.00,
  "tax": 13.50,
  "total": 103.50,
  "paymentMethod": "CASH",
  "amountPaid": 103.50,
  "attendantID": "USR001",
  "tillName": "TILL-01",
  "organisationCode": "ORG001",
  "branchCode": "BRANCH01"
}
```

**Response:**
```json
{
  "success": true,
  "voucherNo": "INV-20240101-001",
  "entriesPosted": 4,
  "ledgerRefs": [1001, 1002, 1003, 1004],
  "message": "Ledger posted successfully",
  "balanceVerified": true
}
```

---

## 🔍 QUERY PARAMETER EXAMPLES

### **Date Range Filtering:**
```
GET /api/Returns?startDate=2024-01-01T00:00:00Z&endDate=2024-01-31T23:59:59Z
```

### **Multi-Parameter Search:**
```
GET /api/PendingSales?tillName=TILL-01&session=SESSION-001&attendant=John
```

### **Pagination (if implemented):**
```
GET /api/Inventory?page=1&pageSize=50
```

---

## 📝 DATA VALIDATION RULES

### **Gift Card:**
- `cardValue`: Required, > 0, max 10,000
- `issuedToName`: Required, 2-100 characters
- `expiryDays`: Optional, 1-3650 days

### **Inventory:**
- `quantity`: Required, > 0, integer
- `productID`: Required, must exist in RetailItems
- `adjustmentType`: Required, valid enum value

### **Returns:**
- `returnAmount`: Required, > 0, ≤ original amount
- `productCondition`: Required, valid enum value
- `returnReason`: Required, 5-500 characters

### **Accounting:**
- `debit`: Required, ≥ 0
- `credit`: Required, ≥ 0
- `totalDebits` must equal `totalCredits`

---

## 🚨 ERROR CODES

| Code | Description |
|------|-------------|
| 400 | Bad Request - Validation failed |
| 401 | Unauthorized - Invalid/missing token |
| 403 | Forbidden - Insufficient permissions |
| 404 | Not Found - Resource doesn't exist |
| 409 | Conflict - Duplicate entry |
| 422 | Unprocessable Entity - Business logic violation |
| 500 | Internal Server Error |

---

## 🔧 BACKEND IMPLEMENTATION NOTES

### **Transaction Management:**
Use database transactions for operations that span multiple tables:
```csharp
using var transaction = await _context.Database.BeginTransactionAsync();
try {
    // 1. Update inventory
    // 2. Post to ledger
    // 3. Record transaction
    await transaction.CommitAsync();
}
catch {
    await transaction.RollbackAsync();
    throw;
}
```

### **Multi-Tenant Filtering:**
Apply tenant filter to ALL queries:
```csharp
var items = await _context.RetailItems
    .Where(x => x.OrganisationCode == tenantContext.OrganisationCode)
    .Where(x => x.BranchCode == tenantContext.BranchCode)
    .ToListAsync();
```

### **Audit Trail:**
Log all operations:
```csharp
_logger.LogInformation(
    "Gift card {CardNumber} redeemed {Amount} on invoice {InvoiceNr} by {AttendantID}",
    cardNumber, amount, invoiceNr, attendantID
);
```

---

## 📚 RELATED DOCUMENTATION

1. **BACKEND-INTEGRATION-COMPLETE-SUMMARY.md** - Full implementation guide
2. **BACKEND-INTEGRATION-QUICK-START.md** - Quick reference
3. **RETAIL-SALES-FEATURES.md** - POS feature list
4. **MULTI-TENANT-ARCHITECTURE-IMPLEMENTATION.md** - Multi-tenant design

---

**Document Version:** 1.0  
**Last Updated:** 2024  
**Total Endpoints:** 89  
**Estimated Implementation Time:** 40-60 hours
