using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class SalesDetailsController : ControllerBase
    {
        private readonly ISalesDetailsService _service;

        public SalesDetailsController(ISalesDetailsService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<SalesDetailsDto>>> GetAllSalesDetails()
        {
            var salesDetails = await _service.GetAllSalesDetailsAsync();
            return Ok(salesDetails);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<SalesDetailsDto>> GetSalesDetailsById(decimal id)
        {
            var salesDetail = await _service.GetSalesDetailsByIdAsync(id);
            if (salesDetail == null)
                return NotFound();

            return Ok(salesDetail);
        }

        [HttpGet("invoice/{invoiceNr}")]
        public async Task<ActionResult<IEnumerable<SalesDetailsDto>>> GetSalesByInvoice(string invoiceNr)
        {
            var salesDetails = await _service.GetSalesByInvoiceAsync(invoiceNr);
            return Ok(salesDetails);
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<SalesDetailsDto>>> GetSalesByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var salesDetails = await _service.GetSalesByDateRangeAsync(startDate, endDate);
            return Ok(salesDetails);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<SalesDetailsDto>>> SearchSalesDetails([FromQuery] string searchTerm)
        {
            var salesDetails = await _service.SearchSalesDetailsAsync(searchTerm);
            return Ok(salesDetails);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Sales,Finance")]
        public async Task<ActionResult<SalesDetailsDto>> CreateSalesDetails([FromBody] CreateSalesDetailsDto dto)
        {
            var salesDetail = await _service.CreateSalesDetailsAsync(dto);
            return CreatedAtAction(nameof(GetSalesDetailsById), new { id = salesDetail.RefNo }, salesDetail);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Sales,Finance")]
        public async Task<ActionResult<SalesDetailsDto>> UpdateSalesDetails(decimal id, [FromBody] UpdateSalesDetailsDto dto)
        {
            var salesDetail = await _service.UpdateSalesDetailsAsync(id, dto);
            if (salesDetail == null)
                return NotFound();

            return Ok(salesDetail);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteSalesDetails(decimal id)
        {
            var result = await _service.DeleteSalesDetailsAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
