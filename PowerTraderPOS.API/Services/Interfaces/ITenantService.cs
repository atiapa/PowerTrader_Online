namespace PowerTraderPOS.API.Services.Interfaces
{
    /// <summary>
    /// Service interface for retrieving current tenant context.
    /// Implementations should extract tenant information from the current HTTP context,
    /// JWT claims, or other authentication mechanisms.
    /// </summary>
    public interface ITenantService
    {
        /// <summary>
        /// Gets the current user's Organisation Code.
        /// </summary>
        /// <returns>Organisation Code or null if not authenticated</returns>
        string? GetOrganisationCode();

        /// <summary>
        /// Gets the current user's Branch Code.
        /// </summary>
        /// <returns>Branch Code or null if not authenticated</returns>
        string? GetBranchCode();

        /// <summary>
        /// Gets the current user's ID or username.
        /// </summary>
        /// <returns>User identifier or null if not authenticated</returns>
        string? GetCurrentUserId();

        /// <summary>
        /// Checks if the current user is a Super Admin with access to all tenants.
        /// </summary>
        /// <returns>True if user is Super Admin, false otherwise</returns>
        bool IsSuperAdmin();

        /// <summary>
        /// Checks if the current user is a Platform Manager with cross-tenant access.
        /// </summary>
        /// <returns>True if user is Platform Manager, false otherwise</returns>
        bool IsPlatformManager();
    }
}
