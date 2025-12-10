using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IAttendanceService
    {
        Task<IEnumerable<AttendanceDto>> GetAllAttendanceAsync();
        Task<AttendanceDto?> GetAttendanceByIdAsync(int id);
        Task<AttendanceDto> CreateAttendanceAsync(CreateAttendanceDto dto);
        Task<AttendanceDto?> UpdateAttendanceAsync(int id, UpdateAttendanceDto dto);
        Task<bool> DeleteAttendanceAsync(int id);
        Task<IEnumerable<AttendanceDto>> SearchAttendanceAsync(string searchTerm);
        Task<IEnumerable<AttendanceDto>> GetAttendanceByStaffAsync(string staffId);
        Task<IEnumerable<AttendanceDto>> GetAttendanceByDateRangeAsync(DateTime startDate, DateTime endDate);
    }
}
