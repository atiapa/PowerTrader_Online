namespace PowerTraderPOS.API.DTOs
{
    // Customer DTOs
    public class CustomerDto
    {
        public decimal Refno { get; set; }
        public string? AccountName { get; set; }
        public string? Surname { get; set; }
        public string? Othernames { get; set; }
        public string? AccountNr { get; set; }
        public string? Address { get; set; }
        public string? CityTown { get; set; }
        public string? RegionState { get; set; }
        public string? PhoneNr { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? CustomerType { get; set; }
        public string? SalesRep { get; set; }
        public decimal? OpeningBalance { get; set; }
        public string? Email { get; set; }
        public string? DigitalAddress { get; set; }
        public string? Barcodenr { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateCustomerDto
    {
        public required string AccountName { get; set; }
        public string? Surname { get; set; }
        public string? Othernames { get; set; }
        public required string AccountNr { get; set; }
        public string? Address { get; set; }
        public string? CityTown { get; set; }
        public string? RegionState { get; set; }
        public string? PhoneNr { get; set; }
        public decimal? CreditLimit { get; set; }
        public string? CustomerType { get; set; }
        public string? SalesRep { get; set; }
        public decimal? OpeningBalance { get; set; }
        public string? Email { get; set; }
        public string? DigitalAddress { get; set; }
        public string? Barcodenr { get; set; }
        public string? OrganisationName { get; set; }
        public string? BranchName { get; set; }
    }

    public class UpdateCustomerDto
    {
        public string? AccountName { get; set; }
        public string? Surname { get; set; }
        public string? Othernames { get; set; }
        public string? Address { get; set; }
        public string? CityTown { get; set; }
        public string? RegionState { get; set; }
        public string? PhoneNr { get; set; }
        public string? Email { get; set; }
        public string? DigitalAddress { get; set; }
        public decimal? CreditLimit { get; set; }
        public decimal? OpeningBalance { get; set; }
    }
}
