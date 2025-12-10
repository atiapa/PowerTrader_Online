using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SuppliersController : ControllerBase
    {
        private readonly ISupplierService _supplierService;

        public SuppliersController(ISupplierService supplierService)
        {
            _supplierService = supplierService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> GetAll()
        {
            var suppliers = await _supplierService.GetAllSuppliersAsync();
            return Ok(suppliers);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SupplierDto>> GetById(decimal id)
        {
            var supplier = await _supplierService.GetSupplierByIdAsync(id);
            if (supplier == null)
                return NotFound();

            return Ok(supplier);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<SupplierDto>>> Search([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Search term is required");

            var suppliers = await _supplierService.SearchSuppliersAsync(searchTerm);
            return Ok(suppliers);
        }

        [Authorize(Roles = "Admin,Suppliers")]
        [HttpPost]
        public async Task<ActionResult<SupplierDto>> Create([FromBody] CreateSupplierDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supplier = await _supplierService.CreateSupplierAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = supplier.SNo }, supplier);
        }

        [Authorize(Roles = "Admin,Suppliers")]
        [HttpPut("{id}")]
        public async Task<ActionResult<SupplierDto>> Update(decimal id, [FromBody] UpdateSupplierDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var supplier = await _supplierService.UpdateSupplierAsync(id, dto);
            if (supplier == null)
                return NotFound();

            return Ok(supplier);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(decimal id)
        {
            var result = await _supplierService.DeleteSupplierAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
