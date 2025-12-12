# Generate DTOs for all models
param(
    [string]$ModelsPath = ".\Models",
    [string]$OutputPath = ".\DTOs"
)

# Create output directory
New-Item -ItemType Directory -Force -Path $OutputPath | Out-Null

# Get all model files
$modelFiles = Get-ChildItem -Path $ModelsPath -Filter "*.cs"

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   DTO Generator for POS Backend" -ForegroundColor Cyan
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
    Write-Host "[$count] Generating DTOs for: $className" -ForegroundColor Green
    
    # Create DTO content
    $dtoContent = @"
using System;
using System.ComponentModel.DataAnnotations;

namespace YourBackendProject.DTOs
{
    /// <summary>
    /// DTO for $className - Read operations
    /// </summary>
    public class ${className}Dto
    {
        public int Id { get; set; }
        
        // TODO: Copy properties from $className model
        // - Include all primitive types
        // - Include computed/display fields
        // - Remove navigation properties
        // - Remove complex types (images, etc.)
        
        public DateTime? CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
        public string? BranchCode { get; set; }
    }
    
    /// <summary>
    /// DTO for creating new $className
    /// </summary>
    public class Create${className}Dto
    {
        // TODO: Copy properties needed for creation
        // - Exclude: Id (auto-generated)
        // - Exclude: CreatedDate, ModifiedDate (auto-set)
        // - Exclude: Computed fields
        // - Add validation attributes ([Required], [MaxLength], etc.)
        
        [Required]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }
        
        [MaxLength(50)]
        public string? BranchCode { get; set; }
    }
    
    /// <summary>
    /// DTO for updating existing $className
    /// </summary>
    public class Update${className}Dto
    {
        // TODO: Copy properties that can be updated
        // - Include: All editable fields
        // - Exclude: Id (part of route)
        // - Exclude: CreatedDate (immutable)
        // - Exclude: Auto-generated fields
        // - Add validation attributes
        
        public DateTime? ModifiedDate { get; set; }
        
        [MaxLength(50)]
        public string? ModifiedBy { get; set; }
    }
}
"@
    
    # Write to file
    $dtoContent | Out-File -FilePath "$OutputPath\${className}Dto.cs" -Encoding UTF8
}

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "✅ Successfully generated $count DTO files" -ForegroundColor Green
Write-Host "📁 Location: $OutputPath" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "⚠️  NEXT STEPS:" -ForegroundColor Yellow
Write-Host "1. Review each DTO file" -ForegroundColor White
Write-Host "2. Copy relevant properties from model files" -ForegroundColor White
Write-Host "3. Add validation attributes ([Required], [MaxLength], etc.)" -ForegroundColor White
Write-Host "4. Remove navigation properties and complex types" -ForegroundColor White
Write-Host ""
