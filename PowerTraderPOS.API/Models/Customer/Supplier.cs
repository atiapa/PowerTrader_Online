using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Customer
{
    /// <summary>
    /// Represents a supplier/vendor in the system.
    /// Manages supplier information, contact details, and active status.
    /// Multi-tenant entity scoped to OrganisationCode and BranchCode.
    /// </summary>
    [Table("suppliers")]
    [Index(nameof(SupplierName), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Supplier_Name_Tenant")]
    [Index(nameof(SupplierEmail), Name = "IX_Supplier_Email")]
    [Index(nameof(SupplierPhone), Name = "IX_Supplier_Phone")]
    public class Supplier : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the supplier record (Primary Key)
        /// </summary>
        [Key]
        [Column("supplier_id")]
        public int SupplierId { get; set; }

        /// <summary>
        /// Name of the supplier company or individual
        /// </summary>
        [Column("supplier_name")]
        [MaxLength(200)]
        [Required]
        public string SupplierName { get; set; } = string.Empty;

        /// <summary>
        /// Supplier contact phone number
        /// </summary>
        [Column("supplier_phone")]
        [MaxLength(50)]
        [Phone]
        public string? SupplierPhone { get; set; }

        /// <summary>
        /// Supplier contact email address
        /// </summary>
        [Column("supplier_email")]
        [MaxLength(100)]
        [EmailAddress]
        public string? SupplierEmail { get; set; }

        /// <summary>
        /// Supplier physical address
        /// </summary>
        [Column("supplier_address")]
        [MaxLength(500)]
        public string? SupplierAddress { get; set; }

        /// <summary>
        /// Indicates whether the supplier is currently active
        /// </summary>
        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
