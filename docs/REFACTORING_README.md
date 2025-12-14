# Backend Model Refactoring - Implementation Guide

## Overview

This is a systematic refactoring of the PowerTrader_Online backend to split bundled model files into individual, well-organized entities with proper multi-tenant support.

**Main Plan Document:** [REFACTORING_PLAN.md](./REFACTORING_PLAN.md)  
**Analysis Document:** [REFACTORING_ANALYSIS.md](./REFACTORING_ANALYSIS.md)

---

## Current Status

### ✅ Phase 1: Analysis and Planning (COMPLETE)
- [x] Created comprehensive analysis document
- [x] Documented existing bundle model files
- [x] Identified 75+ entities across 6 domains
- [x] Established multi-tenant architecture patterns
- [x] Defined migration strategy and order
- [x] Documented risks and rollback procedures

### 🔄 Phase 2: Base Infrastructure (IN PROGRESS)
- [x] Created `TenantEntity` base class with OrganisationCode and BranchCode
- [x] Created `AuditableEntity` base class for audit tracking
- [x] Created `ITenantService` interface for tenant context
- [x] Set up directory structure (Accounting, Sales, Inventory, Customer, Payment, Core)
- [ ] Implement `TenantService` with JWT claims extraction
- [ ] Set up AutoMapper profiles for DTOs
- [ ] Create unit tests for base classes
- [ ] Configure EF Core global query filters for tenant isolation

### ⏳ Phase 3: Split Accounting Models (PENDING)
- [ ] Extract 25 accounting entities from AccountingModels.cs
- [ ] Create individual model files in Models/Accounting/
- [ ] Create DTOs in DTOs/Accounting/
- [ ] Create services in Services/Accounting/
- [ ] Update controllers
- [ ] Create EF migrations
- [ ] Test tenant isolation

### ⏳ Phase 4-7: Additional Phases (PENDING)
See [REFACTORING_PLAN.md](./REFACTORING_PLAN.md) for details.

---

## Quick Reference

### New Base Classes

```csharp
// For entities requiring audit tracking only
public class MyEntity : AuditableEntity { }

// For entities requiring multi-tenant support (includes audit tracking)
public class MyTenantEntity : TenantEntity { }
```

### Directory Structure

```
PowerTraderPOS.API/
├── Models/
│   ├── Base/
│   │   ├── AuditableEntity.cs
│   │   └── TenantEntity.cs
│   ├── Accounting/      # Accounting domain models
│   ├── Sales/           # Sales domain models
│   ├── Inventory/       # Inventory domain models
│   ├── Customer/        # Customer domain models
│   ├── Payment/         # Payment domain models
│   ├── Core/            # Core system models
│   └── Existing/        # Legacy bundle files (to be deprecated)
│       ├── AccountingModels.cs
│       └── ExistingModels.cs
├── DTOs/
│   ├── Accounting/
│   ├── Sales/
│   └── ...
├── Services/
│   ├── Interfaces/
│   │   └── ITenantService.cs
│   ├── Accounting/
│   ├── Sales/
│   └── ...
└── Controllers/
    ├── AccountingController.cs
    └── ...
```

---

## Usage Guidelines

### Creating a New Refactored Entity

1. **Choose the correct domain folder** (Accounting, Sales, Inventory, Customer, Payment, Core)

2. **Inherit from the appropriate base class:**
   ```csharp
   // Multi-tenant entity
   public class AccountsCreation : TenantEntity
   {
       [Key]
       public decimal Refno { get; set; }
       // ... other properties
   }
   ```

3. **Use consistent naming:**
   - Entity: `AccountsCreation` (singular)
   - DTO: `AccountsCreationDto`
   - Service: `IAccountsCreationService` / `AccountsCreationService`
   - Controller: `AccountsCreationController`

4. **Follow table attribute naming:**
   ```csharp
   [Table("Accounts_Creation")]
   public class AccountsCreation : TenantEntity { }
   ```

### Multi-Tenant Query Examples

```csharp
// Automatic tenant filtering (to be implemented)
var accounts = await _context.AccountsCreation
    .Where(a => a.AccountGroup == "Asset")
    .ToListAsync();
// Results automatically filtered by user's OrganisationCode and BranchCode

// Super Admin bypass
if (_tenantService.IsSuperAdmin())
{
    // Can access all tenant data
    var allAccounts = await _context.AccountsCreation.IgnoreQueryFilters().ToListAsync();
}
```

---

## Testing Requirements

### Unit Tests
- All base classes must have 100% coverage
- All new services must have unit tests
- Test tenant isolation explicitly

### Integration Tests
- Test CRUD operations for each entity
- Verify tenant filtering works correctly
- Test Super Admin access

### Performance Tests
- Benchmark query performance
- Ensure no regression from bundle files
- Test with production-like data volumes

---

## Migration Strategy

### Phase-by-Phase Approach

1. **Keep bundle files intact** during refactoring
2. **Create new individual model files** in domain folders
3. **Run parallel** - old and new models coexist
4. **Gradual migration** - update one service at a time
5. **Validate thoroughly** before removing bundle files
6. **Monitor in production** for 1 sprint

### Backward Compatibility

- Old API endpoints remain functional
- Gradual deprecation warnings
- Clear migration guides for API consumers

---

## Rollback Procedure

If issues arise, follow these steps:

1. **Check rollback triggers:**
   - > 5% performance degradation
   - > 2 critical bugs
   - Data inconsistency
   - Failed tests

2. **Execute rollback:**
   ```bash
   # Revert database
   dotnet ef database update <previous-migration>
   
   # Revert code
   git revert <commit-range>
   git push origin main
   ```

3. **Verify:**
   - Run smoke tests
   - Check data integrity
   - Validate functionality

**Target Rollback Time:** < 1 hour

---

## Team Communication

### Before Starting a Phase
- [ ] Review phase objectives
- [ ] Assign responsibilities
- [ ] Schedule code reviews
- [ ] Update team on timeline

### During Implementation
- [ ] Daily standup updates
- [ ] Commit frequently with clear messages
- [ ] Request code reviews early
- [ ] Document any blockers

### After Completing a Phase
- [ ] Demo to stakeholders
- [ ] Update documentation
- [ ] Gather feedback
- [ ] Plan next phase

---

## Links and Resources

- [Main Refactoring Plan](./REFACTORING_PLAN.md)
- [Detailed Analysis](./REFACTORING_ANALYSIS.md)
- [Entity Framework Core Documentation](https://docs.microsoft.com/en-us/ef/core/)
- [Multi-Tenant Architecture Patterns](https://docs.microsoft.com/en-us/azure/architecture/patterns/)

---

## Questions or Issues?

Contact the development team or create an issue in the repository.

**Last Updated:** 2025-12-11  
**Branch:** copilot/backend-model-refactoring  
**Status:** Phase 2 In Progress
