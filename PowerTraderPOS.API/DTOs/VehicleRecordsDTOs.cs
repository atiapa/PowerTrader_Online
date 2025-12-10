using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class VehicleRecordDto
    {
        public string? VEhicleNo { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public string? YearOfMake { get; set; }
        public string? Type { get; set; }
        public string? Air_Con { get; set; }
        public string? Transamission { get; set; }
        public string? OtherInofrmation { get; set; }
        public string? Seat { get; set; }
        public decimal? Ecount { get; set; }
        public string? Branchcode { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateVehicleRecordDto
    {
        [Required]
        [MaxLength(50)]
        public string VEhicleNo { get; set; } = string.Empty;
        
        [MaxLength(50)]
        public string? Make { get; set; }
        
        [MaxLength(50)]
        public string? Model { get; set; }
        
        [MaxLength(50)]
        public string? YearOfMake { get; set; }
        
        [MaxLength(50)]
        public string? Type { get; set; }
        
        [MaxLength(50)]
        public string? Air_Con { get; set; }
        
        [MaxLength(50)]
        public string? Transamission { get; set; }
        
        [MaxLength(200)]
        public string? OtherInofrmation { get; set; }
        
        [MaxLength(10)]
        public string? Seat { get; set; }
        
        [MaxLength(50)]
        public string? Branchcode { get; set; }
    }

    public class UpdateVehicleRecordDto
    {
        [MaxLength(50)]
        public string? Make { get; set; }
        
        [MaxLength(50)]
        public string? Model { get; set; }
        
        [MaxLength(50)]
        public string? Type { get; set; }
        
        [MaxLength(50)]
        public string? Air_Con { get; set; }
        
        [MaxLength(50)]
        public string? Transamission { get; set; }
        
        [MaxLength(200)]
        public string? OtherInofrmation { get; set; }
        
        [MaxLength(10)]
        public string? Seat { get; set; }
    }
}
