using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Tables;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly AppDbContext _context;

        public CustomerService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<CustomerDto>> GetAllCustomersAsync()
        {
            var customers = await _context.Set<CustomerInfo>()
                .Select(c => new CustomerDto
                {
                    Refno = c.Refno,
                    AccountName = c.AccountName,
                    Surname = c.Surname,
                    Othernames = c.Othernames,
                    AccountNr = c.AccountNr,
                    Address = c.Address,
                    CityTown = c.CityTown,
                    RegionState = c.RegionState,
                    PhoneNr = c.PhoneNr,
                    CreditLimit = c.CreditLimit,
                    CustomerType = c.CustomerType,
                    SalesRep = c.SalesRep,
                    OpeningBalance = c.OpeningBalance,
                    Email = c.Email,
                    DigitalAddress = c.DigitalAddress,
                    Barcodenr = c.Barcodenr,
                    OrganisationName = c.OrganisationName,
                    BranchName = c.BranchName
                })
                .ToListAsync();

            return customers;
        }

        public async Task<CustomerDto?> GetCustomerByIdAsync(decimal id)
        {
            var customer = await _context.Set<CustomerInfo>()
                .Where(c => c.Refno == id)
                .Select(c => new CustomerDto
                {
                    Refno = c.Refno,
                    AccountName = c.AccountName,
                    Surname = c.Surname,
                    Othernames = c.Othernames,
                    AccountNr = c.AccountNr,
                    Address = c.Address,
                    CityTown = c.CityTown,
                    RegionState = c.RegionState,
                    PhoneNr = c.PhoneNr,
                    CreditLimit = c.CreditLimit,
                    CustomerType = c.CustomerType,
                    SalesRep = c.SalesRep,
                    OpeningBalance = c.OpeningBalance,
                    Email = c.Email,
                    DigitalAddress = c.DigitalAddress,
                    Barcodenr = c.Barcodenr,
                    OrganisationName = c.OrganisationName,
                    BranchName = c.BranchName
                })
                .FirstOrDefaultAsync();

            return customer;
        }

        public async Task<CustomerDto> CreateCustomerAsync(CreateCustomerDto dto)
        {
            var customer = new CustomerInfo
            {
                AccountName = dto.AccountName,
                Surname = dto.Surname,
                Othernames = dto.Othernames,
                AccountNr = dto.AccountNr,
                Address = dto.Address,
                CityTown = dto.CityTown,
                RegionState = dto.RegionState,
                PhoneNr = dto.PhoneNr,
                CreditLimit = dto.CreditLimit,
                CustomerType = dto.CustomerType,
                SalesRep = dto.SalesRep,
                OpeningBalance = dto.OpeningBalance,
                Email = dto.Email,
                DigitalAddress = dto.DigitalAddress,
                Barcodenr = dto.Barcodenr,
                OrganisationName = dto.OrganisationName,
                BranchName = dto.BranchName
            };

            _context.Set<CustomerInfo>().Add(customer);
            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Refno = customer.Refno,
                AccountName = customer.AccountName,
                Surname = customer.Surname,
                Othernames = customer.Othernames,
                AccountNr = customer.AccountNr,
                Address = customer.Address,
                CityTown = customer.CityTown,
                RegionState = customer.RegionState,
                PhoneNr = customer.PhoneNr,
                CreditLimit = customer.CreditLimit,
                CustomerType = customer.CustomerType,
                SalesRep = customer.SalesRep,
                OpeningBalance = customer.OpeningBalance,
                Email = customer.Email,
                DigitalAddress = customer.DigitalAddress,
                Barcodenr = customer.Barcodenr,
                OrganisationName = customer.OrganisationName,
                BranchName = customer.BranchName
            };
        }

        public async Task<CustomerDto?> UpdateCustomerAsync(decimal id, UpdateCustomerDto dto)
        {
            var customer = await _context.Set<CustomerInfo>().FirstOrDefaultAsync(c => c.Refno == id);
            if (customer == null) return null;

            if (dto.AccountName != null) customer.AccountName = dto.AccountName;
            if (dto.Surname != null) customer.Surname = dto.Surname;
            if (dto.Othernames != null) customer.Othernames = dto.Othernames;
            if (dto.Address != null) customer.Address = dto.Address;
            if (dto.CityTown != null) customer.CityTown = dto.CityTown;
            if (dto.RegionState != null) customer.RegionState = dto.RegionState;
            if (dto.PhoneNr != null) customer.PhoneNr = dto.PhoneNr;
            if (dto.Email != null) customer.Email = dto.Email;
            if (dto.DigitalAddress != null) customer.DigitalAddress = dto.DigitalAddress;
            if (dto.CreditLimit.HasValue) customer.CreditLimit = dto.CreditLimit;
            if (dto.OpeningBalance.HasValue) customer.OpeningBalance = dto.OpeningBalance;

            await _context.SaveChangesAsync();

            return new CustomerDto
            {
                Refno = customer.Refno,
                AccountName = customer.AccountName,
                Surname = customer.Surname,
                Othernames = customer.Othernames,
                AccountNr = customer.AccountNr,
                Address = customer.Address,
                CityTown = customer.CityTown,
                RegionState = customer.RegionState,
                PhoneNr = customer.PhoneNr,
                CreditLimit = customer.CreditLimit,
                CustomerType = customer.CustomerType,
                SalesRep = customer.SalesRep,
                OpeningBalance = customer.OpeningBalance,
                Email = customer.Email,
                DigitalAddress = customer.DigitalAddress,
                Barcodenr = customer.Barcodenr,
                OrganisationName = customer.OrganisationName,
                BranchName = customer.BranchName
            };
        }

        public async Task<bool> DeleteCustomerAsync(decimal id)
        {
            var customer = await _context.Set<CustomerInfo>().FirstOrDefaultAsync(c => c.Refno == id);
            if (customer == null) return false;

            _context.Set<CustomerInfo>().Remove(customer);
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<CustomerDto>> SearchCustomersAsync(string searchTerm)
        {
            var customers = await _context.Set<CustomerInfo>()
                .Where(c => 
                    (c.AccountName != null && c.AccountName.Contains(searchTerm)) || 
                    (c.Surname != null && c.Surname.Contains(searchTerm)) ||
                    (c.AccountNr != null && c.AccountNr.Contains(searchTerm)) ||
                    (c.PhoneNr != null && c.PhoneNr.Contains(searchTerm)))
                .Select(c => new CustomerDto
                {
                    Refno = c.Refno,
                    AccountName = c.AccountName,
                    Surname = c.Surname,
                    Othernames = c.Othernames,
                    AccountNr = c.AccountNr,
                    Address = c.Address,
                    CityTown = c.CityTown,
                    RegionState = c.RegionState,
                    PhoneNr = c.PhoneNr,
                    CreditLimit = c.CreditLimit,
                    CustomerType = c.CustomerType,
                    SalesRep = c.SalesRep,
                    OpeningBalance = c.OpeningBalance,
                    Email = c.Email,
                    DigitalAddress = c.DigitalAddress,
                    Barcodenr = c.Barcodenr,
                    OrganisationName = c.OrganisationName,
                    BranchName = c.BranchName
                })
                .ToListAsync();

            return customers;
        }
    }
}
