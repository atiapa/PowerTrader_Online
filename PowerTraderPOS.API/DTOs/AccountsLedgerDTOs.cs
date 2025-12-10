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

    /// <summary>
    /// DTO for detailed profit & loss report with category breakdown
    /// </summary>
    public class ProfitAndLossReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        // Revenue breakdown
        public List<AccountCategoryDto> RevenueByCategory { get; set; } = new();
        public decimal TotalRevenue { get; set; }

        // Expense breakdown
        public List<AccountCategoryDto> ExpensesByCategory { get; set; } = new();
        public decimal TotalExpenses { get; set; }

        // Profitability
        public decimal GrossProfit { get; set; }
        public decimal NetProfit => TotalRevenue - TotalExpenses;
        public decimal ProfitMargin => TotalRevenue > 0 ? (NetProfit / TotalRevenue) * 100 : 0;
    }

    /// <summary>
    /// DTO for account category in reports
    /// </summary>
    public class AccountCategoryDto
    {
        public string AccountCode { get; set; } = string.Empty;
        public string AccountName { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public decimal Percentage { get; set; }
    }

    /// <summary>
    /// DTO for cash flow statement
    /// </summary>
    public class CashFlowStatementDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        // Operating Activities
        public decimal CashFromSales { get; set; }
        public decimal CashFromGiftCards { get; set; }
        public decimal CashPaidForInventory { get; set; }
        public decimal CashPaidForExpenses { get; set; }
        public decimal NetCashFromOperatingActivities => CashFromSales + CashFromGiftCards - CashPaidForInventory - CashPaidForExpenses;

        // Cash balances
        public decimal OpeningCashBalance { get; set; }
        public decimal ClosingCashBalance { get; set; }
        public decimal NetCashChange => ClosingCashBalance - OpeningCashBalance;
    }

    /// <summary>
    /// DTO for sales analytics report
    /// </summary>
    public class SalesAnalyticsReportDto
    {
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }

        // Sales metrics
        public int TotalTransactions { get; set; }
        public decimal TotalSalesAmount { get; set; }
        public decimal AverageTransactionValue => TotalTransactions > 0 ? TotalSalesAmount / TotalTransactions : 0;

        // Returns metrics
        public int TotalReturns { get; set; }
        public decimal TotalReturnsAmount { get; set; }
        public decimal ReturnRate => TotalTransactions > 0 ? ((decimal)TotalReturns / TotalTransactions) * 100 : 0;

        // Gift card metrics
        public int GiftCardsIssued { get; set; }
        public decimal GiftCardsIssuedAmount { get; set; }
        public int GiftCardsRedeemed { get; set; }
        public decimal GiftCardsRedeemedAmount { get; set; }

        // Daily breakdown
        public List<DailySalesDto> DailySales { get; set; } = new();
    }

    /// <summary>
    /// DTO for daily sales data
    /// </summary>
    public class DailySalesDto
    {
        public DateTime Date { get; set; }
        public decimal SalesAmount { get; set; }
        public int TransactionCount { get; set; }
    }
}
