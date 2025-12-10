using System;
using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    /// <summary>
    /// DTO for reading return transaction data
    /// </summary>
    public class ReturnTransactionDto
    {
        public int ReturnId { get; set; }
        public string OriginalInvoiceNr { get; set; } = string.Empty;
        public string ProductId { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public decimal Quantity { get; set; }
        public string ReturnReason { get; set; } = string.Empty;
        public DateTime ReturnDate { get; set; }
        public decimal RefundAmount { get; set; }
        public string? RefundMethod { get; set; }
        public string? RefundReference { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? ProcessedBy { get; set; }
        public string? ApprovedBy { get; set; }
        public DateTime? ApprovalDate { get; set; }
        public string? RejectionReason { get; set; }
        public DateTime? CompletionDate { get; set; }
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for creating a new return transaction
    /// </summary>
    public class CreateReturnTransactionDto
    {
        [Required]
        [StringLength(100)]
        public string OriginalInvoiceNr { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        [StringLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Quantity must be greater than 0")]
        public decimal Quantity { get; set; }

        [Required]
        [StringLength(200)]
        public string ReturnReason { get; set; } = string.Empty;

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Refund amount must be greater than 0")]
        public decimal RefundAmount { get; set; }

        [StringLength(50)]
        public string? CustomerId { get; set; }

        [StringLength(200)]
        public string? CustomerName { get; set; }

        [StringLength(500)]
        public string? Notes { get; set; }
    }

    /// <summary>
    /// DTO for approving a return transaction
    /// </summary>
    public class ApproveReturnDto
    {
        [StringLength(500)]
        public string? ApprovalNotes { get; set; }
    }

    /// <summary>
    /// DTO for rejecting a return transaction
    /// </summary>
    public class RejectReturnDto
    {
        [Required]
        [StringLength(500)]
        public string RejectionReason { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for completing a return transaction with refund details
    /// </summary>
    public class CompleteReturnDto
    {
        [Required]
        [StringLength(50)]
        public string RefundMethod { get; set; } = string.Empty;

        [StringLength(100)]
        public string? RefundReference { get; set; }
    }

    /// <summary>
    /// DTO for return reports and statistics
    /// </summary>
    public class ReturnReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int TotalReturns { get; set; }
        public decimal TotalRefundAmount { get; set; }
        public int PendingReturns { get; set; }
        public int ApprovedReturns { get; set; }
        public int RejectedReturns { get; set; }
        public int CompletedReturns { get; set; }
        public decimal AverageRefundAmount { get; set; }
    }
}
