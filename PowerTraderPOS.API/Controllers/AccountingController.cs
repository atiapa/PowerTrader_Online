using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class AccountingController : ControllerBase
    {
        private readonly IAccountingService _accountingService;

        public AccountingController(IAccountingService accountingService)
        {
            _accountingService = accountingService;
        }

        /// <summary>
        /// Create manual journal entry
        /// </summary>
        [HttpPost("journal-entry")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<AccountsLedgerDto>> CreateJournalEntry([FromBody] CreateJournalEntryDto dto)
        {
            try
            {
                var entry = await _accountingService.CreateJournalEntryAsync(dto);
                return CreatedAtAction(nameof(GetLedgerEntry), new { id = entry.LedgerId }, entry);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all ledger entries with optional filtering
        /// </summary>
        [HttpGet("ledger")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<IEnumerable<AccountsLedgerDto>>> GetLedgerEntries(
            [FromQuery] string? accountCode = null,
            [FromQuery] DateTime? from = null,
            [FromQuery] DateTime? to = null)
        {
            try
            {
                var entries = await _accountingService.GetLedgerEntriesAsync(accountCode, from, to);
                return Ok(entries);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get specific ledger entry by ID
        /// </summary>
        [HttpGet("ledger/{id}")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<AccountsLedgerDto>> GetLedgerEntry(int id)
        {
            try
            {
                var entry = await _accountingService.GetLedgerEntryByIdAsync(id);
                if (entry == null)
                    return NotFound(new { message = "Ledger entry not found" });

                return Ok(entry);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get current balance for an account
        /// </summary>
        [HttpGet("account-balance/{accountCode}")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<decimal>> GetAccountBalance(string accountCode)
        {
            try
            {
                var balance = await _accountingService.GetAccountBalanceAsync(accountCode);
                return Ok(new { accountCode, balance });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate trial balance
        /// </summary>
        [HttpGet("trial-balance")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<TrialBalanceDto>> GetTrialBalance()
        {
            try
            {
                var trialBalance = await _accountingService.GetTrialBalanceAsync();
                return Ok(trialBalance);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate financial report for date range
        /// </summary>
        [HttpGet("financial-report")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<FinancialReportDto>> GetFinancialReport(
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            try
            {
                var report = await _accountingService.GetFinancialReportAsync(from, to);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Post sale transaction to ledger (double-entry)
        /// Internal - called by RetailSalesService
        /// </summary>
        [HttpPost("post-sale")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<List<int>>> PostSaleTransaction([FromBody] PostSaleTransactionDto dto)
        {
            try
            {
                var ledgerIds = await _accountingService.PostSaleTransactionAsync(dto);
                return Ok(new { message = "Sale posted to ledger", ledgerIds });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Post return transaction to ledger (reversal entries)
        /// Internal - called by ReturnService
        /// </summary>
        [HttpPost("post-return")]
        [Authorize(Roles = "Admin,Returns")]
        public async Task<ActionResult<List<int>>> PostReturnTransaction([FromBody] PostReturnTransactionDto dto)
        {
            try
            {
                var ledgerIds = await _accountingService.PostReturnTransactionAsync(dto);
                return Ok(new { message = "Return posted to ledger", ledgerIds });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Delete ledger entry (Admin only, with caution)
        /// </summary>
        [HttpDelete("ledger/{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteLedgerEntry(int id)
        {
            try
            {
                var deleted = await _accountingService.DeleteLedgerEntryAsync(id);
                if (!deleted)
                    return NotFound(new { message = "Ledger entry not found" });

                return Ok(new { message = "Ledger entry deleted successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate detailed profit & loss report with category breakdown
        /// </summary>
        [HttpGet("profit-loss-report")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<ProfitAndLossReportDto>> GetProfitAndLossReport(
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            try
            {
                var report = await _accountingService.GetProfitAndLossReportAsync(from, to);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate cash flow statement
        /// </summary>
        [HttpGet("cash-flow-statement")]
        [Authorize(Roles = "Admin,Finance")]
        public async Task<ActionResult<CashFlowStatementDto>> GetCashFlowStatement(
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            try
            {
                var report = await _accountingService.GetCashFlowStatementAsync(from, to);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Generate sales analytics report
        /// </summary>
        [HttpGet("sales-analytics")]
        [Authorize(Roles = "Admin,Finance,Sales")]
        public async Task<ActionResult<SalesAnalyticsReportDto>> GetSalesAnalytics(
            [FromQuery] DateTime from,
            [FromQuery] DateTime to)
        {
            try
            {
                var report = await _accountingService.GetSalesAnalyticsReportAsync(from, to);
                return Ok(report);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
