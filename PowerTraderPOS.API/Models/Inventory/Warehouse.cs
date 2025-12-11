using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Inventory
{
    /// <summary>
    /// Represents a warehouse or storage location in the inventory system
    /// </summary>
    [Table("WarehouseTbl")]
    [Index(nameof(WarehouseCode), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_Warehouse_Code_Tenant", IsUnique = true)]
    public class Warehouse : TenantEntity
    {
        /// <summary>
        /// Unique identifier for the warehouse
        /// </summary>
        [Key]
        public int WarehouseId { get; set; }

        /// <summary>
        /// Warehouse code or identifier (unique per tenant)
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string WarehouseCode { get; set; } = string.Empty;

        /// <summary>
        /// Warehouse name
        /// </summary>
        [Required]
        [MaxLength(100)]
        public string WarehouseName { get; set; } = string.Empty;

        /// <summary>
        /// Warehouse location or address
        /// </summary>
        [MaxLength(200)]
        public string? Location { get; set; }

        /// <summary>
        /// Physical address line 1
        /// </summary>
        [MaxLength(200)]
        public string? Address1 { get; set; }

        /// <summary>
        /// Physical address line 2
        /// </summary>
        [MaxLength(200)]
        public string? Address2 { get; set; }

        /// <summary>
        /// City
        /// </summary>
        [MaxLength(50)]
        public string? City { get; set; }

        /// <summary>
        /// State or region
        /// </summary>
        [MaxLength(50)]
        public string? State { get; set; }

        /// <summary>
        /// Postal or ZIP code
        /// </summary>
        [MaxLength(20)]
        public string? PostalCode { get; set; }

        /// <summary>
        /// Country
        /// </summary>
        [MaxLength(50)]
        public string? Country { get; set; }

        /// <summary>
        /// Contact phone number
        /// </summary>
        [MaxLength(20)]
        [Phone]
        public string? Phone { get; set; }

        /// <summary>
        /// Contact email address
        /// </summary>
        [MaxLength(100)]
        [EmailAddress]
        public string? Email { get; set; }

        /// <summary>
        /// Warehouse manager name
        /// </summary>
        [MaxLength(100)]
        public string? ManagerName { get; set; }

        /// <summary>
        /// Total capacity (square meters or cubic meters)
        /// </summary>
        [Precision(18, 2)]
        public decimal? Capacity { get; set; }

        /// <summary>
        /// Warehouse type (Main, Secondary, Cold Storage, Distribution Center)
        /// </summary>
        [MaxLength(50)]
        public string? WarehouseType { get; set; }

        /// <summary>
        /// Warehouse status (Active, Inactive, Under Construction)
        /// </summary>
        [MaxLength(20)]
        public string? Status { get; set; }

        /// <summary>
        /// Additional notes or remarks
        /// </summary>
        [MaxLength(500)]
        public string? Remarks { get; set; }
    }
}
