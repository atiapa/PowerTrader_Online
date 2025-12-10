using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class InventoryService : BaseService, IInventoryService
    {
        public InventoryService(AppDbContext context, IUserContextService userContext) 
            : base(context, userContext)
        {
        }

        public async Task<IEnumerable<RetailItemsDto>> GetAllItemsAsync()
        {
            return await GetAllWithTenantFilterAsync<RetailItems, RetailItemsDto>(
                additionalFilter: null,
                selector: item => new RetailItemsDto
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    Description = item.Description,
                    CategoryId = item.CategoryId,
                    CategoryName = item.CategoryName,
                    UnitPrice = item.UnitPrice,
                    CostPrice = item.CostPrice,
                    UnitInstock = item.UnitInstock,
                    ReorderLevel = item.ReorderLevel,
                    Barcode = item.Barcode,
                    ImageUrl = item.ImageUrl,
                    IsActive = item.IsActive,
                    TaxRate = item.TaxRate,
                    DiscountPercent = item.DiscountPercent,
                    Unit = item.Unit,
                    Supplier = item.Supplier,
                    LastRestockDate = item.LastRestockDate,
                    CreatedDate = item.CreatedDate,
                    ModifiedDate = item.ModifiedDate,
                    CreatedBy = item.CreatedBy,
                    ModifiedBy = item.ModifiedBy,
                    OrganisationCode = item.OrganisationCode,
                    Branchcode = item.Branchcode
                });
        }

        public async Task<RetailItemsDto?> GetItemByIdAsync(string productId)
        {
            var item = await GetByIdWithTenantFilterAsync<RetailItems, string>(productId);
            
            if (item == null)
                return null;

            return new RetailItemsDto
            {
                ProductId = item.ProductId,
                ProductName = item.ProductName,
                Description = item.Description,
                CategoryId = item.CategoryId,
                CategoryName = item.CategoryName,
                UnitPrice = item.UnitPrice,
                CostPrice = item.CostPrice,
                UnitInstock = item.UnitInstock,
                ReorderLevel = item.ReorderLevel,
                Barcode = item.Barcode,
                ImageUrl = item.ImageUrl,
                IsActive = item.IsActive,
                TaxRate = item.TaxRate,
                DiscountPercent = item.DiscountPercent,
                Unit = item.Unit,
                Supplier = item.Supplier,
                LastRestockDate = item.LastRestockDate,
                CreatedDate = item.CreatedDate,
                ModifiedDate = item.ModifiedDate,
                CreatedBy = item.CreatedBy,
                ModifiedBy = item.ModifiedBy,
                OrganisationCode = item.OrganisationCode,
                Branchcode = item.Branchcode
            };
        }

        public async Task<RetailItemsDto> CreateItemAsync(CreateRetailItemsDto dto)
        {
            var item = new RetailItems
            {
                ProductId = dto.ProductId,
                ProductName = dto.ProductName,
                Description = dto.Description,
                CategoryId = dto.CategoryId,
                CategoryName = dto.CategoryName,
                UnitPrice = dto.UnitPrice,
                CostPrice = dto.CostPrice,
                UnitInstock = dto.UnitInstock,
                ReorderLevel = dto.ReorderLevel,
                Barcode = dto.Barcode,
                ImageUrl = dto.ImageUrl,
                IsActive = dto.IsActive,
                TaxRate = dto.TaxRate,
                DiscountPercent = dto.DiscountPercent,
                Unit = dto.Unit,
                Supplier = dto.Supplier,
                CreatedDate = DateTime.Now,
                CreatedBy = _userContext.GetUserId()
            };

            var created = await CreateWithTenantInfoAsync(item);

            return new RetailItemsDto
            {
                ProductId = created.ProductId,
                ProductName = created.ProductName,
                Description = created.Description,
                CategoryId = created.CategoryId,
                CategoryName = created.CategoryName,
                UnitPrice = created.UnitPrice,
                CostPrice = created.CostPrice,
                UnitInstock = created.UnitInstock,
                ReorderLevel = created.ReorderLevel,
                Barcode = created.Barcode,
                ImageUrl = created.ImageUrl,
                IsActive = created.IsActive,
                TaxRate = created.TaxRate,
                DiscountPercent = created.DiscountPercent,
                Unit = created.Unit,
                Supplier = created.Supplier,
                LastRestockDate = created.LastRestockDate,
                CreatedDate = created.CreatedDate,
                ModifiedDate = created.ModifiedDate,
                CreatedBy = created.CreatedBy,
                ModifiedBy = created.ModifiedBy,
                OrganisationCode = created.OrganisationCode,
                Branchcode = created.Branchcode
            };
        }

        public async Task<RetailItemsDto?> UpdateItemAsync(string productId, UpdateRetailItemsDto dto)
        {
            var updated = await UpdateWithTenantCheckAsync<RetailItems, string>(
                productId,
                item =>
                {
                    item.ProductName = dto.ProductName;
                    item.Description = dto.Description;
                    item.CategoryId = dto.CategoryId;
                    item.CategoryName = dto.CategoryName;
                    item.UnitPrice = dto.UnitPrice;
                    item.CostPrice = dto.CostPrice;
                    item.ReorderLevel = dto.ReorderLevel;
                    item.Barcode = dto.Barcode;
                    item.ImageUrl = dto.ImageUrl;
                    item.IsActive = dto.IsActive;
                    item.TaxRate = dto.TaxRate;
                    item.DiscountPercent = dto.DiscountPercent;
                    item.Unit = dto.Unit;
                    item.Supplier = dto.Supplier;
                    item.ModifiedDate = DateTime.Now;
                    item.ModifiedBy = _userContext.GetUserId();
                });

            if (updated == null)
                return null;

            return new RetailItemsDto
            {
                ProductId = updated.ProductId,
                ProductName = updated.ProductName,
                Description = updated.Description,
                CategoryId = updated.CategoryId,
                CategoryName = updated.CategoryName,
                UnitPrice = updated.UnitPrice,
                CostPrice = updated.CostPrice,
                UnitInstock = updated.UnitInstock,
                ReorderLevel = updated.ReorderLevel,
                Barcode = updated.Barcode,
                ImageUrl = updated.ImageUrl,
                IsActive = updated.IsActive,
                TaxRate = updated.TaxRate,
                DiscountPercent = updated.DiscountPercent,
                Unit = updated.Unit,
                Supplier = updated.Supplier,
                LastRestockDate = updated.LastRestockDate,
                CreatedDate = updated.CreatedDate,
                ModifiedDate = updated.ModifiedDate,
                CreatedBy = updated.CreatedBy,
                ModifiedBy = updated.ModifiedBy,
                OrganisationCode = updated.OrganisationCode,
                Branchcode = updated.Branchcode
            };
        }

        public async Task<bool> DeleteItemAsync(string productId)
        {
            return await DeleteWithTenantCheckAsync<RetailItems, string>(productId);
        }

        public async Task<bool> AdjustStockAsync(StockAdjustmentDto dto)
        {
            var item = await GetByIdWithTenantFilterAsync<RetailItems, string>(dto.ProductId);
            
            if (item == null)
                return false;

            switch (dto.Operation.ToLower())
            {
                case "add":
                    item.UnitInstock += dto.Quantity;
                    item.LastRestockDate = DateTime.Now;
                    break;
                case "subtract":
                    if (item.UnitInstock < dto.Quantity)
                        return false; // Insufficient stock
                    item.UnitInstock -= dto.Quantity;
                    break;
                case "set":
                    item.UnitInstock = dto.Quantity;
                    item.LastRestockDate = DateTime.Now;
                    break;
                default:
                    return false; // Invalid operation
            }

            item.ModifiedDate = DateTime.Now;
            item.ModifiedBy = _userContext.GetUserId();

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ReduceStockAsync(string productId, decimal quantity)
        {
            var item = await GetByIdWithTenantFilterAsync<RetailItems, string>(productId);
            
            if (item == null)
                return false;

            if (item.UnitInstock < quantity)
                return false; // Insufficient stock

            item.UnitInstock -= quantity;
            item.ModifiedDate = DateTime.Now;
            item.ModifiedBy = _userContext.GetUserId();

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IncreaseStockAsync(string productId, decimal quantity)
        {
            var item = await GetByIdWithTenantFilterAsync<RetailItems, string>(productId);
            
            if (item == null)
                return false;

            item.UnitInstock += quantity;
            item.LastRestockDate = DateTime.Now;
            item.ModifiedDate = DateTime.Now;
            item.ModifiedBy = _userContext.GetUserId();

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<decimal> GetStockLevelAsync(string productId)
        {
            var item = await GetByIdWithTenantFilterAsync<RetailItems, string>(productId);
            return item?.UnitInstock ?? 0;
        }

        public async Task<IEnumerable<LowStockItemDto>> GetLowStockItemsAsync()
        {
            var orgCode = _userContext.GetOrganisationCode();
            var branchCode = _userContext.GetBranchCode();
            var isAdmin = _userContext.IsAdmin();

            var query = _context.Set<RetailItems>()
                .Where(i => i.OrganisationCode == orgCode);

            if (!isAdmin)
            {
                query = query.Where(i => i.Branchcode == branchCode);
            }

            var lowStockItems = await query
                .Where(i => i.UnitInstock < i.ReorderLevel && i.IsActive)
                .Select(i => new LowStockItemDto
                {
                    ProductId = i.ProductId,
                    ProductName = i.ProductName,
                    UnitInstock = i.UnitInstock,
                    ReorderLevel = i.ReorderLevel,
                    Shortage = i.ReorderLevel - i.UnitInstock,
                    Supplier = i.Supplier
                })
                .ToListAsync();

            return lowStockItems;
        }

        public async Task<IEnumerable<RetailItemsDto>> SearchItemsAsync(string searchTerm)
        {
            return await GetAllWithTenantFilterAsync<RetailItems, RetailItemsDto>(
                additionalFilter: item => 
                    item.ProductName.Contains(searchTerm) || 
                    (item.Barcode != null && item.Barcode.Contains(searchTerm)) ||
                    (item.ProductId != null && item.ProductId.Contains(searchTerm)),
                selector: item => new RetailItemsDto
                {
                    ProductId = item.ProductId,
                    ProductName = item.ProductName,
                    Description = item.Description,
                    CategoryId = item.CategoryId,
                    CategoryName = item.CategoryName,
                    UnitPrice = item.UnitPrice,
                    CostPrice = item.CostPrice,
                    UnitInstock = item.UnitInstock,
                    ReorderLevel = item.ReorderLevel,
                    Barcode = item.Barcode,
                    ImageUrl = item.ImageUrl,
                    IsActive = item.IsActive,
                    TaxRate = item.TaxRate,
                    DiscountPercent = item.DiscountPercent,
                    Unit = item.Unit,
                    Supplier = item.Supplier,
                    LastRestockDate = item.LastRestockDate,
                    CreatedDate = item.CreatedDate,
                    ModifiedDate = item.ModifiedDate,
                    CreatedBy = item.CreatedBy,
                    ModifiedBy = item.ModifiedBy,
                    OrganisationCode = item.OrganisationCode,
                    Branchcode = item.Branchcode
                });
        }
    }
}
