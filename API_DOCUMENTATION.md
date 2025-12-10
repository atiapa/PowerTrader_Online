# PowerTrader POS - API Documentation

## Base URL
- Development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

## Authentication
All protected endpoints require a JWT Bearer token in the Authorization header:
```
Authorization: Bearer {your-jwt-token}
```

Tokens are obtained through the login endpoint and expire after 480 minutes (8 hours) by default.

---

## Authentication Endpoints

### POST /api/Auth/login
Authenticate user with username and PIN.

**Request Body:**
```json
{
  "username": "admin",
  "pin": "1234"
}
```

**Success Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": 1,
  "username": "admin",
  "fullName": "Admin User",
  "role": "Admin",
  "tenantId": 1,
  "tenantName": "Demo Tenant"
}
```

**Error Responses:**
- `400 Bad Request`: Missing username or PIN
- `401 Unauthorized`: Invalid credentials

**Roles Available:**
- Admin
- Sales
- Finance
- HR
- Fleet
- Service
- Suppliers
- Customers

---

## Sales Endpoints

### GET /api/Sales
Get recent sales transactions (last 100).

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "transactionNumber": "TXN202412091234",
    "totalAmount": 100.00,
    "taxAmount": 10.00,
    "discountAmount": 0.00,
    "netAmount": 110.00,
    "paymentMethod": "Cash",
    "status": "Completed",
    "transactionDate": "2024-12-09T12:34:56Z",
    "customerName": "John Doe",
    "customerPhone": "+233123456789",
    "items": [
      {
        "id": 1,
        "productName": "Sample Product 1",
        "productCode": "PROD001",
        "quantity": 2,
        "unitPrice": 50.00,
        "totalPrice": 100.00,
        "discountAmount": 0.00,
        "netPrice": 100.00
      }
    ]
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

### GET /api/Sales/{id}
Get a specific sale by ID.

**Parameters:**
- `id` (path): Sale ID

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "transactionNumber": "TXN202412091234",
  "totalAmount": 100.00,
  "taxAmount": 10.00,
  "discountAmount": 0.00,
  "netAmount": 110.00,
  "paymentMethod": "Cash",
  "status": "Completed",
  "transactionDate": "2024-12-09T12:34:56Z",
  "customerName": "John Doe",
  "customerPhone": "+233123456789",
  "items": [...]
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Sale not found

---

### POST /api/Sales
Create a new sale transaction.

**Headers:**
```
Authorization: Bearer {token}
```

**Request Body:**
```json
{
  "totalAmount": 100.00,
  "taxAmount": 10.00,
  "discountAmount": 0.00,
  "netAmount": 110.00,
  "paymentMethod": "Cash",
  "customerName": "John Doe",
  "customerPhone": "+233123456789",
  "notes": "Customer requested receipt",
  "items": [
    {
      "productName": "Sample Product 1",
      "productCode": "PROD001",
      "quantity": 2,
      "unitPrice": 50.00,
      "totalPrice": 100.00,
      "discountAmount": 0.00,
      "netPrice": 100.00
    }
  ]
}
```

**Field Validations:**
- `totalAmount`: Required, must be > 0
- `taxAmount`: Required, must be >= 0
- `netAmount`: Required, must be > 0
- `paymentMethod`: Required, one of: "Cash", "Card", "MobileMoney"
- `items`: Required, must have at least one item

**Success Response (201 Created):**
```json
{
  "id": 1,
  "transactionNumber": "TXN202412091234",
  "totalAmount": 100.00,
  "taxAmount": 10.00,
  "discountAmount": 0.00,
  "netAmount": 110.00,
  "paymentMethod": "Cash",
  "status": "Completed",
  "transactionDate": "2024-12-09T12:34:56Z",
  "customerName": "John Doe",
  "customerPhone": "+233123456789",
  "items": [...]
}
```

**Error Responses:**
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Invalid or missing token

---

## Products Endpoints

### GET /api/Products
Get all active products for the current tenant.

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200 OK):**
```json
[
  {
    "id": 1,
    "tenantId": 1,
    "name": "Sample Product 1",
    "code": "PROD001",
    "description": "Sample product for testing",
    "price": 10.99,
    "cost": 5.50,
    "stockQuantity": 100,
    "category": "General",
    "isActive": true,
    "createdDate": "2024-12-09T00:00:00Z",
    "modifiedDate": null
  }
]
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token

---

### GET /api/Products/{id}
Get a specific product by ID.

**Parameters:**
- `id` (path): Product ID

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "tenantId": 1,
  "name": "Sample Product 1",
  "code": "PROD001",
  "description": "Sample product for testing",
  "price": 10.99,
  "cost": 5.50,
  "stockQuantity": 100,
  "category": "General",
  "isActive": true,
  "createdDate": "2024-12-09T00:00:00Z",
  "modifiedDate": null
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Product not found

---

### GET /api/Products/search/{code}
Search for a product by its code (for barcode scanning).

**Parameters:**
- `code` (path): Product code or barcode

**Headers:**
```
Authorization: Bearer {token}
```

**Success Response (200 OK):**
```json
{
  "id": 1,
  "tenantId": 1,
  "name": "Sample Product 1",
  "code": "PROD001",
  "description": "Sample product for testing",
  "price": 10.99,
  "cost": 5.50,
  "stockQuantity": 100,
  "category": "General",
  "isActive": true,
  "createdDate": "2024-12-09T00:00:00Z",
  "modifiedDate": null
}
```

**Error Responses:**
- `401 Unauthorized`: Invalid or missing token
- `404 Not Found`: Product not found

---

## Error Response Format

All error responses follow this structure:

```json
{
  "message": "Error description",
  "details": "Additional error details (optional)"
}
```

### Common HTTP Status Codes

- `200 OK`: Successful request
- `201 Created`: Resource created successfully
- `400 Bad Request`: Invalid request data
- `401 Unauthorized`: Authentication required or failed
- `403 Forbidden`: User doesn't have permission
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server error

---

## Data Models

### Sale
```typescript
{
  id: number;
  tenantId: number;
  userId: number;
  transactionNumber: string;
  totalAmount: decimal(18,2);
  taxAmount: decimal(18,2);
  discountAmount: decimal(18,2);
  netAmount: decimal(18,2);
  paymentMethod: string; // "Cash", "Card", "MobileMoney"
  status: string; // "Completed", "Pending", "Cancelled"
  transactionDate: datetime;
  customerName?: string;
  customerPhone?: string;
  notes?: string;
  items: SaleItem[];
}
```

### SaleItem
```typescript
{
  id: number;
  saleId: number;
  productName: string;
  productCode: string;
  quantity: number;
  unitPrice: decimal(18,2);
  totalPrice: decimal(18,2);
  discountAmount: decimal(18,2);
  netPrice: decimal(18,2);
}
```

### Product
```typescript
{
  id: number;
  tenantId: number;
  name: string;
  code: string;
  description?: string;
  price: decimal(18,2);
  cost: decimal(18,2);
  stockQuantity: number;
  category?: string;
  isActive: boolean;
  createdDate: datetime;
  modifiedDate?: datetime;
}
```

### User
```typescript
{
  id: number;
  tenantId: number;
  username: string;
  fullName: string;
  pin: string; // BCrypt hashed
  role: string; // "Admin", "Sales", "Finance", etc.
  isActive: boolean;
  createdDate: datetime;
  lastLoginDate?: datetime;
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. For production:
- Recommended: 100 requests per minute per IP
- Authenticated users: 1000 requests per minute

---

## Versioning

Current API version: `v1`

Future versions will be accessed via URL path:
- `/api/v1/...`
- `/api/v2/...`

---

## Testing the API

### Using cURL

**Login:**
```bash
curl -X POST http://localhost:5000/api/Auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","pin":"1234"}'
```

**Get Products:**
```bash
curl -X GET http://localhost:5000/api/Products \
  -H "Authorization: Bearer {your-token}"
```

**Create Sale:**
```bash
curl -X POST http://localhost:5000/api/Sales \
  -H "Authorization: Bearer {your-token}" \
  -H "Content-Type: application/json" \
  -d '{
    "totalAmount": 100.00,
    "taxAmount": 10.00,
    "discountAmount": 0.00,
    "netAmount": 110.00,
    "paymentMethod": "Cash",
    "items": [{
      "productName": "Test Product",
      "productCode": "TEST001",
      "quantity": 1,
      "unitPrice": 100.00,
      "totalPrice": 100.00,
      "discountAmount": 0.00,
      "netPrice": 100.00
    }]
  }'
```

---

## Support

For API support and questions:
- Email: support@powertraderpos.com
- Documentation: https://docs.powertraderpos.com
- GitHub Issues: https://github.com/atiapa/PowerTrader_Online/issues
