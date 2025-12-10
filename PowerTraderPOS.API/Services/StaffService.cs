using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class StaffService : IStaffService
    {
        private readonly AppDbContext _context;

        public StaffService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<StaffDto>> GetAllStaffAsync()
        {
            var staff = await _context.StaffInformation
                .Where(s => s.IsActive == true)
                .Select(s => new StaffDto
                {
                    Refno = s.Refno,
                    StaffID = s.StaffID,
                    Surname = s.Surname,
                    OtherNames = s.OtherNames,
                    Gender = s.Gender,
                    DateOfBirth = s.DateOfBirth,
                    StreetAddress = s.StreetAddress,
                    City = s.City,
                    Country = s.Country,
                    HomePhone = s.HomePhone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    DateOfEmployment = s.DateOfEmployment,
                    Designation = s.Designation,
                    Department = s.Department,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .ToListAsync();

            return staff;
        }

        public async Task<StaffDto?> GetStaffByIdAsync(int id)
        {
            var staff = await _context.StaffInformation
                .Where(s => s.Refno == id)
                .Select(s => new StaffDto
                {
                    Refno = s.Refno,
                    StaffID = s.StaffID,
                    Surname = s.Surname,
                    OtherNames = s.OtherNames,
                    Gender = s.Gender,
                    DateOfBirth = s.DateOfBirth,
                    StreetAddress = s.StreetAddress,
                    City = s.City,
                    Country = s.Country,
                    HomePhone = s.HomePhone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    DateOfEmployment = s.DateOfEmployment,
                    Designation = s.Designation,
                    Department = s.Department,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .FirstOrDefaultAsync();

            return staff;
        }

        public async Task<StaffDto> CreateStaffAsync(CreateStaffDto dto)
        {
            var staff = new StaffInformation
            {
                StaffID = dto.StaffID,
                Surname = dto.Surname,
                OtherNames = dto.OtherNames,
                Gender = dto.Gender,
                DateOfBirth = dto.DateOfBirth,
                StreetAddress = dto.StreetAddress,
                City = dto.City,
                Country = dto.Country,
                HomePhone = dto.HomePhone,
                CellPhone = dto.CellPhone,
                Email = dto.Email,
                DateOfEmployment = dto.DateOfEmployment,
                Designation = dto.Designation,
                Department = dto.Department,
                OrganisationName = dto.OrganisationName,
                BranchName = dto.BranchName,
                // EntryDate property doesn't exist in simplified model
                IsActive = true
            };

            _context.StaffInformation.Add(staff);
            await _context.SaveChangesAsync();

            return new StaffDto
            {
                Refno = staff.Refno,
                StaffID = staff.StaffID,
                Surname = staff.Surname,
                OtherNames = staff.OtherNames,
                Gender = staff.Gender,
                DateOfBirth = staff.DateOfBirth,
                StreetAddress = staff.StreetAddress,
                City = staff.City,
                Country = staff.Country,
                HomePhone = staff.HomePhone,
                CellPhone = staff.CellPhone,
                Email = staff.Email,
                DateOfEmployment = staff.DateOfEmployment,
                Designation = staff.Designation,
                Department = staff.Department,
                OrganisationName = staff.OrganisationName,
                BranchName = staff.BranchName
            };
        }

        public async Task<StaffDto?> UpdateStaffAsync(int id, UpdateStaffDto dto)
        {
            var staff = await _context.StaffInformation.FindAsync(id);
            if (staff == null) return null;

            staff.Surname = dto.Surname ?? staff.Surname;
            staff.OtherNames = dto.OtherNames ?? staff.OtherNames;
            staff.StreetAddress = dto.StreetAddress ?? staff.StreetAddress;
            staff.City = dto.City ?? staff.City;
            staff.Country = dto.Country ?? staff.Country;
            staff.HomePhone = dto.HomePhone ?? staff.HomePhone;
            staff.CellPhone = dto.CellPhone ?? staff.CellPhone;
            staff.Email = dto.Email ?? staff.Email;
            staff.Designation = dto.Designation ?? staff.Designation;
            staff.Department = dto.Department ?? staff.Department;
            
            if (dto.DateOfBirth.HasValue) staff.DateOfBirth = dto.DateOfBirth;
            if (dto.DateOfEmployment.HasValue) staff.DateOfEmployment = dto.DateOfEmployment;

            await _context.SaveChangesAsync();

            return new StaffDto
            {
                Refno = staff.Refno,
                StaffID = staff.StaffID,
                Surname = staff.Surname,
                OtherNames = staff.OtherNames,
                Gender = staff.Gender,
                DateOfBirth = staff.DateOfBirth,
                StreetAddress = staff.StreetAddress,
                City = staff.City,
                Country = staff.Country,
                HomePhone = staff.HomePhone,
                CellPhone = staff.CellPhone,
                Email = staff.Email,
                DateOfEmployment = staff.DateOfEmployment,
                Designation = staff.Designation,
                Department = staff.Department,
                OrganisationName = staff.OrganisationName,
                BranchName = staff.BranchName
            };
        }

        public async Task<bool> DeleteStaffAsync(int id)
        {
            var staff = await _context.StaffInformation.FindAsync(id);
            if (staff == null) return false;

            staff.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<StaffDto>> SearchStaffAsync(string searchTerm)
        {
            var staff = await _context.StaffInformation
                .Where(s => s.IsActive == true && 
                    (s.Surname!.Contains(searchTerm) || 
                     s.StaffID!.Contains(searchTerm) ||
                     s.CellPhone!.Contains(searchTerm)))
                .Select(s => new StaffDto
                {
                    Refno = s.Refno,
                    StaffID = s.StaffID,
                    Surname = s.Surname,
                    OtherNames = s.OtherNames,
                    Gender = s.Gender,
                    DateOfBirth = s.DateOfBirth,
                    StreetAddress = s.StreetAddress,
                    City = s.City,
                    Country = s.Country,
                    HomePhone = s.HomePhone,
                    CellPhone = s.CellPhone,
                    Email = s.Email,
                    DateOfEmployment = s.DateOfEmployment,
                    Designation = s.Designation,
                    Department = s.Department,
                    OrganisationName = s.OrganisationName,
                    BranchName = s.BranchName
                })
                .ToListAsync();

            return staff;
        }
    }
}
