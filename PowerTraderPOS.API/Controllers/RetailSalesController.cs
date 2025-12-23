using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Controllers
{
    /// <summary>
    /// Controller for retail sales operations including hold orders
    /// </summary>
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class RetailSalesController : ControllerBase
    {
        private readonly IRetailSalesService _retailSalesService;

        public RetailSalesController(IRetailSalesService retailSalesService)
        {
            _retailSalesService = retailSalesService;
        }

        /// <summary>
        /// Hold current order for later completion
        /// </summary>
        /// <param name="dto">Order details to hold</param>
        /// <returns>Pending sale with hold reference</returns>
        [HttpPost("hold-order")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<CashSalesPendingDto>> HoldOrder([FromBody] CreateCashSalesPendingDto dto)
        {
            try
            {
                var result = await _retailSalesService.HoldOrderAsync(dto);
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get all pending sales for the current tenant
        /// </summary>
        /// <returns>List of pending sales</returns>
        [HttpGet("pending-sales")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult> GetAllPendingSales()
        {
            try
            {
                var result = await _retailSalesService.GetAllPendingSalesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get pending sales for the current cashier
        /// </summary>
        /// <returns>List of pending sales for current user</returns>
        [HttpGet("pending-sales/cashier")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult> GetCashierPendingSales()
        {
            try
            {
                var result = await _retailSalesService.GetCashierPendingSalesAsync();
                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get a specific pending sale by ID
        /// </summary>
        /// <param name="id">Pending sale ID</param>
        /// <returns>Pending sale details</returns>
        [HttpGet("pending-sales/{id}")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<CashSalesPendingDto>> GetPendingSaleById(int id)
        {
            try
            {
                var result = await _retailSalesService.GetPendingSaleByIdAsync(id);
                if (result == null)
                    return NotFound(new { message = "Pending sale not found" });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Get a pending sale by hold reference
        /// </summary>
        /// <param name="reference">Hold reference number</param>
        /// <returns>Pending sale details</returns>
        [HttpGet("pending-sales/reference/{reference}")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<CashSalesPendingDto>> GetPendingSaleByReference(string reference)
        {
            try
            {
                var result = await _retailSalesService.GetPendingSaleByReferenceAsync(reference);
                if (result == null)
                    return NotFound(new { message = "Pending sale not found" });

                return Ok(result);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Retrieve a held order to resume transaction
        /// </summary>
        /// <param name="id">Pending sale ID</param>
        /// <returns>Retrieved order details</returns>
        [HttpPost("retrieve-pending/{id}")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult<RetrievePendingSaleDto>> RetrievePendingOrder(int id)
        {
            try
            {
                var result = await _retailSalesService.RetrievePendingOrderAsync(id);
                if (result == null)
                    return NotFound(new { message = "Pending sale not found" });

                return Ok(result);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(new { message = ex.Message });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Cancel a held order
        /// </summary>
        /// <param name="id">Pending sale ID</param>
        /// <returns>Success message</returns>
        [HttpDelete("cancel-pending/{id}")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult> CancelPendingOrder(int id)
        {
            try
            {
                var result = await _retailSalesService.CancelPendingOrderAsync(id);
                if (!result)
                    return NotFound(new { message = "Pending sale not found" });

                return Ok(new { message = "Pending sale cancelled successfully" });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        /// <summary>
        /// Complete a retail sale (placeholder for future implementation)
        /// </summary>
        /// <returns>Success message</returns>
        [HttpPost("complete-sale")]
        [Authorize(Roles = "Admin,Sales")]
        public async Task<ActionResult> CompleteSale()
        {
            try
            {
                var result = await _retailSalesService.CompleteSaleAsync();
                return Ok(new { message = "Sale completed successfully", success = result });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
