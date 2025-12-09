namespace PowerTraderPOS.API.DTOs
{
    // Staff DTOs
    public class StaffDto
    {
        public int Refno { get; set; }
        public string? StaffID { get; set; }
        public string? Surname { get; set; }
        public string? OtherNames { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? HomePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfEmployment { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateStaffDto
    {
        public required string StaffID { get; set; }
        public string? Surname { get; set; }
        public string? OtherNames { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? HomePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfEmployment { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class UpdateStaffDto
    {
        public string? Surname { get; set; }
        public string? OtherNames { get; set; }
        public string? StreetAddress { get; set; }
        public string? City { get; set; }
        public string? Country { get; set; }
        public string? HomePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public DateTime? DateOfEmployment { get; set; }
        public string? Designation { get; set; }
        public string? Department { get; set; }
    }
}
