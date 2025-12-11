using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Data
{
    /// <summary>
    /// Configuration for applying tenant-based global query filters to all TenantEntity types.
    /// This ensures automatic filtering by OrganisationCode and BranchCode for all queries.
    /// </summary>
    public static class TenantQueryFilterConfiguration
    {
        /// <summary>
        /// Applies global query filters to all entities that inherit from TenantEntity.
        /// Filters are bypassed for Super Admins and Platform Managers.
        /// </summary>
        /// <param name="modelBuilder">The model builder instance</param>
        /// <param name="tenantService">Service for retrieving tenant context</param>
        public static void ApplyTenantFilters(this ModelBuilder modelBuilder, ITenantService tenantService)
        {
            // Get all entity types that inherit from TenantEntity
            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                if (typeof(TenantEntity).IsAssignableFrom(entityType.ClrType))
                {
                    // Create the filter expression: 
                    // entity => (tenantService.IsSuperAdmin() || tenantService.IsPlatformManager()) ||
                    //           (entity.OrganisationCode == tenantService.GetOrganisationCode() &&
                    //            entity.BranchCode == tenantService.GetBranchCode())
                    
                    var parameter = System.Linq.Expressions.Expression.Parameter(entityType.ClrType, "entity");
                    
                    // Get tenant context
                    var isSuperAdmin = tenantService.IsSuperAdmin();
                    var isPlatformManager = tenantService.IsPlatformManager();
                    var organisationCode = tenantService.GetOrganisationCode();
                    var branchCode = tenantService.GetBranchCode();
                    
                    // Skip filter for Super Admins and Platform Managers
                    if (isSuperAdmin || isPlatformManager)
                    {
                        continue;
                    }
                    
                    // Skip if no tenant context (e.g., not authenticated)
                    if (string.IsNullOrEmpty(organisationCode) || string.IsNullOrEmpty(branchCode))
                    {
                        continue;
                    }
                    
                    // Build filter: entity.OrganisationCode == organisationCode
                    var organisationProperty = System.Linq.Expressions.Expression.Property(parameter, "OrganisationCode");
                    var organisationConstant = System.Linq.Expressions.Expression.Constant(organisationCode);
                    var organisationEquals = System.Linq.Expressions.Expression.Equal(organisationProperty, organisationConstant);
                    
                    // Build filter: entity.BranchCode == branchCode
                    var branchProperty = System.Linq.Expressions.Expression.Property(parameter, "BranchCode");
                    var branchConstant = System.Linq.Expressions.Expression.Constant(branchCode);
                    var branchEquals = System.Linq.Expressions.Expression.Equal(branchProperty, branchConstant);
                    
                    // Combine: OrganisationCode == X AND BranchCode == Y
                    var combinedFilter = System.Linq.Expressions.Expression.AndAlso(organisationEquals, branchEquals);
                    
                    // Create lambda expression
                    var lambda = System.Linq.Expressions.Expression.Lambda(combinedFilter, parameter);
                    
                    // Apply the filter
                    modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
                }
            }
        }
        
        /// <summary>
        /// Alternative method to manually apply filters to specific entity types.
        /// Use this when you need more control over filtering logic.
        /// </summary>
        public static void ApplyTenantFilter<TEntity>(this ModelBuilder modelBuilder, ITenantService tenantService)
            where TEntity : TenantEntity
        {
            var isSuperAdmin = tenantService.IsSuperAdmin();
            var isPlatformManager = tenantService.IsPlatformManager();
            
            // Skip filter for privileged users
            if (isSuperAdmin || isPlatformManager)
            {
                return;
            }
            
            var organisationCode = tenantService.GetOrganisationCode();
            var branchCode = tenantService.GetBranchCode();
            
            // Only apply filter if we have tenant context
            if (!string.IsNullOrEmpty(organisationCode) && !string.IsNullOrEmpty(branchCode))
            {
                modelBuilder.Entity<TEntity>().HasQueryFilter(e =>
                    e.OrganisationCode == organisationCode &&
                    e.BranchCode == branchCode);
            }
        }
    }
}
