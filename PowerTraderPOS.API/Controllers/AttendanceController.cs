using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AttendanceController : ControllerBase
    {
        private readonly IAttendanceService _service;

        public AttendanceController(IAttendanceService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetAllAttendance()
        {
            var attendance = await _service.GetAllAttendanceAsync();
            return Ok(attendance);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AttendanceDto>> GetAttendanceById(int id)
        {
            var attendance = await _service.GetAttendanceByIdAsync(id);
            if (attendance == null)
                return NotFound();

            return Ok(attendance);
        }

        [HttpGet("staff/{staffId}")]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetAttendanceByStaff(string staffId)
        {
            var attendance = await _service.GetAttendanceByStaffAsync(staffId);
            return Ok(attendance);
        }

        [HttpGet("date-range")]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> GetAttendanceByDateRange(
            [FromQuery] DateTime startDate, 
            [FromQuery] DateTime endDate)
        {
            var attendance = await _service.GetAttendanceByDateRangeAsync(startDate, endDate);
            return Ok(attendance);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<AttendanceDto>>> SearchAttendance([FromQuery] string searchTerm)
        {
            var attendance = await _service.SearchAttendanceAsync(searchTerm);
            return Ok(attendance);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,HR")]
        public async Task<ActionResult<AttendanceDto>> CreateAttendance([FromBody] CreateAttendanceDto dto)
        {
            var attendance = await _service.CreateAttendanceAsync(dto);
            return CreatedAtAction(nameof(GetAttendanceById), new { id = attendance.Refno }, attendance);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin,HR")]
        public async Task<ActionResult<AttendanceDto>> UpdateAttendance(int id, [FromBody] UpdateAttendanceDto dto)
        {
            var attendance = await _service.UpdateAttendanceAsync(id, dto);
            if (attendance == null)
                return NotFound();

            return Ok(attendance);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteAttendance(int id)
        {
            var result = await _service.DeleteAttendanceAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
