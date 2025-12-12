# 🔐 PowerTrader POS - Complete Login Credentials

**Last Updated**: December 10, 2025

This file contains the mock user credentials for testing the PowerTrader POS system with all dashboards.

## 📋 Available Users & PINs

| # | Username   | PIN  | Role      | Dashboard Access                    | Color Theme |
|---|------------|------|-----------|-------------------------------------|-------------|
| 1 | admin      | 1111 | Admin     | Admin Dashboard                     | Gray #607d8b |
| 2 | suppliers  | 3333 | Suppliers | Suppliers Dashboard                 | Teal #00bcd4 |
| 3 | finance    | 4444 | Finance   | Finance Dashboard                   | Blue #2196f3 |
| 4 | inventory  | 5555 | Inventory | Inventory Dashboard + Receive Supplies | Amber #ffc107 |
| 5 | hr         | 6666 | HR        | HR Dashboard                        | Purple #9c27b0 |
| 6 | fleet      | 7777 | Fleet     | Fleet Dashboard                     | Orange #ff9800 |
| 7 | service    | 8888 | Service   | Service Dashboard                   | Green #4caf50 |
| 8 | customers  | 0000 | Customers | Customers Dashboard                 | Cyan #00bcd4 |
| 9 | sales      | 1234 | Sales     | Retail Sales Point (POS)            | Custom |
| 10| cashier    | 9999 | Sales     | Retail Sales Point (POS)            | Custom |

## 🚀 Quick Start - How to Login

1. Navigate to the application (auto-redirects to `/login`)
2. **Enter PIN only** (4 digits) - No username required!
3. Click **Login** button or press Enter
4. Automatic redirect to your dashboard based on role

### **PIN-Only Authentication**
- Modern PIN-based login (no username field)
- 4-digit PIN codes
- Instant role detection
- Automatic dashboard routing

## 🎯 Quick Test PINs

**Most Common**:
- 🔑 Admin: **1111**
- 📦 Inventory: **5555** (includes Receive Supplies ⭐)
- 🛒 Sales: **1234**

**Easy to Remember**:
- 👥 Customers: **0000** (all zeros)
- 💵 Cashier: **9999** (all nines)

## 🆕 New Features (December 2025)

### **Receive Supplies Module** ⭐
- **Access**: Login with PIN **5555** (Inventory Manager)
- **Route**: `/receive-supplies`
- **Navigation**: Inventory Dashboard → Sidebar → "Receive Supplies"
- **Features**:
  - 🎨 Stunning purple gradient header with glassmorphism
  - ☁️ Invoice upload (drag-and-drop, PNG/JPG/PDF, 10MB limit)
  - 📋 8-field supply item form with validation
  - 📊 Professional items table
  - 💰 Real-time calculations (subtotal, tax, total)
  - 🖨️ Print preview modal with professional template
  - ✅ Comprehensive validation and error handling
  - 📱 Fully responsive design
  - ✨ Smooth animations and hover effects

## 📍 Route Mapping

| PIN  | Role      | Primary Route     | Additional Routes      |
|------|-----------|-------------------|------------------------|
| 1111 | Admin     | `/admin`          | -                      |
| 3333 | Suppliers | `/suppliers`      | -                      |
| 4444 | Finance   | `/finance`        | -                      |
| 5555 | Inventory | `/inventory`      | `/receive-supplies` ⭐ |
| 6666 | HR        | `/hr`             | -                      |
| 7777 | Fleet     | `/fleet`          | -                      |
| 8888 | Service   | `/service`        | -                      |
| 0000 | Customers | `/customers`      | -                      |
| 1234 | Sales     | `/retail-sales`   | -                      |
| 9999 | Sales     | `/retail-sales`   | -                      |

## 🎨 Dashboard Color Themes

Each dashboard has a unique color theme for visual distinction:

- **Admin (1111)**: Gray #607d8b - Professional, neutral
- **Suppliers (3333)**: Teal #00bcd4 - Business relations
- **Finance (4444)**: Blue #2196f3 - Trust, stability
- **Inventory (5555)**: Amber #ffc107 - Warehouse, products
- **HR (6666)**: Purple #9c27b0 - Corporate, people
- **Fleet (7777)**: Orange #ff9800 - Energy, movement
- **Service (8888)**: Green #4caf50 - Service, growth
- **Customers (0000)**: Cyan #00bcd4 - Friendly, accessible

## 📊 Complete User Details

### Inventory Manager (PIN: 5555) - Featured User
```json
{
  "userId": 4,
  "username": "inventory",
  "pin": "5555",
  "fullName": "Inventory Manager",
  "role": "Inventory",
  "tenantId": 1,
  "tenantName": "PowerTrader POS",
  "organisationCode": "ORG001",
  "organisationName": "PowerTrader Organization",
  "branchCode": "BR001",
  "branchName": "Head Office",
  "token": "mock-token-inventory-004"
}
```

**Access Features**:
- Complete inventory management
- 8 dashboard sections (Overview, Products, Stock Levels, Transfers, Adjustments, Warehouses, Reports, Alerts)
- **Receive Supplies** module with invoice upload
- 6 comprehensive reports
- Warehouse capacity visualization
- Low stock alert system (8 alerts with badge)

## 💾 Mock Data Location

Mock user data is stored in: `src/app/data/mock-users.json`

## 🔒 Authentication Details

- **System**: Token-based authentication
- **Guard**: Auth guard protects all dashboard routes
- **Storage**: Tokens stored in localStorage
- **Session**: Persistent across page refreshes
- **Logout**: Available from all dashboards

## 🧪 Testing Checklist

Test all users by logging in with each PIN:

- [ ] Admin (1111) → Admin Dashboard (Gray theme)
- [ ] Suppliers (3333) → Suppliers Dashboard (Teal theme)
- [ ] Finance (4444) → Finance Dashboard (Blue theme)
- [ ] Inventory (5555) → Inventory Dashboard (Amber theme)
  - [ ] Navigate to Receive Supplies from sidebar
  - [ ] Upload invoice document
  - [ ] Add supply items
  - [ ] Print report
- [ ] HR (6666) → HR Dashboard (Purple theme)
- [ ] Fleet (7777) → Fleet Dashboard (Orange theme)
- [ ] Service (8888) → Service Dashboard (Green theme)
- [ ] Customers (0000) → Customers Dashboard (Cyan theme)
- [ ] Sales (1234) → Retail Sales Point
- [ ] Cashier (9999) → Retail Sales Point

## 📝 Notes

- ✅ All mock users belong to "PowerTrader POS" tenant (ID: 1)
- ✅ Each user has a unique mock token for authentication
- ✅ PIN must be exactly 4 digits
- ✅ PIN-only login (no username field in login form)
- ✅ Organization: PowerTrader Organization (ORG001)
- ✅ Branch: Head Office (BR001)
- ✅ Multi-tenant architecture ready

## 🎯 Pro Tips

1. **Use 5555** to test the new Receive Supplies feature
2. **Use 1111** for full admin access
3. **Use 0000** for quick customer testing (all zeros)
4. Each dashboard has unique color theme for easy identification
5. All routes protected by auth guard - login required
6. Logout button available in all dashboards

---

**Status**: ✅ All 10 user accounts active and tested  
**Version**: 1.0.0  
**Date**: December 10, 2025
