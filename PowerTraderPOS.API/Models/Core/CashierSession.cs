using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a cash register session for a cashier/user
    /// </summary>
    [Table("session_creation")]
    [Index(nameof(UserId), nameof(SessionStart), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_CashierSession_User_Date_Tenant")]
    public class CashierSession : TenantEntity
    {
        /// <summary>
        /// Unique session identifier
        /// </summary>
        [Key]
        [Column("session_id")]
        public int SessionId { get; set; }

        /// <summary>
        /// Reference to the user/cashier
        /// </summary>
        [Column("user_id")]
        [Required]
        public int UserId { get; set; }

        /// <summary>
        /// Session start date and time
        /// </summary>
        [Column("session_start")]
        [Required]
        public DateTime SessionStart { get; set; }

        /// <summary>
        /// Session end date and time
        /// </summary>
        [Column("session_end")]
        public DateTime? SessionEnd { get; set; }

        /// <summary>
        /// Cash balance at session start
        /// </summary>
        [Column("opening_balance")]
        [Precision(18, 2)]
        public decimal? OpeningBalance { get; set; }

        /// <summary>
        /// Cash balance at session end
        /// </summary>
        [Column("closing_balance")]
        [Precision(18, 2)]
        public decimal? ClosingBalance { get; set; }

        /// <summary>
        /// Session status (Open, Closed, Suspended)
        /// </summary>
        [Column("status")]
        [MaxLength(50)]
        [Required]
        public string Status { get; set; } = "Open";

        // Navigation properties can be added here
        // public virtual SystemUser User { get; set; }
    }
}
