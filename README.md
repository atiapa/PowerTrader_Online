# PowerTrader_Online
Cloud-based Multi-Tenant Point of Sales System

> **Note**: This PR restores the complete POS feature set from PR #1 (originally merged at commit 11046f5) that was previously reverted by commit ba3cc63 on main. All features have been restored by reverting the revert commit, bringing back the complete multi-tenant POS system with Angular frontend, .NET Core backend, and all associated features.

## Overview
A comprehensive, touchscreen-optimized POS system with Angular frontend and .NET Core API backend, supporting multiple tenants with role-based dashboards.

## System Architecture

### Backend (.NET Core 8.0 API)
- **Location**: `PowerTraderPOS.API/`
- **Database**: SQL Server (Connection provided)
- **Authentication**: JWT with PIN-based login
- **Features**:
  - Multi-tenant support
  - PIN authentication (4-digit)
  - Role-based authorization
  - RESTful API endpoints
  - Entity Framework Core for database access

### Frontend (Angular 18)
- **Location**: `PowerTraderPOS-UI/`
- **UI Framework**: Angular Material
- **Features**:
  - Touchscreen-optimized interface
  - PIN pad for login
  - Responsive design
  - Role-based routing
  - HTTP interceptors for authentication

## User Roles & Dashboards
1. **Sales** - Sales Point interface with cart and payment processing
2. **Admin** - Administrative dashboard for system management
3. **Finance** - Financial reports and management
4. **HR** - Human resources management
5. **Fleet** - Fleet and vehicle management
6. **Service** - Service management dashboard
7. **Suppliers** - Supplier relationship management
8. **Customers** - Customer relationship management

## Payment Methods Supported
- Cash
- Card (Credit/Debit)
- Mobile Money

## Database Schema
The system uses an extensive database schema with 100+ tables covering:
- **Accounting**: Accounts, Transactions, Vouchers, Bank Accounts
- **Sales**: Sales Details, Invoices, Returns, Orders
- **Purchases**: Purchase Orders, Returns, Invoice Management
- **Inventory**: Products, Stock Management, Warehouses
- **HR**: Staff Information, Attendance, Payroll
- **Fleet**: Vehicle Management, Transport Expenses, ATC
- **Customers**: Customer Info, Loyalty Programs
- **Suppliers**: Vendor Management, Procurement

## Getting Started

### Prerequisites
- .NET 8.0 SDK
- Node.js 20.x
- Angular CLI 18
- SQL Server (connection provided)

### Backend Setup
```bash
cd PowerTraderPOS.API
dotnet restore
dotnet build
dotnet run
```
API will be available at: `http://localhost:5000`

### Frontend Setup
```bash
cd PowerTraderPOS-UI
npm install
ng serve
```
Frontend will be available at: `http://localhost:4200`

## Default Login Credentials
- **Admin**: username: `admin`, PIN: `1234`
- **Sales**: username: `sales`, PIN: `1234`
- **Finance**: username: `finance`, PIN: `1234`
- **HR**: username: `hr`, PIN: `1234`
- **Fleet**: username: `fleet`, PIN: `1234`
- **Service**: username: `service`, PIN: `1234`
- **Suppliers**: username: `suppliers`, PIN: `1234`
- **Customers**: username: `customers`, PIN: `1234`

## Database Connection
```
Server: 108.60.219.173,1981
Database: POS
User: sa
Password: TMT@2024
```

## Features Implemented
✅ PIN-based touchscreen login
✅ Role-based dashboard routing
✅ Sales point with product scanning
✅ Shopping cart management
✅ Multiple payment methods (Cash, Card, Mobile Money)
✅ Product management
✅ Transaction recording
✅ JWT authentication
✅ CORS configuration
✅ Multi-tenant support
✅ Comprehensive database models for existing tables

## Project Structure
```
PowerTrader_Online/
├── PowerTraderPOS.API/          # .NET Core Backend
│   ├── Controllers/             # API Controllers
│   ├── Models/                  # Data Models
│   │   └── Existing/           # Existing DB Table Models
│   ├── Data/                    # Database Context
│   ├── DTOs/                    # Data Transfer Objects
│   └── appsettings.json        # Configuration
├── PowerTraderPOS-UI/           # Angular Frontend
│   ├── src/app/
│   │   ├── components/         # UI Components
│   │   ├── services/           # Angular Services
│   │   ├── models/             # TypeScript Models
│   │   ├── guards/             # Route Guards
│   │   └── interceptors/       # HTTP Interceptors
│   └── angular.json
└── PowerTraderPOS.sln           # Solution File
```

## API Endpoints

### Authentication
- `POST /api/Auth/login` - PIN-based login

### Sales
- `GET /api/Sales` - Get recent sales
- `GET /api/Sales/{id}` - Get sale by ID
- `POST /api/Sales` - Create new sale

### Products
- `GET /api/Products` - Get all products
- `GET /api/Products/{id}` - Get product by ID
- `GET /api/Products/search/{code}` - Search product by code

## Technology Stack
- **Backend**: ASP.NET Core 8.0, Entity Framework Core 8.0, SQL Server
- **Frontend**: Angular 18, Angular Material, RxJS
- **Authentication**: JWT Bearer Tokens, BCrypt for PIN hashing
- **Styling**: SCSS, Angular Material Theming

## Security Features
- PIN encryption using BCrypt
- JWT token-based authentication
- HTTP-only secure tokens
- CORS configured
- Role-based access control
- Authentication guards on routes

## Next Steps
- [ ] Complete all database table models
- [ ] Create migrations for existing database
- [ ] Implement advanced reporting features
- [ ] Add barcode scanning support
- [ ] Implement receipt printing
- [ ] Add inventory management features
- [ ] Implement loyalty program
- [ ] Add multi-currency support
- [ ] Implement offline mode
- [ ] Add real-time sync capabilities

## License
Proprietary - PowerTrader Online

## Support
For issues and questions, please contact the development team.
