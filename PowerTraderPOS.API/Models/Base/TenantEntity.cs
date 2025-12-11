using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Base
{
    /// <summary>
    /// Base class for all entities that require multi-tenant support.
    /// Provides automatic tenant scoping through OrganisationCode and BranchCode.
    /// </summary>
    public abstract class TenantEntity : AuditableEntity
    {
        /// <summary>
        /// Organisation identifier for multi-tenant data isolation.
        /// This field is required and automatically filtered in queries.
        /// </summary>
        [Column("OrganisationCode")]
        [MaxLength(50)]
        [Required]
        public string OrganisationCode { get; set; } = string.Empty;

        /// <summary>
        /// Branch identifier for multi-tenant data isolation.
        /// This field is required and automatically filtered in queries.
        /// </summary>
        [Column("BranchCode")]
        [MaxLength(50)]
        [Required]
        public string BranchCode { get; set; } = string.Empty;
    }
}
