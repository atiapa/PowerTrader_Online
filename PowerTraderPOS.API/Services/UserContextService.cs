using System.Security.Claims;
using Microsoft.AspNetCore.Http;

namespace PowerTraderPOS.API.Services
{
    public interface IUserContextService
    {
        string GetOrganisationCode();
        string GetBranchCode();
        string GetUserId();
        IEnumerable<string> GetUserRoles();
        bool IsAdmin();
    }

    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public UserContextService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetOrganisationCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst("OrganisationCode")?.Value 
                ?? user?.FindFirst(ClaimTypes.GroupSid)?.Value 
                ?? throw new UnauthorizedAccessException("OrganisationCode not found in token");
        }

        public string GetBranchCode()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst("BranchCode")?.Value 
                ?? user?.FindFirst(ClaimTypes.Locality)?.Value 
                ?? throw new UnauthorizedAccessException("BranchCode not found in token");
        }

        public string GetUserId()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindFirst(ClaimTypes.NameIdentifier)?.Value 
                ?? user?.FindFirst("UserId")?.Value 
                ?? throw new UnauthorizedAccessException("UserId not found in token");
        }

        public IEnumerable<string> GetUserRoles()
        {
            var user = _httpContextAccessor.HttpContext?.User;
            return user?.FindAll(ClaimTypes.Role).Select(c => c.Value) ?? Enumerable.Empty<string>();
        }

        public bool IsAdmin()
        {
            return GetUserRoles().Contains("Admin");
        }
    }
}
