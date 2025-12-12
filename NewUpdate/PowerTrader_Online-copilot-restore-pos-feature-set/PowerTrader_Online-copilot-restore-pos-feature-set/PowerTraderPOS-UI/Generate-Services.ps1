# Generate Services for all models
param(
    [string]$ModelsPath = ".\Models",
    [string]$OutputPath = ".\Services"
)

# Create output directory
New-Item -ItemType Directory -Force -Path $OutputPath | Out-Null

# Get all model files
$modelFiles = Get-ChildItem -Path $ModelsPath -Filter "*.cs"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Service Generator for POS Backend" -ForegroundColor Cyan
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
    Write-Host "[$count] Generating Service for: $className" -ForegroundColor Green
    
    # Determine primary key property name (most common patterns)
    $pkName = "Refno"
    if ($className -match "^(Account|Category|Product|Retail|Sales|Customer|Supplier)") {
        $pkName = "Id"
    }
    
    # Generate Interface
    $interfaceContent = @"
using YourBackendProject.DTOs;
using YourBackendProject.Models;

namespace YourBackendProject.Services
{
    /// <summary>
    /// Service interface for $className operations
    /// </summary>
    public interface I${className}Service
    {
        /// <summary>
        /// Get all ${className} records
        /// </summary>
        Task<IEnumerable<${className}Dto>> GetAllAsync();
        
        /// <summary>
        /// Get ${className} by ID
        /// </summary>
        Task<${className}Dto?> GetByIdAsync(int id);
        
        /// <summary>
        /// Create new ${className}
        /// </summary>
        Task<${className}Dto> CreateAsync(Create${className}Dto dto);
        
        /// <summary>
        /// Update existing ${className}
        /// </summary>
        Task<${className}Dto?> UpdateAsync(int id, Update${className}Dto dto);
        
        /// <summary>
        /// Delete ${className}
        /// </summary>
        Task<bool> DeleteAsync(int id);
        
        /// <summary>
        /// Check if ${className} exists
        /// </summary>
        Task<bool> ExistsAsync(int id);
        
        /// <summary>
        /// Get ${className} by organization
        /// </summary>
        Task<IEnumerable<${className}Dto>> GetByOrganisationAsync(string organisationCode);
        
        /// <summary>
        /// Get ${className} by branch
        /// </summary>
        Task<IEnumerable<${className}Dto>> GetByBranchAsync(string branchCode);
    }
}
"@
    
    # Generate Implementation
    $serviceContent = @"
using Microsoft.EntityFrameworkCore;
using YourBackendProject.Data;
using YourBackendProject.DTOs;
using YourBackendProject.Models;

namespace YourBackendProject.Services
{
    /// <summary>
    /// Service implementation for $className operations
    /// </summary>
    public class ${className}Service : I${className}Service
    {
        private readonly POSDbContext _context;
        private readonly ILogger<${className}Service> _logger;
        
        public ${className}Service(
            POSDbContext context,
            ILogger<${className}Service> logger)
        {
            _context = context;
            _logger = logger;
        }
        
        public async Task<IEnumerable<${className}Dto>> GetAllAsync()
        {
            try
            {
                var items = await _context.${className}s
                    .OrderByDescending(x => x.${pkName})
                    .ToListAsync();
                    
                return items.Select(MapToDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving all ${className} records");
                throw;
            }
        }
        
        public async Task<${className}Dto?> GetByIdAsync(int id)
        {
            try
            {
                var item = await _context.${className}s.FindAsync(id);
                return item == null ? null : MapToDto(item);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} with id {Id}", id);
                throw;
            }
        }
        
        public async Task<${className}Dto> CreateAsync(Create${className}Dto dto)
        {
            try
            {
                var entity = MapCreateToEntity(dto);
                
                // Set audit fields
                // entity.CreatedDate = DateTime.UtcNow;
                // entity.CreatedBy = currentUser;
                
                _context.${className}s.Add(entity);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Created ${className} with id {Id}", entity.${pkName});
                return MapToDto(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating ${className}");
                throw;
            }
        }
        
        public async Task<${className}Dto?> UpdateAsync(int id, Update${className}Dto dto)
        {
            try
            {
                var entity = await _context.${className}s.FindAsync(id);
                if (entity == null)
                {
                    _logger.LogWarning("${className} with id {Id} not found for update", id);
                    return null;
                }
                
                // TODO: Map dto properties to entity
                // entity.PropertyName = dto.PropertyName;
                // entity.ModifiedDate = DateTime.UtcNow;
                // entity.ModifiedBy = currentUser;
                
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Updated ${className} with id {Id}", id);
                return MapToDto(entity);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating ${className} with id {Id}", id);
                throw;
            }
        }
        
        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var entity = await _context.${className}s.FindAsync(id);
                if (entity == null)
                {
                    _logger.LogWarning("${className} with id {Id} not found for deletion", id);
                    return false;
                }
                
                _context.${className}s.Remove(entity);
                await _context.SaveChangesAsync();
                
                _logger.LogInformation("Deleted ${className} with id {Id}", id);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting ${className} with id {Id}", id);
                throw;
            }
        }
        
        public async Task<bool> ExistsAsync(int id)
        {
            try
            {
                return await _context.${className}s.AnyAsync(e => e.${pkName} == id);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error checking existence of ${className} with id {Id}", id);
                throw;
            }
        }
        
        public async Task<IEnumerable<${className}Dto>> GetByOrganisationAsync(string organisationCode)
        {
            try
            {
                var items = await _context.${className}s
                    .Where(x => x.OrganisationCode == organisationCode)
                    .OrderByDescending(x => x.${pkName})
                    .ToListAsync();
                    
                return items.Select(MapToDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} for organisation {Code}", organisationCode);
                throw;
            }
        }
        
        public async Task<IEnumerable<${className}Dto>> GetByBranchAsync(string branchCode)
        {
            try
            {
                var items = await _context.${className}s
                    .Where(x => x.Branchcode == branchCode || x.BranchCode == branchCode)
                    .OrderByDescending(x => x.${pkName})
                    .ToListAsync();
                    
                return items.Select(MapToDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving ${className} for branch {Code}", branchCode);
                throw;
            }
        }
        
        #region Mapping Methods
        
        private ${className}Dto MapToDto($className entity)
        {
            // TODO: Implement property mapping
            return new ${className}Dto
            {
                Id = entity.${pkName},
                // Map other properties
                OrganisationName = entity.OrganisationName,
                OrganisationCode = entity.OrganisationCode,
                BranchName = entity.BranchName,
                BranchCode = entity.Branchcode ?? entity.BranchCode
            };
        }
        
        private $className MapCreateToEntity(Create${className}Dto dto)
        {
            // TODO: Implement property mapping
            return new ${className}
            {
                // Map properties from dto
                OrganisationCode = dto.OrganisationCode,
                Branchcode = dto.BranchCode
            };
        }
        
        #endregion
    }
}
"@
    
    # Write files
    $interfaceContent | Out-File -FilePath "$OutputPath\I${className}Service.cs" -Encoding UTF8
    $serviceContent | Out-File -FilePath "$OutputPath\${className}Service.cs" -Encoding UTF8
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Successfully generated $count Service files" -ForegroundColor Green
Write-Host "📁 Interfaces: $OutputPath\I*Service.cs" -ForegroundColor Cyan
Write-Host "📁 Implementations: $OutputPath\*Service.cs" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Review each service file" -ForegroundColor White
Write-Host "2. Implement MapToDto() method with actual property mappings" -ForegroundColor White
Write-Host "3. Implement MapCreateToEntity() with creation logic" -ForegroundColor White
Write-Host "4. Add custom business logic methods as needed" -ForegroundColor White
Write-Host "5. Register services in Program.cs or ServiceRegistration.cs" -ForegroundColor White
Write-Host ""
