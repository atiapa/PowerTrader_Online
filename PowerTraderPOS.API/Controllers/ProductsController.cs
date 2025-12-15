using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Data;
using PowerTraderPOS.API.Models;

namespace PowerTraderPOS.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            
            var products = await _context.Products
                .Where(p => p.TenantId == tenantId && p.IsActive)
                .OrderBy(p => p.Name)
                .ToListAsync();

            return Ok(products);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Id == id && p.TenantId == tenantId);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }

        [HttpGet("search/{code}")]
        public async Task<ActionResult<Product>> GetProductByCode(string code)
        {
            var tenantId = int.Parse(User.FindFirst("TenantId")?.Value ?? "0");
            
            var product = await _context.Products
                .FirstOrDefaultAsync(p => p.Code == code && p.TenantId == tenantId && p.IsActive);

            if (product == null)
            {
                return NotFound();
            }

            return Ok(product);
        }
    }
}
