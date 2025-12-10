using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class AttendanceDto
    {
        public int Refno { get; set; }
        public string? StaffId { get; set; }
        public string? Name { get; set; }
        public string? Barcode { get; set; }
        public string? Position { get; set; }
        public DateTime? Date { get; set; }
        public TimeSpan? Login_Time { get; set; }
        public TimeSpan? Logout_Time { get; set; }
        public string? Logged { get; set; }
        public string? Logout_Date { get; set; }
        public string? MinToLate { get; set; }
        public string? Month { get; set; }
        public string? Year { get; set; }
        public string? Post { get; set; }
        public string? Branchcode { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateAttendanceDto
    {
        [Required]
        [MaxLength(50)]
        public string StaffId { get; set; } = string.Empty;
        
        [Required]
        [MaxLength(50)]
        public string Name { get; set; } = string.Empty;
        
        [MaxLength(50)]
        public string? Position { get; set; }
        
        public DateTime? Date { get; set; }
        public TimeSpan? Login_Time { get; set; }
        public TimeSpan? Logout_Time { get; set; }
        
        [MaxLength(50)]
        public string? Logged { get; set; }
        
        [MaxLength(50)]
        public string? Branchcode { get; set; }
    }

    public class UpdateAttendanceDto
    {
        public TimeSpan? Logout_Time { get; set; }
        
        [MaxLength(50)]
        public string? Logout_Date { get; set; }
        
        [MaxLength(50)]
        public string? MinToLate { get; set; }
        
        [MaxLength(50)]
        public string? Logged { get; set; }
    }
}
