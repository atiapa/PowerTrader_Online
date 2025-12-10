using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Existing;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class StockMasterService : IStockMasterService
    {
        private readonly AppDbContext _context;

        public StockMasterService(AppDbContext context)
        {
            _context = context;
        }

        // NOTE: StockMaster model has limited properties (StockId, ProductId, WarehouseId, Quantity, ReorderLevel, LastUpdated)
        // The DTO expects many more properties that don't exist in the actual model.
        // This is a stub implementation to make the project compile.

        public async Task<IEnumerable<StockMasterDto>> GetAllStockAsync()
        {
            return await _context.StockMaster
                .Select(s => new StockMasterDto
                {
                    Refno = s.StockId,
                    ProductID = s.ProductId.ToString(),
                    Balance = s.Quantity,
                    // Other properties are not available in the simplified model
                })
                .ToListAsync();
        }

        public async Task<StockMasterDto?> GetStockByIdAsync(decimal id)
        {
            var stock = await _context.StockMaster.FindAsync((int)id);
            if (stock == null) return null;

            return new StockMasterDto
            {
                Refno = stock.StockId,
                ProductID = stock.ProductId.ToString(),
                Balance = stock.Quantity
            };
        }

        public async Task<StockMasterDto> CreateStockAsync(CreateStockMasterDto dto)
        {
            var stock = new StockMaster
            {
                ProductId = int.TryParse(dto.ProductID, out var pid) ? pid : null,
                Quantity = (int?)dto.Balance ?? 0,
                ReorderLevel = 10, // Default reorder level
                LastUpdated = DateTime.UtcNow
            };

            _context.StockMaster.Add(stock);
            await _context.SaveChangesAsync();

            return new StockMasterDto
            {
                Refno = stock.StockId,
                ProductID = stock.ProductId.ToString(),
                Balance = stock.Quantity
            };
        }

        public async Task<StockMasterDto?> UpdateStockAsync(decimal id, UpdateStockMasterDto dto)
        {
            var stock = await _context.StockMaster.FindAsync((int)id);
            if (stock == null) return null;

            if (dto.Balance.HasValue)
            {
                stock.Quantity = (int)dto.Balance.Value;
            }
            stock.LastUpdated = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return await GetStockByIdAsync(id);
        }

        public async Task<bool> DeleteStockAsync(decimal id)
        {
            var stock = await _context.StockMaster.FindAsync((int)id);
            if (stock == null) return false;

            _context.StockMaster.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<StockMasterDto>> SearchStockAsync(string searchTerm)
        {
            // Since ProductName doesn't exist in model, search by ProductId
            return await _context.StockMaster
                .Where(s => s.ProductId.ToString()!.Contains(searchTerm))
                .Select(s => new StockMasterDto
                {
                    Refno = s.StockId,
                    ProductID = s.ProductId.ToString(),
                    Balance = s.Quantity
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<StockMasterDto>> GetStockByProductAsync(string productName)
        {
            // Since ProductName doesn't exist, return empty list
            return await Task.FromResult(new List<StockMasterDto>());
        }
    }
}
