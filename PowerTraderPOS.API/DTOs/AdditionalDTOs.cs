namespace PowerTraderPOS.API.DTOs
{
    // Category DTOs
    public class CategoryDto
    {
        public decimal CategoryID { get; set; }
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public string? ButtonColor { get; set; }
        public string? FontSize { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateCategoryDto
    {
        public required string CategoryName { get; set; }
        public string? Description { get; set; }
        public string? ButtonColor { get; set; }
        public string? FontSize { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class UpdateCategoryDto
    {
        public string? CategoryName { get; set; }
        public string? Description { get; set; }
        public string? ButtonColor { get; set; }
        public string? FontSize { get; set; }
    }

    // Branch DTOs
    public class BranchDto
    {
        public decimal RefNo { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? PostalAddress { get; set; }
        public string? PhysicalLocation { get; set; }
        public string? City { get; set; }
        public string? RegionOrState { get; set; }
        public string? Country { get; set; }
        public string? OfficePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
        public string? BranchName { get; set; }
        public string? Branchcode { get; set; }
    }

    public class CreateBranchDto
    {
        public required string OrganisationName { get; set; }
        public required string OrganisationCode { get; set; }
        public string? PostalAddress { get; set; }
        public string? PhysicalLocation { get; set; }
        public string? City { get; set; }
        public string? RegionOrState { get; set; }
        public string? Country { get; set; }
        public string? OfficePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
        public required string BranchName { get; set; }
        public required string Branchcode { get; set; }
    }

    public class UpdateBranchDto
    {
        public string? PostalAddress { get; set; }
        public string? PhysicalLocation { get; set; }
        public string? City { get; set; }
        public string? RegionOrState { get; set; }
        public string? Country { get; set; }
        public string? OfficePhone { get; set; }
        public string? CellPhone { get; set; }
        public string? Email { get; set; }
    }

    // Vehicle DTOs
    public class VehicleDto
    {
        public decimal RefNo { get; set; }
        public string? VIN { get; set; }
        public string? PlateNumber { get; set; }
        public string? Make { get; set; }
        public string? Model { get; set; }
        public int? Year { get; set; }
        public string? InsuranceNumber { get; set; }
        public DateTime? InsuranceExpiryDate { get; set; }
        public string? RoadworthyNumber { get; set; }
        public DateTime? RoadworthyExpiryDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Capacity { get; set; }
        public string? VehicleState { get; set; }
        public string? Remarks { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateVehicleDto
    {
        public string? VIN { get; set; }
        public required string PlateNumber { get; set; }
        public required string Make { get; set; }
        public required string Model { get; set; }
        public int? Year { get; set; }
        public string? InsuranceNumber { get; set; }
        public DateTime? InsuranceExpiryDate { get; set; }
        public string? RoadworthyNumber { get; set; }
        public DateTime? RoadworthyExpiryDate { get; set; }
        public decimal? Weight { get; set; }
        public decimal? Capacity { get; set; }
        public string? VehicleState { get; set; }
        public string? Remarks { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class UpdateVehicleDto
    {
        public string? InsuranceNumber { get; set; }
        public DateTime? InsuranceExpiryDate { get; set; }
        public string? RoadworthyNumber { get; set; }
        public DateTime? RoadworthyExpiryDate { get; set; }
        public string? VehicleState { get; set; }
        public string? Remarks { get; set; }
    }

    // Stock DTOs
    public class StockDto
    {
        public decimal Refno { get; set; }
        public DateTime? TransDate { get; set; }
        public string? ProductID { get; set; }
        public string? ProductName { get; set; }
        public string? BatchNo { get; set; }
        public decimal? OpeningStock { get; set; }
        public decimal? Purchase { get; set; }
        public decimal? Sales { get; set; }
        public decimal? Balance { get; set; }
        public decimal? UnitPrice { get; set; }
        public string? Store { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    // Accounting DTOs
    public class AccountDto
    {
        public decimal Refno { get; set; }
        public string? AccountGroup { get; set; }
        public string? AccountName { get; set; }
        public string? AccountNr { get; set; }
        public decimal? OpeningBalance { get; set; }
        public string? Nature { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? AccountType { get; set; }
        public string? AccountStatus { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateAccountDto
    {
        public required string AccountGroup { get; set; }
        public required string AccountName { get; set; }
        public required string AccountNr { get; set; }
        public decimal? OpeningBalance { get; set; }
        public string? Nature { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? AccountType { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class UpdateAccountDto
    {
        public string? AccountName { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? AccountStatus { get; set; }
    }
}
