using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    /// <summary>
    /// Service interface for accounting and financial operations
    /// Handles double-entry bookkeeping, journal posting, and financial reporting
    /// </summary>
    public interface IAccountingService
    {
        /// <summary>
        /// Create a manual journal entry
        /// </summary>
        Task<AccountsLedgerDto> CreateJournalEntryAsync(CreateJournalEntryDto dto);

        /// <summary>
        /// Get all ledger entries with optional filtering
        /// </summary>
        Task<IEnumerable<AccountsLedgerDto>> GetLedgerEntriesAsync(
            string? accountCode = null,
            DateTime? fromDate = null,
            DateTime? toDate = null);

        /// <summary>
        /// Get specific ledger entry by ID
        /// </summary>
        Task<AccountsLedgerDto?> GetLedgerEntryByIdAsync(int ledgerId);

        /// <summary>
        /// Get current balance for an account
        /// </summary>
        Task<decimal> GetAccountBalanceAsync(string accountCode);

        /// <summary>
        /// Generate trial balance
        /// </summary>
        Task<TrialBalanceDto> GetTrialBalanceAsync();

        /// <summary>
        /// Generate financial report for date range
        /// </summary>
        Task<FinancialReportDto> GetFinancialReportAsync(DateTime fromDate, DateTime toDate);

        /// <summary>
        /// Post sale transaction to ledger (double-entry)
        /// </summary>
        Task<List<int>> PostSaleTransactionAsync(PostSaleTransactionDto dto);

        /// <summary>
        /// Post return transaction to ledger (reversal entries)
        /// </summary>
        Task<List<int>> PostReturnTransactionAsync(PostReturnTransactionDto dto);

        /// <summary>
        /// Delete ledger entry (Admin only, with caution)
        /// </summary>
        Task<bool> DeleteLedgerEntryAsync(int ledgerId);
    }
}
