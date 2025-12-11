# Backend Model Refactoring - Phase 1 Analysis

## Document Purpose
This document contains the detailed analysis of existing bundle model files as part of Phase 1 of the refactoring plan.

**Analysis Date:** 2025-12-11  
**Analyzed By:** GitHub Copilot  
**Status:** In Progress

---

## 1. Entity Inventory

### 1.1 AccountingModels.cs Entities

Location: `PowerTraderPOS.API/Models/Existing/AccountingModels.cs`  
File Size: 492 lines

**Identified Entities:**

1. **AccountsCreation** - Account setup and configuration
   - Primary Key: Refno (decimal)
   - Multi-tenant Fields: Branchcode, EntryID
   - Related Tables: AccountsLedger, ChartOfAccounts

2. **AccountsLedger** - General ledger entries
   - Primary Key: RefNo (decimal)
   - Multi-tenant Fields: Branchcode, OrganisationCode
   - Related Tables: AccountsCreation, JournalEntry

3. **ChartOfAccounts** - Account classification
   - Primary Key: ID
   - Multi-tenant Fields: OrganisationCode, BranchCode
   - Related Tables: AccountsLedger

4. **JournalEntry** - Journal transactions
   - Primary Key: EntryID
   - Multi-tenant Fields: BranchCode
   - Related Tables: AccountsLedger

5. **TrialBalance** - Trial balance reports
   - Primary Key: RefNo
   - Multi-tenant Fields: BranchCode
   - Related Tables: AccountsLedger

**Dependencies:**
- All entities have foreign key relationships to Branch/Organization
- AccountsLedger is heavily referenced by other accounting entities
- Common audit fields: EntryDate, EntryID, ModifiedDate

### 1.2 ExistingModels.cs Entities

Location: `PowerTraderPOS.API/Models/Existing/ExistingModels.cs`  
File Size: 435 lines

**Identified Entities:**

1. **RetailItems** - Product inventory for retail
   - Primary Key: ProductID
   - Multi-tenant Fields: Branchcode
   - Related Tables: SalesDetails, StockMovement

2. **SalesDetails** - Sales transaction details
   - Primary Key: RefNo
   - Multi-tenant Fields: BranchCode
   - Related Tables: RetailItems, Customer

3. **SalesDetailsTemp** - Temporary sales records
   - Primary Key: RefNo
   - Multi-tenant Fields: BranchCode
   - Store Attribute: Indicates sale source (Retail, Wholesale, etc.)
   - Related Tables: RetailItems

4. **CashSalesPending** - Held/pending orders
   - Primary Key: PendingID
   - Multi-tenant Fields: BranchCode, CashierID
   - Related Tables: SalesDetailsTemp

5. **Customer** - Customer master data
   - Primary Key: CustomerID
   - Multi-tenant Fields: BranchCode, OrganisationCode
   - Related Tables: SalesDetails, LoyaltyPoints

6. **GiftCard** - Gift card management
   - Primary Key: CardID
   - Multi-tenant Fields: BranchCode
   - Related Tables: SalesDetailsGifts

7. **SalesDetailsGifts** - Gift card transactions
   - Primary Key: RefNo
   - Multi-tenant Fields: BranchCode
   - Related Tables: GiftCard, SalesDetails

**Dependencies:**
- RetailItems is central to all sales operations
- Customer links to multiple transaction tables
- GiftCard has special handling for payment processing

---

## 2. Multi-Tenant Architecture Analysis

### 2.1 Tenant Scoping Pattern

**Current Implementation:**
- All entities include `Branchcode` or `BranchCode` column (inconsistent naming)
- Most entities include `OrganisationCode` column
- Some entities use `EntryID` to track the creating user

**Inconsistencies Identified:**
1. Field naming: `Branchcode` vs `BranchCode` vs `branchcode`
2. Field naming: `OrganisationCode` vs `OrganizationCode`
3. Some entities missing tenant fields
4. No standardized base class for tenant entities

### 2.2 Recommended Tenant Base Class

```csharp
public abstract class TenantEntity
{
    [Column("OrganisationCode")]
    [MaxLength(50)]
    public string OrganisationCode { get; set; } = string.Empty;
    
    [Column("BranchCode")]
    [MaxLength(50)]
    public string BranchCode { get; set; } = string.Empty;
    
    [Column("CreatedBy")]
    [MaxLength(50)]
    public string? CreatedBy { get; set; }
    
    [Column("CreatedDate")]
    public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
    
    [Column("ModifiedBy")]
    [MaxLength(50)]
    public string? ModifiedBy { get; set; }
    
    [Column("ModifiedDate")]
    public DateTime? ModifiedDate { get; set; }
}
```

---

## 3. Entity Categorization

### 3.1 Accounting Domain (25 entities)
- AccountsCreation
- AccountsLedger
- ChartOfAccounts
- JournalEntry
- TrialBalance
- BankReconciliation
- FinancialStatement
- GeneralLedger
- SubLedger
- CostCenter
- [15 more entities to be documented]

### 3.2 Sales Domain (30 entities)
- SalesDetails
- SalesDetailsTemp
- SalesDetailsGifts
- CashSalesPending
- SalesReturn
- SalesInvoice
- SalesOrder
- Quotation
- [22 more entities to be documented]

### 3.3 Inventory Domain (20 entities)
- RetailItems
- Product
- StockMovement
- StockAdjustment
- Warehouse
- StockLocation
- [14 more entities to be documented]

### 3.4 Customer Domain (10 entities)
- Customer
- CustomerAccount
- LoyaltyPoints
- CustomerAddress
- CustomerContact
- [5 more entities to be documented]

### 3.5 Payment Domain (8 entities)
- GiftCard
- PaymentMethod
- PaymentTransaction
- CardTransaction
- MobileMoneyTransaction
- [3 more entities to be documented]

### 3.6 Core Domain (15 entities)
- Organization
- Branch
- User
- Role
- Permission
- Settings
- Configuration
- [8 more entities to be documented]

---

## 4. Dependency Graph

### 4.1 High-Level Dependencies

```
Organization (Root)
├── Branch
│   ├── User
│   ├── Customer
│   ├── RetailItems
│   └── AccountsLedger
├── ChartOfAccounts
└── Settings

Customer
├── SalesDetails
├── SalesDetailsTemp
├── LoyaltyPoints
└── CustomerAccount

RetailItems
├── SalesDetails
├── SalesDetailsTemp
├── StockMovement
└── StockAdjustment

GiftCard
└── SalesDetailsGifts

AccountsLedger
├── JournalEntry
├── TrialBalance
└── FinancialStatement
```

### 4.2 Circular Dependencies (to be resolved)
- None identified yet (requires deeper analysis)

---

## 5. Migration Strategy

### 5.1 Migration Order (from least to most dependent)

**Phase 1 - Core Entities (No dependencies):**
1. Organization
2. Branch
3. User
4. Role
5. Permission

**Phase 2 - Master Data:**
1. ChartOfAccounts
2. PaymentMethod
3. Customer
4. Product/RetailItems

**Phase 3 - Transactional Data:**
1. AccountsLedger
2. StockMovement
3. SalesDetails
4. GiftCard

**Phase 4 - Dependent Transactions:**
1. SalesDetailsTemp
2. SalesDetailsGifts
3. CashSalesPending
4. JournalEntry

**Phase 5 - Reports & Analytics:**
1. TrialBalance
2. FinancialStatement
3. SalesReport
4. InventoryReport

### 5.2 Backward Compatibility Strategy

**Approach: Parallel Run**
1. Keep existing bundle files during migration
2. Create new individual model files
3. Update DbContext to use new models
4. Run side-by-side for 1 sprint
5. Validate data consistency
6. Remove bundle files after validation

---

## 6. Risks and Mitigation

### 6.1 High Risks

**Risk 1: Breaking Changes in DbContext**
- Impact: High
- Probability: Medium
- Mitigation: Create comprehensive unit tests before refactoring

**Risk 2: Entity Framework Migration Conflicts**
- Impact: High
- Probability: High
- Mitigation: Use careful migration naming and ordering

**Risk 3: Tenant Data Leakage**
- Impact: Critical
- Probability: Low
- Mitigation: Implement global query filters on all tenant entities

**Risk 4: Performance Degradation**
- Impact: Medium
- Probability: Low
- Mitigation: Performance testing before and after refactoring

### 6.2 Medium Risks

**Risk 5: Developer Confusion**
- Impact: Medium
- Probability: Medium
- Mitigation: Comprehensive documentation and team training

**Risk 6: Merge Conflicts**
- Impact: Medium
- Probability: High
- Mitigation: Coordinate with team, avoid parallel work on models

---

## 7. Testing Strategy

### 7.1 Test Coverage Requirements
- Unit Tests: 100% for all new services
- Integration Tests: All CRUD operations per entity
- Performance Tests: Query performance benchmarks
- Security Tests: Tenant isolation validation

### 7.2 Test Scenarios

**Tenant Isolation Tests:**
1. Verify Branch A cannot access Branch B data
2. Verify Organization filtering works correctly
3. Verify Super Admin can access all data

**Data Integrity Tests:**
1. Foreign key constraints maintained
2. Cascade deletes work correctly
3. Audit fields populated automatically

**Performance Tests:**
1. Query response times < 200ms
2. Bulk operations complete within acceptable time
3. No N+1 query issues

---

## 8. Rollback Plan

### 8.1 Rollback Triggers
- > 5% performance degradation
- > 2 critical bugs in production
- Data inconsistency detected
- Failed integration tests

### 8.2 Rollback Procedure (< 1 hour)

1. **Database Rollback:**
   ```sql
   -- Revert to last known good migration
   dotnet ef database update <previous-migration-name>
   ```

2. **Code Rollback:**
   ```bash
   git revert <commit-range>
   git push origin main
   ```

3. **Verification:**
   - Run smoke tests
   - Verify data integrity
   - Check application functionality

---

## 9. Next Steps (Phase 2)

### 9.1 Base Infrastructure Implementation

**Tasks:**
1. Create base `TenantEntity` class
2. Create base `AuditableEntity` class
3. Implement `ITenantService` interface
4. Create directory structure
5. Set up AutoMapper profiles

**Estimated Time:** 2-3 hours

### 9.2 Success Criteria
- [ ] All entities documented
- [ ] Dependency graph complete
- [ ] Migration order defined
- [ ] Test strategy documented
- [ ] Team review completed

---

## 10. Detailed Entity Documentation

### 10.1 AccountsCreation

**Purpose:** Account setup and configuration  
**Category:** Accounting  
**Dependencies:** None (master data)

**Fields:**
- Refno (PK) - decimal(18,0)
- AccountGroup - nvarchar(50)
- AccountName - nvarchar(50)
- AccountNr - nvarchar(50)
- OpeningBalance - money
- Nature - nvarchar(50)
- CreditLimit - decimal(18,2)
- Narration - nvarchar(500)
- Branchcode - nvarchar(50) [Tenant Field]
- EntryID - nvarchar(50)
- EntryDate - nvarchar(50)

**Multi-Tenant:** Yes  
**Audit Tracking:** Yes  
**Migration Priority:** High (master data)

**Recommended Changes:**
1. Rename `Branchcode` → `BranchCode` for consistency
2. Add `OrganisationCode` field
3. Change `EntryDate` from string to DateTime
4. Add `CreatedBy`, `ModifiedBy`, `ModifiedDate` audit fields
5. Implement `TenantEntity` base class

---

## Appendix A: Code Examples

### Example 1: Refactored Entity with Tenant Support

```csharp
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Accounting
{
    [Table("Accounts_Creation")]
    public class AccountsCreation : TenantEntity
    {
        [Key]
        [Column("Refno")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public decimal Refno { get; set; }

        [Column("AccountGroup")]
        [MaxLength(50)]
        [Required]
        public string AccountGroup { get; set; } = string.Empty;

        [Column("AccountName")]
        [MaxLength(50)]
        [Required]
        public string AccountName { get; set; } = string.Empty;

        [Column("AccountNr")]
        [MaxLength(50)]
        [Required]
        public string AccountNr { get; set; } = string.Empty;

        [Column("OpeningBalance", TypeName = "money")]
        public decimal? OpeningBalance { get; set; }

        [Column("Nature")]
        [MaxLength(50)]
        public string? Nature { get; set; }

        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        [Column("Narration")]
        [MaxLength(500)]
        public string? Narration { get; set; }
    }
}
```

---

## Document Change Log

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2025-12-11 | 1.0 | Initial analysis document created | GitHub Copilot |
| TBD | 1.1 | Complete entity inventory | TBD |
| TBD | 2.0 | Final review and approval | TBD |
