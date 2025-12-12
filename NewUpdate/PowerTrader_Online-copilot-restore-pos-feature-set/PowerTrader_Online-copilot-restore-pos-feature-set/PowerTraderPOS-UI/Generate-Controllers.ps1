# Generate Controllers for all models
param(
    [string]$ModelsPath = ".\Models",
    [string]$OutputPath = ".\Controllers"
)

# Create output directory
New-Item -ItemType Directory -Force -Path $OutputPath | Out-Null

# Get all model files
$modelFiles = Get-ChildItem -Path $ModelsPath -Filter "*.cs"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Controller Generator for POS Backend" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$count = 0

foreach ($file in $modelFiles) {
    $className = $file.BaseName
    
    # Skip if it's the DbContext
    if ($className -eq "POSDbContext") { 
        Write-Host "⏭️  Skipping DbContext: $className" -ForegroundColor Yellow
        continue 
    }
    
    $count++
    Write-Host "[$count] Generating Controller for: $className" -ForegroundColor Green
    
    # Pluralize for route (simple approach)
    $routeName = $className + "s"
    
    $controllerContent = @"
using Microsoft.AspNetCore.Mvc;
using YourBackendProject.DTOs;
using YourBackendProject.Services;

namespace YourBackendProject.Controllers
{
    /// <summary>
    /// API Controller for $className operations
    /// </summary>
    [ApiController]
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class ${className}Controller : ControllerBase
    {
        private readonly I${className}Service _service;
        private readonly ILogger<${className}Controller> _logger;
        
        public ${className}Controller(
            I${className}Service service,
            ILogger<${className}Controller> logger)
        {
            _service = service;
            _logger = logger;
        }
        
        /// <summary>
        /// Get all ${className} records
        /// </summary>
        /// <returns>List of ${className}</returns>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<${className}Dto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<${className}Dto>>> GetAll()
        {
            try
            {
                var items = await _service.GetAllAsync();
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all ${className} records");
                return StatusCode(500, new { error = "An error occurred while retrieving records" });
            }
        }
        
        /// <summary>
        /// Get ${className} by ID
        /// </summary>
        /// <param name="id">The ID of the ${className}</param>
        /// <returns>The ${className} record</returns>
        [HttpGet("{id}")]
        [ProducesResponseType(typeof(${className}Dto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<${className}Dto>> GetById(int id)
        {
            try
            {
                var item = await _service.GetByIdAsync(id);
                if (item == null)
                {
                    return NotFound(new { error = `"${className} with id {id} not found`" });
                }
                    
                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} with id {Id}", id);
                return StatusCode(500, new { error = "An error occurred while retrieving the record" });
            }
        }
        
        /// <summary>
        /// Get ${className} by organisation code
        /// </summary>
        /// <param name="code">Organisation code</param>
        /// <returns>List of ${className} for the organisation</returns>
        [HttpGet("organisation/{code}")]
        [ProducesResponseType(typeof(IEnumerable<${className}Dto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<${className}Dto>>> GetByOrganisation(string code)
        {
            try
            {
                var items = await _service.GetByOrganisationAsync(code);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} for organisation {Code}", code);
                return StatusCode(500, new { error = "An error occurred while retrieving records" });
            }
        }
        
        /// <summary>
        /// Get ${className} by branch code
        /// </summary>
        /// <param name="code">Branch code</param>
        /// <returns>List of ${className} for the branch</returns>
        [HttpGet("branch/{code}")]
        [ProducesResponseType(typeof(IEnumerable<${className}Dto>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<IEnumerable<${className}Dto>>> GetByBranch(string code)
        {
            try
            {
                var items = await _service.GetByBranchAsync(code);
                return Ok(items);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} for branch {Code}", code);
                return StatusCode(500, new { error = "An error occurred while retrieving records" });
            }
        }
        
        /// <summary>
        /// Create a new ${className}
        /// </summary>
        /// <param name="dto">The ${className} data to create</param>
        /// <returns>The created ${className}</returns>
        [HttpPost]
        [ProducesResponseType(typeof(${className}Dto), StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<${className}Dto>> Create([FromBody] Create${className}Dto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var item = await _service.CreateAsync(dto);
                return CreatedAtAction(nameof(GetById), new { id = item.Id }, item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ${className}");
                return StatusCode(500, new { error = "An error occurred while creating the record" });
            }
        }
        
        /// <summary>
        /// Update an existing ${className}
        /// </summary>
        /// <param name="id">The ID of the ${className} to update</param>
        /// <param name="dto">The updated ${className} data</param>
        /// <returns>The updated ${className}</returns>
        [HttpPut("{id}")]
        [ProducesResponseType(typeof(${className}Dto), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<${className}Dto>> Update(int id, [FromBody] Update${className}Dto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                
                var item = await _service.UpdateAsync(id, dto);
                if (item == null)
                {
                    return NotFound(new { error = `"${className} with id {id} not found`" });
                }
                    
                return Ok(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating ${className} with id {Id}", id);
                return StatusCode(500, new { error = "An error occurred while updating the record" });
            }
        }
        
        /// <summary>
        /// Delete a ${className}
        /// </summary>
        /// <param name="id">The ID of the ${className} to delete</param>
        /// <returns>No content if successful</returns>
        [HttpDelete("{id}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var result = await _service.DeleteAsync(id);
                if (!result)
                {
                    return NotFound(new { error = `"${className} with id {id} not found`" });
                }
                    
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ${className} with id {Id}", id);
                return StatusCode(500, new { error = "An error occurred while deleting the record" });
            }
        }
        
        /// <summary>
        /// Check if ${className} exists
        /// </summary>
        /// <param name="id">The ID to check</param>
        /// <returns>True if exists, false otherwise</returns>
        [HttpHead("{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<ActionResult> Exists(int id)
        {
            try
            {
                var exists = await _service.ExistsAsync(id);
                return exists ? Ok() : NotFound();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking existence of ${className} with id {Id}", id);
                return StatusCode(500);
            }
        }
    }
}
"@
    
    # Write to file
    $controllerContent | Out-File -FilePath "$OutputPath\${className}Controller.cs" -Encoding UTF8
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Successfully generated $count Controller files" -ForegroundColor Green
Write-Host "📁 Location: $OutputPath" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Ensure all services are registered in Program.cs" -ForegroundColor White
Write-Host "2. Test endpoints using Swagger UI" -ForegroundColor White
Write-Host "3. Add authentication/authorization attributes if needed" -ForegroundColor White
Write-Host "4. Add custom endpoint methods for specific business logic" -ForegroundColor White
Write-Host "5. Configure CORS for Angular frontend" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Run your API:" -ForegroundColor Green
Write-Host "   dotnet run" -ForegroundColor White
Write-Host ""
Write-Host "📖 View Swagger docs at:" -ForegroundColor Green
Write-Host "   https://localhost:5001/swagger" -ForegroundColor White
Write-Host ""
