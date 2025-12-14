using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a system user with authentication and authorization information.
    /// Users are scoped to an organization and branch for multi-tenant support.
    /// </summary>
    [Table("systemuserpro")]
    [Index(nameof(Username), nameof(OrganisationCode), nameof(BranchCode), 
           Name = "IX_SystemUser_Username_Tenant", IsUnique = true)]
    public class SystemUser : TenantEntity
    {
        /// <summary>
        /// Gets or sets the unique identifier for the system user.
        /// </summary>
        [Key]
        [Column("id")]
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the username for authentication.
        /// Must be unique within an organization/branch.
        /// </summary>
        [Required]
        [Column("username")]
        [MaxLength(100)]
        public string Username { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the hashed password for authentication.
        /// </summary>
        [Required]
        [Column("password")]
        [MaxLength(255)]
        public string Password { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the full name of the user.
        /// </summary>
        [Column("fullname")]
        [MaxLength(200)]
        public string? FullName { get; set; }

        /// <summary>
        /// Gets or sets the role of the user (e.g., Admin, Cashier, Manager).
        /// Used for role-based access control.
        /// </summary>
        [Column("user_role")]
        [MaxLength(50)]
        public string? UserRole { get; set; }

        /// <summary>
        /// Gets or sets whether the user account is active.
        /// Inactive users cannot log in.
        /// </summary>
        [Column("is_active")]
        public bool IsActive { get; set; } = true;

        /// <summary>
        /// Gets or sets the date when the user account was created.
        /// Note: This shadows the base CreatedDate from AuditableEntity.
        /// </summary>
        [Column("created_date")]
        public new DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Gets or sets the date and time of the user's last login.
        /// Used for auditing and security monitoring.
        /// </summary>
        [Column("last_login")]
        public DateTime? LastLogin { get; set; }
    }
}
