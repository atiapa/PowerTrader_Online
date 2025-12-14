using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Sales
{
    /// <summary>
    /// Represents a sales transaction in the system.
    /// Manages sales records, invoice numbers, payment details, and transaction status.
    /// Multi-tenant entity scoped to OrganisationCode and BranchCode.
    /// </summary>
    [Table("sales_details")]
    [Index(nameof(InvoiceNo), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Sale_Invoice_Tenant", IsUnique = true)]
    [Index(nameof(SaleDate), Name = "IX_Sale_Date")]
    [Index(nameof(CustomerId), Name = "IX_Sale_Customer")]
    [Index(nameof(UserId), Name = "IX_Sale_User")]
    [Index(nameof(SessionId), Name = "IX_Sale_Session")]
    public class SaleTransaction : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the sale transaction (Primary Key)
        /// </summary>
        [Key]
        [Column("sale_id")]
        public int SaleId { get; set; }

        /// <summary>
        /// Unique invoice number for this sale
        /// </summary>
        [Column("invoice_no")]
        [MaxLength(50)]
        [Required]
        public string InvoiceNo { get; set; } = string.Empty;

        /// <summary>
        /// Date and time when the sale was completed
        /// </summary>
        [Column("sale_date")]
        public DateTime? SaleDate { get; set; }

        /// <summary>
        /// Reference to the customer who made the purchase
        /// </summary>
        [Column("customer_id")]
        public int? CustomerId { get; set; }

        /// <summary>
        /// Total amount before tax and discounts
        /// </summary>
        [Column("total_amount")]
        [Precision(18, 2)]
        public decimal? TotalAmount { get; set; }

        /// <summary>
        /// Tax amount applied to this sale
        /// </summary>
        [Column("tax_amount")]
        [Precision(18, 2)]
        public decimal? TaxAmount { get; set; }

        /// <summary>
        /// Total discount amount applied to this sale
        /// </summary>
        [Column("discount_amount")]
        [Precision(18, 2)]
        public decimal? DiscountAmount { get; set; }

        /// <summary>
        /// Final net amount after tax and discounts
        /// </summary>
        [Column("net_amount")]
        [Precision(18, 2)]
        public decimal? NetAmount { get; set; }

        /// <summary>
        /// Payment method used (Cash, Card, Mobile Money, etc.)
        /// </summary>
        [Column("payment_method")]
        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        /// <summary>
        /// Reference to the user/cashier who processed this sale
        /// </summary>
        [Column("user_id")]
        public int? UserId { get; set; }

        /// <summary>
        /// Reference to the cash register session
        /// </summary>
        [Column("session_id")]
        public int? SessionId { get; set; }

        /// <summary>
        /// Transaction status (Completed, Pending, Cancelled, Refunded, etc.)
        /// </summary>
        [Column("status")]
        [MaxLength(50)]
        public string? Status { get; set; }
    }
}
