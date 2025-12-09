using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;

        public ProductService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<ProductDto>> GetAllProductsAsync()
        {
            return await _context.Set<ProductsTbl>()
                .Where(p => p.IsActive == true)
                .Select(p => new ProductDto
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
                })
                .ToListAsync();
        }

        public async Task<ProductDto?> GetProductByIdAsync(int id)
        {
            var product = await _context.Set<ProductsTbl>().FindAsync(id);
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

            _context.Set<ProductsTbl>().Add(product);
            await _context.SaveChangesAsync();

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
            var product = await _context.Set<ProductsTbl>().FindAsync(id);
            if (product == null) return null;

            if (dto.ProductCode != null) product.ProductCode = dto.ProductCode;
            if (dto.ProductName != null) product.ProductName = dto.ProductName;
            if (dto.ProductDescription != null) product.ProductDescription = dto.ProductDescription;
            if (dto.UnitPrice.HasValue) product.UnitPrice = dto.UnitPrice;
            if (dto.CostPrice.HasValue) product.CostPrice = dto.CostPrice;
            if (dto.CategoryId.HasValue) product.CategoryId = dto.CategoryId;
            if (dto.SubcategoryId.HasValue) product.SubcategoryId = dto.SubcategoryId;
            if (dto.IsActive.HasValue) product.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

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
            var product = await _context.Set<ProductsTbl>().FindAsync(id);
            if (product == null) return false;

            product.IsActive = false;
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<ProductDto>> SearchProductsAsync(string searchTerm)
        {
            return await _context.Set<ProductsTbl>()
                .Where(p => p.IsActive == true && 
                    (p.ProductName!.Contains(searchTerm) || p.ProductCode!.Contains(searchTerm)))
                .Select(p => new ProductDto
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
                })
                .ToListAsync();
        }
    }
}
