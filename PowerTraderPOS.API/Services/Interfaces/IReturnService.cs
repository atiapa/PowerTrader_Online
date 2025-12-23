using PowerTraderPOS.API.DTOs;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Services.Interfaces
{
    /// <summary>
    /// Service interface for managing return transactions
    /// </summary>
    public interface IReturnService
    {
        /// <summary>
        /// Create a new return transaction
        /// </summary>
        /// <param name="dto">Return transaction creation data</param>
        /// <returns>Created return transaction</returns>
        Task<ReturnTransactionDto> CreateReturnAsync(CreateReturnTransactionDto dto);

        /// <summary>
        /// Get all return transactions (tenant-filtered)
        /// </summary>
        /// <param name="status">Optional status filter</param>
        /// <returns>List of return transactions</returns>
        Task<IEnumerable<ReturnTransactionDto>> GetAllReturnsAsync(string? status = null);

        /// <summary>
        /// Get a specific return transaction by ID
        /// </summary>
        /// <param name="returnId">Return transaction ID</param>
        /// <returns>Return transaction or null</returns>
        Task<ReturnTransactionDto?> GetReturnByIdAsync(int returnId);

        /// <summary>
        /// Approve a return transaction and increase inventory stock
        /// </summary>
        /// <param name="returnId">Return transaction ID</param>
        /// <param name="dto">Approval data</param>
        /// <returns>Success status</returns>
        Task<bool> ApproveReturnAsync(int returnId, ApproveReturnDto dto);

        /// <summary>
        /// Reject a return transaction
        /// </summary>
        /// <param name="returnId">Return transaction ID</param>
        /// <param name="dto">Rejection data</param>
        /// <returns>Success status</returns>
        Task<bool> RejectReturnAsync(int returnId, RejectReturnDto dto);

        /// <summary>
        /// Complete a return transaction with refund details
        /// </summary>
        /// <param name="returnId">Return transaction ID</param>
        /// <param name="dto">Completion data</param>
        /// <returns>Success status</returns>
        Task<bool> CompleteReturnAsync(int returnId, CompleteReturnDto dto);

        /// <summary>
        /// Get return report for a date range
        /// </summary>
        /// <param name="fromDate">Start date</param>
        /// <param name="toDate">End date</param>
        /// <returns>Return report with statistics</returns>
        Task<ReturnReportDto> GetReturnReportAsync(DateTime fromDate, DateTime toDate);
    }
}
