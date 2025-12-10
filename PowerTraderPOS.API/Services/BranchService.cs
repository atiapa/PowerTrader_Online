using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Existing;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class BranchService : IBranchService
    {
        private readonly AppDbContext _context;

        public BranchService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<BranchDto>> GetAllBranchesAsync()
        {
            return await _context.Branches
                .Select(b => new BranchDto
                {
                    RefNo = b.RefNo,
                    OrganisationName = b.OrganisationName,
                    OrganisationCode = b.OrganisationCode,
                    PostalAddress = b.PostalAddress,
                    PhysicalLocation = b.PhysicalLocation,
                    City = b.City,
                    RegionOrState = b.RegionOrState,
                    Country = b.Country,
                    OfficePhone = b.OfficePhone,
                    CellPhone = b.CellPhone,
                    Fax = b.Fax,
                    Email = b.Email,
                    Website = b.Website,
                    Remarks = b.Remarks,
                    TIN = b.TIN,
                    BranchName = b.BranchName,
                    Branchcode = b.Branchcode
                })
                .ToListAsync();
        }

        public async Task<BranchDto?> GetBranchByIdAsync(decimal id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null) return null;

            return new BranchDto
            {
                RefNo = branch.RefNo,
                OrganisationName = branch.OrganisationName,
                OrganisationCode = branch.OrganisationCode,
                PostalAddress = branch.PostalAddress,
                PhysicalLocation = branch.PhysicalLocation,
                City = branch.City,
                RegionOrState = branch.RegionOrState,
                Country = branch.Country,
                OfficePhone = branch.OfficePhone,
                CellPhone = branch.CellPhone,
                Fax = branch.Fax,
                Email = branch.Email,
                Website = branch.Website,
                Remarks = branch.Remarks,
                TIN = branch.TIN,
                BranchName = branch.BranchName,
                Branchcode = branch.Branchcode
            };
        }

        public async Task<BranchDto> CreateBranchAsync(CreateBranchDto dto)
        {
            var branch = new Branches
            {
                OrganisationName = dto.OrganisationName,
                BranchName = dto.BranchName,
                Branchcode = dto.Branchcode,
                PostalAddress = dto.PostalAddress,
                PhysicalLocation = dto.PhysicalLocation,
                City = dto.City,
                Country = dto.Country,
                OfficePhone = dto.OfficePhone,
                Email = dto.Email,
                TIN = dto.TIN
            };

            _context.Branches.Add(branch);
            await _context.SaveChangesAsync();

            return await GetBranchByIdAsync(branch.RefNo) ?? throw new InvalidOperationException();
        }

        public async Task<BranchDto?> UpdateBranchAsync(decimal id, UpdateBranchDto dto)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null) return null;

            if (dto.PostalAddress != null) branch.PostalAddress = dto.PostalAddress;
            if (dto.PhysicalLocation != null) branch.PhysicalLocation = dto.PhysicalLocation;
            if (dto.City != null) branch.City = dto.City;
            if (dto.Country != null) branch.Country = dto.Country;
            if (dto.OfficePhone != null) branch.OfficePhone = dto.OfficePhone;
            if (dto.CellPhone != null) branch.CellPhone = dto.CellPhone;
            if (dto.Email != null) branch.Email = dto.Email;
            if (dto.Website != null) branch.Website = dto.Website;
            if (dto.Remarks != null) branch.Remarks = dto.Remarks;

            await _context.SaveChangesAsync();
            return await GetBranchByIdAsync(id);
        }

        public async Task<bool> DeleteBranchAsync(decimal id)
        {
            var branch = await _context.Branches.FindAsync(id);
            if (branch == null) return false;

            _context.Branches.Remove(branch);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<BranchDto>> SearchBranchesAsync(string searchTerm)
        {
            return await _context.Branches
                .Where(b => (b.BranchName != null && b.BranchName.Contains(searchTerm)) ||
                           (b.City != null && b.City.Contains(searchTerm)) ||
                           (b.Branchcode != null && b.Branchcode.Contains(searchTerm)))
                .Select(b => new BranchDto
                {
                    RefNo = b.RefNo,
                    OrganisationName = b.OrganisationName,
                    BranchName = b.BranchName,
                    Branchcode = b.Branchcode,
                    City = b.City,
                    OfficePhone = b.OfficePhone,
                    Email = b.Email
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<BranchDto>> GetBranchesByOrganisationAsync(string organisationCode)
        {
            return await _context.Branches
                .Where(b => b.OrganisationCode == organisationCode)
                .Select(b => new BranchDto
                {
                    RefNo = b.RefNo,
                    BranchName = b.BranchName,
                    Branchcode = b.Branchcode,
                    City = b.City,
                    OfficePhone = b.OfficePhone
                })
                .ToListAsync();
        }
    }
}
