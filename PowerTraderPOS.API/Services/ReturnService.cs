using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Services
{
    /// <summary>
    /// Service for managing return transactions with automatic stock adjustments
    /// </summary>
    public class ReturnService : BaseService, IReturnService
    {
        private readonly IInventoryService _inventoryService;

        public ReturnService(
            AppDbContext context,
            IUserContextService userContext,
            IInventoryService inventoryService) : base(context, userContext)
        {
            _inventoryService = inventoryService;
        }

        /// <summary>
        /// Create a new return transaction
        /// </summary>
        public async Task<ReturnTransactionDto> CreateReturnAsync(CreateReturnTransactionDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();

            var returnTransaction = new ReturnTransactions
            {
                OriginalInvoiceNr = dto.OriginalInvoiceNr,
                ProductId = dto.ProductId,
                ProductName = dto.ProductName,
                Quantity = dto.Quantity,
                ReturnReason = dto.ReturnReason,
                ReturnDate = DateTime.Now,
                RefundAmount = dto.RefundAmount,
                Status = "Pending",
                ProcessedBy = userId,
                CustomerId = dto.CustomerId,
                CustomerName = dto.CustomerName,
                Notes = dto.Notes,
                CreatedDate = DateTime.Now,
                OrganisationCode = orgCode,
                Branchcode = branchCode
            };

            _context.ReturnTransactions.Add(returnTransaction);
            await _context.SaveChangesAsync();

            return MapToDto(returnTransaction);
        }

        /// <summary>
        /// Get all return transactions (tenant-filtered)
        /// </summary>
        public async Task<IEnumerable<ReturnTransactionDto>> GetAllReturnsAsync(string? status = null)
        {
            return await GetAllWithTenantFilterAsync<ReturnTransactions, ReturnTransactionDto>(
                additionalFilter: r => status == null || r.Status == status,
                selector: r => MapToDto(r)
            );
        }

        /// <summary>
        /// Get a specific return transaction by ID
        /// </summary>
        public async Task<ReturnTransactionDto?> GetReturnByIdAsync(int returnId)
        {
            var returnTransaction = await GetByIdWithTenantFilterAsync<ReturnTransactions, int>(returnId);

            return returnTransaction != null ? MapToDto(returnTransaction) : null;
        }

        /// <summary>
        /// Approve a return transaction and increase inventory stock
        /// </summary>
        public async Task<bool> ApproveReturnAsync(int returnId, ApproveReturnDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var userId = _userContext.GetUserId();
            var isAdmin = _userContext.IsAdmin();

            var returnTransaction = await _context.ReturnTransactions
                .FirstOrDefaultAsync(r => r.ReturnId == returnId &&
                                         r.OrganisationCode == orgCode &&
                                         (isAdmin || r.Branchcode == branchCode));

            if (returnTransaction == null)
                return false;

            if (returnTransaction.Status != "Pending")
                return false; // Only pending returns can be approved

            // Update return status
            returnTransaction.Status = "Approved";
            returnTransaction.ApprovedBy = userId;
            returnTransaction.ApprovalDate = DateTime.Now;
            returnTransaction.ModifiedDate = DateTime.Now;
            if (!string.IsNullOrEmpty(dto.ApprovalNotes))
            {
                returnTransaction.Notes = (returnTransaction.Notes ?? "") + " | Approval: " + dto.ApprovalNotes;
            }

            // Increase inventory stock
            await _inventoryService.IncreaseStockAsync(
                returnTransaction.ProductId,
                returnTransaction.Quantity
            );

            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Reject a return transaction
        /// </summary>
        public async Task<bool> RejectReturnAsync(int returnId, RejectReturnDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var returnTransaction = await _context.ReturnTransactions
                .FirstOrDefaultAsync(r => r.ReturnId == returnId &&
                                         r.OrganisationCode == orgCode &&
                                         (isAdmin || r.Branchcode == branchCode));

            if (returnTransaction == null)
                return false;

            if (returnTransaction.Status != "Pending")
                return false; // Only pending returns can be rejected

            returnTransaction.Status = "Rejected";
            returnTransaction.RejectionReason = dto.RejectionReason;
            returnTransaction.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Complete a return transaction with refund details
        /// </summary>
        public async Task<bool> CompleteReturnAsync(int returnId, CompleteReturnDto dto)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var returnTransaction = await _context.ReturnTransactions
                .FirstOrDefaultAsync(r => r.ReturnId == returnId &&
                                         r.OrganisationCode == orgCode &&
                                         (isAdmin || r.Branchcode == branchCode));

            if (returnTransaction == null)
                return false;

            if (returnTransaction.Status != "Approved")
                return false; // Only approved returns can be completed

            returnTransaction.Status = "Completed";
            returnTransaction.RefundMethod = dto.RefundMethod;
            returnTransaction.RefundReference = dto.RefundReference;
            returnTransaction.CompletionDate = DateTime.Now;
            returnTransaction.ModifiedDate = DateTime.Now;

            await _context.SaveChangesAsync();
            return true;
        }

        /// <summary>
        /// Get return report for a date range
        /// </summary>
        public async Task<ReturnReportDto> GetReturnReportAsync(DateTime fromDate, DateTime toDate)
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var returns = await _context.ReturnTransactions
                .Where(r => r.ReturnDate >= fromDate &&
                           r.ReturnDate <= toDate &&
                           r.OrganisationCode == orgCode &&
                           (isAdmin || r.Branchcode == branchCode))
                .ToListAsync();

            return new ReturnReportDto
            {
                FromDate = fromDate,
                ToDate = toDate,
                TotalReturns = returns.Count,
                TotalRefundAmount = returns.Sum(r => r.RefundAmount),
                PendingReturns = returns.Count(r => r.Status == "Pending"),
                ApprovedReturns = returns.Count(r => r.Status == "Approved"),
                RejectedReturns = returns.Count(r => r.Status == "Rejected"),
                CompletedReturns = returns.Count(r => r.Status == "Completed"),
                AverageRefundAmount = returns.Any() ? returns.Average(r => r.RefundAmount) : 0
            };
        }

        /// <summary>
        /// Map entity to DTO
        /// </summary>
        private ReturnTransactionDto MapToDto(ReturnTransactions entity)
        {
            return new ReturnTransactionDto
            {
                ReturnId = entity.ReturnId,
                OriginalInvoiceNr = entity.OriginalInvoiceNr,
                ProductId = entity.ProductId,
                ProductName = entity.ProductName,
                Quantity = entity.Quantity,
                ReturnReason = entity.ReturnReason,
                ReturnDate = entity.ReturnDate,
                RefundAmount = entity.RefundAmount,
                RefundMethod = entity.RefundMethod,
                RefundReference = entity.RefundReference,
                Status = entity.Status,
                ProcessedBy = entity.ProcessedBy,
                ApprovedBy = entity.ApprovedBy,
                ApprovalDate = entity.ApprovalDate,
                RejectionReason = entity.RejectionReason,
                CompletionDate = entity.CompletionDate,
                CustomerId = entity.CustomerId,
                CustomerName = entity.CustomerName,
                Notes = entity.Notes,
                CreatedDate = entity.CreatedDate,
                ModifiedDate = entity.ModifiedDate,
                OrganisationCode = entity.OrganisationCode,
                Branchcode = entity.Branchcode
            };
        }
    }
}
