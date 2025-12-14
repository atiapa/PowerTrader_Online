using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a vehicle in the fleet management system
    /// </summary>
    [Table("VehicleRecords")]
    [Index(nameof(VehicleNumber), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Vehicle_Number_Tenant", IsUnique = true)]
    public class Vehicle : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the vehicle
        /// </summary>
        [Key]
        public int VehicleId { get; set; }

        /// <summary>
        /// Vehicle registration or fleet number (unique per tenant)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string VehicleNumber { get; set; } = string.Empty;

        /// <summary>
        /// Vehicle make/manufacturer (e.g., Toyota, Ford, Mercedes)
        /// </summary>
        [MaxLength(50)]
        public string? Make { get; set; }

        /// <summary>
        /// Vehicle model (e.g., Camry, F-150, Sprinter)
        /// </summary>
        [MaxLength(50)]
        public string? Model { get; set; }

        /// <summary>
        /// Year of manufacture
        /// </summary>
        public int? Year { get; set; }

        /// <summary>
        /// Vehicle color
        /// </summary>
        [MaxLength(30)]
        public string? Color { get; set; }

        /// <summary>
        /// Vehicle Identification Number (VIN)
        /// </summary>
        [MaxLength(50)]
        public string? VIN { get; set; }

        /// <summary>
        /// License plate number
        /// </summary>
        [MaxLength(20)]
        public string? LicensePlate { get; set; }

        /// <summary>
        /// Current odometer reading in kilometers or miles
        /// </summary>
        [Precision(18, 2)]
        public decimal? Odometer { get; set; }

        /// <summary>
        /// Date of purchase or acquisition
        /// </summary>
        public DateTime? PurchaseDate { get; set; }

        /// <summary>
        /// Purchase price
        /// </summary>
        [Precision(18, 2)]
        public decimal? PurchasePrice { get; set; }

        /// <summary>
        /// Current assigned driver name
        /// </summary>
        [MaxLength(100)]
        public string? AssignedDriver { get; set; }

        /// <summary>
        /// Vehicle status (Active, Inactive, In Maintenance, Sold)
        /// </summary>
        [MaxLength(20)]
        public string? Status { get; set; }

        /// <summary>
        /// Insurance policy number
        /// </summary>
        [MaxLength(50)]
        public string? InsurancePolicy { get; set; }

        /// <summary>
        /// Insurance expiry date
        /// </summary>
        public DateTime? InsuranceExpiryDate { get; set; }

        /// <summary>
        /// Additional notes or remarks
        /// </summary>
        [MaxLength(500)]
        public string? Remarks { get; set; }
    }
}
