using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IVehicleRecordService
    {
        Task<IEnumerable<VehicleRecordDto>> GetAllVehiclesAsync();
        Task<VehicleRecordDto?> GetVehicleByIdAsync(string vehicleNo);
        Task<VehicleRecordDto> CreateVehicleAsync(CreateVehicleRecordDto dto);
        Task<VehicleRecordDto?> UpdateVehicleAsync(string vehicleNo, UpdateVehicleRecordDto dto);
        Task<bool> DeleteVehicleAsync(string vehicleNo);
        Task<IEnumerable<VehicleRecordDto>> SearchVehiclesAsync(string searchTerm);
    }
}
