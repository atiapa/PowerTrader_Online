# Remaining Tables Implementation Guide

## Overview
This document provides a complete pattern for implementing the remaining database tables following the established architecture.

## Pattern Successfully Established

The following tables have complete implementations serving as reference patterns:

### ✅ Fully Implemented Tables
1. **Products** (ProductsTbl)
   - Model: `Models/Tables/ProductsTbl.cs`
   - DTOs: `DTOs/ProductDTOs.cs`
   - Service Interface: `Services/Interfaces/IProductService.cs`
   - Service: `Services/ProductService.cs`
   - Controller: `Controllers/ProductsTblController.cs`
   - Registered in Program.cs

2. **Customers** (CustomerInfo)
   - Model: `Models/Existing/ExistingModels.cs`
   - DTOs: `DTOs/CustomerDTOs.cs`
   - Service Interface: `Services/Interfaces/ICustomerService.cs`
   - Service: `Services/CustomerService.cs`
   - Controller: `Controllers/CustomersController.cs`
   - Registered in Program.cs

3. **Suppliers**
   - Model: `Models/Existing/ExistingModels.cs`
   - DTOs: `DTOs/SupplierDTOs.cs`
   - Service Interface: `Services/Interfaces/ISupplierService.cs`
   - Service: `Services/SupplierService.cs`
   - Controller: `Controllers/SuppliersController.cs`
   - Registered in Program.cs

4. **Staff** (StaffInformation)
   - Model: `Models/Existing/ExistingModels.cs`
   - DTOs: `DTOs/StaffDTOs.cs`
   - Service Interface: `Services/Interfaces/IStaffService.cs`
   - Service: `Services/StaffService.cs`
   - Controller: `Controllers/StaffController.cs`
   - Registered in Program.cs

### 🚧 Partially Implemented (DTOs, Interfaces, Services, Controllers Created)
5. **Sales Details** - DTOs, Service Interface, Service skeleton, Controller created
6. **Stock Master** - DTOs, Service Interface, Service skeleton, Controller created
7. **Categories** - DTOs (in AdditionalDTOs.cs), Service Interface, Service, Controller created
8. **Branches** - DTOs (in AdditionalDTOs.cs), Service Interface, Service, Controller created
9. **Attendance** - DTOs, Service Interface, Service, Controller created

**Note:** These require model property mapping adjustments to match the actual database schema.

---

## Complete Implementation Pattern

### Step 1: Create Model (if not exists)
```csharp
// In Models/Tables/{TableName}.cs or Models/Existing/{File}.cs
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("table_name")]
    public class TableName
    {
        [Key]
        [Column("id_column")]
        public int Id { get; set; }

        [Column("column_name")]
        [MaxLength(200)]
        public string? ColumnName { get; set; }

        [Column("amount_column")]
        [Precision(18, 2)]
        public decimal? AmountColumn { get; set; }

        // Add all database columns as properties
        // Match exact database schema
    }
}
```

### Step 2: Create DTOs
```csharp
// In DTOs/{TableName}DTOs.cs
using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class {TableName}Dto
    {
        public int Id { get; set; }
        public string? PropertyName { get; set; }
        // Include all properties needed for API responses
    }

    public class Create{TableName}Dto
    {
        [Required]
        public string PropertyName { get; set; } = string.Empty;
        
        [MaxLength(200)]
        public string? OptionalProperty { get; set; }
        // Only include properties needed for creation
    }

    public class Update{TableName}Dto
    {
        public string? PropertyName { get; set; }
        // Only include properties that can be updated
    }
}
```

### Step 3: Create Service Interface
```csharp
// In Services/Interfaces/I{TableName}Service.cs
using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface I{TableName}Service
    {
        Task<IEnumerable<{TableName}Dto>> GetAll{TableName}Async();
        Task<{TableName}Dto?> Get{TableName}ByIdAsync(int id);
        Task<{TableName}Dto> Create{TableName}Async(Create{TableName}Dto dto);
        Task<{TableName}Dto?> Update{TableName}Async(int id, Update{TableName}Dto dto);
        Task<bool> Delete{TableName}Async(int id);
        Task<IEnumerable<{TableName}Dto>> Search{TableName}Async(string searchTerm);
    }
}
```

### Step 4: Implement Service
```csharp
// In Services/{TableName}Service.cs
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables; // or Models.Existing
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class {TableName}Service : I{TableName}Service
    {
        private readonly AppDbContext _context;

        public {TableName}Service(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<{TableName}Dto>> GetAll{TableName}Async()
        {
            return await _context.{TableName}
                .Select(t => new {TableName}Dto
                {
                    Id = t.Id,
                    PropertyName = t.PropertyName,
                    // Map all properties
                })
                .ToListAsync();
        }

        public async Task<{TableName}Dto?> Get{TableName}ByIdAsync(int id)
        {
            var entity = await _context.{TableName}.FindAsync(id);
            if (entity == null) return null;

            return new {TableName}Dto
            {
                Id = entity.Id,
                PropertyName = entity.PropertyName,
                // Map all properties
            };
        }

        public async Task<{TableName}Dto> Create{TableName}Async(Create{TableName}Dto dto)
        {
            var entity = new {TableName}
            {
                PropertyName = dto.PropertyName,
                // Map all properties
            };

            _context.{TableName}.Add(entity);
            await _context.SaveChangesAsync();

            return await Get{TableName}ByIdAsync(entity.Id) ?? throw new InvalidOperationException();
        }

        public async Task<{TableName}Dto?> Update{TableName}Async(int id, Update{TableName}Dto dto)
        {
            var entity = await _context.{TableName}.FindAsync(id);
            if (entity == null) return null;

            if (dto.PropertyName != null) entity.PropertyName = dto.PropertyName;
            // Update all properties

            await _context.SaveChangesAsync();
            return await Get{TableName}ByIdAsync(id);
        }

        public async Task<bool> Delete{TableName}Async(int id)
        {
            var entity = await _context.{TableName}.FindAsync(id);
            if (entity == null) return false;

            _context.{TableName}.Remove(entity);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<{TableName}Dto>> Search{TableName}Async(string searchTerm)
        {
            return await _context.{TableName}
                .Where(t => (t.PropertyName != null && t.PropertyName.Contains(searchTerm)))
                .Select(t => new {TableName}Dto
                {
                    Id = t.Id,
                    PropertyName = t.PropertyName
                })
                .ToListAsync();
        }
    }
}
```

### Step 5: Create Controller
```csharp
// In Controllers/{TableName}Controller.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class {TableName}Controller : ControllerBase
    {
        private readonly I{TableName}Service _service;

        public {TableName}Controller(I{TableName}Service service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<{TableName}Dto>>> GetAll{TableName}()
        {
            var items = await _service.GetAll{TableName}Async();
            return Ok(items);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<{TableName}Dto>> Get{TableName}ById(int id)
        {
            var item = await _service.Get{TableName}ByIdAsync(id);
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<{TableName}Dto>>> Search{TableName}([FromQuery] string searchTerm)
        {
            var items = await _service.Search{TableName}Async(searchTerm);
            return Ok(items);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,{RelevantRole}")]
        public async Task<ActionResult<{TableName}Dto>> Create{TableName}([FromBody] Create{TableName}Dto dto)
        {
            var item = await _service.Create{TableName}Async(dto);
            return CreatedAtAction(nameof(Get{TableName}ById), new { id = item.Id }, item);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,{RelevantRole}")]
        public async Task<ActionResult<{TableName}Dto>> Update{TableName}(int id, [FromBody] Update{TableName}Dto dto)
        {
            var item = await _service.Update{TableName}Async(id, dto);
            if (item == null)
                return NotFound();

            return Ok(item);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete{TableName}(int id)
        {
            var result = await _service.Delete{TableName}Async(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
```

### Step 6: Register in DbContext
```csharp
// In Data/AppDbContext.cs
public DbSet<{TableName}> {TableName} { get; set; }
```

### Step 7: Register Service in Program.cs
```csharp
// In Program.cs
builder.Services.AddScoped<I{TableName}Service, {TableName}Service>();
```

### Step 8: Create/Update Migration
```bash
dotnet ef migrations add Add{TableName}Table
dotnet ef database update
```

---

## Remaining Tables to Implement

### Priority 1 - Core Operational Tables
- [x] Products (ProductsTbl) ✅
- [x] Customers (tbl_customer_info) ✅
- [x] Suppliers ✅
- [x] Staff (staff_information) ✅
- [ ] Sales Details (sales_details) - Needs model mapping fix
- [ ] Stock Master (stock_master) - Needs model mapping fix
- [ ] Categories - Needs model mapping fix
- [ ] Branches - Needs model mapping fix

### Priority 2 - Financial Tables
- [ ] Accounts_Creation
- [ ] Payment_Voucher
- [ ] Receipt_Voucher
- [ ] Cheque_Transaction
- [ ] Bank_Accounts
- [ ] Cash_Bank_Transfers

### Priority 3 - HR & Attendance
- [ ] Attendance_Tbl - Partially done
- [ ] DutyRoaster
- [ ] UploadedFile_Tbl

### Priority 4 - Fleet Management
- [ ] Vehicle_Records - DTOs created
- [ ] Vehicle_Reg_Tbl
- [ ] ATC_tbl
- [ ] Transport_Expenses

### Priority 5 - Inventory & Warehouse
- [ ] Warehouse_Tbl
- [ ] Other_Stores_Items
- [ ] Retail_Items
- [ ] Stock_Record
- [ ] Expiry_Analysis

### Priority 6 - Sales & Invoicing
- [ ] Invoices
- [ ] Invoices_Temp
- [ ] Cash_Sales_Pending
- [ ] Credit_Wholesale
- [ ] Invoice_Credit_wholesales
- [ ] Sales_Details_Gifts
- [ ] Sales_Details_Temp
- [ ] Sales_Return_master
- [ ] Customer_Sales_Order
- [ ] Orders_Tbl
- [ ] Order_Reversed_tbl
- [ ] Proforma_Tbl

### Priority 7 - Purchases
- [ ] Purchase_Order_tbl
- [ ] Purchases_Invoice_master
- [ ] Purchase_Return_master
- [ ] Purchase_Return_Tax

### Priority 8 - Configuration & Settings
- [ ] Organisation_Information - DTOs created
- [ ] tbl_Settings
- [ ] Session_Creation
- [ ] Receipt_Printing_Setup
- [ ] Region_State
- [ ] Countries
- [ ] ComPorts
- [ ] Financial_Year
- [ ] SubCategory
- [ ] tbl_MM
- [ ] Bill_Sundry_Master

### Priority 9 - Specialized Features
- [ ] tbl_servicing
- [ ] tbl_barcodes
- [ ] tbl_SeasonDiscount
- [ ] Milking_Tbl
- [ ] Gift_Card_tbl
- [ ] Loyalty features
- [ ] Health_Insurance_Claims
- [ ] Health_Insurance_schemes
- [ ] Insurance_Sales_Pending
- [ ] cus_barcode_index
- [ ] OnDuty
- [ ] tblDaily_Assessment
- [ ] AuditT
- [ ] systemuserpro
- [ ] sysuserstartup
- [ ] userlevel
- [ ] users_tbl (USERS table)
- [ ] Vendor_Creation

---

## Role-Based Authorization Guide

Use appropriate roles for each controller based on the table's purpose:

| Table Type | Suggested Roles |
|------------|----------------|
| Products, Categories | Admin, Sales |
| Customers | Admin, Sales, Customers |
| Suppliers | Admin, Suppliers |
| Staff, Attendance | Admin, HR |
| Vehicles, Fleet | Admin, Fleet |
| Services | Admin, Service |
| Accounts, Financial | Admin, Finance |
| Sales, Invoices | Admin, Sales, Finance |
| Purchases | Admin, Suppliers |

---

## API Endpoint Patterns

For each table, the following endpoints will be available:

```
GET    /api/{Controller}                      # Get all records
GET    /api/{Controller}/{id}                 # Get specific record
GET    /api/{Controller}/search?searchTerm={term}  # Search records
POST   /api/{Controller}                      # Create new record
PUT    /api/{Controller}/{id}                 # Update record
DELETE /api/{Controller}/{id}                 # Delete record
```

Additional specialized endpoints can be added as needed for specific business logic.

---

## Model Mapping Best Practices

1. **Always match database column names exactly** in the model using `[Column("column_name")]`
2. **Use appropriate data types**:
   - `decimal` for money/prices with `[Precision(18, 2)]`
   - `string?` for nullable text fields with `[MaxLength(n)]`
   - `DateTime?` for nullable dates
   - `int?` for nullable integers
3. **Mark primary keys** with `[Key]` attribute
4. **Include foreign keys** for relationships
5. **Add navigation properties** where appropriate

---

## Testing Checklist

For each implemented table:
- [ ] Model compiles without errors
- [ ] DTOs map correctly to model
- [ ] Service implements all interface methods
- [ ] Controller has all CRUD endpoints
- [ ] Authorization roles are appropriate
- [ ] Service registered in Program.cs
- [ ] DbSet added to AppDbContext
- [ ] Migration created and applied
- [ ] Test GET endpoint
- [ ] Test POST endpoint
- [ ] Test PUT endpoint
- [ ] Test DELETE endpoint
- [ ] Test Search endpoint

---

## Current Status

**Completed:** 4/100+ tables (Products, Customers, Suppliers, Staff)
**In Progress:** 5 tables (Sales Details, Stock Master, Categories, Branches, Attendance)
**Remaining:** 90+ tables

**Pattern Established:** ✅ Yes - Fully documented and replicable
**Build Status:** ⚠️ Requires model mapping fixes for in-progress tables

---

## Next Steps

1. **Fix model mappings** for the 5 in-progress tables by aligning DTO properties with actual model properties
2. **Complete Priority 1 tables** (remaining core operational tables)
3. **Move to Priority 2** (financial tables)
4. **Continue through remaining priorities** following the established pattern

---

This pattern provides a complete, production-ready architecture that can be replicated for all remaining database tables.
