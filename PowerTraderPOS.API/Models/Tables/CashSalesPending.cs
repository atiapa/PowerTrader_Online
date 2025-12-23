using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    /// <summary>
    /// Represents a held/pending sales order in the retail POS system.
    /// Allows cashiers to hold orders and retrieve them later when customers are ready to complete payment.
    /// </summary>
    [Table("Cash_Sales_Pending")]
    public class CashSalesPending
    {
        /// <summary>
        /// Primary key for the pending sale
        /// </summary>
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PendingId { get; set; }

        /// <summary>
        /// Unique reference number for the held order (e.g., HOLD123456789)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string HoldReference { get; set; } = string.Empty;

        /// <summary>
        /// Customer ID associated with the order
        /// </summary>
        [MaxLength(50)]
        public string? CustomerId { get; set; }

        /// <summary>
        /// Customer name
        /// </summary>
        [MaxLength(200)]
        public string? CustomerName { get; set; }

        /// <summary>
        /// Total amount of the order
        /// </summary>
        [Column(TypeName = "decimal(18,2)")]
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// JSON string containing the cart items
        /// </summary>
        [Required]
        public string Items { get; set; } = string.Empty;

        /// <summary>
        /// User ID of the cashier who held the order
        /// </summary>
        [MaxLength(50)]
        public string? CashierUserId { get; set; }

        /// <summary>
        /// Name of the cashier who held the order
        /// </summary>
        [MaxLength(100)]
        public string? CashierName { get; set; }

        /// <summary>
        /// Date and time when the order was held
        /// </summary>
        [Required]
        public DateTime HoldDateTime { get; set; }

        /// <summary>
        /// Date and time when the order was retrieved (null if not yet retrieved)
        /// </summary>
        public DateTime? RetrievedDateTime { get; set; }

        /// <summary>
        /// Date and time when the order expires
        /// </summary>
        public DateTime? ExpiryDateTime { get; set; }

        /// <summary>
        /// Status of the pending sale (Pending, Retrieved, Cancelled, Expired)
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Pending";

        /// <summary>
        /// Optional notes about the held order
        /// </summary>
        [MaxLength(500)]
        public string? Notes { get; set; }

        /// <summary>
        /// Date and time when the record was created
        /// </summary>
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Date and time when the record was last modified
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Organisation code for multi-tenant data isolation
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        /// <summary>
        /// Branch code for multi-tenant data isolation
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
