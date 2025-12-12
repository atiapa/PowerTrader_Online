// Multi-Tenant Service Update Script
// This file documents the pattern for updating all services to support multi-tenancy

/*
PATTERN FOR ALL SERVICES:

1. Import TenantContextService
   import { TenantContextService } from './tenant-context.service';

2. Inject in constructor
   constructor(
     private http: HttpClient,
     private tenantContext: TenantContextService
   ) { }

3. Add helper method
   private getTenantParams(): HttpParams {
     const tenant = this.tenantContext.getTenantParams();
     return new HttpParams()
       .set('organisationCode', tenant.organisationCode)
       .set('branchCode', tenant.branchCode);
   }

4. Update all GET methods to include tenant params
   getAll(): Observable<Entity[]> {
     return this.http.get<Entity[]>(this.apiUrl, { params: this.getTenantParams() });
   }

5. Update CREATE methods to add tenant info
   create(entity: Entity): Observable<Entity> {
     const entityWithTenant = this.tenantContext.addTenantInfo(entity);
     return this.http.post<Entity>(this.apiUrl, entityWithTenant);
   }

6. Update UPDATE methods to include tenant params
   update(id: number, entity: Entity): Observable<Entity> {
     const entityWithTenant = this.tenantContext.addTenantInfo(entity);
     return this.http.put<Entity>(`${this.apiUrl}/${id}`, entityWithTenant, { params: this.getTenantParams() });
   }

7. Update DELETE methods to include tenant params
   delete(id: number): Observable<void> {
     return this.http.delete<void>(`${this.apiUrl}/${id}`, { params: this.getTenantParams() });
   }

SERVICES TO UPDATE:
✅ products.service.ts - DONE
⚠️ customer.service.ts - NEEDS UPDATE
⚠️ supplier.service.ts - NEEDS UPDATE
⚠️ staff.service.ts - NEEDS UPDATE
⚠️ warehouse.service.ts - NEEDS UPDATE
⚠️ stock-master.service.ts - NEEDS UPDATE
⚠️ sales-details.service.ts - NEEDS UPDATE
⚠️ purchase-order.service.ts - NEEDS UPDATE
⚠️ payment-voucher.service.ts - NEEDS UPDATE
⚠️ receipt-voucher.service.ts - NEEDS UPDATE
⚠️ categories.service.ts - NEEDS UPDATE
⚠️ retail-items.service.ts - NEEDS UPDATE
⚠️ bank-accounts.service.ts - NEEDS UPDATE
⚠️ gift-card.service.ts - NEEDS UPDATE
⚠️ expenses.service.ts - NEEDS UPDATE
⚠️ retail-sales.service.ts - NEEDS UPDATE
⚠️ orders.service.ts - NEEDS UPDATE
⚠️ organisation.service.ts - NEEDS UPDATE
⚠️ account-group-master.service.ts - NEEDS UPDATE
⚠️ account-ledger.service.ts - NEEDS UPDATE
⚠️ accounts-creation.service.ts - NEEDS UPDATE
⚠️ atc.service.ts - NEEDS UPDATE
⚠️ open-balance.service.ts - NEEDS UPDATE
⚠️ order-reversed.service.ts - NEEDS UPDATE

BACKEND API REQUIREMENTS:
- All endpoints must accept organisationCode and branchCode as query parameters
- All database queries must filter by these parameters
- All INSERT/UPDATE operations must include these fields
- Example: GET /api/Products?organisationCode=ORG001&branchCode=BR001
- Example: POST /api/Products with body: { ...productData, organisationCode: "ORG001", branchCode: "BR001" }

DATABASE REQUIREMENTS:
- All tables must have OrganisationCode and BranchCode columns
- Add composite indexes on (OrganisationCode, BranchCode) for performance
- Use these fields in WHERE clauses for all queries
- Example: SELECT * FROM Products WHERE OrganisationCode = @OrgCode AND BranchCode = @BranchCode

SECURITY CONSIDERATIONS:
- Backend must validate tenant context from JWT token
- Never trust client-side tenant parameters alone
- User should only access data for their assigned org/branch
- Implement row-level security policies if using advanced database features
*/

export const MULTI_TENANT_IMPLEMENTATION_STATUS = {
  completed: ['products.service.ts', 'tenant-context.service.ts', 'auth.service.ts'],
  pending: [
    'customer.service.ts',
    'supplier.service.ts',
    'staff.service.ts',
    'warehouse.service.ts',
    'stock-master.service.ts',
    'sales-details.service.ts',
    'purchase-order.service.ts',
    'payment-voucher.service.ts',
    'receipt-voucher.service.ts',
    'categories.service.ts',
    'retail-items.service.ts',
    'bank-accounts.service.ts',
    'gift-card.service.ts',
    'expenses.service.ts',
    'retail-sales.service.ts',
    'orders.service.ts',
    'organisation.service.ts',
    'account-group-master.service.ts',
    'account-ledger.service.ts',
    'accounts-creation.service.ts',
    'atc.service.ts',
    'open-balance.service.ts',
    'order-reversed.service.ts'
  ]
};
