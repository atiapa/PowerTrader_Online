using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents organization/company information
    /// Note: This is configuration data - typically one per OrganisationCode
    /// </summary>
    [Table("organisation_information")]
    [Index(nameof(OrgName), nameof(OrganisationCode), Name = "IX_Organization_Name_OrgCode")]
    public class Organization : AuditableEntity
    {
        /// <summary>
        /// Unique organization identifier
        /// </summary>
        [Key]
        [Column("org_id")]
        public int OrgId { get; set; }

        /// <summary>
        /// Organization code (tenant identifier)
        /// </summary>
        [Column("organisation_code")]
        [MaxLength(50)]
        [Required]
        public string OrganisationCode { get; set; } = string.Empty;

        /// <summary>
        /// Organization name
        /// </summary>
        [Column("org_name")]
        [MaxLength(200)]
        [Required]
        public string OrgName { get; set; } = string.Empty;

        /// <summary>
        /// Organization address
        /// </summary>
        [Column("org_address")]
        [MaxLength(500)]
        public string? OrgAddress { get; set; }

        /// <summary>
        /// Organization phone number
        /// </summary>
        [Column("org_phone")]
        [MaxLength(50)]
        [Phone]
        public string? OrgPhone { get; set; }

        /// <summary>
        /// Organization email address
        /// </summary>
        [Column("org_email")]
        [MaxLength(100)]
        [EmailAddress]
        public string? OrgEmail { get; set; }

        /// <summary>
        /// Tax identification number
        /// </summary>
        [Column("tax_id")]
        [MaxLength(50)]
        public string? TaxId { get; set; }

        // Navigation properties can be added here
        // public virtual ICollection<Branch> Branches { get; set; }
    }
}
