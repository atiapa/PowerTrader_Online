using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PowerTraderPOS.API.DTOs;
using PowerTraderPOS.API.Services.Interfaces;

namespace PowerTraderPOS.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly IBranchService _service;

        public BranchesController(IBranchService service)
        {
            _service = service;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<BranchDto>>> GetAllBranches()
        {
            var branches = await _service.GetAllBranchesAsync();
            return Ok(branches);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BranchDto>> GetBranchById(decimal id)
        {
            var branch = await _service.GetBranchByIdAsync(id);
            if (branch == null)
                return NotFound();

            return Ok(branch);
        }

        [HttpGet("organisation/{organisationCode}")]
        public async Task<ActionResult<IEnumerable<BranchDto>>> GetBranchesByOrganisation(string organisationCode)
        {
            var branches = await _service.GetBranchesByOrganisationAsync(organisationCode);
            return Ok(branches);
        }

        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<BranchDto>>> SearchBranches([FromQuery] string searchTerm)
        {
            var branches = await _service.SearchBranchesAsync(searchTerm);
            return Ok(branches);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BranchDto>> CreateBranch([FromBody] CreateBranchDto dto)
        {
            var branch = await _service.CreateBranchAsync(dto);
            return CreatedAtAction(nameof(GetBranchById), new { id = branch.RefNo }, branch);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<BranchDto>> UpdateBranch(decimal id, [FromBody] UpdateBranchDto dto)
        {
            var branch = await _service.UpdateBranchAsync(id, dto);
            if (branch == null)
                return NotFound();

            return Ok(branch);
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteBranch(decimal id)
        {
            var result = await _service.DeleteBranchAsync(id);
            if (!result)
                return NotFound();

            return NoContent();
        }
    }
}
