using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IBranchService
    {
        Task<IEnumerable<BranchDto>> GetAllBranchesAsync();
        Task<BranchDto?> GetBranchByIdAsync(decimal id);
        Task<BranchDto> CreateBranchAsync(CreateBranchDto dto);
        Task<BranchDto?> UpdateBranchAsync(decimal id, UpdateBranchDto dto);
        Task<bool> DeleteBranchAsync(decimal id);
        Task<IEnumerable<BranchDto>> SearchBranchesAsync(string searchTerm);
        Task<IEnumerable<BranchDto>> GetBranchesByOrganisationAsync(string organisationCode);
    }
}
