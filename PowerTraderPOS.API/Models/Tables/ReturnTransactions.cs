using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    /// <summary>
    /// Represents a product return transaction in the retail system
    /// </summary>
    [Table("ReturnTransactions")]
    public class ReturnTransactions
    {
        /// <summary>
        /// Unique identifier for the return transaction
        /// </summary>
        [Key]
        public int ReturnId { get; set; }

        /// <summary>
        /// Reference to the original invoice/sale
        /// </summary>
        [Required]
        [StringLength(100)]
        public string OriginalInvoiceNr { get; set; } = string.Empty;

        /// <summary>
        /// Product identifier being returned
        /// </summary>
        [Required]
        [StringLength(50)]
        public string ProductId { get; set; } = string.Empty;

        /// <summary>
        /// Name of the product being returned
        /// </summary>
        [Required]
        [StringLength(200)]
        public string ProductName { get; set; } = string.Empty;

        /// <summary>
        /// Quantity of items being returned
        /// </summary>
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal Quantity { get; set; }

        /// <summary>
        /// Reason for the return
        /// </summary>
        [Required]
        [StringLength(200)]
        public string ReturnReason { get; set; } = string.Empty;

        /// <summary>
        /// Date when the return was initiated
        /// </summary>
        [Required]
        public DateTime ReturnDate { get; set; }

        /// <summary>
        /// Amount to be refunded
        /// </summary>
        [Required]
        [Column(TypeName = "decimal(18,2)")]
        public decimal RefundAmount { get; set; }

        /// <summary>
        /// Method of refund (Cash, Card, Gift Card, Store Credit)
        /// </summary>
        [StringLength(50)]
        public string? RefundMethod { get; set; }

        /// <summary>
        /// Reference number for the refund transaction
        /// </summary>
        [StringLength(100)]
        public string? RefundReference { get; set; }

        /// <summary>
        /// Status of the return (Pending, Approved, Rejected, Completed)
        /// </summary>
        [Required]
        [StringLength(20)]
        public string Status { get; set; } = "Pending";

        /// <summary>
        /// User who processed/created the return
        /// </summary>
        [StringLength(50)]
        public string? ProcessedBy { get; set; }

        /// <summary>
        /// User who approved the return
        /// </summary>
        [StringLength(50)]
        public string? ApprovedBy { get; set; }

        /// <summary>
        /// Date when the return was approved
        /// </summary>
        public DateTime? ApprovalDate { get; set; }

        /// <summary>
        /// Reason for rejection if applicable
        /// </summary>
        [StringLength(500)]
        public string? RejectionReason { get; set; }

        /// <summary>
        /// Date when the return was completed
        /// </summary>
        public DateTime? CompletionDate { get; set; }

        /// <summary>
        /// Customer identifier
        /// </summary>
        [StringLength(50)]
        public string? CustomerId { get; set; }

        /// <summary>
        /// Customer name
        /// </summary>
        [StringLength(200)]
        public string? CustomerName { get; set; }

        /// <summary>
        /// Additional notes about the return
        /// </summary>
        [StringLength(500)]
        public string? Notes { get; set; }

        /// <summary>
        /// Record creation date
        /// </summary>
        [Required]
        public DateTime CreatedDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Record last modification date
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Organisation code for multi-tenant isolation
        /// </summary>
        [Required]
        [StringLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        /// <summary>
        /// Branch code for multi-tenant isolation
        /// </summary>
        [Required]
        [StringLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
