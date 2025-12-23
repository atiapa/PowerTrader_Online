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
            Func<TEntity, TDto>? selector = null)
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

            var results = await query.ToListAsync();

            // Apply selector if provided
            if (selector != null)
            {
                return results.Select(selector).ToList();
            }

            return (IEnumerable<TDto>)(object)results;
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
            
            // Check if entity has tenant properties
            var entityType = typeof(TEntity);
            var orgProperty = entityType.GetProperty("OrganisationCode");
            var branchProperty = entityType.GetProperty("Branchcode");

            if (orgProperty == null || branchProperty == null)
            {
                // Entity doesn't have tenant properties, return true (no filtering)
                return e => true;
            }

            // OrganisationCode == orgCode
            var orgPropExpr = Expression.Property(parameter, orgProperty);
            var orgValue = Expression.Constant(orgCode, typeof(string));
            var orgEquals = Expression.Equal(orgPropExpr, orgValue);

            // If user is admin, they can see all branches in their organisation
            if (_userContext.IsAdmin())
            {
                return Expression.Lambda<Func<TEntity, bool>>(orgEquals, parameter);
            }

            // Branchcode == branchCode
            var branchPropExpr = Expression.Property(parameter, branchProperty);
            var branchValue = Expression.Constant(branchCode, typeof(string));
            var branchEquals = Expression.Equal(branchPropExpr, branchValue);

            // Combine: OrganisationCode == orgCode AND Branchcode == branchCode
            var combined = Expression.AndAlso(orgEquals, branchEquals);

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

            orgProperty?.SetValue(entity, orgCode);
            branchProperty?.SetValue(entity, branchCode);
        }
    }
}
