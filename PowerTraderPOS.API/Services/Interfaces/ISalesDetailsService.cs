using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface ISalesDetailsService
    {
        Task<IEnumerable<SalesDetailsDto>> GetAllSalesDetailsAsync();
        Task<SalesDetailsDto?> GetSalesDetailsByIdAsync(decimal id);
        Task<SalesDetailsDto> CreateSalesDetailsAsync(CreateSalesDetailsDto dto);
        Task<SalesDetailsDto?> UpdateSalesDetailsAsync(decimal id, UpdateSalesDetailsDto dto);
        Task<bool> DeleteSalesDetailsAsync(decimal id);
        Task<IEnumerable<SalesDetailsDto>> SearchSalesDetailsAsync(string searchTerm);
        Task<IEnumerable<SalesDetailsDto>> GetSalesByInvoiceAsync(string invoiceNr);
        Task<IEnumerable<SalesDetailsDto>> GetSalesByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
