using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class OrganisationDto
    {
        public decimal RefNo { get; set; }
        public string? OrganisationName { get; set; }
        public string? PostalAddress { get; set; }
        public string? PhysicalLocation { get; set; }
        public string? City { get; set; }
        public string? RegionOrState { get; set; }
        public string? Country { get; set; }
        public string? OfficePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Fax { get; set; }
        public string? Email { get; set; }
        public string? Website { get; set; }
        public string? Remarks { get; set; }
        public string? TIN { get; set; }
        public string? Branchcode { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateOrganisationDto
    {
        [Required]
        [MaxLength(200)]
        public string OrganisationName { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;
        
        [MaxLength(200)]
        public string? PostalAddress { get; set; }
        
        [MaxLength(200)]
        public string? PhysicalLocation { get; set; }
        
        [MaxLength(200)]
        public string? City { get; set; }
        
        [MaxLength(200)]
        public string? Country { get; set; }
        
        [MaxLength(200)]
        public string? OfficePhone { get; set; }
        
        [MaxLength(200)]
        public string? CellPhone { get; set; }
        
        [MaxLength(200)]
        public string? Email { get; set; }
        
        [MaxLength(200)]
        public string? Website { get; set; }
        
        [MaxLength(50)]
        public string? TIN { get; set; }
    }

    public class UpdateOrganisationDto
    {
        [MaxLength(200)]
        public string? PostalAddress { get; set; }
        
        [MaxLength(200)]
        public string? PhysicalLocation { get; set; }
        
        [MaxLength(200)]
        public string? City { get; set; }
        
        [MaxLength(200)]
        public string? Country { get; set; }
        
        [MaxLength(200)]
        public string? OfficePhone { get; set; }
        
        [MaxLength(200)]
        public string? CellPhone { get; set; }
        
        [MaxLength(200)]
        public string? Email { get; set; }
        
        [MaxLength(200)]
        public string? Website { get; set; }
        
        [MaxLength(200)]
        public string? Remarks { get; set; }
    }
}
