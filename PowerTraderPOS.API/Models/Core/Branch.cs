using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a branch/location within an organization in the multi-tenant system.
    /// Each organization can have multiple branches for different geographical locations.
    /// </summary>
    [Table("Branches")]
    [Index(nameof(Branchcode), nameof(OrganisationCode), Name = "IX_Branch_Code_Tenant", IsUnique = true)]
    public class Branch : TenantEntity
    {
        /// <summary>
        /// Primary key - Unique reference number for the branch
        /// </summary>
        [Key]
        [Column("RefNo")]
        public decimal RefNo { get; set; }

        /// <summary>
        /// Branch name - Required for identification
        /// </summary>
        [Required]
        [Column("BranchName")]
        [MaxLength(50)]
        public string BranchName { get; set; } = string.Empty;

        /// <summary>
        /// Legacy field - Use BranchCode from base class instead
        /// </summary>
        [Obsolete("Use BranchCode property from TenantEntity base class instead")]
        [Column("branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        /// <summary>
        /// Legacy field - Use OrganisationName from organization reference
        /// </summary>
        [Obsolete("Use navigation property to Organisation entity instead")]
        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Postal/Mailing address for the branch
        /// </summary>
        [Column("PostalAddress")]
        [MaxLength(200)]
        public string? PostalAddress { get; set; }

        /// <summary>
        /// Physical location/street address
        /// </summary>
        [Column("PhysicalLocation")]
        [MaxLength(200)]
        public string? PhysicalLocation { get; set; }

        /// <summary>
        /// City where the branch is located
        /// </summary>
        [Column("City")]
        [MaxLength(200)]
        public string? City { get; set; }

        /// <summary>
        /// Region or State
        /// </summary>
        [Column("RegionOrState")]
        [MaxLength(200)]
        public string? RegionOrState { get; set; }

        /// <summary>
        /// Country where the branch is located
        /// </summary>
        [Column("Country")]
        [MaxLength(200)]
        public string? Country { get; set; }

        /// <summary>
        /// Office phone number
        /// </summary>
        [Column("OfficePhone")]
        [MaxLength(200)]
        [Phone]
        public string? OfficePhone { get; set; }

        /// <summary>
        /// Mobile/Cell phone number
        /// </summary>
        [Column("CellPhone")]
        [MaxLength(200)]
        [Phone]
        public string? CellPhone { get; set; }

        /// <summary>
        /// Fax number
        /// </summary>
        [Column("Fax")]
        [MaxLength(200)]
        public string? Fax { get; set; }

        /// <summary>
        /// Email address for the branch
        /// </summary>
        [Column("Email")]
        [MaxLength(200)]
        [EmailAddress]
        public string? Email { get; set; }

        /// <summary>
        /// Website URL for the branch
        /// </summary>
        [Column("Website")]
        [MaxLength(200)]
        [Url]
        public string? Website { get; set; }

        /// <summary>
        /// Additional remarks or notes about the branch
        /// </summary>
        [Column("Remarks")]
        [MaxLength(200)]
        public string? Remarks { get; set; }

        /// <summary>
        /// Tax Identification Number for the branch
        /// </summary>
        [Column("TIN")]
        [MaxLength(50)]
        public string? TIN { get; set; }
    }
}
