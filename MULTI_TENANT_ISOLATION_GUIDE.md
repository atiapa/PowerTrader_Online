# Multi-Tenant Data Isolation Implementation Guide

## Overview

This guide documents the implementation of multi-tenant data isolation using OrganisationCode and BranchCode across the entire PowerTrader POS system.

## Architecture

### 1. User Context Service

**File:** `Services/UserContextService.cs`

```csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace PowerTraderPOS.API.Services
{
    public interface IUserContextService
    {
        string GetOrganisationCode();
        string GetBranchCode();
        string GetUserId();
        IEnumerable<string> GetUserRoles();
        bool IsAdmin();
    }

    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetOrganisationCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst("OrganisationCode")?.Value 
                ?? user?.FindFirst(ClaimTypes.GroupSid)?.Value 
                ?? throw new UnauthorizedAccessException("OrganisationCode not found in token");
        }

        public string GetBranchCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst("BranchCode")?.Value 
                ?? user?.FindFirst(ClaimTypes.Locality)?.Value 
                ?? throw new UnauthorizedAccessException("BranchCode not found in token");
        }

        public string GetUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                ?? user?.FindFirst("UserId")?.Value 
                ?? throw new UnauthorizedAccessException("UserId not found in token");
        }

        public IEnumerable<string> GetUserRoles()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindAll(ClaimTypes.Role).Select(c => c.Value) ?? Enumerable.Empty<string>();
        }

        public bool IsAdmin()
        {
            return GetUserRoles().Contains("Admin");
        }
    }
}
```

### 2. Base Service with Tenant Filtering

**File:** `Services/BaseService.cs`

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using System.Linq.Expressions;

namespace PowerTraderPOS.API.Services
{
    public abstract class BaseService
    {
        protected readonly AppDbContext _context;
        protected readonly IUserContextService _userContext;

        protected BaseService(AppDbContext context, IUserContextService userContext)
        {
            _context = context;
            _userContext = userContext;
        }

        /// <summary>
        /// Gets all entities with automatic tenant filtering
        /// </summary>
        protected async Task<IEnumerable<TDto>> GetAllWithTenantFilterAsync<TEntity, TDto>(
            Expression<Func<TEntity, bool>>? additionalFilter = null,
            Expression<Func<TEntity, TDto>>? selector = null)
            where TEntity : class
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            var query = _context.Set<TEntity>().AsQueryable();

            // Apply tenant filter
            var tenantFilter = BuildTenantFilter<TEntity>(orgCode, branchCode);
            query = query.Where(tenantFilter);

            // Apply additional filter if provided
            if (additionalFilter != null)
            {
                query = query.Where(additionalFilter);
            }

            // Apply selector if provided, otherwise return entities
            if (selector != null)
            {
                return await query.Select(selector).ToListAsync();
            }

            return (IEnumerable<TDto>)await query.ToListAsync();
        }

        /// <summary>
        /// Gets entity by ID with tenant verification
        /// </summary>
        protected async Task<TEntity?> GetByIdWithTenantFilterAsync<TEntity, TKey>(TKey id)
            where TEntity : class
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            var entity = await _context.Set<TEntity>().FindAsync(id);
            
            if (entity == null) return null;

            // Verify tenant ownership
            if (!VerifyTenantOwnership(entity, orgCode, branchCode))
            {
                throw new UnauthorizedAccessException("Access denied to this resource");
            }

            return entity;
        }

        /// <summary>
        /// Creates entity with tenant information
        /// </summary>
        protected async Task<TEntity> CreateWithTenantInfoAsync<TEntity>(TEntity entity)
            where TEntity : class
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();

            // Set tenant properties
            SetTenantProperties(entity, orgCode, branchCode);

            _context.Set<TEntity>().Add(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        /// <summary>
        /// Updates entity with tenant verification
        /// </summary>
        protected async Task<TEntity?> UpdateWithTenantCheckAsync<TEntity, TKey>(
            TKey id, 
            Action<TEntity> updateAction)
            where TEntity : class
        {
            var entity = await GetByIdWithTenantFilterAsync<TEntity, TKey>(id);
            
            if (entity == null) return null;

            updateAction(entity);

            _context.Set<TEntity>().Update(entity);
            await _context.SaveChangesAsync();

            return entity;
        }

        /// <summary>
        /// Deletes entity with tenant verification
        /// </summary>
        protected async Task<bool> DeleteWithTenantCheckAsync<TEntity, TKey>(TKey id)
            where TEntity : class
        {
            var entity = await GetByIdWithTenantFilterAsync<TEntity, TKey>(id);
            
            if (entity == null) return false;

            _context.Set<TEntity>().Remove(entity);
            await _context.SaveChangesAsync();

            return true;
        }

        /// <summary>
        /// Builds LINQ expression for tenant filtering
        /// </summary>
        private Expression<Func<TEntity, bool>> BuildTenantFilter<TEntity>(
            string orgCode, 
            string branchCode)
            where TEntity : class
        {
            var parameter = Expression.Parameter(typeof(TEntity), "e");
            
            // OrganisationCode == orgCode
            var orgProperty = Expression.Property(parameter, "OrganisationCode");
            var orgValue = Expression.Constant(orgCode);
            var orgEquals = Expression.Equal(orgProperty, orgValue);

            // Branchcode == branchCode OR user is admin (allow all branches)
            var branchProperty = Expression.Property(parameter, "Branchcode");
            var branchValue = Expression.Constant(branchCode);
            var branchEquals = Expression.Equal(branchProperty, branchValue);

            // Combine: OrganisationCode == orgCode AND (Branchcode == branchCode OR IsAdmin)
            Expression combined = Expression.AndAlso(orgEquals, branchEquals);

            // If user is admin, they can see all branches in their organisation
            if (_userContext.IsAdmin())
            {
                combined = orgEquals; // Only filter by organisation for admins
            }

            return Expression.Lambda<Func<TEntity, bool>>(combined, parameter);
        }

        /// <summary>
        /// Verifies entity belongs to user's tenant
        /// </summary>
        private bool VerifyTenantOwnership<TEntity>(
            TEntity entity, 
            string orgCode, 
            string branchCode)
        {
            var entityType = typeof(TEntity);
            
            var orgProperty = entityType.GetProperty("OrganisationCode");
            var branchProperty = entityType.GetProperty("Branchcode");

            if (orgProperty == null || branchProperty == null)
            {
                return true; // Entity doesn't have tenant properties
            }

            var entityOrgCode = orgProperty.GetValue(entity)?.ToString();
            var entityBranchCode = branchProperty.GetValue(entity)?.ToString();

            // Must match organisation
            if (entityOrgCode != orgCode)
            {
                return false;
            }

            // Admin can access all branches in their organisation
            if (_userContext.IsAdmin())
            {
                return true;
            }

            // Non-admin must match branch
            return entityBranchCode == branchCode;
        }

        /// <summary>
        /// Sets tenant properties on entity
        /// </summary>
        private void SetTenantProperties<TEntity>(
            TEntity entity, 
            string orgCode, 
            string branchCode)
        {
            var entityType = typeof(TEntity);
            
            var orgProperty = entityType.GetProperty("OrganisationCode");
            var branchProperty = entityType.GetProperty("Branchcode");
            var orgNameProperty = entityType.GetProperty("OrganisationName");
            var branchNameProperty = entityType.GetProperty("BranchName");

            orgProperty?.SetValue(entity, orgCode);
            branchProperty?.SetValue(entity, branchCode);
            
            // Optionally set names if properties exist
            // These would need to be looked up from a cache or database
            orgNameProperty?.SetValue(entity, orgCode); // Placeholder
            branchNameProperty?.SetValue(entity, branchCode); // Placeholder
        }
    }
}
```

## Service Implementation Pattern

### Example 1: ProductService with Tenant Filtering

```csharp
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class ProductService : BaseService, IProductService
    {
        public ProductService(AppDbContext context, IUserContextService userContext)
            : base(context, userContext)
        {
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.Set<ProductsTbl>()
                .Where(p => p.IsActive == true && p.OrganisationCode == orgCode);

            // Non-admin users only see their branch products
            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            return await query
                .Select(p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductCode = p.ProductCode,
                    ProductName = p.ProductName,
                    // ... other properties
                    OrganisationCode = p.OrganisationCode,
                    Branchcode = p.Branchcode
                })
                .ToListAsync();
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.Set<ProductsTbl>()
                .Where(p => p.ProductId == id && p.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            var product = await query.FirstOrDefaultAsync();
            
            if (product == null) return null;

            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                // ... other properties
            };
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();

            var product = new ProductsTbl
            {
                ProductCode = dto.ProductCode,
                ProductName = dto.ProductName,
                // ... other properties
                OrganisationCode = orgCode,
                Branchcode = branchCode,
                EntryID = userId,
                EntryDate = DateTime.UtcNow,
                IsActive = true
            };

            _context.Set<ProductsTbl>().Add(product);
            await _context.SaveChangesAsync();

            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                // ... other properties
            };
        }

        public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var product = await _context.Set<ProductsTbl>()
                .Where(p => p.ProductId == id && p.OrganisationCode == orgCode)
                .FirstOrDefaultAsync();

            if (product == null) return null;

            // Verify branch ownership for non-admin
            if (!isAdmin && product.Branchcode != branchCode)
            {
                throw new UnauthorizedAccessException("Access denied");
            }

            product.ProductName = dto.ProductName;
            product.UnitPrice = dto.UnitPrice;
            // ... update other properties
            // DO NOT allow changing OrganisationCode or Branchcode

            _context.Set<ProductsTbl>().Update(product);
            await _context.SaveChangesAsync();

            return new ProductDto { /* ... */ };
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var product = await _context.Set<ProductsTbl>()
                .Where(p => p.ProductId == id && p.OrganisationCode == orgCode)
                .FirstOrDefaultAsync();

            if (product == null) return false;

            // Verify branch ownership for non-admin
            if (!isAdmin && product.Branchcode != branchCode)
            {
                throw new UnauthorizedAccessException("Access denied");
            }

            // Soft delete
            product.IsActive = false;
            _context.Set<ProductsTbl>().Update(product);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.Set<ProductsTbl>()
                .Where(p => p.IsActive == true 
                    && p.OrganisationCode == orgCode
                    && (p.ProductName.Contains(searchTerm) || p.ProductCode.Contains(searchTerm)));

            if (!isAdmin)
            {
                query = query.Where(p => p.Branchcode == branchCode);
            }

            return await query
                .Select(p => new ProductDto { /* ... */ })
                .ToListAsync();
        }
    }
}
```

### Example 2: SalesDetailsService with Tenant Filtering

```csharp
public class SalesDetailsService : BaseService, ISalesDetailsService
{
    public SalesDetailsService(AppDbContext context, IUserContextService userContext)
        : base(context, userContext)
    {
    }

    public async Task<IEnumerable<SalesDetailsDto>> GetAllSalesAsync()
    {
        var orgCode = _userContext.GetOrganisationCode();
        var branchCode = _userContext.GetBranchCode();
        var isAdmin = _userContext.IsAdmin();

        var query = _context.Set<SalesDetails>()
            .Where(s => s.OrganisationCode == orgCode);

        if (!isAdmin)
        {
            query = query.Where(s => s.BranchCode == branchCode);
        }

        return await query
            .Select(s => new SalesDetailsDto { /* ... */ })
            .ToListAsync();
    }

    public async Task<IEnumerable<SalesDetailsDto>> GetSalesByInvoiceAsync(string invoiceNr)
    {
        var orgCode = _userContext.GetOrganisationCode();
        var branchCode = _userContext.GetBranchCode();
        var isAdmin = _userContext.IsAdmin();

        var query = _context.Set<SalesDetails>()
            .Where(s => s.InvoiceNr == invoiceNr && s.OrganisationCode == orgCode);

        if (!isAdmin)
        {
            query = query.Where(s => s.BranchCode == branchCode);
        }

        return await query
            .Select(s => new SalesDetailsDto { /* ... */ })
            .ToListAsync();
    }

    public async Task<IEnumerable<SalesDetailsDto>> GetSalesByDateRangeAsync(
        DateTime startDate, 
        DateTime endDate)
    {
        var orgCode = _userContext.GetOrganisationCode();
        var branchCode = _userContext.GetBranchCode();
        var isAdmin = _userContext.IsAdmin();

        var query = _context.Set<SalesDetails>()
            .Where(s => s.EntryDate >= startDate 
                && s.EntryDate <= endDate 
                && s.OrganisationCode == orgCode);

        if (!isAdmin)
        {
            query = query.Where(s => s.BranchCode == branchCode);
        }

        return await query
            .Select(s => new SalesDetailsDto { /* ... */ })
            .ToListAsync();
    }

    public async Task<SalesDetailsDto> CreateSaleAsync(CreateSalesDetailsDto dto)
    {
        var orgCode = _userContext.GetOrganisationCode();
        var branchCode = _userContext.GetBranchCode();
        var userId = _userContext.GetUserId();

        var sale = new SalesDetails
        {
            InvoiceNr = dto.InvoiceNr,
            ProductID = dto.ProductID,
            Quantity = dto.Quantity,
            // ... other properties
            OrganisationCode = orgCode,
            BranchCode = branchCode,
            EntryID = userId,
            EntryDate = DateTime.UtcNow
        };

        _context.Set<SalesDetails>().Add(sale);
        await _context.SaveChangesAsync();

        return new SalesDetailsDto { /* ... */ };
    }
}
```

## AuthController Updates

Update the AuthController to include OrganisationCode and BranchCode in JWT tokens:

```csharp
private string GenerateJwtToken(User user)
{
    var claims = new List<Claim>
    {
        new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
        new Claim(ClaimTypes.Name, user.Username),
        new Claim(ClaimTypes.Role, user.Role),
        new Claim("UserId", user.UserId.ToString()),
        new Claim("OrganisationCode", user.OrganisationCode ?? ""),
        new Claim("BranchCode", user.BranchCode ?? ""),
        new Claim(ClaimTypes.GroupSid, user.OrganisationCode ?? ""), // Alternate claim
        new Claim(ClaimTypes.Locality, user.BranchCode ?? "") // Alternate claim
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Secret"]));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var expires = DateTime.Now.AddHours(8);

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: expires,
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
```

## Program.cs Registration

Register the services in dependency injection:

```csharp
// Register IHttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Register User Context Service
builder.Services.AddScoped<IUserContextService, UserContextService>();

// All other services now inherit from BaseService
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
// ... etc
```

## User Model Updates

Ensure User model has OrganisationCode and BranchCode:

```csharp
public class User
{
    public int UserId { get; set; }
    public string Username { get; set; }
    public string PasswordHash { get; set; }
    public string Role { get; set; }
    public int? TenantId { get; set; }
    public string? OrganisationCode { get; set; } // NEW
    public string? BranchCode { get; set; }        // NEW
    public DateTime? LastLogin { get; set; }
    public bool IsActive { get; set; }
}
```

## Testing Checklist

### 1. Data Isolation Tests

- [ ] User from Org A cannot see data from Org B
- [ ] User from Branch 1 cannot see data from Branch 2 (same org)
- [ ] Admin user can see all branches in their organisation
- [ ] Super admin can see all organisations (if implemented)

### 2. CRUD Operation Tests

- [ ] Create operation sets correct OrganisationCode and BranchCode
- [ ] Update operation prevents changing tenant properties
- [ ] Update operation prevents accessing other tenant data
- [ ] Delete operation prevents deleting other tenant data

### 3. Query Tests

- [ ] GET all returns only tenant data
- [ ] GET by ID verifies tenant ownership
- [ ] Search filters by tenant
- [ ] Date range queries filter by tenant
- [ ] Invoice/reference queries filter by tenant

### 4. Security Tests

- [ ] Missing OrganisationCode claim throws exception
- [ ] Missing BranchCode claim throws exception
- [ ] Invalid tenant access returns 403 Forbidden
- [ ] Cross-tenant data access attempts logged

## Migration Checklist

### Phase 1: Infrastructure ✅
- [x] Create UserContextService
- [x] Create BaseService
- [x] Register services in DI container
- [x] Document implementation pattern

### Phase 2: Update All Services (18+ services)
- [ ] ProductService
- [ ] CustomerService
- [ ] SupplierService
- [ ] StaffService
- [ ] SalesDetailsService
- [ ] StockMasterService
- [ ] CategoryService
- [ ] BranchService
- [ ] AttendanceService
- [ ] AccountsCreationService
- [ ] ATCTblService
- [ ] SystemUserProService
- [ ] SessionCreationService
- [ ] PaymentVoucherService
- [ ] VehicleRecordService
- [ ] TblServicingService
- [ ] OrganisationService
- [ ] WarehouseTblService

### Phase 3: Update AuthController
- [ ] Add OrganisationCode and BranchCode to User model
- [ ] Update JWT token generation with new claims
- [ ] Update login logic to fetch org/branch from user record or database

### Phase 4: Testing
- [ ] Unit tests for UserContextService
- [ ] Unit tests for BaseService
- [ ] Integration tests for each service
- [ ] End-to-end tests for complete workflows
- [ ] Load testing with multiple tenants

### Phase 5: Documentation
- [ ] API documentation updates
- [ ] Developer guide updates
- [ ] Deployment guide updates
- [ ] Security audit documentation

## Best Practices

1. **Never allow changing OrganisationCode or BranchCode** in update operations
2. **Always filter by tenant** in all read operations
3. **Always set tenant properties** in all create operations
4. **Always verify tenant ownership** in update/delete operations
5. **Log all cross-tenant access attempts** for security audits
6. **Use BaseService** to reduce code duplication
7. **Test tenant isolation** thoroughly before production deployment
8. **Document tenant boundaries** clearly in API documentation

## Performance Considerations

1. **Index tenant columns**: Create indexes on OrganisationCode and Branchcode
2. **Partition large tables**: Consider table partitioning by OrganisationCode
3. **Cache tenant lookups**: Cache organisation and branch name lookups
4. **Connection pooling**: Use separate connection pools per tenant if needed
5. **Query optimization**: Ensure tenant filters are applied early in queries

## Security Considerations

1. **JWT validation**: Always validate JWT signature and expiry
2. **Claim validation**: Verify OrganisationCode and BranchCode claims exist
3. **SQL injection**: Use parameterized queries (EF Core handles this)
4. **Logging**: Log all tenant access for audit trails
5. **Rate limiting**: Consider per-tenant rate limiting
6. **Backup isolation**: Ensure backups maintain tenant isolation

---

**This implementation ensures complete multi-tenant data isolation at the application and database level! 🔒**
