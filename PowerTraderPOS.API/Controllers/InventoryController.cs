using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class InventoryController : ControllerBase
    {
        private readonly IInventoryService _inventoryService;

        public InventoryController(IInventoryService inventoryService)
        {
            _inventoryService = inventoryService;
        }

        /// <summary>
        /// Get all retail items (tenant-filtered)
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin,Sales,Inventory")]
        public async Task<ActionResult<IEnumerable<RetailItemsDto>>> GetAllItems()
        {
            try
            {
                var items = await _inventoryService.GetAllItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving items", error = ex.Message });
            }
        }

        /// <summary>
        /// Get retail item by product ID
        /// </summary>
        [HttpGet("{productId}")]
        [Authorize(Roles = "Admin,Sales,Inventory")]
        public async Task<ActionResult<RetailItemsDto>> GetItemById(string productId)
        {
            try
            {
                var item = await _inventoryService.GetItemByIdAsync(productId);
                
                if (item == null)
                    return NotFound(new { message = "Item not found or access denied" });

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving item", error = ex.Message });
            }
        }

        /// <summary>
        /// Create new retail item
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin,Inventory")]
        public async Task<ActionResult<RetailItemsDto>> CreateItem([FromBody] CreateRetailItemsDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var item = await _inventoryService.CreateItemAsync(dto);
                return CreatedAtAction(nameof(GetItemById), new { productId = item.ProductId }, item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error creating item", error = ex.Message });
            }
        }

        /// <summary>
        /// Update retail item
        /// </summary>
        [HttpPut("{productId}")]
        [Authorize(Roles = "Admin,Inventory")]
        public async Task<ActionResult<RetailItemsDto>> UpdateItem(string productId, [FromBody] UpdateRetailItemsDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var item = await _inventoryService.UpdateItemAsync(productId, dto);
                
                if (item == null)
                    return NotFound(new { message = "Item not found or access denied" });

                return Ok(item);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error updating item", error = ex.Message });
            }
        }

        /// <summary>
        /// Delete retail item
        /// </summary>
        [HttpDelete("{productId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteItem(string productId)
        {
            try
            {
                var result = await _inventoryService.DeleteItemAsync(productId);
                
                if (!result)
                    return NotFound(new { message = "Item not found or access denied" });

                return Ok(new { message = "Item deleted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error deleting item", error = ex.Message });
            }
        }

        /// <summary>
        /// Adjust stock level (add, subtract, or set)
        /// </summary>
        [HttpPost("adjust-stock")]
        [Authorize(Roles = "Admin,Inventory")]
        public async Task<ActionResult> AdjustStock([FromBody] StockAdjustmentDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var result = await _inventoryService.AdjustStockAsync(dto);
                
                if (!result)
                    return BadRequest(new { message = "Stock adjustment failed. Check product ID, quantity, and operation type." });

                return Ok(new { message = "Stock adjusted successfully" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error adjusting stock", error = ex.Message });
            }
        }

        /// <summary>
        /// Get current stock level for a product
        /// </summary>
        [HttpGet("stock-level/{productId}")]
        [Authorize(Roles = "Admin,Sales,Inventory")]
        public async Task<ActionResult<decimal>> GetStockLevel(string productId)
        {
            try
            {
                var stockLevel = await _inventoryService.GetStockLevelAsync(productId);
                return Ok(new { productId, stockLevel });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving stock level", error = ex.Message });
            }
        }

        /// <summary>
        /// Get items with low stock (below reorder level)
        /// </summary>
        [HttpGet("low-stock")]
        [Authorize(Roles = "Admin,Inventory")]
        public async Task<ActionResult<IEnumerable<LowStockItemDto>>> GetLowStockItems()
        {
            try
            {
                var items = await _inventoryService.GetLowStockItemsAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error retrieving low stock items", error = ex.Message });
            }
        }

        /// <summary>
        /// Search retail items by name, barcode, or product ID
        /// </summary>
        [HttpGet("search")]
        [Authorize(Roles = "Admin,Sales,Inventory")]
        public async Task<ActionResult<IEnumerable<RetailItemsDto>>> SearchItems([FromQuery] string searchTerm)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(searchTerm))
                    return BadRequest(new { message = "Search term is required" });

                var items = await _inventoryService.SearchItemsAsync(searchTerm);
                return Ok(items);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Error searching items", error = ex.Message });
            }
        }
    }
}
