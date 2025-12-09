using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Existing;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly AppDbContext _context;

        public CategoryService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryDto
                {
                    CategoryID = c.CategoryID,
                    CategoryName = c.CategoryName,
                    Description = c.Description,
                    Buttoncolor = c.Buttoncolor,
                    Fontsize = c.Fontsize,
                    OrganisationName = c.OrganisationName,
                    Branchcode = c.Branchcode,
                    OrganisationCode = c.OrganisationCode,
                    BranchName = c.BranchName
                })
                .ToListAsync();
        }

        public async Task<CategoryDto?> GetCategoryByIdAsync(decimal id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;

            return new CategoryDto
            {
                CategoryID = category.CategoryID,
                CategoryName = category.CategoryName,
                Description = category.Description,
                Buttoncolor = category.Buttoncolor,
                Fontsize = category.Fontsize,
                OrganisationName = category.OrganisationName,
                Branchcode = category.Branchcode,
                OrganisationCode = category.OrganisationCode,
                BranchName = category.BranchName
            };
        }

        public async Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto)
        {
            var category = new Categories
            {
                CategoryName = dto.CategoryName,
                Description = dto.Description,
                Buttoncolor = dto.Buttoncolor,
                Fontsize = dto.Fontsize,
                Branchcode = dto.Branchcode
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return await GetCategoryByIdAsync(category.CategoryID) ?? throw new InvalidOperationException();
        }

        public async Task<CategoryDto?> UpdateCategoryAsync(decimal id, UpdateCategoryDto dto)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;

            if (dto.CategoryName != null) category.CategoryName = dto.CategoryName;
            if (dto.Description != null) category.Description = dto.Description;
            if (dto.Buttoncolor != null) category.Buttoncolor = dto.Buttoncolor;
            if (dto.Fontsize != null) category.Fontsize = dto.Fontsize;

            await _context.SaveChangesAsync();
            return await GetCategoryByIdAsync(id);
        }

        public async Task<bool> DeleteCategoryAsync(decimal id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<CategoryDto>> SearchCategoriesAsync(string searchTerm)
        {
            return await _context.Categories
                .Where(c => (c.CategoryName != null && c.CategoryName.Contains(searchTerm)) ||
                           (c.Description != null && c.Description.Contains(searchTerm)))
                .Select(c => new CategoryDto
                {
                    CategoryID = c.CategoryID,
                    CategoryName = c.CategoryName,
                    Description = c.Description,
                    Buttoncolor = c.Buttoncolor,
                    Fontsize = c.Fontsize
                })
                .ToListAsync();
        }
    }
}
