using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Customer
{
    /// <summary>
    /// Represents a customer in the system.
    /// Manages customer information, contact details, credit limits, and account management.
    /// Multi-tenant entity scoped to OrganisationCode and BranchCode.
    /// </summary>
    [Table("CustomerInfo")]
    [Index(nameof(AccountNr), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Customer_AccountNr_Tenant", IsUnique = true)]
    [Index(nameof(Email), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Customer_Email_Tenant")]
    [Index(nameof(PhoneNr), Name = "IX_Customer_Phone")]
    public class Customer : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the customer record (Primary Key)
        /// </summary>
        [Key]
        [Column("Refno")]
        public decimal Refno { get; set; }

        /// <summary>
        /// Customer account name (business or individual name)
        /// </summary>
        [Column("AccountName")]
        [MaxLength(200)]
        public string? AccountName { get; set; }

        /// <summary>
        /// Customer surname (for individual customers)
        /// </summary>
        [Column("Surname")]
        [MaxLength(50)]
        public string? Surname { get; set; }

        /// <summary>
        /// Customer other names (for individual customers)
        /// </summary>
        [Column("Othernames")]
        [MaxLength(100)]
        public string? Othernames { get; set; }

        /// <summary>
        /// Unique customer account number
        /// </summary>
        [Column("AccountNr")]
        [MaxLength(50)]
        [Required]
        public string AccountNr { get; set; } = string.Empty;

        /// <summary>
        /// Customer physical address
        /// </summary>
        [Column("Address")]
        public string? Address { get; set; }

        /// <summary>
        /// City or town where customer is located
        /// </summary>
        [Column("City_Town")]
        [MaxLength(100)]
        public string? CityTown { get; set; }

        /// <summary>
        /// Region or state where customer is located
        /// </summary>
        [Column("Region_State")]
        [MaxLength(100)]
        public string? RegionState { get; set; }

        /// <summary>
        /// Customer phone number
        /// </summary>
        [Column("PhoneNr")]
        [MaxLength(100)]
        [Phone]
        public string? PhoneNr { get; set; }

        /// <summary>
        /// Maximum credit limit allowed for this customer
        /// </summary>
        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        /// <summary>
        /// Type of customer (Retail, Wholesale, Corporate, etc.)
        /// </summary>
        [Column("CustomerType")]
        [MaxLength(50)]
        public string? CustomerType { get; set; }

        /// <summary>
        /// Sales representative assigned to this customer
        /// </summary>
        [Column("Sales_Rep")]
        [MaxLength(100)]
        public string? SalesRep { get; set; }

        /// <summary>
        /// Opening balance for the customer account
        /// </summary>
        [Column("OpeningBalance")]
        [Precision(18, 2)]
        public decimal? OpeningBalance { get; set; }

        /// <summary>
        /// Customer email address
        /// </summary>
        [Column("Email")]
        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        /// <summary>
        /// Digital address (GPS or postal code)
        /// </summary>
        [Column("DigitalAddress")]
        [MaxLength(50)]
        public string? DigitalAddress { get; set; }

        /// <summary>
        /// Customer loyalty card or barcode number
        /// </summary>
        [Column("Barcodenr")]
        [MaxLength(50)]
        public string? Barcodenr { get; set; }

        /// <summary>
        /// Legacy field - use OrganisationCode from TenantEntity base class instead
        /// </summary>
        [Column("OrganisationName")]
        [MaxLength(200)]
        [Obsolete("Use OrganisationCode from TenantEntity base class")]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Legacy field - use BranchCode from TenantEntity base class instead
        /// </summary>
        [Column("BranchName")]
        [MaxLength(50)]
        [Obsolete("Use BranchCode from TenantEntity base class")]
        public string? BranchName { get; set; }
    }
}
