using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Payment
{
    /// <summary>
    /// Represents a payment voucher or payment record
    /// </summary>
    [Table("payment_voucher")]
    [Index(nameof(VoucherNo), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_PaymentRecord_VoucherNo_Tenant", IsUnique = true)]
    [Index(nameof(VoucherDate), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_PaymentRecord_Date_Tenant")]
    public class PaymentRecord : TenantEntity
    {
        /// <summary>
        /// Unique payment voucher identifier
        /// </summary>
        [Key]
        [Column("voucher_id")]
        public int VoucherId { get; set; }

        /// <summary>
        /// Unique voucher number per tenant
        /// </summary>
        [Column("voucher_no")]
        [MaxLength(50)]
        [Required]
        public string VoucherNo { get; set; } = string.Empty;

        /// <summary>
        /// Payment date
        /// </summary>
        [Column("voucher_date")]
        [Required]
        public DateTime VoucherDate { get; set; }

        /// <summary>
        /// Payment amount
        /// </summary>
        [Column("amount")]
        [Precision(18, 2)]
        [Required]
        public decimal Amount { get; set; }

        /// <summary>
        /// Payment method (Cash, Card, Mobile Money, Bank Transfer)
        /// </summary>
        [Column("payment_method")]
        [MaxLength(50)]
        [Required]
        public string PaymentMethod { get; set; } = string.Empty;

        /// <summary>
        /// Payment description or notes
        /// </summary>
        [Column("description")]
        [MaxLength(500)]
        public string? Description { get; set; }

        /// <summary>
        /// Reference to the user who created the payment
        /// </summary>
        [Column("user_id")]
        public int? UserId { get; set; }

        // Navigation properties can be added here
        // public virtual SystemUser User { get; set; }
    }
}
