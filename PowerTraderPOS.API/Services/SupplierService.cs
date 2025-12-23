using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class SupplierService : ISupplierService
    {
        private readonly AppDbContext _context;

        public SupplierService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SupplierDto>> GetAllSuppliersAsync()
        {
            var suppliers = await _context.Suppliers
                .Where(s => s.IsActive == true)
                .Select(s => new SupplierDto
                {
                    SNo = s.SNo,
                    SupplierID = s.SupplierID,
                    CompanyName = s.CompanyName,
                    ContactName = s.ContactName,
                    ContactTitle = s.ContactTitle,
                    PostalAddress = s.PostalAddress,
                    City = s.City,
                    Region = s.Region,
                    Country = s.Country,
                    Phone = s.Phone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    Website = s.Website,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .ToListAsync();

            return suppliers;
        }

        public async Task<SupplierDto?> GetSupplierByIdAsync(decimal id)
        {
            var supplier = await _context.Suppliers
                .Where(s => s.SNo == id)
                .Select(s => new SupplierDto
                {
                    SNo = s.SNo,
                    SupplierID = s.SupplierID,
                    CompanyName = s.CompanyName,
                    ContactName = s.ContactName,
                    ContactTitle = s.ContactTitle,
                    PostalAddress = s.PostalAddress,
                    City = s.City,
                    Region = s.Region,
                    Country = s.Country,
                    Phone = s.Phone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    Website = s.Website,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .FirstOrDefaultAsync();

            return supplier;
        }

        public async Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto dto)
        {
            var supplier = new Suppliers
            {
                SupplierID = dto.SupplierID,
                CompanyName = dto.CompanyName,
                ContactName = dto.ContactName,
                ContactTitle = dto.ContactTitle,
                PostalAddress = dto.PostalAddress,
                City = dto.City,
                Region = dto.Region,
                Country = dto.Country,
                Phone = dto.Phone,
                CellPhone = dto.CellPhone,
                Email = dto.Email,
                Website = dto.Website,
                OrganisationName = dto.OrganisationName,
                BranchName = dto.BranchName,
                IsActive = true
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return new SupplierDto
            {
                SNo = supplier.SNo,
                SupplierID = supplier.SupplierID,
                CompanyName = supplier.CompanyName,
                ContactName = supplier.ContactName,
                ContactTitle = supplier.ContactTitle,
                PostalAddress = supplier.PostalAddress,
                City = supplier.City,
                Region = supplier.Region,
                Country = supplier.Country,
                Phone = supplier.Phone,
                CellPhone = supplier.CellPhone,
                Email = supplier.Email,
                Website = supplier.Website,
                OrganisationName = supplier.OrganisationName,
                BranchName = supplier.BranchName
            };
        }

        public async Task<SupplierDto?> UpdateSupplierAsync(decimal id, UpdateSupplierDto dto)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null) return null;

            supplier.CompanyName = dto.CompanyName ?? supplier.CompanyName;
            supplier.ContactName = dto.ContactName ?? supplier.ContactName;
            supplier.ContactTitle = dto.ContactTitle ?? supplier.ContactTitle;
            supplier.PostalAddress = dto.PostalAddress ?? supplier.PostalAddress;
            supplier.City = dto.City ?? supplier.City;
            supplier.Region = dto.Region ?? supplier.Region;
            supplier.Country = dto.Country ?? supplier.Country;
            supplier.Phone = dto.Phone ?? supplier.Phone;
            supplier.CellPhone = dto.CellPhone ?? supplier.CellPhone;
            supplier.Email = dto.Email ?? supplier.Email;
            supplier.Website = dto.Website ?? supplier.Website;

            await _context.SaveChangesAsync();

            return new SupplierDto
            {
                SNo = supplier.SNo,
                SupplierID = supplier.SupplierID,
                CompanyName = supplier.CompanyName,
                ContactName = supplier.ContactName,
                ContactTitle = supplier.ContactTitle,
                PostalAddress = supplier.PostalAddress,
                City = supplier.City,
                Region = supplier.Region,
                Country = supplier.Country,
                Phone = supplier.Phone,
                CellPhone = supplier.CellPhone,
                Email = supplier.Email,
                Website = supplier.Website,
                OrganisationName = supplier.OrganisationName,
                BranchName = supplier.BranchName
            };
        }

        public async Task<bool> DeleteSupplierAsync(decimal id)
        {
            var supplier = await _context.Suppliers.FindAsync(id);
            if (supplier == null) return false;

            supplier.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string searchTerm)
        {
            var suppliers = await _context.Suppliers
                .Where(s => s.IsActive == true && 
                    (s.CompanyName!.Contains(searchTerm) || 
                     s.SupplierID!.Contains(searchTerm) ||
                     s.ContactName!.Contains(searchTerm)))
                .Select(s => new SupplierDto
                {
                    SNo = s.SNo,
                    SupplierID = s.SupplierID,
                    CompanyName = s.CompanyName,
                    ContactName = s.ContactName,
                    ContactTitle = s.ContactTitle,
                    PostalAddress = s.PostalAddress,
                    City = s.City,
                    Region = s.Region,
                    Country = s.Country,
                    Phone = s.Phone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    Website = s.Website,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .ToListAsync();

            return suppliers;
        }
    }
}
