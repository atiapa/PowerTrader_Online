using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<IEnumerable<CategoryDto>> GetAllCategoriesAsync();
        Task<CategoryDto?> GetCategoryByIdAsync(decimal id);
        Task<CategoryDto> CreateCategoryAsync(CreateCategoryDto dto);
        Task<CategoryDto?> UpdateCategoryAsync(decimal id, UpdateCategoryDto dto);
        Task<bool> DeleteCategoryAsync(decimal id);
        Task<IEnumerable<CategoryDto>> SearchCategoriesAsync(string searchTerm);
    }
}
