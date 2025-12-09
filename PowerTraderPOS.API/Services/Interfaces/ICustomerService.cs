using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface ICustomerService
    {
        Task<IEnumerable<CustomerDto>> GetAllCustomersAsync();
        Task<CustomerDto?> GetCustomerByIdAsync(decimal id);
        Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto);
        Task<CustomerDto?> UpdateCustomerAsync(decimal id, UpdateCustomerDto dto);
        Task<bool> DeleteCustomerAsync(decimal id);
        Task<IEnumerable<CustomerDto>> SearchCustomersAsync(string searchTerm);
    }
}
