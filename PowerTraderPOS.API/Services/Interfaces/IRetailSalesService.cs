using PowerTraderPOS.API.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Services.Interfaces
{
    /// <summary>
    /// Service interface for retail sales operations including hold orders
    /// </summary>
    public interface IRetailSalesService
    {
        /// <summary>
        /// Hold current order for later completion
        /// </summary>
        /// <param name="dto">Order details to hold</param>
        /// <returns>Pending sale with hold reference</returns>
        Task<CashSalesPendingDto> HoldOrderAsync(CreateCashSalesPendingDto dto);

        /// <summary>
        /// Get all pending sales for the current tenant
        /// </summary>
        /// <returns>List of pending sales</returns>
        Task<IEnumerable<CashSalesPendingDto>> GetAllPendingSalesAsync();

        /// <summary>
        /// Get pending sales for the current cashier
        /// </summary>
        /// <returns>List of pending sales for current user</returns>
        Task<IEnumerable<CashSalesPendingDto>> GetCashierPendingSalesAsync();

        /// <summary>
        /// Get a specific pending sale by ID
        /// </summary>
        /// <param name="pendingId">Pending sale ID</param>
        /// <returns>Pending sale or null</returns>
        Task<CashSalesPendingDto?> GetPendingSaleByIdAsync(int pendingId);

        /// <summary>
        /// Get a pending sale by hold reference
        /// </summary>
        /// <param name="reference">Hold reference number</param>
        /// <returns>Pending sale or null</returns>
        Task<CashSalesPendingDto?> GetPendingSaleByReferenceAsync(string reference);

        /// <summary>
        /// Retrieve a held order to resume transaction
        /// </summary>
        /// <param name="pendingId">Pending sale ID</param>
        /// <returns>Retrieved order details</returns>
        Task<RetrievePendingSaleDto?> RetrievePendingOrderAsync(int pendingId);

        /// <summary>
        /// Cancel a held order
        /// </summary>
        /// <param name="pendingId">Pending sale ID</param>
        /// <returns>True if cancelled successfully</returns>
        Task<bool> CancelPendingOrderAsync(int pendingId);

        /// <summary>
        /// Complete a retail sale (placeholder for future implementation)
        /// </summary>
        Task<bool> CompleteSaleAsync();
    }
}
