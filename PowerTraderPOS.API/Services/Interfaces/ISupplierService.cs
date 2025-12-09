using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface ISupplierService
    {
        Task<IEnumerable<SupplierDto>> GetAllSuppliersAsync();
        Task<SupplierDto?> GetSupplierByIdAsync(decimal id);
        Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto dto);
        Task<SupplierDto?> UpdateSupplierAsync(decimal id, UpdateSupplierDto dto);
        Task<bool> DeleteSupplierAsync(decimal id);
        Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string searchTerm);
    }
}
