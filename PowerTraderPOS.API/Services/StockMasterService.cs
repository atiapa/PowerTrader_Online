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

        public async Task<IEnumerable<StockMasterDto>> GetAllStockAsync()
        {
            return await _context.StockMaster
                .Select(s => new StockMasterDto
                {
                    Refno = s.Refno,
                    TransDate = s.TransDate,
                    VoucherNr = s.VoucherNr,
                    ProductName = s.ProductName,
                    OpeningStock = s.OpeningStock,
                    Purchase = s.Purchase,
                    PurchaseReturn = s.PurchaseReturn,
                    Sales = s.Sales,
                    SalesReturn = s.SalesReturn,
                    Balance = s.Balance,
                    Narration = s.Narration,
                    EntryID = s.EntryID,
                    BatchNo = s.BatchNo,
                    ProductID = s.ProductID,
                    Store = s.Store,
                    Branchcode = s.Branchcode,
                    OrganisationName = s.OrganisationName
                })
                .ToListAsync();
        }

        public async Task<StockMasterDto?> GetStockByIdAsync(decimal id)
        {
            var stock = await _context.StockMaster.FindAsync(id);
            if (stock == null) return null;

            return new StockMasterDto
            {
                Refno = stock.Refno,
                TransDate = stock.TransDate,
                VoucherNr = stock.VoucherNr,
                ProductName = stock.ProductName,
                OpeningStock = stock.OpeningStock,
                Purchase = stock.Purchase,
                Sales = stock.Sales,
                Balance = stock.Balance,
                ProductID = stock.ProductID,
                Store = stock.Store
            };
        }

        public async Task<StockMasterDto> CreateStockAsync(CreateStockMasterDto dto)
        {
            var stock = new StockMaster
            {
                TransDate = DateTime.Now,
                VoucherNr = dto.VoucherNr,
                ProductName = dto.ProductName,
                OpeningStock = dto.OpeningStock,
                Purchase = dto.Purchase,
                Sales = dto.Sales,
                Balance = dto.Balance,
                Narration = dto.Narration,
                EntryID = dto.EntryID,
                BatchNo = dto.BatchNo,
                ProductID = dto.ProductID,
                Store = dto.Store,
                Branchcode = dto.Branchcode,
                Session = DateTime.Now.Date
            };

            _context.StockMaster.Add(stock);
            await _context.SaveChangesAsync();

            return await GetStockByIdAsync(stock.Refno) ?? throw new InvalidOperationException();
        }

        public async Task<StockMasterDto?> UpdateStockAsync(decimal id, UpdateStockMasterDto dto)
        {
            var stock = await _context.StockMaster.FindAsync(id);
            if (stock == null) return null;

            if (dto.Purchase.HasValue) stock.Purchase = dto.Purchase;
            if (dto.PurchaseReturn.HasValue) stock.PurchaseReturn = dto.PurchaseReturn;
            if (dto.Sales.HasValue) stock.Sales = dto.Sales;
            if (dto.SalesReturn.HasValue) stock.SalesReturn = dto.SalesReturn;
            if (dto.Balance.HasValue) stock.Balance = dto.Balance;
            if (dto.Narration != null) stock.Narration = dto.Narration;

            await _context.SaveChangesAsync();
            return await GetStockByIdAsync(id);
        }

        public async Task<bool> DeleteStockAsync(decimal id)
        {
            var stock = await _context.StockMaster.FindAsync(id);
            if (stock == null) return false;

            _context.StockMaster.Remove(stock);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<StockMasterDto>> SearchStockAsync(string searchTerm)
        {
            return await _context.StockMaster
                .Where(s => (s.ProductName != null && s.ProductName.Contains(searchTerm)) ||
                           (s.ProductID != null && s.ProductID.Contains(searchTerm)))
                .Select(s => new StockMasterDto
                {
                    Refno = s.Refno,
                    ProductName = s.ProductName,
                    ProductID = s.ProductID,
                    Balance = s.Balance,
                    Store = s.Store
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<StockMasterDto>> GetStockByProductAsync(string productName)
        {
            return await _context.StockMaster
                .Where(s => s.ProductName == productName)
                .Select(s => new StockMasterDto
                {
                    Refno = s.Refno,
                    TransDate = s.TransDate,
                    ProductName = s.ProductName,
                    Balance = s.Balance,
                    Store = s.Store
                })
                .ToListAsync();
        }
    }
}
