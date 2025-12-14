using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IStockMasterService
    {
        Task<IEnumerable<StockMasterDto>> GetAllStockAsync();
        Task<StockMasterDto?> GetStockByIdAsync(decimal id);
        Task<StockMasterDto> CreateStockAsync(CreateStockMasterDto dto);
        Task<StockMasterDto?> UpdateStockAsync(decimal id, UpdateStockMasterDto dto);
        Task<bool> DeleteStockAsync(decimal id);
        Task<IEnumerable<StockMasterDto>> SearchStockAsync(string searchTerm);
        Task<IEnumerable<StockMasterDto>> GetStockByProductAsync(string productName);
    }
}
