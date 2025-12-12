using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a service or maintenance record for vehicles or equipment
    /// </summary>
    [Table("TblServicing")]
    [Index(nameof(ServiceNumber), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_ServiceRecord_Number_Tenant", IsUnique = true)]
    public class ServiceRecord : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the service record
        /// </summary>
        [Key]
        public int ServiceId { get; set; }

        /// <summary>
        /// Unique service record number (unique per tenant)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string ServiceNumber { get; set; } = string.Empty;

        /// <summary>
        /// Date of service
        /// </summary>
        [Required]
        public DateTime ServiceDate { get; set; }

        /// <summary>
        /// Vehicle or equipment identifier
        /// </summary>
        [MaxLength(50)]
        public string? VehicleNumber { get; set; }

        /// <summary>
        /// Type of service (Routine Maintenance, Repair, Inspection, Emergency)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string ServiceType { get; set; } = string.Empty;

        /// <summary>
        /// Description of service performed
        /// </summary>
        [Required]
        [MaxLength(1000)]
        public string Description { get; set; } = string.Empty;

        /// <summary>
        /// Odometer reading at time of service
        /// </summary>
        [Precision(18, 2)]
        public decimal? OdometerReading { get; set; }

        /// <summary>
        /// Cost of service
        /// </summary>
        [Required]
        [Precision(18, 2)]
        public decimal ServiceCost { get; set; }

        /// <summary>
        /// Service provider or mechanic name
        /// </summary>
        [MaxLength(100)]
        public string? ServiceProvider { get; set; }

        /// <summary>
        /// Service provider contact phone
        /// </summary>
        [MaxLength(20)]
        [Phone]
        public string? ProviderPhone { get; set; }

        /// <summary>
        /// Parts replaced or used in service
        /// </summary>
        [MaxLength(500)]
        public string? PartsUsed { get; set; }

        /// <summary>
        /// Next scheduled service date
        /// </summary>
        public DateTime? NextServiceDate { get; set; }

        /// <summary>
        /// Service status (Completed, Pending, Scheduled)
        /// </summary>
        [MaxLength(20)]
        public string? Status { get; set; }

        /// <summary>
        /// Technician or staff who recorded the service
        /// </summary>
        [MaxLength(100)]
        public string? RecordedBy { get; set; }

        /// <summary>
        /// Additional notes or remarks
        /// </summary>
        [MaxLength(500)]
        public string? Remarks { get; set; }
    }
}
