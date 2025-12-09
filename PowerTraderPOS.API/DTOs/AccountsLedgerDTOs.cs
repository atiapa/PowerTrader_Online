using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    /// <summary>
    /// DTO for reading accounts ledger entries
    /// </summary>
    public class AccountsLedgerDto
    {
        public int LedgerId { get; set; }
        public DateTime TransactionDate { get; set; }
        public string AccountCode { get; set; } = string.Empty;
        public string AccountName { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
        public decimal DebitAmount { get; set; }
        public decimal CreditAmount { get; set; }
        public string? Description { get; set; }
        public string? ReferenceNumber { get; set; }
        public string? EnteredBy { get; set; }
        public DateTime EntryDate { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for creating manual journal entries
    /// </summary>
    public class CreateJournalEntryDto
    {
        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string AccountCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string AccountName { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string AccountType { get; set; } = string.Empty;

        public decimal DebitAmount { get; set; }
        public decimal CreditAmount { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(100)]
        public string? ReferenceNumber { get; set; }
    }

    /// <summary>
    /// DTO for posting sale transactions
    /// </summary>
    public class PostSaleTransactionDto
    {
        [Required]
        public string InvoiceNumber { get; set; } = string.Empty;

        public DateTime SaleDate { get; set; }
        public decimal TotalAmount { get; set; }
        public decimal TotalCost { get; set; }

        [Required]
        public string PaymentMethod { get; set; } = string.Empty; // Cash, Card, Mobile, etc.
    }

    /// <summary>
    /// DTO for posting return transactions
    /// </summary>
    public class PostReturnTransactionDto
    {
        [Required]
        public string ReturnReference { get; set; } = string.Empty;

        public DateTime ReturnDate { get; set; }
        public decimal RefundAmount { get; set; }
        public decimal CostAmount { get; set; }

        [Required]
        public string RefundMethod { get; set; } = string.Empty;
    }

    /// <summary>
    /// DTO for trial balance entry
    /// </summary>
    public class TrialBalanceEntryDto
    {
        public string AccountCode { get; set; } = string.Empty;
        public string AccountName { get; set; } = string.Empty;
        public string AccountType { get; set; } = string.Empty;
        public decimal DebitBalance { get; set; }
        public decimal CreditBalance { get; set; }
    }

    /// <summary>
    /// DTO for trial balance report
    /// </summary>
    public class TrialBalanceDto
    {
        public List<TrialBalanceEntryDto> Entries { get; set; } = new();
        public decimal TotalDebits { get; set; }
        public decimal TotalCredits { get; set; }
        public bool IsBalanced => TotalDebits == TotalCredits;
    }

    /// <summary>
    /// DTO for financial report
    /// </summary>
    public class FinancialReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        // Income Statement
        public decimal TotalRevenue { get; set; }
        public decimal TotalExpenses { get; set; }
        public decimal NetIncome => TotalRevenue - TotalExpenses;

        // Balance Sheet
        public decimal TotalAssets { get; set; }
        public decimal TotalLiabilities { get; set; }
        public decimal TotalEquity { get; set; }
    }
}
