using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Models;
using System.Security.Claims;

namespace PowerTraderPOS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class SalesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SalesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleResponse>>> GetSales()
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            
            var sales = await _context.Sales
                .Include(s => s.SaleItems)
                .Where(s => s.TenantId == tenantId)
                .OrderByDescending(s => s.TransactionDate)
                .Take(100)
                .ToListAsync();

            var response = sales.Select(s => new SaleResponse
            {
                Id = s.Id,
                TransactionNumber = s.TransactionNumber,
                TotalAmount = s.TotalAmount,
                TaxAmount = s.TaxAmount,
                DiscountAmount = s.DiscountAmount,
                NetAmount = s.NetAmount,
                PaymentMethod = s.PaymentMethod,
                Status = s.Status,
                TransactionDate = s.TransactionDate,
                CustomerName = s.CustomerName,
                CustomerPhone = s.CustomerPhone,
                Items = s.SaleItems.Select(si => new SaleItemResponse
                {
                    Id = si.Id,
                    ProductName = si.ProductName,
                    ProductCode = si.ProductCode,
                    Quantity = si.Quantity,
                    UnitPrice = si.UnitPrice,
                    TotalPrice = si.TotalPrice,
                    DiscountAmount = si.DiscountAmount,
                    NetPrice = si.NetPrice
                }).ToList()
            }).ToList();

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SaleResponse>> GetSale(int id)
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            
            var sale = await _context.Sales
                .Include(s => s.SaleItems)
                .FirstOrDefaultAsync(s => s.Id == id && s.TenantId == tenantId);

            if (sale == null)
            {
                return NotFound();
            }

            var response = new SaleResponse
            {
                Id = sale.Id,
                TransactionNumber = sale.TransactionNumber,
                TotalAmount = sale.TotalAmount,
                TaxAmount = sale.TaxAmount,
                DiscountAmount = sale.DiscountAmount,
                NetAmount = sale.NetAmount,
                PaymentMethod = sale.PaymentMethod,
                Status = sale.Status,
                TransactionDate = sale.TransactionDate,
                CustomerName = sale.CustomerName,
                CustomerPhone = sale.CustomerPhone,
                Items = sale.SaleItems.Select(si => new SaleItemResponse
                {
                    Id = si.Id,
                    ProductName = si.ProductName,
                    ProductCode = si.ProductCode,
                    Quantity = si.Quantity,
                    UnitPrice = si.UnitPrice,
                    TotalPrice = si.TotalPrice,
                    DiscountAmount = si.DiscountAmount,
                    NetPrice = si.NetPrice
                }).ToList()
            };

            return Ok(response);
        }

        [HttpPost]
        public async Task<ActionResult<SaleResponse>> CreateSale([FromBody] CreateSaleRequest request)
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            var userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value ?? "0");

            var sale = new Sale
            {
                TenantId = tenantId,
                UserId = userId,
                TransactionNumber = GenerateTransactionNumber(),
                TotalAmount = request.TotalAmount,
                TaxAmount = request.TaxAmount,
                DiscountAmount = request.DiscountAmount,
                NetAmount = request.NetAmount,
                PaymentMethod = request.PaymentMethod,
                Status = "Completed",
                TransactionDate = DateTime.UtcNow,
                CustomerName = request.CustomerName,
                CustomerPhone = request.CustomerPhone,
                Notes = request.Notes,
                SaleItems = request.Items.Select(item => new SaleItem
                {
                    ProductName = item.ProductName,
                    ProductCode = item.ProductCode,
                    Quantity = item.Quantity,
                    UnitPrice = item.UnitPrice,
                    TotalPrice = item.TotalPrice,
                    DiscountAmount = item.DiscountAmount,
                    NetPrice = item.NetPrice
                }).ToList()
            };

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            var response = new SaleResponse
            {
                Id = sale.Id,
                TransactionNumber = sale.TransactionNumber,
                TotalAmount = sale.TotalAmount,
                TaxAmount = sale.TaxAmount,
                DiscountAmount = sale.DiscountAmount,
                NetAmount = sale.NetAmount,
                PaymentMethod = sale.PaymentMethod,
                Status = sale.Status,
                TransactionDate = sale.TransactionDate,
                CustomerName = sale.CustomerName,
                CustomerPhone = sale.CustomerPhone,
                Items = sale.SaleItems.Select(si => new SaleItemResponse
                {
                    Id = si.Id,
                    ProductName = si.ProductName,
                    ProductCode = si.ProductCode,
                    Quantity = si.Quantity,
                    UnitPrice = si.UnitPrice,
                    TotalPrice = si.TotalPrice,
                    DiscountAmount = si.DiscountAmount,
                    NetPrice = si.NetPrice
                }).ToList()
            };

            return CreatedAtAction(nameof(GetSale), new { id = sale.Id }, response);
        }

        private string GenerateTransactionNumber()
        {
            return $"TXN{DateTime.UtcNow:yyyyMMddHHmmss}{new Random().Next(1000, 9999)}";
        }
    }
}
