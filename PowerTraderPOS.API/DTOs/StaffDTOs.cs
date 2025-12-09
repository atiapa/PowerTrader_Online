namespace PowerTraderPOS.API.DTOs
{
    // Staff DTOs
    public class StaffDto
    {
        public int StaffId { get; set; }
        public string? StaffName { get; set; }
        public string? StaffPhone { get; set; }
        public string? StaffEmail { get; set; }
        public string? StaffRole { get; set; }
        public bool? IsActive { get; set; }
    }

    public class CreateStaffDto
    {
        public string StaffName { get; set; } = string.Empty;
        public string? StaffPhone { get; set; }
        public string? StaffEmail { get; set; }
        public string StaffRole { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
    }

    public class UpdateStaffDto
    {
        public string? StaffName { get; set; }
        public string? StaffPhone { get; set; }
        public string? StaffEmail { get; set; }
        public string? StaffRole { get; set; }
        public bool? IsActive { get; set; }
    }
}
