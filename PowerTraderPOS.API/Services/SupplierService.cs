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
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    SupplierPhone = s.SupplierPhone,
                    SupplierEmail = s.SupplierEmail,
                    SupplierAddress = s.SupplierAddress,
                    IsActive = s.IsActive
                })
                .ToListAsync();

            return suppliers;
        }

        public async Task<SupplierDto?> GetSupplierByIdAsync(decimal id)
        {
            var supplier = await _context.Suppliers
                .Where(s => s.SupplierId == (int)id)
                .Select(s => new SupplierDto
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    SupplierPhone = s.SupplierPhone,
                    SupplierEmail = s.SupplierEmail,
                    SupplierAddress = s.SupplierAddress,
                    IsActive = s.IsActive
                })
                .FirstOrDefaultAsync();

            return supplier;
        }

        public async Task<SupplierDto> CreateSupplierAsync(CreateSupplierDto dto)
        {
            var supplier = new Suppliers
            {
                SupplierName = dto.SupplierName,
                SupplierPhone = dto.SupplierPhone,
                SupplierEmail = dto.SupplierEmail,
                SupplierAddress = dto.SupplierAddress,
                IsActive = dto.IsActive
            };

            _context.Suppliers.Add(supplier);
            await _context.SaveChangesAsync();

            return new SupplierDto
            {
                SupplierId = supplier.SupplierId,
                SupplierName = supplier.SupplierName,
                SupplierPhone = supplier.SupplierPhone,
                SupplierEmail = supplier.SupplierEmail,
                SupplierAddress = supplier.SupplierAddress,
                IsActive = supplier.IsActive
            };
        }

        public async Task<SupplierDto?> UpdateSupplierAsync(decimal id, UpdateSupplierDto dto)
        {
            var supplier = await _context.Suppliers.FindAsync((int)id);
            if (supplier == null) return null;

            if (dto.SupplierName != null) supplier.SupplierName = dto.SupplierName;
            if (dto.SupplierPhone != null) supplier.SupplierPhone = dto.SupplierPhone;
            if (dto.SupplierEmail != null) supplier.SupplierEmail = dto.SupplierEmail;
            if (dto.SupplierAddress != null) supplier.SupplierAddress = dto.SupplierAddress;
            if (dto.IsActive.HasValue) supplier.IsActive = dto.IsActive;

            await _context.SaveChangesAsync();

            return new SupplierDto
            {
                SupplierId = supplier.SupplierId,
                SupplierName = supplier.SupplierName,
                SupplierPhone = supplier.SupplierPhone,
                SupplierEmail = supplier.SupplierEmail,
                SupplierAddress = supplier.SupplierAddress,
                IsActive = supplier.IsActive
            };
        }

        public async Task<bool> DeleteSupplierAsync(decimal id)
        {
            var supplier = await _context.Suppliers.FindAsync((int)id);
            if (supplier == null) return false;

            supplier.IsActive = false;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<IEnumerable<SupplierDto>> SearchSuppliersAsync(string searchTerm)
        {
            var suppliers = await _context.Suppliers
                .Where(s => s.IsActive == true && 
                    (s.SupplierName!.Contains(searchTerm) || 
                     s.SupplierEmail!.Contains(searchTerm)))
                .Select(s => new SupplierDto
                {
                    SupplierId = s.SupplierId,
                    SupplierName = s.SupplierName,
                    SupplierPhone = s.SupplierPhone,
                    SupplierEmail = s.SupplierEmail,
                    SupplierAddress = s.SupplierAddress,
                    IsActive = s.IsActive
                })
                .ToListAsync();

            return suppliers;
        }
    }
}
