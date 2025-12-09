using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models.Existing;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Services
{
    public class SalesDetailsService : ISalesDetailsService
    {
        private readonly AppDbContext _context;

        public SalesDetailsService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<SalesDetailsDto>> GetAllSalesDetailsAsync()
        {
            return await _context.SalesDetails
                .Select(s => new SalesDetailsDto
                {
                    RefNo = s.SaleId,
                    InvoiceNr = s.InvoiceNo,
                    EntryDate = s.SaleDate,
                    ExtendedPrice = s.TotalAmount,
                    Tax = s.TaxAmount,
                    Discount = sale.DiscountAmount,
                    Amountpaid = s.NetAmount
                })
                .ToListAsync();
        }

        public async Task<SalesDetailsDto?> GetSalesDetailsByIdAsync(decimal id)
        {
            var sale = await _context.SalesDetails.FindAsync((int)id);
            if (sale == null) return null;

            return new SalesDetailsDto
            {
                RefNo = sale.SaleId,
                InvoiceNr = sale.InvoiceNo,
                EntryDate = sale.SaleDate,
                ExtendedPrice = sale.TotalAmount,
                Tax = sale.TaxAmount,
                Discount = sale.DiscountAmount
            };
        }

        public async Task<SalesDetailsDto> CreateSalesDetailsAsync(CreateSalesDetailsDto dto)
        {
            var sale = new SalesDetails
            {
                InvoiceNo = dto.InvoiceNr,
                SaleDate = DateTime.Now,
                TotalAmount = dto.ExtendedPrice,
                TaxAmount = dto.Tax,
                DiscountAmount = dto.Discount,
                NetAmount = dto.ExtendedPrice - dto.Discount + dto.Tax,
                PaymentMethod = "Cash",
                Status = "Completed"
            };

            _context.SalesDetails.Add(sale);
            await _context.SaveChangesAsync();

            return await GetSalesDetailsByIdAsync(sale.SaleId) ?? throw new InvalidOperationException();
        }

        public async Task<SalesDetailsDto?> UpdateSalesDetailsAsync(decimal id, UpdateSalesDetailsDto dto)
        {
            var sale = await _context.SalesDetails.FindAsync((int)id);
            if (sale == null) return null;

            if (dto.ExtendedPrice.HasValue) sale.TotalAmount = dto.ExtendedPrice;
            if (dto.Tax.HasValue) sale.TaxAmount = dto.Tax;
            if (dto.Discount.HasValue) sale.DiscountAmount = dto.Discount;

            await _context.SaveChangesAsync();
            return await GetSalesDetailsByIdAsync(id);
        }

        public async Task<bool> DeleteSalesDetailsAsync(decimal id)
        {
            var sale = await _context.SalesDetails.FindAsync((int)id);
            if (sale == null) return false;

            _context.SalesDetails.Remove(sale);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<IEnumerable<SalesDetailsDto>> SearchSalesDetailsAsync(string searchTerm)
        {
            return await _context.SalesDetails
                .Where(s => (s.InvoiceNo != null && s.InvoiceNo.Contains(searchTerm)))
                .Select(s => new SalesDetailsDto
                {
                    RefNo = s.SaleId,
                    InvoiceNr = s.InvoiceNo,
                    EntryDate = s.SaleDate,
                    ExtendedPrice = s.TotalAmount
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<SalesDetailsDto>> GetSalesByInvoiceAsync(string invoiceNr)
        {
            return await _context.SalesDetails
                .Where(s => s.InvoiceNo == invoiceNr)
                .Select(s => new SalesDetailsDto
                {
                    RefNo = s.SaleId,
                    InvoiceNr = s.InvoiceNo,
                    EntryDate = s.SaleDate,
                    ExtendedPrice = s.TotalAmount
                })
                .ToListAsync();
        }

        public async Task<IEnumerable<SalesDetailsDto>> GetSalesByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.SalesDetails
                .Where(s => s.SaleDate >= startDate && s.SaleDate <= endDate)
                .Select(s => new SalesDetailsDto
                {
                    RefNo = s.SaleId,
                    InvoiceNr = s.InvoiceNo,
                    EntryDate = s.SaleDate,
                    ExtendedPrice = s.TotalAmount
                })
                .ToListAsync();
        }
    }
}
