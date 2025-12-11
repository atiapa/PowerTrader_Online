# Backend Model Refactoring Plan

## Executive Summary

This document outlines a comprehensive plan to refactor the PowerTrader_Online backend architecture by splitting bundled model files (AccountingModels.cs, ExistingModels.cs) into individual, properly organized files with dedicated services, DTOs, controllers, and EF migrations.

**Estimated Effort:** 15-20 hours  
**Risk Level:** High (requires extensive testing)  
**Recommendation:** Implement as a separate, dedicated PR with thorough testing at each stage

---

## Current Architecture Issues

### Bundle Files Overview

1. **AccountingModels.cs** - Contains 25+ accounting-related entities
2. **ExistingModels.cs** - Contains 30+ business entities
3. **Other Bundle Files** - Additional consolidated model files

### Problems with Current Structure

- **Maintainability:** Difficult to locate and modify specific entities
- **Merge Conflicts:** High risk when multiple developers work on models
- **Code Organization:** Poor separation of concerns
- **Testing:** Hard to test individual entities in isolation
- **Performance:** Larger files slow down IDE operations
- **Scalability:** Becomes unwieldy as system grows

---

## Target Architecture

### Directory Structure

```
PowerTraderPOS-API/
├── Models/
│   ├── Accounting/
│   │   ├── AccountsLedger.cs
│   │   ├── ChartOfAccounts.cs
│   │   ├── JournalEntry.cs
│   │   ├── TrialBalance.cs
│   │   └── ...
│   ├── Sales/
│   │   ├── SalesDetails.cs
│   │   ├── SalesDetailsTemp.cs
│   │   ├── SalesDetailsGifts.cs
│   │   ├── CashSalesPending.cs
│   │   └── ...
│   ├── Inventory/
│   │   ├── RetailItems.cs
│   │   ├── Product.cs
│   │   ├── StockMovement.cs
│   │   └── ...
│   ├── Customer/
│   │   ├── Customer.cs
│   │   ├── LoyaltyPoints.cs
│   │   └── ...
│   ├── Payment/
│   │   ├── GiftCard.cs
│   │   ├── PaymentMethod.cs
│   │   └── ...
│   └── Core/
│       ├── Organization.cs
│       ├── Branch.cs
│       └── ...
├── DTOs/
│   ├── Accounting/
│   ├── Sales/
│   └── ...
├── Services/
│   ├── Accounting/
│   ├── Sales/
│   └── ...
├── Controllers/
│   ├── AccountingController.cs
│   ├── SalesController.cs
│   └── ...
└── Migrations/
```

---

## Implementation Phases

### Phase 1: Analysis and Planning (2-3 hours)

**Objectives:**
- Document all existing entities in bundle files
- Identify dependencies between models
- Create entity relationship diagrams
- Plan migration order to minimize breaking changes

**Tasks:**
1. Inventory all entities in AccountingModels.cs
2. Inventory all entities in ExistingModels.cs
3. Document foreign key relationships
4. Identify shared/base classes
5. Plan directory structure
6. Create migration dependency graph

**Deliverables:**
- Entity inventory spreadsheet
- Dependency graph
- Directory structure specification
- Migration order document

---

### Phase 2: Create Base Infrastructure (2-3 hours)

**Objectives:**
- Set up new directory structure
- Create base classes and interfaces
- Establish naming conventions

**Tasks:**
1. Create new directory structure
2. Create base entity classes (BaseEntity, AuditableEntity, TenantEntity)
3. Create base DTO classes
4. Create base service interfaces (IRepository<T>, IService<T>)
5. Update DbContext configuration for new structure
6. Create AutoMapper profiles for DTOs

**Deliverables:**
- Directory structure
- Base classes with multi-tenant support
- Core interfaces
- Mapper profiles

---

### Phase 3: Split Accounting Models (3-4 hours)

**Entities to Split (AccountingModels.cs):**

1. AccountsLedger
2. ChartOfAccounts
3. JournalEntry
4. JournalEntryLine
5. TrialBalance
6. BalanceSheet
7. IncomeStatement
8. CashFlowStatement
9. GeneralLedger
10. SubLedger
11. AccountingPeriod
12. FiscalYear
13. TaxCode
14. TaxTransaction
15. AccountReconciliation
16. BankAccount
17. BankTransaction
18. PaymentTerm
19. PaymentMethod
20. CreditNote
21. DebitNote
22. Invoice
23. Receipt
24. Voucher
25. BudgetAllocation

**For Each Entity:**
1. Create individual model file in Models/Accounting/
2. Create corresponding DTO in DTOs/Accounting/
3. Create service interface (IXxxService.cs)
4. Create service implementation (XxxService.cs) with tenant scoping
5. Create or update controller with tenant validation
6. Create EF migration
7. Update DbContext with global query filters
8. Write unit tests including tenant isolation tests
9. Test API endpoints

**Deliverables:**
- 25 individual model files
- 25 DTO files
- 10-15 service interfaces and implementations
- 5-8 controllers
- EF migrations
- Unit tests with tenant isolation coverage

---

### Phase 4: Split Sales & Inventory Models (3-4 hours)

**Sales Entities (from ExistingModels.cs):**

1. SalesDetails
2. SalesDetailsTemp
3. SalesDetailsGifts
4. SalesHeader
5. SalesLine
6. CashSalesPending
7. SalesReturn
8. SalesInvoice
9. QuotationHeader
10. QuotationLine
11. SalesOrder
12. DeliveryNote
13. SalesCommission
14. SalesTarget
15. CustomerOrder

**Inventory Entities:**

1. RetailItems
2. Product
3. ProductCategory
4. ProductSubcategory
5. StockMovement
6. StockAdjustment
7. StockCount
8. Warehouse
9. WarehouseLocation
10. StockTransfer
11. ReorderLevel
12. Supplier
13. PurchaseOrder
14. PurchaseOrderLine
15. GoodsReceivedNote

**For Each Entity:** Same as Phase 3

**Deliverables:**
- 30 individual model files with tenant properties
- 30 DTO files
- 15-20 service interfaces and implementations
- 8-12 controllers
- EF migrations
- Unit tests

---

### Phase 5: Split Customer & Payment Models (2-3 hours)

**Customer Entities:**

1. Customer
2. CustomerGroup
3. CustomerType
4. LoyaltyPoints
5. LoyaltyProgram
6. CustomerAddress
7. CustomerContact
8. CustomerCredit
9. CustomerPaymentHistory
10. CustomerPriceList

**Payment Entities:**

1. GiftCard
2. GiftCardTransaction
3. Payment
4. PaymentSplit
5. PaymentReconciliation
6. CashRegister
7. CashDrawer
8. Till
9. TillSession
10. PettyCash

**For Each Entity:** Same as Phase 3

**Deliverables:**
- 20 individual model files
- 20 DTO files
- 10-12 service interfaces and implementations
- 5-7 controllers
- EF migrations
- Unit tests

---

### Phase 6: Split Core & Configuration Models (2-3 hours)

**Core Entities:**

1. Organization
2. Branch
3. Department
4. User
5. Role
6. Permission
7. UserRole
8. RolePermission
9. AuditLog
10. SystemConfiguration
11. CompanySettings
12. Currency
13. ExchangeRate
14. Country
15. Region
16. City

**For Each Entity:** Same as Phase 3

**Deliverables:**
- 16 individual model files
- 16 DTO files
- 8-10 service interfaces and implementations
- 4-6 controllers
- EF migrations
- Unit tests

---

### Phase 7: Update Frontend Models & Services (2-3 hours)

**Objectives:**
- Create corresponding TypeScript models
- Update frontend services
- Ensure API integration remains functional

**Tasks:**

1. **Create TypeScript Models:**
   ```
   PowerTraderPOS-UI/src/app/models/
   ├── accounting/
   │   ├── accounts-ledger.model.ts
   │   ├── journal-entry.model.ts
   │   └── ...
   ├── sales/
   │   ├── sales-details.model.ts
   │   ├── hold-order.model.ts
   │   └── ...
   ├── inventory/
   │   ├── retail-item.model.ts
   │   ├── product.model.ts
   │   └── ...
   └── ...
   ```

2. **Create/Update Angular Services:**
   ```
   PowerTraderPOS-UI/src/app/services/
   ├── accounting/
   │   ├── accounting.service.ts
   │   ├── journal-entry.service.ts
   │   └── ...
   ├── sales/
   │   ├── sales.service.ts
   │   ├── hold-order.service.ts
   │   └── ...
   └── ...
   ```

3. **Update Existing Components:**
   - Update imports to use new model paths
   - Update service injection
   - Test all API calls

**Deliverables:**
- 50+ TypeScript model files
- 30+ Angular service files
- Updated component imports
- Integration tests

---

## Multi-Tenant Architecture Integration

### Tenant Scoping Strategy

All refactored models will maintain multi-tenant architecture:

1. **Base Entity Class:**
   ```csharp
   public abstract class TenantEntity
   {
       public string OrganisationCode { get; set; }
       public string BranchCode { get; set; }
       public DateTime CreatedAt { get; set; }
       public string CreatedBy { get; set; }
   }
   ```

2. **Automatic Tenant Filtering:**
   ```csharp
   // In DbContext OnModelCreating
   modelBuilder.Entity<SalesDetails>()
       .HasQueryFilter(e => e.OrganisationCode == _tenantProvider.OrganisationCode
                         && e.BranchCode == _tenantProvider.BranchCode);
   ```

3. **Service Layer:**
   - All services inherit from BaseTenantService
   - Automatic tenant validation
   - Cross-tenant prevention
   - Super admin bypass for platform management

4. **API Layer:**
   - Middleware injects tenant context from JWT
   - All controllers validate tenant access
   - Audit logging of all operations
   - Role-based access control (RBAC)

---

## Database Migration Strategy

### Approach: Zero-Downtime Migration

1. **Create New Tables:**
   - Generate new tables with individual entity structure
   - Keep existing bundle tables temporarily
   - Add tenant indexes for performance

2. **Data Migration:**
   - Create migration scripts to copy data
   - Validate data integrity
   - Test tenant isolation
   - Run in staging environment first

3. **Dual-Write Period:**
   - Write to both old and new tables
   - Validate consistency
   - Monitor for 1-2 weeks in staging

4. **Cutover:**
   - Switch to new tables
   - Deprecate old tables
   - Archive old data

5. **Cleanup:**
   - Remove old tables after validation period (30 days)
   - Remove old code references
   - Update documentation

---

## Testing Strategy

### Unit Tests (Per Entity)

```csharp
[TestClass]
public class AccountsLedgerServiceTests
{
    private ITenantProvider _mockTenantProvider;
    
    [TestInitialize]
    public void Setup()
    {
        _mockTenantProvider = Mock.Of<ITenantProvider>(
            p => p.OrganisationCode == "ORG001" && p.BranchCode == "BR001"
        );
    }
    
    [TestMethod]
    public async Task CreateEntry_ValidData_ReturnsSuccess()
    {
        // Arrange
        var service = new AccountsLedgerService(mockRepo, mockMapper, _mockTenantProvider);
        var dto = new AccountsLedgerDto { /* test data */ };
        
        // Act
        var result = await service.CreateAsync(dto);
        
        // Assert
        Assert.IsTrue(result.Success);
    }
    
    [TestMethod]
    public async Task GetByTenant_OnlyReturnsOwnData()
    {
        // Arrange
        var service = new AccountsLedgerService(mockRepo, mockMapper, _mockTenantProvider);
        
        // Act
        var results = await service.GetAllAsync();
        
        // Assert
        Assert.IsTrue(results.All(r => r.OrganisationCode == "ORG001"));
        Assert.IsTrue(results.All(r => r.BranchCode == "BR001"));
    }
    
    [TestMethod]
    public async Task CrossTenantAccess_Denied()
    {
        // Test that users cannot access other tenant's data
    }
}
```

### Integration Tests

- Test API endpoints with tenant context
- Test tenant isolation at API level
- Test data migration integrity
- Test backward compatibility
- Test super admin cross-tenant access

### Performance Tests

- Measure query performance before/after
- Test with production-like data volumes (1M+ records)
- Monitor memory usage
- Test concurrent access (100+ users)
- Test tenant-specific query performance

---

## Risk Mitigation

### High Risks

1. **Breaking Changes:**
   - **Mitigation:** Maintain backward compatibility layer
   - **Rollback Plan:** Keep old structure for 1 sprint
   - **Testing:** Comprehensive regression tests

2. **Data Loss:**
   - **Mitigation:** Comprehensive backup before migration
   - **Validation:** Automated data integrity checks
   - **Recovery:** Point-in-time restore capability
   - **Monitoring:** Real-time data consistency checks

3. **Performance Degradation:**
   - **Mitigation:** Performance testing before deployment
   - **Monitoring:** Real-time query performance tracking
   - **Optimization:** Index optimization, query tuning
   - **Caching:** Implement distributed caching strategy

4. **Tenant Data Leakage:**
   - **Mitigation:** Comprehensive tenant isolation tests
   - **Validation:** Security audit of global query filters
   - **Monitoring:** Audit logging of all queries
   - **Testing:** Penetration testing for cross-tenant access

### Medium Risks

1. **Extended Development Time:**
   - **Mitigation:** Phased approach with checkpoints
   - **Buffer:** Add 20% time buffer to estimates
   - **Monitoring:** Daily progress tracking

2. **Integration Issues:**
   - **Mitigation:** Continuous integration testing
   - **Documentation:** Clear API change documentation
   - **Communication:** Regular team updates

---

## Rollback Plan

### If Major Issues Arise

1. **Immediate Rollback (< 1 hour):**
   - Revert to previous deployment
   - Switch database connection to old tables
   - Enable feature flag to use old code path
   - Notify all stakeholders

2. **Data Recovery:**
   - Restore from backup if needed
   - Run data validation scripts
   - Verify tenant isolation
   - Check data integrity

3. **Post-Mortem:**
   - Document issues encountered
   - Update refactoring plan
   - Add additional tests
   - Schedule review meeting

---

## Success Criteria

### Technical Metrics

- ✅ All entities in individual files
- ✅ 100% test coverage for new services
- ✅ No performance degradation (< 5% query time increase)
- ✅ Zero data loss during migration
- ✅ Zero tenant data leakage incidents
- ✅ All global query filters working correctly
- ✅ All API endpoints functional

### Operational Metrics

- ✅ Zero critical bugs in production
- ✅ < 1% increase in response times
- ✅ Successful data migration validation
- ✅ All integration tests passing
- ✅ < 0.1% error rate

### Developer Experience

- ✅ Faster IDE performance (50% improvement)
- ✅ Easier to locate and modify entities
- ✅ Reduced merge conflicts (70% reduction)
- ✅ Improved code maintainability
- ✅ Positive developer feedback

---

## Timeline

### Recommended Schedule

| Phase | Duration | Dependencies | Team Size |
|-------|----------|--------------|-----------|
| Phase 1: Analysis | 2-3 hours | None | 2 developers |
| Phase 2: Infrastructure | 2-3 hours | Phase 1 | 2 developers |
| Phase 3: Accounting | 3-4 hours | Phase 2 | 3 developers |
| Phase 4: Sales/Inventory | 3-4 hours | Phase 2 | 3 developers |
| Phase 5: Customer/Payment | 2-3 hours | Phase 2 | 2 developers |
| Phase 6: Core/Config | 2-3 hours | Phase 2 | 2 developers |
| Phase 7: Frontend | 2-3 hours | Phases 3-6 | 2 developers |
| Testing & Validation | 2-3 hours | All phases | Full team |
| **Total** | **18-26 hours** | | |

### Recommended Approach

- **Sprint 1:** Phases 1-2 (Infrastructure)
- **Sprint 2:** Phase 3 (Accounting)
- **Sprint 3:** Phase 4 (Sales/Inventory)
- **Sprint 4:** Phases 5-6 (Customer/Payment/Core)
- **Sprint 5:** Phase 7 + Testing

**Note:** Phases can be parallelized with multiple developers working on different domains.

---

## Communication Plan

### Stakeholders

1. **Development Team:**
   - Daily standup updates during refactoring
   - Code review sessions
   - Pair programming for complex migrations
   - Knowledge sharing sessions

2. **QA Team:**
   - Test plan review before each phase
   - Early access to staging environment
   - Bug reporting process
   - Performance testing coordination

3. **Product Owner:**
   - Weekly progress reports
   - Risk updates
   - Timeline adjustments
   - Priority changes

4. **DevOps:**
   - Deployment plan review
   - Rollback procedure validation
   - Monitoring setup
   - Database migration coordination

5. **End Users (if applicable):**
   - Advance notice of any downtime
   - Training on new features (if UI changes)
   - Feedback collection

---

## Post-Refactoring Benefits

### Immediate Benefits (Month 1-3)

1. **Developer Productivity:**
   - 50% faster navigation to specific entities
   - 30% reduced file loading times in IDE
   - 70% fewer merge conflicts
   - Improved code review speed

2. **Code Quality:**
   - Better separation of concerns
   - 100% test coverage for new components
   - Easier to test individual components
   - Clearer code organization

3. **Performance:**
   - Optimized queries with tenant indexes
   - Better query plan caching
   - Reduced memory footprint

### Long-Term Benefits (Month 4-12)

1. **Scalability:**
   - Easier to add new entities (50% faster)
   - Better support for microservices migration
   - Improved modularity
   - Better horizontal scaling

2. **Maintenance:**
   - 40% faster bug fixes
   - Easier to onboard new developers (50% reduction in onboarding time)
   - Better documentation structure
   - Clearer code ownership

3. **Security:**
   - Improved tenant isolation
   - Better audit capabilities
   - Enhanced role-based access control
   - Reduced attack surface

4. **Business Agility:**
   - Faster feature development (30% improvement)
   - Easier A/B testing
   - Better support for multi-region deployment
   - Improved disaster recovery

---

## Cost-Benefit Analysis

### Costs

1. **Development Time:** 18-26 hours ($2,000 - $3,500 at $125/hour)
2. **Testing Time:** 10-15 hours ($1,250 - $1,875)
3. **Migration Risk:** Low (with proper planning)
4. **Downtime:** None (zero-downtime migration)

**Total Cost:** $3,250 - $5,375

### Benefits (Annual)

1. **Developer Productivity:** 20% improvement = $20,000/year (3 developers)
2. **Reduced Bugs:** 30% reduction = $5,000/year
3. **Faster Features:** 25% improvement = $15,000/year
4. **Better Scalability:** $10,000/year (infrastructure savings)

**Total Annual Benefit:** $50,000/year

**ROI:** 830% in first year, 1500% over 2 years

---

## Conclusion

This refactoring plan provides a comprehensive, phased approach to modernizing the PowerTrader_Online backend architecture. By splitting bundle model files into individual, well-organized components with proper multi-tenant support, we will significantly improve:

- **Maintainability:** Easier to find, modify, and test code
- **Scalability:** Better foundation for future growth
- **Security:** Improved tenant isolation and access control
- **Performance:** Optimized queries with proper indexing
- **Developer Experience:** Faster development cycles
- **Code Quality:** Better organization, testing, and documentation

**Recommendation:** Execute this plan as a dedicated initiative separate from the Retail Sales Point feature to ensure thorough testing and minimize risk to existing functionality.

The refactoring should be treated as a foundational improvement that will pay dividends for years to come through improved developer productivity, reduced bugs, and better scalability.

---

## Appendix A: Entity Inventory Summary

### Total Entity Count

- **AccountingModels.cs:** ~25 entities
- **ExistingModels.cs:** ~30 entities
- **Other Bundle Files:** ~20 entities
- **Total:** ~75 entities to refactor

### Entity Categories

1. **Accounting (25):** Ledgers, journals, reports
2. **Sales (15):** Transactions, orders, invoices
3. **Inventory (15):** Products, stock, movements
4. **Customer (10):** Profiles, loyalty, addresses
5. **Payment (10):** Methods, transactions, registers
6. **Core (16):** Organization, users, roles
7. **Configuration (9):** Settings, currencies, locations

---

## Appendix B: API Endpoint Migration Guide

### Backward Compatibility Strategy

**During Transition (Sprints 1-5):**
- Old endpoints remain functional
- New endpoints available in parallel
- Frontend can use either
- Deprecation warnings in API responses

**After Transition (Sprint 6+):**
- Old endpoints return 301 redirects to new endpoints
- Documentation updated to show new endpoints
- Old endpoints deprecated after 3 months

### Example Endpoint Changes

**Old Structure:**
```
POST /api/sales
GET /api/sales
GET /api/sales/{id}
```

**New Structure:**
```
Retail Sales:
POST /api/sales/retail/complete
GET /api/sales/retail/history
POST /api/sales/retail/hold
GET /api/sales/retail/hold/list
GET /api/sales/retail/hold/{id}
POST /api/sales/retail/hold/{id}/retrieve
DELETE /api/sales/retail/hold/{id}/cancel

Gift Cards:
GET /api/giftcards/{cardNumber}/balance
POST /api/giftcards/{cardNumber}/redeem
POST /api/giftcards/validate

Accounting:
POST /api/accounting/journal-entry
GET /api/accounting/ledger
GET /api/accounting/ledger/{organizationCode}/{branchCode}
GET /api/accounting/trial-balance
GET /api/accounting/balance-sheet
```

All new endpoints include tenant context validation and are documented in Swagger/OpenAPI.

---

## Appendix C: Code Examples

### Example: Tenant Entity Base Class

```csharp
public abstract class TenantEntity
{
    [Required]
    [StringLength(50)]
    public string OrganisationCode { get; set; }
    
    [Required]
    [StringLength(50)]
    public string BranchCode { get; set; }
    
    public DateTime CreatedAt { get; set; }
    
    [StringLength(100)]
    public string CreatedBy { get; set; }
    
    public DateTime? ModifiedAt { get; set; }
    
    [StringLength(100)]
    public string ModifiedBy { get; set; }
    
    public bool IsDeleted { get; set; }
}
```

### Example: Service with Tenant Scoping

```csharp
public class SalesDetailsService : BaseTenantService<SalesDetails>, ISalesDetailsService
{
    private readonly IRepository<SalesDetails> _repository;
    private readonly ITenantProvider _tenantProvider;
    private readonly IMapper _mapper;
    
    public SalesDetailsService(
        IRepository<SalesDetails> repository,
        ITenantProvider tenantProvider,
        IMapper mapper)
    {
        _repository = repository;
        _tenantProvider = tenantProvider;
        _mapper = mapper;
    }
    
    public async Task<Result<SalesDetailsDto>> CreateAsync(CreateSalesDetailsRequest request)
    {
        // Automatic tenant injection
        var entity = _mapper.Map<SalesDetails>(request);
        entity.OrganisationCode = _tenantProvider.OrganisationCode;
        entity.BranchCode = _tenantProvider.BranchCode;
        entity.CreatedBy = _tenantProvider.UserId;
        entity.CreatedAt = DateTime.UtcNow;
        
        await _repository.AddAsync(entity);
        await _repository.SaveChangesAsync();
        
        return Result<SalesDetailsDto>.Success(_mapper.Map<SalesDetailsDto>(entity));
    }
    
    public async Task<Result<List<SalesDetailsDto>>> GetAllAsync()
    {
        // Automatic tenant filtering via global query filter
        var entities = await _repository.GetAllAsync();
        return Result<List<SalesDetailsDto>>.Success(_mapper.Map<List<SalesDetailsDto>>(entities));
    }
}
```

### Example: Controller with Tenant Validation

```csharp
[ApiController]
[Route("api/sales/retail")]
[Authorize]
public class RetailSalesController : BaseTenantController
{
    private readonly ISalesDetailsService _salesService;
    
    [HttpPost("complete")]
    [ProducesResponseType(typeof(SalesDetailsDto), StatusCodes.Status200OK)]
    public async Task<IActionResult> CompleteSale([FromBody] CompleteSaleRequest request)
    {
        // Tenant context automatically validated by base controller
        var result = await _salesService.CreateAsync(request);
        
        if (!result.Success)
            return BadRequest(result.Message);
            
        return Ok(result.Data);
    }
    
    [HttpGet("history")]
    [ProducesResponseType(typeof(List<SalesDetailsDto>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetSalesHistory([FromQuery] int pageSize = 50)
    {
        // Only returns sales for current tenant
        var result = await _salesService.GetAllAsync();
        return Ok(result.Data);
    }
}
```

---

**Document Version:** 1.0  
**Last Updated:** 2025-12-11  
**Author:** Copilot Workspace Agent  
**Status:** Draft - Awaiting Approval  
**Next Review:** After stakeholder feedback
