using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StaffController : ControllerBase
    {
        private readonly IStaffService _staffService;

        public StaffController(IStaffService staffService)
        {
            _staffService = staffService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<StaffDto>>> GetAll()
        {
            var staff = await _staffService.GetAllStaffAsync();
            return Ok(staff);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<StaffDto>> GetById(int id)
        {
            var staff = await _staffService.GetStaffByIdAsync(id);
            if (staff == null)
                return NotFound();

            return Ok(staff);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<StaffDto>>> Search([FromQuery] string searchTerm)
        {
            if (string.IsNullOrWhiteSpace(searchTerm))
                return BadRequest("Search term is required");

            var staff = await _staffService.SearchStaffAsync(searchTerm);
            return Ok(staff);
        }

        [Authorize(Roles = "Admin,HR")]
        [HttpPost]
        public async Task<ActionResult<StaffDto>> Create([FromBody] CreateStaffDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var staff = await _staffService.CreateStaffAsync(dto);
            return CreatedAtAction(nameof(GetById), new { id = staff.Refno }, staff);
        }

        [Authorize(Roles = "Admin,HR")]
        [HttpPut("{id}")]
        public async Task<ActionResult<StaffDto>> Update(int id, [FromBody] UpdateStaffDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var staff = await _staffService.UpdateStaffAsync(id, dto);
            if (staff == null)
                return NotFound();

            return Ok(staff);
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _staffService.DeleteStaffAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
