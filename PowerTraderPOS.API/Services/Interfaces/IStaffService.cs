using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IStaffService
    {
        Task<IEnumerable<StaffDto>> GetAllStaffAsync();
        Task<StaffDto?> GetStaffByIdAsync(int id);
        Task<StaffDto> CreateStaffAsync(CreateStaffDto dto);
        Task<StaffDto?> UpdateStaffAsync(int id, UpdateStaffDto dto);
        Task<bool> DeleteStaffAsync(int id);
        Task<IEnumerable<StaffDto>> SearchStaffAsync(string searchTerm);
    }
}
