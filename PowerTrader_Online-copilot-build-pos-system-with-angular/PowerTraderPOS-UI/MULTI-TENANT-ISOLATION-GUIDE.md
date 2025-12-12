# Multi-Tenant Architecture Implementation Guide

## Overview

The PowerTrader POS system implements a robust multi-tenant isolation pattern that ensures complete data separation between organizations and branches. Every service automatically filters data by `OrganisationCode` and `BranchCode`, with special handling for organization administrators.

## Core Components

### 1. BaseService (`base.service.ts`)

The foundation of multi-tenant isolation. All services should extend `BaseService` to inherit automatic tenant filtering.

**Key Features:**
- Automatic tenant parameter injection
- Organization admin permission handling
- Branch-level data isolation
- Standard CRUD operations with tenant filtering
- Batch operations support

**Usage:**
```typescript
@Injectable({ providedIn: 'root' })
export class YourService extends BaseService<YourModel> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'YourEndpoint');
  }
}
```

### 2. TenantContextService

Manages tenant context throughout the application session.

**Interface:**
```typescript
interface TenantContext {
  organisationCode: string;
  organisationName: string;
  branchCode: string;
  branchName: string;
  userId: string;
  userName: string;
  role: string;
  isOrganisationAdmin: boolean;
}
```

**Key Methods:**
- `getOrganisationCode()`: Get current organization code
- `getBranchCode()`: Get current branch code
- `isOrganisationAdmin()`: Check if user is org admin
- `getTenantParams()`: Get tenant filter parameters
- `addTenantInfo(data)`: Add tenant info to entities

### 3. AuthService

Enhanced to set tenant context with role information during login.

**Organization Admin Roles:**
- `Admin`
- `OrganisationAdmin`
- `SuperAdmin`

## Data Isolation Rules

### Regular Users
- **View**: Only data from their assigned branch
- **Create**: Entities automatically tagged with their branch
- **Update**: Can only modify entities in their branch
- **Delete**: Can only delete entities in their branch

### Organization Administrators
- **View**: Can see data across ALL branches in their organization
- **Create**: Can create entities in any branch
- **Update**: Can modify entities in any branch
- **Delete**: Can delete entities in any branch
- **Transfer**: Can transfer data between branches

## Implementation Examples

### Example 1: Basic Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { BaseService } from './base.service';
import { Product } from '../models/models';

@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseService<Product> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Products');
  }

  // All base methods automatically include tenant filtering:
  // - getAll()
  // - getById(id)
  // - create(entity)
  // - update(id, entity)
  // - delete(id)
  // - search(term)
  // - filter(params)
}
```

### Example 2: Service with Custom Methods

```typescript
@Injectable({ providedIn: 'root' })
export class OrdersService extends BaseService<Order> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Orders');
  }

  // Custom method - automatically filtered by tenant
  getOrdersByStatus(status: string): Observable<Order[]> {
    const options = this.getRequestOptions();
    const params = options.params.set('status', status);
    return this.http.get<Order[]>(
      `${this.apiUrl}/by-status`, 
      { ...options, params }
    );
  }

  // Method accessible only to org admins
  getPendingOrdersAllBranches(): Observable<Order[]> {
    if (!this.isOrganisationAdmin()) {
      throw new Error('Access denied: Organization admin only');
    }
    
    const options = this.getRequestOptions(false); // No branch filter
    return this.http.get<Order[]>(
      `${this.apiUrl}/pending-all-branches`,
      options
    );
  }
}
```

### Example 3: Component Usage

```typescript
@Component({
  selector: 'app-products',
  template: `
    <h2>Products - {{ branchName }}</h2>
    <p *ngIf="isOrgAdmin">Viewing all branches</p>
    <div *ngFor="let product of products">
      {{ product.name }} - {{ product.branchCode }}
    </div>
  `
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  branchName: string = '';
  isOrgAdmin: boolean = false;

  constructor(
    private productsService: ProductsService,
    private tenantContext: TenantContextService
  ) {}

  ngOnInit() {
    this.branchName = this.tenantContext.getBranchName();
    this.isOrgAdmin = this.tenantContext.isOrganisationAdmin();

    // Automatically filtered by tenant
    this.loadProducts();
  }

  loadProducts() {
    if (this.isOrgAdmin) {
      // Org admin sees all branches
      this.productsService.getAllBranches().subscribe(
        products => this.products = products
      );
    } else {
      // Regular user sees only their branch
      this.productsService.getAll().subscribe(
        products => this.products = products
      );
    }
  }

  createProduct(product: Partial<Product>) {
    // Tenant info automatically added
    this.productsService.create(product).subscribe(
      created => {
        console.log('Created:', created);
        // created.organisationCode and created.branchCode 
        // are automatically set
        this.loadProducts();
      }
    );
  }
}
```

## BaseService Methods Reference

### Standard CRUD Methods

| Method | Description | Tenant Filtered | Returns |
|--------|-------------|-----------------|---------|
| `getAll()` | Get all entities | Yes (by branch for regular users) | `Observable<T[]>` |
| `getById(id)` | Get entity by ID | Yes | `Observable<T>` |
| `getByRefNo(refNo)` | Get by reference number | Yes | `Observable<T>` |
| `create(entity)` | Create new entity | Auto-adds tenant info | `Observable<T>` |
| `update(id, entity)` | Update entity | Yes | `Observable<T>` |
| `delete(id)` | Delete entity | Yes | `Observable<void>` |
| `getActive()` | Get active entities | Yes | `Observable<T[]>` |
| `search(term)` | Search entities | Yes | `Observable<T[]>` |
| `filter(params)` | Filter entities | Yes | `Observable<T[]>` |
| `count(params?)` | Count entities | Yes | `Observable<{count: number}>` |
| `exists(id)` | Check if exists | Yes | `Observable<{exists: boolean}>` |

### Branch-Specific Methods (Org Admin Only)

| Method | Description | Returns |
|--------|-------------|---------|
| `getByBranchCode(code)` | Get entities from specific branch | `Observable<T[]>` |
| `getAllBranches()` | Get entities across all branches | `Observable<T[]>` |

### Batch Operations

| Method | Description | Returns |
|--------|-------------|---------|
| `batchCreate(entities)` | Create multiple entities | `Observable<T[]>` |
| `batchUpdate(entities)` | Update multiple entities | `Observable<T[]>` |
| `batchDelete(ids)` | Delete multiple entities | `Observable<void>` |

### Protected Helper Methods

| Method | Description | Returns |
|--------|-------------|---------|
| `getTenantParams(includeBranch?)` | Get tenant query params | `HttpParams` |
| `getHeaders()` | Get HTTP headers with auth token | `HttpHeaders` |
| `getRequestOptions(includeBranch?)` | Get complete request options | `{params, headers}` |
| `addTenantInfo(entity)` | Add tenant info to entity | `T` |
| `isOrganisationAdmin()` | Check if user is org admin | `boolean` |
| `canAccessAllBranches()` | Check branch access permission | `boolean` |

## Migration Guide

### Converting Existing Services

**Before:**
```typescript
@Injectable({ providedIn: 'root' })
export class OldProductsService {
  private apiUrl = 'http://localhost:5000/api/Products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}
```

**After:**
```typescript
@Injectable({ providedIn: 'root' })
export class ProductsService extends BaseService<Product> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'Products');
  }

  // All CRUD methods inherited with tenant filtering!
  // getAll(), create(), update(), delete(), etc.
}
```

### Step-by-Step Migration

1. **Import BaseService dependencies:**
   ```typescript
   import { BaseService } from './base.service';
   import { TenantContextService } from './tenant-context.service';
   import { AuthService } from './auth.service';
   ```

2. **Extend BaseService:**
   ```typescript
   export class YourService extends BaseService<YourModel>
   ```

3. **Update constructor:**
   ```typescript
   constructor(
     http: HttpClient,
     tenantContext: TenantContextService,
     authService: AuthService
   ) {
     super(http, tenantContext, authService, 'YourEndpoint');
   }
   ```

4. **Remove manual tenant filtering:**
   - Remove manual `getTenantParams()` calls
   - Remove manual `organisationCode` / `branchCode` parameters
   - Remove manual tenant info additions in create/update methods

5. **Update custom methods:**
   ```typescript
   // Use inherited helper methods
   customMethod(): Observable<YourModel[]> {
     const options = this.getRequestOptions();
     return this.http.get<YourModel[]>(`${this.apiUrl}/custom`, options);
   }
   ```

## Security Considerations

### Data Isolation Enforcement

1. **Server-Side Validation Required:**
   - Frontend filtering is NOT sufficient for security
   - Backend API must validate `OrganisationCode` and `BranchCode`
   - Backend should verify user has permission for requested data

2. **Token-Based Authentication:**
   - JWT tokens should include `organisationCode` and `branchCode` claims
   - Backend should extract tenant info from token, not request parameters
   - Frontend tenant parameters are for convenience, not security

3. **Row-Level Security:**
   - Database queries should ALWAYS filter by organisation and branch
   - Use database views or query interceptors
   - Never trust client-provided tenant identifiers

### Permission Checks

```typescript
// Example: Backend API endpoint
[Authorize]
[HttpGet]
public async Task<IActionResult> GetProducts()
{
    // Extract from JWT token (secure)
    var organisationCode = User.Claims
        .FirstOrDefault(c => c.Type == "organisationCode")?.Value;
    var branchCode = User.Claims
        .FirstOrDefault(c => c.Type == "branchCode")?.Value;
    var isOrgAdmin = User.IsInRole("Admin") || User.IsInRole("OrganisationAdmin");

    // Build query with tenant filter
    var query = _context.Products
        .Where(p => p.OrganisationCode == organisationCode);

    // Branch filter for non-admins
    if (!isOrgAdmin)
    {
        query = query.Where(p => p.BranchCode == branchCode);
    }

    return Ok(await query.ToListAsync());
}
```

## Testing Multi-Tenant Isolation

### Unit Tests

```typescript
describe('ProductsService Multi-Tenant Tests', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  let tenantContext: TenantContextService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        ProductsService,
        TenantContextService,
        AuthService
      ]
    });

    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
    tenantContext = TestBed.inject(TenantContextService);
    authService = TestBed.inject(AuthService);
  });

  it('should filter by branch for regular users', () => {
    // Setup regular user context
    tenantContext.setTenantContext({
      organisationCode: 'ORG001',
      branchCode: 'BR001',
      role: 'Sales',
      isOrganisationAdmin: false,
      // ... other fields
    });

    service.getAll().subscribe();

    const req = httpMock.expectOne(request => 
      request.url.includes('organisationCode=ORG001') &&
      request.url.includes('branchCode=BR001')
    );
    
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });

  it('should not filter by branch for org admins', () => {
    // Setup org admin context
    tenantContext.setTenantContext({
      organisationCode: 'ORG001',
      branchCode: 'BR001',
      role: 'Admin',
      isOrganisationAdmin: true,
      // ... other fields
    });

    service.getAll().subscribe();

    const req = httpMock.expectOne(request => 
      request.url.includes('organisationCode=ORG001') &&
      !request.url.includes('branchCode=')
    );
    
    expect(req.request.method).toBe('GET');
    req.flush([]);
  });
});
```

## Troubleshooting

### Common Issues

1. **"Tenant context not set" Error:**
   - Ensure user is logged in before making API calls
   - Check that `AuthService.login()` sets tenant context
   - Verify `TenantContextService` is properly injected

2. **User sees data from other branches:**
   - Verify backend is enforcing tenant filtering
   - Check JWT token contains correct tenant claims
   - Ensure `isOrganisationAdmin` flag is set correctly

3. **Org admin cannot see all branches:**
   - Check user role is in admin roles list
   - Verify `isOrganisationAdmin` flag is true in context
   - Use `getAllBranches()` method instead of `getAll()`

4. **Created entities missing tenant info:**
   - Ensure service extends `BaseService`
   - Use inherited `create()` method
   - Don't override `addTenantInfo()` without calling `super`

## Best Practices

1. **Always extend BaseService** for entity services
2. **Use inherited methods** before creating custom ones
3. **Check permissions** for admin-only operations
4. **Validate on backend** - never trust frontend filtering
5. **Test with multiple tenants** to verify isolation
6. **Log tenant context** for audit trails
7. **Handle errors gracefully** when context is missing
8. **Document custom methods** with tenant behavior

## Next Steps

1. Migrate all existing services to extend `BaseService`
2. Update components to use new service methods
3. Implement backend tenant validation
4. Add audit logging for multi-tenant operations
5. Create integration tests for cross-branch scenarios
6. Document tenant-specific business rules
