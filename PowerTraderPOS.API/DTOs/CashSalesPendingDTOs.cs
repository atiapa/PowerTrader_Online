using System;
using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    /// <summary>
    /// DTO for reading cash sales pending information
    /// </summary>
    public class CashSalesPendingDto
    {
        public int PendingId { get; set; }
        public string HoldReference { get; set; } = string.Empty;
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public decimal TotalAmount { get; set; }
        public string Items { get; set; } = string.Empty;
        public string? CashierUserId { get; set; }
        public string? CashierName { get; set; }
        public DateTime HoldDateTime { get; set; }
        public DateTime? RetrievedDateTime { get; set; }
        public DateTime? ExpiryDateTime { get; set; }
        public string Status { get; set; } = "Pending";
        public string? Notes { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for creating a new pending sale (holding an order)
    /// </summary>
    public class CreateCashSalesPendingDto
    {
        [MaxLength(50)]
        public string? CustomerId { get; set; }

        [MaxLength(200)]
        public string? CustomerName { get; set; }

        [Required]
        [Range(0.01, double.MaxValue, ErrorMessage = "Total amount must be greater than 0")]
        public decimal TotalAmount { get; set; }

        /// <summary>
        /// JSON string containing the cart items
        /// </summary>
        [Required]
        public string Items { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Notes { get; set; }

        /// <summary>
        /// Number of hours until expiration (default: 24)
        /// </summary>
        [Range(1, 168, ErrorMessage = "Expiration hours must be between 1 and 168 (1 week)")]
        public int ExpiryHours { get; set; } = 24;
    }

    /// <summary>
    /// DTO for retrieving a pending sale
    /// </summary>
    public class RetrievePendingSaleDto
    {
        public int PendingId { get; set; }
        public string HoldReference { get; set; } = string.Empty;
        public string? CustomerId { get; set; }
        public string? CustomerName { get; set; }
        public decimal TotalAmount { get; set; }
        
        /// <summary>
        /// Deserialized cart items
        /// </summary>
        public string Items { get; set; } = string.Empty;
        
        public DateTime HoldDateTime { get; set; }
        public string? Notes { get; set; }
    }
}
