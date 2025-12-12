using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    /// <summary>
    /// Service for accounting and financial operations
    /// Implements double-entry bookkeeping and financial reporting
    /// </summary>
    public class AccountingService : BaseService, IAccountingService
    {
        public AccountingService(AppDbContext context, IUserContextService userContext)
            : base(context, userContext)
        {
        }

        public async Task<AccountsLedgerDto> CreateJournalEntryAsync(CreateJournalEntryDto dto)
        {
            var (orgCode, branchCode, userId, _) = await GetUserContextAsync();

            var entry = new AccountsLedger
            {
                TransactionDate = dto.TransactionDate,
                AccountCode = dto.AccountCode,
                AccountName = dto.AccountName,
                AccountType = dto.AccountType,
                DebitAmount = dto.DebitAmount,
                CreditAmount = dto.CreditAmount,
                Description = dto.Description,
                ReferenceNumber = dto.ReferenceNumber,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.AccountsLedger.Add(entry);
            await _context.SaveChangesAsync();

            return MapToDto(entry);
        }

        public async Task<IEnumerable<AccountsLedgerDto>> GetLedgerEntriesAsync(
            string? accountCode = null,
            DateTime? fromDate = null,
            DateTime? toDate = null)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger.AsQueryable();

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            // Optional filters
            if (!string.IsNullOrEmpty(accountCode))
                query = query.Where(e => e.AccountCode == accountCode);

            if (fromDate.HasValue)
                query = query.Where(e => e.TransactionDate >= fromDate.Value);

            if (toDate.HasValue)
                query = query.Where(e => e.TransactionDate <= toDate.Value);

            var entries = await query
                .OrderByDescending(e => e.TransactionDate)
                .ThenByDescending(e => e.EntryDate)
                .ToListAsync();

            return entries.Select(MapToDto);
        }

        public async Task<AccountsLedgerDto?> GetLedgerEntryByIdAsync(int ledgerId)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var entry = isAdmin
                ? await _context.AccountsLedger
                    .Where(e => e.LedgerId == ledgerId && e.OrganisationCode == orgCode)
                    .FirstOrDefaultAsync()
                : await _context.AccountsLedger
                    .Where(e => e.LedgerId == ledgerId && e.OrganisationCode == orgCode && e.Branchcode == branchCode)
                    .FirstOrDefaultAsync();

            return entry != null ? MapToDto(entry) : null;
        }

        public async Task<decimal> GetAccountBalanceAsync(string accountCode)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger
                .Where(e => e.AccountCode == accountCode);

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var totalDebits = await query.SumAsync(e => e.DebitAmount);
            var totalCredits = await query.SumAsync(e => e.CreditAmount);

            // Get account type to determine balance calculation
            var firstEntry = await query.FirstOrDefaultAsync();
            if (firstEntry == null) return 0;

            // Asset and Expense accounts have debit balance
            // Liability, Equity, and Revenue accounts have credit balance
            return firstEntry.AccountType switch
            {
                "Asset" or "Expense" => totalDebits - totalCredits,
                "Liability" or "Equity" or "Revenue" => totalCredits - totalDebits,
                _ => totalDebits - totalCredits
            };
        }

        public async Task<TrialBalanceDto> GetTrialBalanceAsync()
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger.AsQueryable();

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var accounts = await query
                .GroupBy(e => new { e.AccountCode, e.AccountName, e.AccountType })
                .Select(g => new
                {
                    g.Key.AccountCode,
                    g.Key.AccountName,
                    g.Key.AccountType,
                    TotalDebits = g.Sum(e => e.DebitAmount),
                    TotalCredits = g.Sum(e => e.CreditAmount)
                })
                .ToListAsync();

            var entries = accounts.Select(a =>
            {
                var debitBalance = 0m;
                var creditBalance = 0m;

                if (a.AccountType == "Asset" || a.AccountType == "Expense")
                {
                    var balance = a.TotalDebits - a.TotalCredits;
                    if (balance > 0) debitBalance = balance;
                    else creditBalance = Math.Abs(balance);
                }
                else // Liability, Equity, Revenue
                {
                    var balance = a.TotalCredits - a.TotalDebits;
                    if (balance > 0) creditBalance = balance;
                    else debitBalance = Math.Abs(balance);
                }

                return new TrialBalanceEntryDto
                {
                    AccountCode = a.AccountCode,
                    AccountName = a.AccountName,
                    AccountType = a.AccountType,
                    DebitBalance = debitBalance,
                    CreditBalance = creditBalance
                };
            }).ToList();

            return new TrialBalanceDto
            {
                Entries = entries,
                TotalDebits = entries.Sum(e => e.DebitBalance),
                TotalCredits = entries.Sum(e => e.CreditBalance)
            };
        }

        public async Task<FinancialReportDto> GetFinancialReportAsync(DateTime fromDate, DateTime toDate)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger
                .Where(e => e.TransactionDate >= fromDate && e.TransactionDate <= toDate);

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var entries = await query.ToListAsync();

            var revenue = entries
                .Where(e => e.AccountType == "Revenue")
                .Sum(e => e.CreditAmount - e.DebitAmount);

            var expenses = entries
                .Where(e => e.AccountType == "Expense")
                .Sum(e => e.DebitAmount - e.CreditAmount);

            var assets = entries
                .Where(e => e.AccountType == "Asset")
                .Sum(e => e.DebitAmount - e.CreditAmount);

            var liabilities = entries
                .Where(e => e.AccountType == "Liability")
                .Sum(e => e.CreditAmount - e.DebitAmount);

            var equity = entries
                .Where(e => e.AccountType == "Equity")
                .Sum(e => e.CreditAmount - e.DebitAmount);

            return new FinancialReportDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                TotalRevenue = revenue,
                TotalExpenses = expenses,
                TotalAssets = assets,
                TotalLiabilities = liabilities,
                TotalEquity = equity
            };
        }

        public async Task<List<int>> PostSaleTransactionAsync(PostSaleTransactionDto dto)
        {
            var (orgCode, branchCode, userId, _) = await GetUserContextAsync();
            var ledgerIds = new List<int>();

            // Entry 1: DR Cash/Card/Mobile, CR Sales Revenue
            var revenueEntry = new AccountsLedger
            {
                TransactionDate = dto.SaleDate,
                AccountCode = GetPaymentAccountCode(dto.PaymentMethod),
                AccountName = GetPaymentAccountName(dto.PaymentMethod),
                AccountType = "Asset",
                DebitAmount = dto.TotalAmount,
                CreditAmount = 0,
                Description = $"Sale - {dto.InvoiceNumber}",
                ReferenceNumber = dto.InvoiceNumber,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            var salesRevenueEntry = new AccountsLedger
            {
                TransactionDate = dto.SaleDate,
                AccountCode = "REV001",
                AccountName = "Sales Revenue - Retail",
                AccountType = "Revenue",
                DebitAmount = 0,
                CreditAmount = dto.TotalAmount,
                Description = $"Sale - {dto.InvoiceNumber}",
                ReferenceNumber = dto.InvoiceNumber,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            // Entry 2: DR COGS, CR Inventory
            var cogsEntry = new AccountsLedger
            {
                TransactionDate = dto.SaleDate,
                AccountCode = "EXP001",
                AccountName = "Cost of Goods Sold",
                AccountType = "Expense",
                DebitAmount = dto.TotalCost,
                CreditAmount = 0,
                Description = $"COGS - {dto.InvoiceNumber}",
                ReferenceNumber = dto.InvoiceNumber,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            var inventoryEntry = new AccountsLedger
            {
                TransactionDate = dto.SaleDate,
                AccountCode = "AST002",
                AccountName = "Inventory - Retail",
                AccountType = "Asset",
                DebitAmount = 0,
                CreditAmount = dto.TotalCost,
                Description = $"Inventory reduction - {dto.InvoiceNumber}",
                ReferenceNumber = dto.InvoiceNumber,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.AccountsLedger.AddRange(revenueEntry, salesRevenueEntry, cogsEntry, inventoryEntry);
            await _context.SaveChangesAsync();

            ledgerIds.AddRange(new[] { revenueEntry.LedgerId, salesRevenueEntry.LedgerId, cogsEntry.LedgerId, inventoryEntry.LedgerId });
            return ledgerIds;
        }

        public async Task<List<int>> PostReturnTransactionAsync(PostReturnTransactionDto dto)
        {
            var (orgCode, branchCode, userId, _) = await GetUserContextAsync();
            var ledgerIds = new List<int>();

            // Entry 1: DR Sales Returns, CR Cash/Refund
            var salesReturnsEntry = new AccountsLedger
            {
                TransactionDate = dto.ReturnDate,
                AccountCode = "REV002",
                AccountName = "Sales Returns - Retail",
                AccountType = "Revenue",
                DebitAmount = dto.RefundAmount,
                CreditAmount = 0,
                Description = $"Return - {dto.ReturnReference}",
                ReferenceNumber = dto.ReturnReference,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            var refundEntry = new AccountsLedger
            {
                TransactionDate = dto.ReturnDate,
                AccountCode = GetPaymentAccountCode(dto.RefundMethod),
                AccountName = GetPaymentAccountName(dto.RefundMethod),
                AccountType = "Asset",
                DebitAmount = 0,
                CreditAmount = dto.RefundAmount,
                Description = $"Refund - {dto.ReturnReference}",
                ReferenceNumber = dto.ReturnReference,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            // Entry 2: DR Inventory, CR COGS
            var inventoryReturnEntry = new AccountsLedger
            {
                TransactionDate = dto.ReturnDate,
                AccountCode = "AST002",
                AccountName = "Inventory - Retail",
                AccountType = "Asset",
                DebitAmount = dto.CostAmount,
                CreditAmount = 0,
                Description = $"Inventory return - {dto.ReturnReference}",
                ReferenceNumber = dto.ReturnReference,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            var cogsReturnEntry = new AccountsLedger
            {
                TransactionDate = dto.ReturnDate,
                AccountCode = "EXP001",
                AccountName = "Cost of Goods Sold",
                AccountType = "Expense",
                DebitAmount = 0,
                CreditAmount = dto.CostAmount,
                Description = $"COGS reversal - {dto.ReturnReference}",
                ReferenceNumber = dto.ReturnReference,
                EnteredBy = userId,
                EntryDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.AccountsLedger.AddRange(salesReturnsEntry, refundEntry, inventoryReturnEntry, cogsReturnEntry);
            await _context.SaveChangesAsync();

            ledgerIds.AddRange(new[] { salesReturnsEntry.LedgerId, refundEntry.LedgerId, inventoryReturnEntry.LedgerId, cogsReturnEntry.LedgerId });
            return ledgerIds;
        }

        public async Task<bool> DeleteLedgerEntryAsync(int ledgerId)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var entry = isAdmin
                ? await _context.AccountsLedger
                    .Where(e => e.LedgerId == ledgerId && e.OrganisationCode == orgCode)
                    .FirstOrDefaultAsync()
                : await _context.AccountsLedger
                    .Where(e => e.LedgerId == ledgerId && e.OrganisationCode == orgCode && e.Branchcode == branchCode)
                    .FirstOrDefaultAsync();

            if (entry == null) return false;

            _context.AccountsLedger.Remove(entry);
            await _context.SaveChangesAsync();
            return true;
        }

        private static AccountsLedgerDto MapToDto(AccountsLedger entry)
        {
            return new AccountsLedgerDto
            {
                LedgerId = entry.LedgerId,
                TransactionDate = entry.TransactionDate,
                AccountCode = entry.AccountCode,
                AccountName = entry.AccountName,
                AccountType = entry.AccountType,
                DebitAmount = entry.DebitAmount,
                CreditAmount = entry.CreditAmount,
                Description = entry.Description,
                ReferenceNumber = entry.ReferenceNumber,
                EnteredBy = entry.EnteredBy,
                EntryDate = entry.EntryDate,
                OrganisationCode = entry.OrganisationCode,
                Branchcode = entry.Branchcode
            };
        }

        private static string GetPaymentAccountCode(string paymentMethod)
        {
            return paymentMethod.ToLower() switch
            {
                "cash" => "AST001",
                "card" or "credit card" or "debit card" => "AST003",
                "mobile" or "mobile money" => "AST004",
                _ => "AST001" // Default to cash
            };
        }

        private static string GetPaymentAccountName(string paymentMethod)
        {
            return paymentMethod.ToLower() switch
            {
                "cash" => "Cash",
                "card" or "credit card" or "debit card" => "Card Payments",
                "mobile" or "mobile money" => "Mobile Money",
                _ => "Cash"
            };
        }

        public async Task<ProfitAndLossReportDto> GetProfitAndLossReportAsync(DateTime fromDate, DateTime toDate)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger
                .Where(e => e.TransactionDate >= fromDate && e.TransactionDate <= toDate);

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var entries = await query.ToListAsync();

            // Revenue breakdown
            var revenueCategories = entries
                .Where(e => e.AccountType == "Revenue")
                .GroupBy(e => new { e.AccountCode, e.AccountName })
                .Select(g => new
                {
                    g.Key.AccountCode,
                    g.Key.AccountName,
                    Amount = g.Sum(e => e.CreditAmount - e.DebitAmount)
                })
                .ToList();

            var totalRevenue = revenueCategories.Sum(r => r.Amount);

            var revenueByCategory = revenueCategories.Select(r => new AccountCategoryDto
            {
                AccountCode = r.AccountCode,
                AccountName = r.AccountName,
                Amount = r.Amount,
                Percentage = totalRevenue > 0 ? (r.Amount / totalRevenue) * 100 : 0
            }).ToList();

            // Expense breakdown
            var expenseCategories = entries
                .Where(e => e.AccountType == "Expense")
                .GroupBy(e => new { e.AccountCode, e.AccountName })
                .Select(g => new
                {
                    g.Key.AccountCode,
                    g.Key.AccountName,
                    Amount = g.Sum(e => e.DebitAmount - e.CreditAmount)
                })
                .ToList();

            var totalExpenses = expenseCategories.Sum(e => e.Amount);

            var expensesByCategory = expenseCategories.Select(e => new AccountCategoryDto
            {
                AccountCode = e.AccountCode,
                AccountName = e.AccountName,
                Amount = e.Amount,
                Percentage = totalRevenue > 0 ? (e.Amount / totalRevenue) * 100 : 0
            }).ToList();

            // Calculate gross profit (revenue - COGS)
            var cogs = expenseCategories
                .Where(e => e.AccountCode == "EXP001") // COGS account
                .Sum(e => e.Amount);
            var grossProfit = totalRevenue - cogs;

            return new ProfitAndLossReportDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                RevenueByCategory = revenueByCategory,
                TotalRevenue = totalRevenue,
                ExpensesByCategory = expensesByCategory,
                TotalExpenses = totalExpenses,
                GrossProfit = grossProfit
            };
        }

        public async Task<CashFlowStatementDto> GetCashFlowStatementAsync(DateTime fromDate, DateTime toDate)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            var query = _context.AccountsLedger
                .Where(e => e.TransactionDate >= fromDate && e.TransactionDate <= toDate);

            // Multi-tenant filtering
            query = isAdmin
                ? query.Where(e => e.OrganisationCode == orgCode)
                : query.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var entries = await query.ToListAsync();

            // Cash from sales (revenue entries to cash accounts)
            var cashFromSales = entries
                .Where(e => e.AccountCode == "AST001" && e.DebitAmount > 0 && e.Description != null && e.Description.Contains("Return"))
                .Sum(e => e.DebitAmount);

            // Cash from gift cards (gift card redemptions)
            var cashFromGiftCards = entries
                .Where(e => e.ReferenceNumber != null && e.ReferenceNumber.StartsWith("GC"))
                .Sum(e => e.CreditAmount);

            // Cash paid for inventory (COGS)
            var cashPaidForInventory = entries
                .Where(e => e.AccountCode == "EXP001") // COGS
                .Sum(e => e.DebitAmount);

            // Cash paid for other expenses (excluding COGS)
            var cashPaidForExpenses = entries
                .Where(e => e.AccountType == "Expense" && e.AccountCode != "EXP001")
                .Sum(e => e.DebitAmount - e.CreditAmount);

            // Get opening balance (before period)
            var openingBalanceQuery = _context.AccountsLedger
                .Where(e => e.TransactionDate < fromDate && e.AccountCode == "AST001");

            openingBalanceQuery = isAdmin
                ? openingBalanceQuery.Where(e => e.OrganisationCode == orgCode)
                : openingBalanceQuery.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var openingDebits = await openingBalanceQuery.SumAsync(e => e.DebitAmount);
            var openingCredits = await openingBalanceQuery.SumAsync(e => e.CreditAmount);
            var openingCashBalance = openingDebits - openingCredits;

            // Get closing balance (end of period)
            var closingBalanceQuery = _context.AccountsLedger
                .Where(e => e.TransactionDate <= toDate && e.AccountCode == "AST001");

            closingBalanceQuery = isAdmin
                ? closingBalanceQuery.Where(e => e.OrganisationCode == orgCode)
                : closingBalanceQuery.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var closingDebits = await closingBalanceQuery.SumAsync(e => e.DebitAmount);
            var closingCredits = await closingBalanceQuery.SumAsync(e => e.CreditAmount);
            var closingCashBalance = closingDebits - closingCredits;

            return new CashFlowStatementDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                CashFromSales = cashFromSales,
                CashFromGiftCards = cashFromGiftCards,
                CashPaidForInventory = cashPaidForInventory,
                CashPaidForExpenses = cashPaidForExpenses,
                OpeningCashBalance = openingCashBalance,
                ClosingCashBalance = closingCashBalance
            };
        }

        public async Task<SalesAnalyticsReportDto> GetSalesAnalyticsReportAsync(DateTime fromDate, DateTime toDate)
        {
            var (orgCode, branchCode, _, isAdmin) = await GetUserContextAsync();

            // Get ledger entries for the period
            var ledgerQuery = _context.AccountsLedger
                .Where(e => e.TransactionDate >= fromDate && e.TransactionDate <= toDate);

            ledgerQuery = isAdmin
                ? ledgerQuery.Where(e => e.OrganisationCode == orgCode)
                : ledgerQuery.Where(e => e.OrganisationCode == orgCode && e.Branchcode == branchCode);

            var ledgerEntries = await ledgerQuery.ToListAsync();

            // Sales metrics (revenue entries excluding returns)
            var salesEntries = ledgerEntries
                .Where(e => e.AccountCode == "REV001" && e.CreditAmount > 0)
                .ToList();

            var totalTransactions = salesEntries.Count;
            var totalSalesAmount = salesEntries.Sum(e => e.CreditAmount);

            // Returns metrics
            var returnEntries = ledgerEntries
                .Where(e => e.AccountCode == "REV002" && e.DebitAmount > 0)
                .ToList();

            var totalReturns = returnEntries.Count;
            var totalReturnsAmount = returnEntries.Sum(e => e.DebitAmount);

            // Gift card metrics - need to query actual gift card tables
            var giftCardQuery = _context.GiftCards
                .Where(g => g.IssueDate >= fromDate && g.IssueDate <= toDate);

            giftCardQuery = isAdmin
                ? giftCardQuery.Where(g => g.OrganisationCode == orgCode)
                : giftCardQuery.Where(g => g.OrganisationCode == orgCode && g.Branchcode == branchCode);

            var giftCards = await giftCardQuery.ToListAsync();

            var giftCardsIssued = giftCards.Count;
            var giftCardsIssuedAmount = giftCards.Sum(g => g.InitialBalance);

            // Redeemed gift cards (status = Redeemed or balance reduced)
            var giftCardsRedeemed = giftCards.Count(g => g.Status == "Redeemed");
            var giftCardsRedeemedAmount = giftCards
                .Where(g => g.Status == "Redeemed")
                .Sum(g => g.InitialBalance - g.CurrentBalance);

            // Daily sales breakdown
            var dailySales = salesEntries
                .GroupBy(e => e.TransactionDate.Date)
                .Select(g => new DailySalesDto
                {
                    Date = g.Key,
                    SalesAmount = g.Sum(e => e.CreditAmount),
                    TransactionCount = g.Count()
                })
                .OrderBy(d => d.Date)
                .ToList();

            return new SalesAnalyticsReportDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                TotalTransactions = totalTransactions,
                TotalSalesAmount = totalSalesAmount,
                TotalReturns = totalReturns,
                TotalReturnsAmount = totalReturnsAmount,
                GiftCardsIssued = giftCardsIssued,
                GiftCardsIssuedAmount = giftCardsIssuedAmount,
                GiftCardsRedeemed = giftCardsRedeemed,
                GiftCardsRedeemedAmount = giftCardsRedeemedAmount,
                DailySales = dailySales
            };
        }
    }
}
