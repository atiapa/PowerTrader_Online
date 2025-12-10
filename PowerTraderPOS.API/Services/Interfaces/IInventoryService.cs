using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    /// <summary>
    /// Service interface for managing retail inventory operations
    /// </summary>
    public interface IInventoryService
    {
        /// <summary>
        /// Get all retail items with tenant filtering
        /// </summary>
        Task<IEnumerable<RetailItemsDto>> GetAllItemsAsync();

        /// <summary>
        /// Get a specific retail item by product ID
        /// </summary>
        Task<RetailItemsDto?> GetItemByIdAsync(string productId);

        /// <summary>
        /// Create a new retail item
        /// </summary>
        Task<RetailItemsDto> CreateItemAsync(CreateRetailItemsDto dto);

        /// <summary>
        /// Update an existing retail item
        /// </summary>
        Task<RetailItemsDto?> UpdateItemAsync(string productId, UpdateRetailItemsDto dto);

        /// <summary>
        /// Delete a retail item
        /// </summary>
        Task<bool> DeleteItemAsync(string productId);

        /// <summary>
        /// Adjust stock level for a product (add, subtract, or set)
        /// </summary>
        Task<bool> AdjustStockAsync(StockAdjustmentDto dto);

        /// <summary>
        /// Reduce stock when item is sold
        /// </summary>
        Task<bool> ReduceStockAsync(string productId, decimal quantity);

        /// <summary>
        /// Increase stock when item is returned
        /// </summary>
        Task<bool> IncreaseStockAsync(string productId, decimal quantity);

        /// <summary>
        /// Get current stock level for a product
        /// </summary>
        Task<decimal> GetStockLevelAsync(string productId);

        /// <summary>
        /// Get items with low stock (below reorder level)
        /// </summary>
        Task<IEnumerable<LowStockItemDto>> GetLowStockItemsAsync();

        /// <summary>
        /// Search retail items by name or barcode
        /// </summary>
        Task<IEnumerable<RetailItemsDto>> SearchItemsAsync(string searchTerm);
    }
}
