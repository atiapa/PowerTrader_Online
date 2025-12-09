using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Existing
{
    [Table("Accounts_Creation")]
    public class AccountsCreation
    {
        [Key]
        [Column("Refno")]
        public decimal Refno { get; set; }

        [Column("AccountGroup")]
        [MaxLength(50)]
        public string? AccountGroup { get; set; }

        [Column("AccountName")]
        [MaxLength(50)]
        public string? AccountName { get; set; }

        [Column("AccountNr")]
        [MaxLength(50)]
        public string? AccountNr { get; set; }

        [Column("OpeningBalance", TypeName = "money")]
        public decimal? OpeningBalance { get; set; }

        [Column("Nature")]
        [MaxLength(50)]
        public string? Nature { get; set; }

        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        [Column("Narration")]
        [MaxLength(500)]
        public string? Narration { get; set; }

        [Column("Branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        [Column("EntryID")]
        [MaxLength(50)]
        public string? EntryID { get; set; }

        [Column("EntryDate")]
        [MaxLength(50)]
        public string? EntryDate { get; set; }

        [Column("TIN")]
        [MaxLength(50)]
        public string? TIN { get; set; }

        [Column("AccountType")]
        [MaxLength(50)]
        public string? AccountType { get; set; }

        [Column("AccountStatus")]
        [MaxLength(50)]
        public string? AccountStatus { get; set; }

        [Column("IS_Status")]
        [MaxLength(50)]
        public string? IS_Status { get; set; }

        [Column("BS_Status")]
        [MaxLength(50)]
        public string? BS_Status { get; set; }

        [Column("CF_Status")]
        [MaxLength(50)]
        public string? CF_Status { get; set; }

        [Column("RE_Status")]
        [MaxLength(50)]
        public string? RE_Status { get; set; }

        [Column("OrganisationName")]
        [MaxLength(50)]
        public string? OrganisationName { get; set; }

        [Column("OrganisationCode")]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }

    [Table("ATC_tbl")]
    public class ATCTbl
    {
        [Key]
        [Column("RefNo")]
        public decimal RefNo { get; set; }

        [Column("ATCNumber")]
        [MaxLength(50)]
        public string? ATCNumber { get; set; }

        [Column("DateCreated")]
        public DateTime? DateCreated { get; set; }

        [Column("TimeCreated")]
        public TimeSpan? TimeCreated { get; set; }

        [Column("CreatedByID")]
        [MaxLength(50)]
        public string? CreatedByID { get; set; }

        [Column("DateModified")]
        public DateTime? DateModified { get; set; }

        [Column("TimeModified")]
        public TimeSpan? TimeModified { get; set; }

        [Column("ModifiedByID")]
        [MaxLength(50)]
        public string? ModifiedByID { get; set; }

        [Column("Organization")]
        [MaxLength(50)]
        public string? Organization { get; set; }

        [Column("ContactPerson")]
        [MaxLength(50)]
        public string? ContactPerson { get; set; }

        [Column("DeliveryAddress")]
        public string? DeliveryAddress { get; set; }

        [Column("PhoneNumber")]
        [MaxLength(100)]
        public string? PhoneNumber { get; set; }

        [Column("DriversID")]
        [MaxLength(50)]
        public string? DriversID { get; set; }

        [Column("DriversName")]
        [MaxLength(50)]
        public string? DriversName { get; set; }

        [Column("DriversContact")]
        [MaxLength(50)]
        public string? DriversContact { get; set; }

        [Column("DriverAssistantName")]
        [MaxLength(50)]
        public string? DriverAssistantName { get; set; }

        [Column("DriverAssistantID")]
        [MaxLength(50)]
        public string? DriverAssistantID { get; set; }

        [Column("DriverAssistantContact")]
        [MaxLength(50)]
        public string? DriverAssistantContact { get; set; }

        [Column("DigitalAddress")]
        public string? DigitalAddress { get; set; }

        [Column("PlateNumber")]
        [MaxLength(50)]
        public string? PlateNumber { get; set; }

        [Column("VehicleOwnersNumber")]
        [MaxLength(50)]
        public string? VehicleOwnersNumber { get; set; }

        [Column("InsuranceExpiryDate")]
        public DateTime? InsuranceExpiryDate { get; set; }

        [Column("RoadworthyExpiryDate")]
        public DateTime? RoadworthyExpiryDate { get; set; }

        [Column("InvoiceNr")]
        [MaxLength(50)]
        public string? InvoiceNr { get; set; }

        [Column("FleetNumber")]
        [MaxLength(50)]
        public string? FleetNumber { get; set; }

        [Column("FleetSection")]
        [MaxLength(50)]
        public string? FleetSection { get; set; }

        [Column("ShipToParty")]
        [MaxLength(50)]
        public string? ShipToParty { get; set; }

        [Column("SoldToParty")]
        [MaxLength(50)]
        public string? SoldToParty { get; set; }

        [Column("Distance")]
        [Precision(18, 2)]
        public decimal? Distance { get; set; }

        [Column("AddictionalDistance")]
        [Precision(18, 2)]
        public decimal? AddictionalDistance { get; set; }

        [Column("TotalDistance")]
        [Precision(18, 2)]
        public decimal? TotalDistance { get; set; }

        [Column("LitrePerKM")]
        [Precision(18, 2)]
        public decimal? LitrePerKM { get; set; }

        [Column("TotalFuelAllowed")]
        [Precision(18, 0)]
        public decimal? TotalFuelAllowed { get; set; }

        [Column("EADate")]
        public DateTime? EADate { get; set; }

        [Column("AADate")]
        public DateTime? AADate { get; set; }

        [Column("ETATime")]
        [MaxLength(50)]
        public string? ETATime { get; set; }

        [Column("ATATime")]
        [MaxLength(50)]
        public string? ATATime { get; set; }

        [Column("ConfirmationOfReceipt")]
        [MaxLength(50)]
        public string? ConfirmationOfReceipt { get; set; }

        [Column("ConfirmationContact")]
        [MaxLength(50)]
        public string? ConfirmationContact { get; set; }

        [Column("ConfirmedBy")]
        [MaxLength(50)]
        public string? ConfirmedBy { get; set; }

        [Column("SupplierName")]
        [MaxLength(50)]
        public string? SupplierName { get; set; }

        [Column("Branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        [Column("OrganisationName")]
        [MaxLength(50)]
        public string? OrganisationName { get; set; }

        [Column("OrganisationCode")]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }

    [Table("Attendance_Tbl")]
    public class AttendanceTbl
    {
        [Key]
        [Column("Refno")]
        public int Refno { get; set; }

        [Column("StaffId")]
        [MaxLength(50)]
        public string? StaffId { get; set; }

        [Column("Name")]
        [MaxLength(50)]
        public string? Name { get; set; }

        [Column("Barcode")]
        [MaxLength(50)]
        public string? Barcode { get; set; }

        [Column("Position")]
        [MaxLength(50)]
        public string? Position { get; set; }

        [Column("Date")]
        public DateTime? Date { get; set; }

        [Column("Login_Time")]
        public TimeSpan? Login_Time { get; set; }

        [Column("Logout_Time")]
        public TimeSpan? Logout_Time { get; set; }

        [Column("Logged")]
        [MaxLength(50)]
        public string? Logged { get; set; }

        [Column("Logout_Date")]
        [MaxLength(50)]
        public string? Logout_Date { get; set; }

        [Column("MinToLate")]
        [MaxLength(50)]
        public string? MinToLate { get; set; }

        [Column("Month")]
        [MaxLength(50)]
        public string? Month { get; set; }

        [Column("Year")]
        [MaxLength(50)]
        public string? Year { get; set; }

        [Column("Post")]
        [MaxLength(50)]
        public string? Post { get; set; }

        [Column("FPTemplate")]
        [MaxLength(50)]
        public string? FPTemplate { get; set; }

        [Column("Branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        [Column("OrganisationName")]
        [MaxLength(50)]
        public string? OrganisationName { get; set; }

        [Column("OrganisationCode")]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }

    [Table("Branches")]
    public class Branches
    {
        [Key]
        [Column("RefNo")]
        public decimal RefNo { get; set; }

        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        [Column("OrganisationCode")]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("PostalAddress")]
        [MaxLength(200)]
        public string? PostalAddress { get; set; }

        [Column("PhysicalLocation")]
        [MaxLength(200)]
        public string? PhysicalLocation { get; set; }

        [Column("City")]
        [MaxLength(200)]
        public string? City { get; set; }

        [Column("RegionOrState")]
        [MaxLength(200)]
        public string? RegionOrState { get; set; }

        [Column("Country")]
        [MaxLength(200)]
        public string? Country { get; set; }

        [Column("OfficePhone")]
        [MaxLength(200)]
        public string? OfficePhone { get; set; }

        [Column("CellPhone")]
        [MaxLength(200)]
        public string? CellPhone { get; set; }

        [Column("Fax")]
        [MaxLength(200)]
        public string? Fax { get; set; }

        [Column("Email")]
        [MaxLength(200)]
        public string? Email { get; set; }

        [Column("Website")]
        [MaxLength(200)]
        public string? Website { get; set; }

        [Column("Remarks")]
        [MaxLength(200)]
        public string? Remarks { get; set; }

        [Column("TIN")]
        [MaxLength(50)]
        public string? TIN { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }

        [Column("branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }
    }

    [Table("Categories")]
    public class Categories
    {
        [Key]
        [Column("CategoryID")]
        public decimal CategoryID { get; set; }

        [Column("CategoryName")]
        [MaxLength(255)]
        public string? CategoryName { get; set; }

        [Column("Description")]
        [MaxLength(255)]
        public string? Description { get; set; }

        [Column("buttoncolor")]
        [MaxLength(50)]
        public string? ButtonColor { get; set; }

        [Column("fontsize")]
        [MaxLength(50)]
        public string? FontSize { get; set; }

        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        [Column("branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        [Column("OrganisationCode")]
        [MaxLength(50)]
        public string? OrganisationCode { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }

    [Table("countries")]
    public class Countries
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("country_name")]
        [MaxLength(200)]
        public string? CountryName { get; set; }

        [Column("country_code")]
        [MaxLength(10)]
        public string? CountryCode { get; set; }

        [Column("currency_name")]
        [MaxLength(100)]
        public string? CurrencyName { get; set; }

        [Column("currency_code")]
        [MaxLength(10)]
        public string? CurrencyCode { get; set; }

        [Column("currency_symbol")]
        [MaxLength(10)]
        public string? CurrencySymbol { get; set; }

        [Column("note_names")]
        [MaxLength(500)]
        public string? NoteNames { get; set; }

        [Column("coin_names")]
        [MaxLength(500)]
        public string? CoinNames { get; set; }
    }
}
