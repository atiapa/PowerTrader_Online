using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class ProductService : BaseService, IProductService
    {
        public ProductService(AppDbContext context, IUserContextService userContext) 
            : base(context, userContext)
        {
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            return await GetAllWithTenantFilterAsync<ProductsTbl, ProductDto>(
                additionalFilter: p => p.IsActive == true,
                selector: p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductCode = p.ProductCode,
                    ProductName = p.ProductName,
                    ProductDescription = p.ProductDescription,
                    UnitPrice = p.UnitPrice,
                    CostPrice = p.CostPrice,
                    CategoryId = p.CategoryId,
                    SubcategoryId = p.SubcategoryId,
                    IsActive = p.IsActive
                });
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await GetByIdWithTenantFilterAsync<ProductsTbl, int>(id);
            if (product == null) return null;

            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                UnitPrice = product.UnitPrice,
                CostPrice = product.CostPrice,
                CategoryId = product.CategoryId,
                SubcategoryId = product.SubcategoryId,
                IsActive = product.IsActive
            };
        }

        public async Task<ProductDto> CreateProductAsync(CreateProductDto dto)
        {
            var product = new ProductsTbl
            {
                ProductCode = dto.ProductCode,
                ProductName = dto.ProductName,
                ProductDescription = dto.ProductDescription,
                UnitPrice = dto.UnitPrice,
                CostPrice = dto.CostPrice,
                CategoryId = dto.CategoryId,
                SubcategoryId = dto.SubcategoryId,
                IsActive = dto.IsActive
            };

            await CreateWithTenantInfoAsync(product);

            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                UnitPrice = product.UnitPrice,
                CostPrice = product.CostPrice,
                CategoryId = product.CategoryId,
                SubcategoryId = product.SubcategoryId,
                IsActive = product.IsActive
            };
        }

        public async Task<ProductDto?> UpdateProductAsync(int id, UpdateProductDto dto)
        {
            var product = await UpdateWithTenantCheckAsync<ProductsTbl, int>(id, p =>
            {
                if (dto.ProductCode != null) p.ProductCode = dto.ProductCode;
                if (dto.ProductName != null) p.ProductName = dto.ProductName;
                if (dto.ProductDescription != null) p.ProductDescription = dto.ProductDescription;
                if (dto.UnitPrice.HasValue) p.UnitPrice = dto.UnitPrice;
                if (dto.CostPrice.HasValue) p.CostPrice = dto.CostPrice;
                if (dto.CategoryId.HasValue) p.CategoryId = dto.CategoryId;
                if (dto.SubcategoryId.HasValue) p.SubcategoryId = dto.SubcategoryId;
                if (dto.IsActive.HasValue) p.IsActive = dto.IsActive;
            });

            if (product == null) return null;

            return new ProductDto
            {
                ProductId = product.ProductId,
                ProductCode = product.ProductCode,
                ProductName = product.ProductName,
                ProductDescription = product.ProductDescription,
                UnitPrice = product.UnitPrice,
                CostPrice = product.CostPrice,
                CategoryId = product.CategoryId,
                SubcategoryId = product.SubcategoryId,
                IsActive = product.IsActive
            };
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await GetByIdWithTenantFilterAsync<ProductsTbl, int>(id);
            if (product == null) return false;

            product.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm)
        {
            return await GetAllWithTenantFilterAsync<ProductsTbl, ProductDto>(
                additionalFilter: p => p.IsActive == true && 
                    (p.ProductName!.Contains(searchTerm) || p.ProductCode!.Contains(searchTerm)),
                selector: p => new ProductDto
                {
                    ProductId = p.ProductId,
                    ProductCode = p.ProductCode,
                    ProductName = p.ProductName,
                    ProductDescription = p.ProductDescription,
                    UnitPrice = p.UnitPrice,
                    CostPrice = p.CostPrice,
                    CategoryId = p.CategoryId,
                    SubcategoryId = p.SubcategoryId,
                    IsActive = p.IsActive
                });
        }
    }
}
