# Multi-Tenant Isolation - Quick Reference

## Quick Start

### 1. Create a New Service

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './base.service';
import { TenantContextService } from './tenant-context.service';
import { AuthService } from './auth.service';
import { YourModel } from '../models/models';

@Injectable({ providedIn: 'root' })
export class YourService extends BaseService<YourModel> {
  constructor(
    http: HttpClient,
    tenantContext: TenantContextService,
    authService: AuthService
  ) {
    super(http, tenantContext, authService, 'YourEndpoint');
  }
  
  // All CRUD methods inherited automatically!
  // Add custom methods as needed
}
```

### 2. Use in Components

```typescript
export class YourComponent {
  constructor(private yourService: YourService) {}

  loadData() {
    // Automatically filtered by tenant
    this.yourService.getAll().subscribe(data => {
      // Regular users: See only their branch
      // Org admins: See all branches
      this.data = data;
    });
  }

  createItem(item: Partial<YourModel>) {
    // Tenant info automatically added
    this.yourService.create(item).subscribe(created => {
      console.log('Created:', created);
      // created.organisationCode and created.branchCode set automatically
    });
  }
}
```

## Inherited Methods

### Standard CRUD (Auto-filtered)
- `getAll()` - Get all entities
- `getById(id)` - Get single entity
- `create(entity)` - Create (adds tenant info)
- `update(id, entity)` - Update
- `delete(id)` - Delete

### Search & Filter
- `search(term)` - Search entities
- `filter(params)` - Filter with parameters
- `getActive()` - Get active entities

### Org Admin Only
- `getAllBranches()` - Get across all branches
- `getByBranchCode(code)` - Query specific branch

### Batch Operations
- `batchCreate(entities)` - Create multiple
- `batchUpdate(entities)` - Update multiple
- `batchDelete(ids)` - Delete multiple

## Custom Methods

```typescript
// Add custom method with tenant filtering
customMethod(): Observable<YourModel[]> {
  const options = this.getRequestOptions();
  return this.http.get<YourModel[]>(
    `${this.apiUrl}/custom`,
    options  // Includes tenant filtering
  );
}

// Admin-only custom method
adminOnlyMethod(): Observable<YourModel[]> {
  if (!this.isOrganisationAdmin()) {
    throw new Error('Admin only');
  }
  
  const options = this.getRequestOptions(false); // No branch filter
  return this.http.get<YourModel[]>(`${this.apiUrl}/admin`, options);
}
```

## Permission Checks

```typescript
// In service
if (!this.isOrganisationAdmin()) {
  throw new Error('Insufficient permissions');
}

// In component
if (this.tenantContext.isOrganisationAdmin()) {
  // Show admin features
}
```

## Tenant Context Access

```typescript
constructor(private tenantContext: TenantContextService) {}

// Get tenant information
const orgCode = this.tenantContext.getOrganisationCode();
const branchCode = this.tenantContext.getBranchCode();
const isAdmin = this.tenantContext.isOrganisationAdmin();
const role = this.tenantContext.getUserRole();
```

## Common Patterns

### Load Data Based on Role
```typescript
loadData() {
  if (this.tenantContext.isOrganisationAdmin()) {
    // Admin: Load all branches
    this.service.getAllBranches().subscribe(...);
  } else {
    // Regular: Load current branch
    this.service.getAll().subscribe(...);
  }
}
```

### Create with Custom Branch (Admin Only)
```typescript
createInBranch(item: Partial<YourModel>, branchCode: string) {
  if (!this.tenantContext.isOrganisationAdmin()) {
    throw new Error('Admin only');
  }
  
  const itemWithBranch = {
    ...item,
    branchCode: branchCode,
    organisationCode: this.tenantContext.getOrganisationCode()
  };
  
  return this.service.create(itemWithBranch);
}
```

### Transfer Between Branches (Admin Only)
```typescript
transfer(itemId: string, fromBranch: string, toBranch: string) {
  if (!this.isOrganisationAdmin()) {
    throw new Error('Only org admins can transfer');
  }
  
  const options = this.getRequestOptions(false);
  return this.http.post(
    `${this.apiUrl}/transfer`,
    { itemId, fromBranch, toBranch },
    options
  );
}
```

## Testing

```typescript
describe('YourService', () => {
  let service: YourService;
  let tenantContext: TenantContextService;

  beforeEach(() => {
    // Setup test context
    tenantContext.setTenantContext({
      organisationCode: 'ORG001',
      branchCode: 'BR001',
      role: 'Sales',
      isOrganisationAdmin: false,
      // ...
    });
  });

  it('should filter by branch for regular users', () => {
    service.getAll().subscribe();
    // Verify request includes branchCode
  });

  it('should not filter by branch for admins', () => {
    tenantContext.setTenantContext({
      ...context,
      role: 'Admin',
      isOrganisationAdmin: true
    });
    
    service.getAll().subscribe();
    // Verify request excludes branchCode
  });
});
```

## Troubleshooting

| Issue | Solution |
|-------|----------|
| "Tenant context not set" | Ensure user is logged in |
| User sees wrong data | Verify backend enforces filtering |
| Admin can't see all branches | Use `getAllBranches()` not `getAll()` |
| Created entities missing tenant | Ensure extending BaseService |

## Admin Roles

These roles are considered organization administrators:
- `Admin`
- `OrganisationAdmin`
- `SuperAdmin`

## Files to Know

- `base.service.ts` - Base service class
- `tenant-context.service.ts` - Tenant context management
- `auth.service.ts` - Authentication with tenant setup
- `*-v2.service.ts` - Example implementations

## Documentation

- `MULTI-TENANT-ISOLATION-GUIDE.md` - Complete guide
- `MULTI-TENANT-IMPLEMENTATION-SUMMARY.md` - Implementation details

---

**Remember:** Frontend filtering is for UX. Backend must enforce security!
