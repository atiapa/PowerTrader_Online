using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a product category in the system.
    /// Categories are used to organize products for better navigation and reporting.
    /// Supports multi-tenant isolation.
    /// </summary>
    [Table("Categories")]
    [Index(nameof(CategoryName), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Category_Name_Tenant", IsUnique = true)]
    public class Category : TenantEntity
    {
        /// <summary>
        /// Primary key - Unique category identifier
        /// </summary>
        [Key]
        [Column("CategoryID")]
        public decimal CategoryID { get; set; }

        /// <summary>
        /// Category name - Required and unique per tenant
        /// </summary>
        [Required]
        [Column("CategoryName")]
        [MaxLength(255)]
        public string CategoryName { get; set; } = string.Empty;

        /// <summary>
        /// Description of the category
        /// </summary>
        [Column("Description")]
        [MaxLength(255)]
        public string? Description { get; set; }

        /// <summary>
        /// Button color for UI display (hex code or color name)
        /// </summary>
        [Column("buttoncolor")]
        [MaxLength(50)]
        public string? ButtonColor { get; set; }

        /// <summary>
        /// Font size for category display in UI
        /// </summary>
        [Column("fontsize")]
        [MaxLength(50)]
        public string? FontSize { get; set; }

        /// <summary>
        /// Legacy field - Use OrganisationName from organization reference
        /// </summary>
        [Obsolete("Use navigation property to Organisation entity instead")]
        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Legacy field - Use BranchCode from base class instead
        /// </summary>
        [Obsolete("Use BranchCode property from TenantEntity base class instead")]
        [Column("branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        /// <summary>
        /// Legacy field - Use BranchName from branch reference
        /// </summary>
        [Obsolete("Use navigation property to Branch entity instead")]
        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }
}
