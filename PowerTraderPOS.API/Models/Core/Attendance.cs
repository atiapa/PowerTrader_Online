using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Staff attendance tracking system
    /// Records staff check-in/check-out times and attendance metrics
    /// </summary>
    [Table("Attendance_Tbl")]
    [Index(nameof(StaffId), nameof(Date), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Attendance_Staff_Date_Tenant", IsUnique = true)]
    public class Attendance : TenantEntity
    {
        /// <summary>
        /// Primary key for attendance record
        /// </summary>
        [Key]
        [Column("Refno")]
        public int Refno { get; set; }

        /// <summary>
        /// Staff member's unique ID
        /// </summary>
        [Required]
        [Column("StaffId")]
        [MaxLength(50)]
        public string StaffId { get; set; } = string.Empty;

        /// <summary>
        /// Staff member's full name
        /// </summary>
        [Column("Name")]
        [MaxLength(50)]
        public string? Name { get; set; }

        /// <summary>
        /// Staff member's barcode ID for scanning
        /// </summary>
        [Column("Barcode")]
        [MaxLength(50)]
        public string? Barcode { get; set; }

        /// <summary>
        /// Staff member's position/job title
        /// </summary>
        [Column("Position")]
        [MaxLength(50)]
        public string? Position { get; set; }

        /// <summary>
        /// Attendance date
        /// </summary>
        [Required]
        [Column("Date")]
        public DateTime Date { get; set; }

        /// <summary>
        /// Login/check-in time
        /// </summary>
        [Column("Login_Time")]
        public TimeSpan? LoginTime { get; set; }

        /// <summary>
        /// Logout/check-out time
        /// </summary>
        [Column("Logout_Time")]
        public TimeSpan? LogoutTime { get; set; }

        /// <summary>
        /// Login status indicator
        /// </summary>
        [Column("Logged")]
        [MaxLength(50)]
        public string? Logged { get; set; }

        /// <summary>
        /// Logout date (if different from login date)
        /// </summary>
        [Column("Logout_Date")]
        [MaxLength(50)]
        public string? LogoutDate { get; set; }

        /// <summary>
        /// Minutes late for attendance
        /// </summary>
        [Column("MinToLate")]
        [MaxLength(50)]
        public string? MinutesToLate { get; set; }

        /// <summary>
        /// Month of attendance (e.g., "January", "February")
        /// </summary>
        [Column("Month")]
        [MaxLength(50)]
        public string? Month { get; set; }

        /// <summary>
        /// Year of attendance
        /// </summary>
        [Column("Year")]
        [MaxLength(50)]
        public string? Year { get; set; }

        /// <summary>
        /// Posting status
        /// </summary>
        [Column("Post")]
        [MaxLength(50)]
        public string? Post { get; set; }

        /// <summary>
        /// Fingerprint template data
        /// </summary>
        [Column("FPTemplate")]
        [MaxLength(50)]
        public string? FingerprintTemplate { get; set; }

        // Legacy Fields - Use base class properties instead
        /// <summary>
        /// Legacy field - Use Branchcode from base TenantEntity
        /// </summary>
        [Obsolete("Use BranchCode property from base TenantEntity class")]
        [Column("Branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        /// <summary>
        /// Legacy field - Use OrganisationName lookup via OrganisationCode
        /// </summary>
        [Obsolete("Use OrganisationCode and lookup name from Organisation table")]
        [Column("OrganisationName")]
        [MaxLength(50)]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Legacy field - Use BranchName lookup via BranchCode
        /// </summary>
        [Obsolete("Use BranchCode and lookup name from Branch table")]
        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }
}
