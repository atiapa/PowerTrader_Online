using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents staff member information for HR management.
    /// Staff records are tenant-scoped for multi-organization support.
    /// </summary>
    [Table("staff_information")]
    [Index(nameof(StaffName), nameof(OrganisationCode), nameof(BranchCode), 
           Name = "IX_Staff_Name_Tenant")]
    public class Staff : TenantEntity
    {
        /// <summary>
        /// Gets or sets the unique identifier for the staff member.
        /// </summary>
        [Key]
        [Column("staff_id")]
        public int StaffId { get; set; }

        /// <summary>
        /// Gets or sets the full name of the staff member.
        /// </summary>
        [Required]
        [Column("staff_name")]
        [MaxLength(200)]
        public string StaffName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the phone number of the staff member.
        /// </summary>
        [Column("staff_phone")]
        [MaxLength(50)]
        [Phone]
        public string? StaffPhone { get; set; }

        /// <summary>
        /// Gets or sets the email address of the staff member.
        /// </summary>
        [Column("staff_email")]
        [MaxLength(100)]
        [EmailAddress]
        public string? StaffEmail { get; set; }

        /// <summary>
        /// Gets or sets the role/position of the staff member.
        /// </summary>
        [Column("staff_role")]
        [MaxLength(50)]
        public string? StaffRole { get; set; }

        /// <summary>
        /// Gets or sets whether the staff member is currently active/employed.
        /// </summary>
        [Column("is_active")]
        public bool IsActive { get; set; } = true;
    }
}
