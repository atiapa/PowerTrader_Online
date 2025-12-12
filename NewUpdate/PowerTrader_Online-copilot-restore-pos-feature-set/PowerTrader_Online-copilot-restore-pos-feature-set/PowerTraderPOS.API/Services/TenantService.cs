using Microsoft.AspNetCore.Http;
using PowerTraderPOS.API.Services.Interfaces;
using System.Security.Claims;

namespace PowerTraderPOS.API.Services
{
    /// <summary>
    /// Service for retrieving current tenant context from HTTP context and JWT claims.
    /// Supports multi-tenant architecture with Organisation and Branch isolation.
    /// </summary>
    public class TenantService : ITenantService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public TenantService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        /// <summary>
        /// Gets the current user's Organisation Code from JWT claims.
        /// </summary>
        /// <returns>Organisation Code or null if not authenticated</returns>
        public string? GetOrganisationCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                return null;
            }

            // Try multiple claim types for flexibility
            return user.FindFirst("OrganisationCode")?.Value
                ?? user.FindFirst("organisationcode")?.Value
                ?? user.FindFirst("organization_code")?.Value
                ?? user.FindFirst(ClaimTypes.GroupSid)?.Value; // Fallback for custom implementations
        }

        /// <summary>
        /// Gets the current user's Branch Code from JWT claims.
        /// </summary>
        /// <returns>Branch Code or null if not authenticated</returns>
        public string? GetBranchCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                return null;
            }

            // Try multiple claim types for flexibility (handle case inconsistencies)
            return user.FindFirst("BranchCode")?.Value
                ?? user.FindFirst("branchcode")?.Value
                ?? user.FindFirst("Branchcode")?.Value
                ?? user.FindFirst("branch_code")?.Value
                ?? user.FindFirst(ClaimTypes.Locality)?.Value; // Fallback for custom implementations
        }

        /// <summary>
        /// Gets the current user's ID or username from JWT claims.
        /// </summary>
        /// <returns>User identifier or null if not authenticated</returns>
        public string? GetCurrentUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                return null;
            }

            // Try standard claim types first
            return user.FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? user.FindFirst(ClaimTypes.Name)?.Value
                ?? user.FindFirst("sub")?.Value
                ?? user.FindFirst("userId")?.Value
                ?? user.FindFirst("username")?.Value;
        }

        /// <summary>
        /// Checks if the current user is a Super Admin with access to all tenants.
        /// Super Admins can bypass tenant filtering.
        /// </summary>
        /// <returns>True if user is Super Admin, false otherwise</returns>
        public bool IsSuperAdmin()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                return false;
            }

            // Check for Super Admin role
            var role = user.FindFirst(ClaimTypes.Role)?.Value
                ?? user.FindFirst("role")?.Value;

            return role != null &&
                   (role.Equals("SuperAdmin", StringComparison.OrdinalIgnoreCase) ||
                    role.Equals("Super Admin", StringComparison.OrdinalIgnoreCase) ||
                    role.Equals("SystemAdmin", StringComparison.OrdinalIgnoreCase));
        }

        /// <summary>
        /// Checks if the current user is a Platform Manager with cross-tenant access.
        /// Platform Managers can view and manage multiple tenants but not all.
        /// </summary>
        /// <returns>True if user is Platform Manager, false otherwise</returns>
        public bool IsPlatformManager()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            if (user == null || !user.Identity?.IsAuthenticated == true)
            {
                return false;
            }

            // Check for Platform Manager role
            var role = user.FindFirst(ClaimTypes.Role)?.Value
                ?? user.FindFirst("role")?.Value;

            return role != null &&
                   (role.Equals("PlatformManager", StringComparison.OrdinalIgnoreCase) ||
                    role.Equals("Platform Manager", StringComparison.OrdinalIgnoreCase) ||
                    role.Equals("AppManager", StringComparison.OrdinalIgnoreCase));
        }
    }
}
