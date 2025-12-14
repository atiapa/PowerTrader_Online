using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Authority to Collect (ATC) tracking for delivery management
    /// Manages fleet operations, driver assignments, and delivery tracking
    /// </summary>
    [Table("ATC_tbl")]
    [Index(nameof(ATCNumber), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_AuthorityToCollect_ATCNumber_Tenant", IsUnique = true)]
    public class AuthorityToCollect : TenantEntity
    {
        /// <summary>
        /// Primary key for Authority to Collect record
        /// </summary>
        [Key]
        [Column("RefNo")]
        public decimal RefNo { get; set; }

        /// <summary>
        /// Unique Authority to Collect number
        /// </summary>
        [Required]
        [Column("ATCNumber")]
        [MaxLength(50)]
        public string ATCNumber { get; set; } = string.Empty;

        /// <summary>
        /// Organization name (customer/recipient)
        /// </summary>
        [Column("Organization")]
        [MaxLength(50)]
        public string? Organization { get; set; }

        /// <summary>
        /// Contact person at delivery location
        /// </summary>
        [Column("ContactPerson")]
        [MaxLength(50)]
        public string? ContactPerson { get; set; }

        /// <summary>
        /// Delivery address
        /// </summary>
        [Column("DeliveryAddress")]
        public string? DeliveryAddress { get; set; }

        /// <summary>
        /// Contact phone number
        /// </summary>
        [Column("PhoneNumber")]
        [MaxLength(100)]
        [Phone]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Digital/GPS address
        /// </summary>
        [Column("DigitalAddress")]
        public string? DigitalAddress { get; set; }

        // Driver Information
        /// <summary>
        /// Driver's ID number
        /// </summary>
        [Column("DriversID")]
        [MaxLength(50)]
        public string? DriversID { get; set; }

        /// <summary>
        /// Driver's full name
        /// </summary>
        [Column("DriversName")]
        [MaxLength(50)]
        public string? DriversName { get; set; }

        /// <summary>
        /// Driver's contact number
        /// </summary>
        [Column("DriversContact")]
        [MaxLength(50)]
        [Phone]
        public string? DriversContact { get; set; }

        /// <summary>
        /// Driver assistant's name
        /// </summary>
        [Column("DriverAssistantName")]
        [MaxLength(50)]
        public string? DriverAssistantName { get; set; }

        /// <summary>
        /// Driver assistant's ID
        /// </summary>
        [Column("DriverAssistantID")]
        [MaxLength(50)]
        public string? DriverAssistantID { get; set; }

        /// <summary>
        /// Driver assistant's contact
        /// </summary>
        [Column("DriverAssistantContact")]
        [MaxLength(50)]
        [Phone]
        public string? DriverAssistantContact { get; set; }

        // Vehicle Information
        /// <summary>
        /// Vehicle registration/plate number
        /// </summary>
        [Column("PlateNumber")]
        [MaxLength(50)]
        public string? PlateNumber { get; set; }

        /// <summary>
        /// Vehicle owner's contact number
        /// </summary>
        [Column("VehicleOwnersNumber")]
        [MaxLength(50)]
        public string? VehicleOwnersNumber { get; set; }

        /// <summary>
        /// Insurance expiry date
        /// </summary>
        [Column("InsuranceExpiryDate")]
        public DateTime? InsuranceExpiryDate { get; set; }

        /// <summary>
        /// Roadworthy certificate expiry date
        /// </summary>
        [Column("RoadworthyExpiryDate")]
        public DateTime? RoadworthyExpiryDate { get; set; }

        /// <summary>
        /// Fleet number
        /// </summary>
        [Column("FleetNumber")]
        [MaxLength(50)]
        public string? FleetNumber { get; set; }

        /// <summary>
        /// Fleet section/division
        /// </summary>
        [Column("FleetSection")]
        [MaxLength(50)]
        public string? FleetSection { get; set; }

        // Order Information
        /// <summary>
        /// Related invoice number
        /// </summary>
        [Column("InvoiceNr")]
        [MaxLength(50)]
        public string? InvoiceNr { get; set; }

        /// <summary>
        /// Ship-to party
        /// </summary>
        [Column("ShipToParty")]
        [MaxLength(50)]
        public string? ShipToParty { get; set; }

        /// <summary>
        /// Sold-to party
        /// </summary>
        [Column("SoldToParty")]
        [MaxLength(50)]
        public string? SoldToParty { get; set; }

        /// <summary>
        /// Supplier name
        /// </summary>
        [Column("SupplierName")]
        [MaxLength(50)]
        public string? SupplierName { get; set; }

        // Distance and Fuel Information
        /// <summary>
        /// Base distance in kilometers
        /// </summary>
        [Column("Distance")]
        [Precision(18, 2)]
        public decimal? Distance { get; set; }

        /// <summary>
        /// Additional distance (e.g., detours)
        /// </summary>
        [Column("AddictionalDistance")]
        [Precision(18, 2)]
        public decimal? AdditionalDistance { get; set; }

        /// <summary>
        /// Total distance (Distance + AdditionalDistance)
        /// </summary>
        [Column("TotalDistance")]
        [Precision(18, 2)]
        public decimal? TotalDistance { get; set; }

        /// <summary>
        /// Fuel consumption rate (liters per kilometer)
        /// </summary>
        [Column("LitrePerKM")]
        [Precision(18, 2)]
        public decimal? LitrePerKM { get; set; }

        /// <summary>
        /// Total fuel allocation in liters
        /// </summary>
        [Column("TotalFuelAllowed")]
        [Precision(18, 0)]
        public decimal? TotalFuelAllowed { get; set; }

        // Time Tracking
        /// <summary>
        /// Estimated arrival date
        /// </summary>
        [Column("EADate")]
        public DateTime? EstimatedArrivalDate { get; set; }

        /// <summary>
        /// Actual arrival date
        /// </summary>
        [Column("AADate")]
        public DateTime? ActualArrivalDate { get; set; }

        /// <summary>
        /// Estimated time of arrival
        /// </summary>
        [Column("ETATime")]
        [MaxLength(50)]
        public string? EstimatedArrivalTime { get; set; }

        /// <summary>
        /// Actual time of arrival
        /// </summary>
        [Column("ATATime")]
        [MaxLength(50)]
        public string? ActualArrivalTime { get; set; }

        // Delivery Confirmation
        /// <summary>
        /// Confirmation of receipt status
        /// </summary>
        [Column("ConfirmationOfReceipt")]
        [MaxLength(50)]
        public string? ConfirmationOfReceipt { get; set; }

        /// <summary>
        /// Confirmation contact number
        /// </summary>
        [Column("ConfirmationContact")]
        [MaxLength(50)]
        [Phone]
        public string? ConfirmationContact { get; set; }

        /// <summary>
        /// Name of person who confirmed receipt
        /// </summary>
        [Column("ConfirmedBy")]
        [MaxLength(50)]
        public string? ConfirmedBy { get; set; }

        // Legacy Fields - Use base class properties instead
        /// <summary>
        /// Legacy field - Use Branchcode from base TenantEntity
        /// </summary>
        [Obsolete("Use BranchCode property from base TenantEntity class")]
        [Column("Branchcode")]
        [MaxLength(50)]
        public string? Branchcode { get; set; }

        /// <summary>
        /// Legacy field - Use OrganisationName lookup via OrganisationCode
        /// </summary>
        [Obsolete("Use OrganisationCode and lookup name from Organisation table")]
        [Column("OrganisationName")]
        [MaxLength(50)]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Legacy field - Use BranchName lookup via BranchCode
        /// </summary>
        [Obsolete("Use BranchCode and lookup name from Branch table")]
        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }
}
