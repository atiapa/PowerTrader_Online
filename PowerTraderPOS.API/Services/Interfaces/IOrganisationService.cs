using PowerTraderPOS.API.DTOs;

namespace PowerTraderPOS.API.Services.Interfaces
{
    public interface IOrganisationService
    {
        Task<IEnumerable<OrganisationDto>> GetAllOrganisationsAsync();
        Task<OrganisationDto?> GetOrganisationByIdAsync(decimal id);
        Task<OrganisationDto> CreateOrganisationAsync(CreateOrganisationDto dto);
        Task<OrganisationDto?> UpdateOrganisationAsync(decimal id, UpdateOrganisationDto dto);
        Task<bool> DeleteOrganisationAsync(decimal id);
        Task<IEnumerable<OrganisationDto>> SearchOrganisationsAsync(string searchTerm);
        Task<OrganisationDto?> GetOrganisationByCodeAsync(string organisationCode);
    }
}
