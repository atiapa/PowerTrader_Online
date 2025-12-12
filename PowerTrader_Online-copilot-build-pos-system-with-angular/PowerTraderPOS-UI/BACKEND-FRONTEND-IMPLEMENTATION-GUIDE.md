# PowerTrader POS - Complete Backend & Frontend Structure Guide

## Overview
This document provides the complete structure for implementing all 80+ database tables in both frontend (Angular) and backend (.NET Core).

## Frontend Structure (Angular)

### Models Created
✅ **File**: `src/app/models/database-models.ts`
- Contains all TypeScript interfaces for all 80+ tables
- Organized by functional categories
- Includes all fields with proper typing

### Services to Create

Create individual services for each major entity category in `src/app/services/`:

#### 1. Account Services
```typescript
// src/app/services/account-group-master.service.ts
// src/app/services/account-creation.service.ts  (Already exists)
// src/app/services/account-ledger.service.ts (Already exists)
```

#### 2. Sales Services
```typescript
// src/app/services/sales-details.service.ts
// src/app/services/cash-sales.service.ts
// src/app/services/sales-return.service.ts
```

#### 3. Inventory Services
```typescript
// src/app/services/products.service.ts
// src/app/services/retail-items.service.ts
// src/app/services/warehouse.service.ts
// src/app/services/stock-master.service.ts
```

#### 4. Customer & Supplier Services
```typescript
// src/app/services/customer.service.ts
// src/app/services/supplier.service.ts
// src/app/services/vendor.service.ts
```

#### 5. HR Services
```typescript
// src/app/services/staff.service.ts
// src/app/services/attendance.service.ts
// src/app/services/duty-roaster.service.ts
```

#### 6. Purchase Services
```typescript
// src/app/services/purchase-order.service.ts
// src/app/services/purchase-invoice.service.ts
```

#### 7. Order Services
```typescript
// src/app/services/orders.service.ts (Already exists)
// src/app/services/order-reversed.service.ts (Already exists)
```

#### 8. Fleet & Transport Services
```typescript
// src/app/services/atc.service.ts (Already exists)
// src/app/services/vehicle.service.ts
// src/app/services/transport-expenses.service.ts
```

#### 9. Financial Services
```typescript
// src/app/services/payment-voucher.service.ts
// src/app/services/receipt-voucher.service.ts
// src/app/services/cheque-transaction.service.ts
// src/app/services/bank-accounts.service.ts
```

#### 10. Organization Services
```typescript
// src/app/services/organisation.service.ts (Already exists)
// src/app/services/branches.service.ts
// src/app/services/settings.service.ts
```

### Service Template

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EntityName } from '../models/database-models';

@Injectable({
  providedIn: 'root'
})
export class EntityNameService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) { }

  // GET ALL
  getAll(): Observable<EntityName[]> {
    return this.http.get<EntityName[]>(`${this.apiUrl}/EntityName`);
  }

  // GET BY ID
  getById(id: number): Observable<EntityName> {
    return this.http.get<EntityName>(`${this.apiUrl}/EntityName/${id}`);
  }

  // CREATE
  create(entity: EntityName): Observable<EntityName> {
    return this.http.post<EntityName>(`${this.apiUrl}/EntityName`, entity);
  }

  // UPDATE
  update(id: number, entity: EntityName): Observable<EntityName> {
    return this.http.put<EntityName>(`${this.apiUrl}/EntityName/${id}`, entity);
  }

  // DELETE
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/EntityName/${id}`);
  }

  // Custom methods based on business logic
  getByBranchCode(branchCode: string): Observable<EntityName[]> {
    return this.http.get<EntityName[]>(`${this.apiUrl}/EntityName/branch/${branchCode}`);
  }

  getByOrganisation(organisationCode: string): Observable<EntityName[]> {
    return this.http.get<EntityName[]>(`${this.apiUrl}/EntityName/organisation/${organisationCode}`);
  }
}
```

## Backend Structure (.NET Core)

### Project Structure
```
PowerTraderAPI/
├── Controllers/
│   ├── AccountGroupMasterController.cs
│   ├── AccountCreationController.cs
│   ├── AccountLedgerController.cs
│   ├── ProductsController.cs
│   ├── RetailItemsController.cs
│   ├── SalesDetailsController.cs
│   ├── SalesDetailsTempController.cs
│   ├── SalesDetailsGiftsController.cs
│   ├── CustomersController.cs
│   ├── SuppliersController.cs
│   ├── StaffInformationController.cs
│   ├── AttendanceController.cs
│   ├── ATCController.cs
│   ├── OrdersController.cs
│   ├── PurchaseOrderController.cs
│   ├── WarehouseController.cs
│   ├── StockMasterController.cs
│   └── ... (80+ controllers)
├── Models/
│   ├── AccountGroupMaster.cs
│   ├── AccountCreation.cs
│   ├── AccountLedgerTbl.cs
│   ├── Products.cs
│   ├── RetailItems.cs
│   ├── SalesDetails.cs
│   ├── SalesDetailsTemp.cs
│   ├── SalesDetailsGifts.cs
│   ├── Customers.cs
│   ├── Suppliers.cs
│   ├── StaffInformation.cs
│   ├── Attendance.cs
│   ├── ATCTbl.cs
│   ├── Orders.cs
│   └── ... (80+ models)
├── DTOs/
│   ├── CreateAccountGroupMasterDto.cs
│   ├── UpdateAccountGroupMasterDto.cs
│   ├── CreateProductDto.cs
│   ├── UpdateProductDto.cs
│   └── ... (160+ DTOs - Create/Update for each entity)
├── Data/
│   └── ApplicationDbContext.cs
├── Services/
│   ├── Interfaces/
│   │   ├── IAccountGroupMasterService.cs
│   │   ├── IProductsService.cs
│   │   └── ... (80+ interfaces)
│   └── Implementations/
│       ├── AccountGroupMasterService.cs
│       ├── ProductsService.cs
│       └── ... (80+ implementations)
├── Migrations/
│   └── (EF Core migrations)
└── Program.cs
```

### Model Template (.NET Core)

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderAPI.Models
{
    [Table("TableName")]
    public class EntityName
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column("RefNo")] // or primary key column name
        public long RefNo { get; set; }

        [Column("ColumnName")]
        [StringLength(100)] // for nvarchar columns
        public string? PropertyName { get; set; }

        [Column("NumericColumn")]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal? NumericProperty { get; set; }

        [Column("DateColumn")]
        public DateTime? DateProperty { get; set; }

        [Column("BranchCode")]
        [StringLength(50)]
        public string? BranchCode { get; set; }

        [Column("OrganisationName")]
        [StringLength(200)]
        public string? OrganisationName { get; set; }

        [Column("OrganisationCode")]
        [StringLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("BranchName")]
        [StringLength(50)]
        public string? BranchName { get; set; }
    }
}
```

### DTO Template

```csharp
namespace PowerTraderAPI.DTOs
{
    public class CreateEntityNameDto
    {
        public string? PropertyName { get; set; }
        public decimal? NumericProperty { get; set; }
        public DateTime? DateProperty { get; set; }
        public string? BranchCode { get; set; }
        public string? OrganisationCode { get; set; }
        // Exclude auto-generated fields like RefNo, timestamps
    }

    public class UpdateEntityNameDto
    {
        public string? PropertyName { get; set; }
        public decimal? NumericProperty { get; set; }
        // Include only fields that can be updated
    }
}
```

### Controller Template

```csharp
using Microsoft.AspNetCore.Mvc;
using PowerTraderAPI.Models;
using PowerTraderAPI.DTOs;
using PowerTraderAPI.Services.Interfaces;

namespace PowerTraderAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EntityNameController : ControllerBase
    {
        private readonly IEntityNameService _service;

        public EntityNameController(IEntityNameService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EntityName>>> GetAll()
        {
            var entities = await _service.GetAllAsync();
            return Ok(entities);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EntityName>> GetById(long id)
        {
            var entity = await _service.GetByIdAsync(id);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpPost]
        public async Task<ActionResult<EntityName>> Create(CreateEntityNameDto dto)
        {
            var entity = await _service.CreateAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = entity.RefNo }, entity);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<EntityName>> Update(long id, UpdateEntityNameDto dto)
        {
            var entity = await _service.UpdateAsync(id, dto);
            if (entity == null)
                return NotFound();
            return Ok(entity);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(long id)
        {
            var result = await _service.DeleteAsync(id);
            if (!result)
                return NotFound();
            return NoContent();
        }

        [HttpGet("branch/{branchCode}")]
        public async Task<ActionResult<IEnumerable<EntityName>>> GetByBranch(string branchCode)
        {
            var entities = await _service.GetByBranchCodeAsync(branchCode);
            return Ok(entities);
        }

        [HttpGet("organisation/{organisationCode}")]
        public async Task<ActionResult<IEnumerable<EntityName>>> GetByOrganisation(string organisationCode)
        {
            var entities = await _service.GetByOrganisationCodeAsync(organisationCode);
            return Ok(entities);
        }
    }
}
```

### Service Interface Template

```csharp
namespace PowerTraderAPI.Services.Interfaces
{
    public interface IEntityNameService
    {
        Task<IEnumerable<EntityName>> GetAllAsync();
        Task<EntityName?> GetByIdAsync(long id);
        Task<EntityName> CreateAsync(CreateEntityNameDto dto);
        Task<EntityName?> UpdateAsync(long id, UpdateEntityNameDto dto);
        Task<bool> DeleteAsync(long id);
        Task<IEnumerable<EntityName>> GetByBranchCodeAsync(string branchCode);
        Task<IEnumerable<EntityName>> GetByOrganisationCodeAsync(string organisationCode);
    }
}
```

### Service Implementation Template

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderAPI.Data;
using PowerTraderAPI.Models;
using PowerTraderAPI.DTOs;
using PowerTraderAPI.Services.Interfaces;

namespace PowerTraderAPI.Services.Implementations
{
    public class EntityNameService : IEntityNameService
    {
        private readonly ApplicationDbContext _context;

        public EntityNameService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<EntityName>> GetAllAsync()
        {
            return await _context.EntityNames.ToListAsync();
        }

        public async Task<EntityName?> GetByIdAsync(long id)
        {
            return await _context.EntityNames.FindAsync(id);
        }

        public async Task<EntityName> CreateAsync(CreateEntityNameDto dto)
        {
            var entity = new EntityName
            {
                PropertyName = dto.PropertyName,
                NumericProperty = dto.NumericProperty,
                BranchCode = dto.BranchCode,
                OrganisationCode = dto.OrganisationCode
                // Map all properties
            };

            _context.EntityNames.Add(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<EntityName?> UpdateAsync(long id, UpdateEntityNameDto dto)
        {
            var entity = await _context.EntityNames.FindAsync(id);
            if (entity == null)
                return null;

            entity.PropertyName = dto.PropertyName ?? entity.PropertyName;
            entity.NumericProperty = dto.NumericProperty ?? entity.NumericProperty;
            // Update all properties

            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<bool> DeleteAsync(long id)
        {
            var entity = await _context.EntityNames.FindAsync(id);
            if (entity == null)
                return false;

            _context.EntityNames.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<EntityName>> GetByBranchCodeAsync(string branchCode)
        {
            return await _context.EntityNames
                .Where(e => e.BranchCode == branchCode)
                .ToListAsync();
        }

        public async Task<IEnumerable<EntityName>> GetByOrganisationCodeAsync(string organisationCode)
        {
            return await _context.EntityNames
                .Where(e => e.OrganisationCode == organisationCode)
                .ToListAsync();
        }
    }
}
```

### DbContext Configuration

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderAPI.Models;

namespace PowerTraderAPI.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // DbSets for all 80+ tables
        public DbSet<AccountGroupMaster> AccountGroupMasters { get; set; }
        public DbSet<AccountCreation> AccountCreations { get; set; }
        public DbSet<AccountLedgerTbl> AccountLedgers { get; set; }
        public DbSet<AccountsCreation> AccountsCreations { get; set; }
        public DbSet<ATCTbl> ATCs { get; set; }
        public DbSet<AttendanceTbl> Attendances { get; set; }
        public DbSet<AuditT> Audits { get; set; }
        public DbSet<BankAccounts> BankAccounts { get; set; }
        public DbSet<BillSundryMaster> BillSundryMasters { get; set; }
        public DbSet<Branches> Branches { get; set; }
        public DbSet<CashBankTransfers> CashBankTransfers { get; set; }
        public DbSet<CashSalesPending> CashSalesPendings { get; set; }
        public DbSet<Categories> Categories { get; set; }
        public DbSet<ChequeTransaction> ChequeTransactions { get; set; }
        public DbSet<ComPorts> ComPorts { get; set; }
        public DbSet<CustomerInfo> CustomerInfos { get; set; }
        public DbSet<Depat> Depats { get; set; }
        public DbSet<DeptsTill> DeptsTills { get; set; }
        public DbSet<DutyRoaster> DutyRoasters { get; set; }
        public DbSet<ExpensesExpenditure> ExpensesExpenditures { get; set; }
        public DbSet<ExpensesTable> ExpensesTables { get; set; }
        public DbSet<ExpiryAnalysis> ExpiryAnalyses { get; set; }
        public DbSet<FinancialYear> FinancialYears { get; set; }
        public DbSet<GiftCardTbl> GiftCards { get; set; }
        public DbSet<IncomesCreation> IncomesCreations { get; set; }
        public DbSet<MilkingTbl> Milkings { get; set; }
        public DbSet<OnDuty> OnDuties { get; set; }
        public DbSet<OpenBalanceTbl> OpenBalances { get; set; }
        public DbSet<OrderReversedTbl> OrdersReversed { get; set; }
        public DbSet<OrdersTbl> Orders { get; set; }
        public DbSet<OrganisationInformation> OrganisationInformations { get; set; }
        public DbSet<PaymentVoucher> PaymentVouchers { get; set; }
        public DbSet<Products> Products { get; set; }
        public DbSet<ProformaTbl> Proformas { get; set; }
        public DbSet<PurchaseOrderTbl> PurchaseOrders { get; set; }
        public DbSet<PurchasesInvoiceMaster> PurchaseInvoices { get; set; }
        public DbSet<ReceiptVoucher> ReceiptVouchers { get; set; }
        public DbSet<RegionState> RegionStates { get; set; }
        public DbSet<RetailItems> RetailItems { get; set; }
        public DbSet<SalesDetails> SalesDetails { get; set; }
        public DbSet<SalesDetailsGifts> SalesDetailsGifts { get; set; }
        public DbSet<SalesDetailsTemp> SalesDetailsTemps { get; set; }
        public DbSet<SalesReturnMaster> SalesReturns { get; set; }
        public DbSet<SessionCreation> SessionCreations { get; set; }
        public DbSet<StaffInformation> StaffInformations { get; set; }
        public DbSet<StockMaster> StockMasters { get; set; }
        public DbSet<StockRecord> StockRecords { get; set; }
        public DbSet<SubCategory> SubCategories { get; set; }
        public DbSet<Suppliers> Suppliers { get; set; }
        public DbSet<TblSettings> Settings { get; set; }
        public DbSet<Users> Users { get; set; }
        public DbSet<VehicleRegTbl> VehicleRegistrations { get; set; }
        public DbSet<VendorCreation> Vendors { get; set; }
        public DbSet<WarehouseTbl> Warehouses { get; set; }
        // ... Add all remaining tables

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure table names and relationships
            modelBuilder.Entity<AccountGroupMaster>().ToTable("Account_Group_Master");
            modelBuilder.Entity<AccountCreation>().ToTable("Account_Creation");
            modelBuilder.Entity<AccountLedgerTbl>().ToTable("Account_Ledger_tbl");
            modelBuilder.Entity<AccountsCreation>().ToTable("Accounts_Creation");
            modelBuilder.Entity<ATCTbl>().ToTable("ATC_tbl");
            modelBuilder.Entity<AttendanceTbl>().ToTable("Attendance_Tbl");
            // ... Configure all tables

            // Add indexes for common queries
            modelBuilder.Entity<AccountLedgerTbl>()
                .HasIndex(a => a.AccountNr);
            modelBuilder.Entity<Products>()
                .HasIndex(p => p.ProductID);
            modelBuilder.Entity<RetailItems>()
                .HasIndex(r => r.ProductID);
            // ... Add indexes for performance
        }
    }
}
```

### Migration Commands

```bash
# Add initial migration
dotnet ef migrations add InitialCreate

# Update database
dotnet ef database update

# Add migration for specific table
dotnet ef migrations add Add_TableName_Table

# Rollback migration
dotnet ef database update PreviousMigrationName

# Remove last migration
dotnet ef migrations remove
```

### Program.cs Configuration

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderAPI.Data;
using PowerTraderAPI.Services.Interfaces;
using PowerTraderAPI.Services.Implementations;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database Configuration
builder.Services.AddDbContext<ApplicationDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register all services
builder.Services.AddScoped<IAccountGroupMasterService, AccountGroupMasterService>();
builder.Services.AddScoped<IProductsService, ProductsService>();
builder.Services.AddScoped<IRetailItemsService, RetailItemsService>();
builder.Services.AddScoped<ISalesDetailsService, SalesDetailsService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<ISupplierService, SupplierService>();
builder.Services.AddScoped<IStaffInformationService, StaffInformationService>();
// ... Register all 80+ services

// CORS Configuration
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngular",
        builder => builder
            .WithOrigins("http://localhost:4200")
            .AllowAnyMethod()
            .AllowAnyHeader());
});

var app = builder.Build();

// Configure middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngular");
app.UseAuthorization();
app.MapControllers();

app.Run();
```

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=PowerTraderPOS;Trusted_Connection=True;MultipleActiveResultSets=true;TrustServerCertificate=True"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

## Complete List of Tables (80+)

1. Account_Group_Master
2. Account_Creation
3. Account_Ledger_tbl
4. Accounts_Creation
5. ATC_tbl
6. Attendance_Tbl
7. AuditT
8. Bank_Accounts
9. Bill_Sundry_Master
10. Branches
11. Cash_Bank_Transfers
12. Cash_Sales_Pending
13. Categories
14. Cheque_Transaction
15. ComPorts
16. Credit_Wholesale
17. cus_barcode_index
18. Customer_Sales_Order
19. Depat
20. Depts_Till
21. DutyRoaster
22. Expenses_Expenditure
23. expenses_table
24. Expiry_Analysis
25. Financial_Year
26. Gift_Card_tbl
27. Health_Insurance_Claimed_Drugs
28. Health_Insurance_Claims
29. Health_Insurance_schemes
30. Incomes_Creation
31. Insurance_Sales_Pending
32. Invoice_Credit_wholesales
33. Invoices
34. Invoices_Temp
35. Milking_Tbl
36. OnDuty
37. Open_Balance_tbl
38. Order_Reversed_tbl
39. Orders_Tbl
40. Organisation_Information
41. Other_Stores_Items
42. PaymentVoucher
43. Products
44. Proforma_Tbl
45. Purchase_Order_tbl
46. Purchase_Return_master
47. Purchase_Return_Tax
48. Purchases_Invoice_master
49. ReceiptPrintingSetup
50. ReceiptVoucher
51. Region_State
52. Retail_Items
53. Sales_Details
54. Sales_Details_Gifts
55. Sales_Details_Temp
56. Sales_Return_master
57. Session_Creation
58. Staff_Information
59. Stock_Master
60. Stock_Record
61. SubCategory
62. Suppliers
63. systemuserpro
64. sysuserstartup
65. tbl_barcodes
66. tbl_Customer_Info
67. tbl_MM
68. Tbl_SeasonDiscount
69. tbl_servicing
70. tbl_Settings
71. tblDaily_Assessment
72. Transport_Expenses
73. UploadedFile_Tbl
74. uSERLEVEL
75. USERS
76. Vehicle_Records
77. Vehicle_Reg_Tbl
78. Vendor_Creation
79. Warehouse_Tbl

## Next Steps

1. **Frontend**: Create services for each major category
2. **Backend**: 
   - Create Models for all tables
   - Create DTOs (Create/Update) for each model
   - Create Service Interfaces
   - Create Service Implementations
   - Create Controllers
   - Configure DbContext
   - Run migrations

3. **Testing**: Test each endpoint with Swagger/Postman

## Estimated Implementation Time

- Frontend Models: ✅ Complete
- Frontend Services: ~40 hours (80+ services)
- Backend Models: ~20 hours
- Backend DTOs: ~40 hours
- Backend Services: ~60 hours
- Backend Controllers: ~40 hours
- Testing: ~40 hours

**Total: ~240 hours (~6 weeks at 40 hours/week)**

## Automation Recommendations

Consider using code generators:
- **T4 Templates** for .NET
- **Schematics** for Angular
- **Custom scripts** to generate repetitive code

This will reduce implementation time significantly.
