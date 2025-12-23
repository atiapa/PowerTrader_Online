using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;
using System;
using System.Threading.Tasks;

namespace PowerTraderPOS.API.Controllers
{
    /// <summary>
    /// Controller for managing return transactions
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ReturnsController : ControllerBase
    {
        private readonly IReturnService _returnService;

        public ReturnsController(IReturnService returnService)
        {
            _returnService = returnService;
        }

        /// <summary>
        /// Create a new return transaction
        /// </summary>
        [HttpPost]
        [Authorize(Roles = "Admin,Sales,Returns")]
        public async Task<ActionResult<ReturnTransactionDto>> CreateReturn([FromBody] CreateReturnTransactionDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _returnService.CreateReturnAsync(dto);
            return CreatedAtAction(nameof(GetReturnById), new { id = result.ReturnId }, result);
        }

        /// <summary>
        /// Get all return transactions
        /// </summary>
        [HttpGet]
        [Authorize(Roles = "Admin,Sales,Returns")]
        public async Task<ActionResult<IEnumerable<ReturnTransactionDto>>> GetAllReturns([FromQuery] string? status = null)
        {
            var returns = await _returnService.GetAllReturnsAsync(status);
            return Ok(returns);
        }

        /// <summary>
        /// Get a specific return transaction by ID
        /// </summary>
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Sales,Returns")]
        public async Task<ActionResult<ReturnTransactionDto>> GetReturnById(int id)
        {
            var returnTransaction = await _returnService.GetReturnByIdAsync(id);
            
            if (returnTransaction == null)
                return NotFound($"Return transaction with ID {id} not found");

            return Ok(returnTransaction);
        }

        /// <summary>
        /// Approve a return transaction
        /// </summary>
        [HttpPost("{id}/approve")]
        [Authorize(Roles = "Admin,Returns")]
        public async Task<ActionResult> ApproveReturn(int id, [FromBody] ApproveReturnDto dto)
        {
            var success = await _returnService.ApproveReturnAsync(id, dto);
            
            if (!success)
                return NotFound($"Return transaction with ID {id} not found or cannot be approved");

            return Ok(new { message = "Return approved successfully and inventory stock increased" });
        }

        /// <summary>
        /// Reject a return transaction
        /// </summary>
        [HttpPost("{id}/reject")]
        [Authorize(Roles = "Admin,Returns")]
        public async Task<ActionResult> RejectReturn(int id, [FromBody] RejectReturnDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = await _returnService.RejectReturnAsync(id, dto);
            
            if (!success)
                return NotFound($"Return transaction with ID {id} not found or cannot be rejected");

            return Ok(new { message = "Return rejected successfully" });
        }

        /// <summary>
        /// Complete a return transaction with refund details
        /// </summary>
        [HttpPost("{id}/complete")]
        [Authorize(Roles = "Admin,Returns")]
        public async Task<ActionResult> CompleteReturn(int id, [FromBody] CompleteReturnDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var success = await _returnService.CompleteReturnAsync(id, dto);
            
            if (!success)
                return NotFound($"Return transaction with ID {id} not found or cannot be completed");

            return Ok(new { message = "Return completed successfully" });
        }

        /// <summary>
        /// Get return report for a date range
        /// </summary>
        [HttpGet("report")]
        [Authorize(Roles = "Admin,Returns")]
        public async Task<ActionResult<ReturnReportDto>> GetReturnReport([FromQuery] DateTime fromDate, [FromQuery] DateTime toDate)
        {
            if (fromDate > toDate)
                return BadRequest("From date must be before or equal to to date");

            var report = await _returnService.GetReturnReportAsync(fromDate, toDate);
            return Ok(report);
        }
    }
}
