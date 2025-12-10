using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StockMasterController : ControllerBase
    {
        private readonly IStockMasterService _service;

        public StockMasterController(IStockMasterService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StockMasterDto>>> GetAllStock()
        {
            var stock = await _service.GetAllStockAsync();
            return Ok(stock);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StockMasterDto>> GetStockById(decimal id)
        {
            var stock = await _service.GetStockByIdAsync(id);
            if (stock == null)
                return NotFound();

            return Ok(stock);
        }

        [HttpGet("product/{productName}")]
        public async Task<ActionResult<IEnumerable<StockMasterDto>>> GetStockByProduct(string productName)
        {
            var stock = await _service.GetStockByProductAsync(productName);
            return Ok(stock);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<StockMasterDto>>> SearchStock([FromQuery] string searchTerm)
        {
            var stock = await _service.SearchStockAsync(searchTerm);
            return Ok(stock);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<StockMasterDto>> CreateStock([FromBody] CreateStockMasterDto dto)
        {
            var stock = await _service.CreateStockAsync(dto);
            return CreatedAtAction(nameof(GetStockById), new { id = stock.Refno }, stock);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<StockMasterDto>> UpdateStock(decimal id, [FromBody] UpdateStockMasterDto dto)
        {
            var stock = await _service.UpdateStockAsync(id, dto);
            if (stock == null)
                return NotFound();

            return Ok(stock);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteStock(decimal id)
        {
            var result = await _service.DeleteStockAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
