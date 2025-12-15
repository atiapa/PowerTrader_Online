using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    // Read DTO
    public class RetailItemsDto
    {
        public string ProductId { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string? CategoryId { get; set; }
        public string? CategoryName { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal? CostPrice { get; set; }
        public decimal UnitInstock { get; set; }
        public decimal ReorderLevel { get; set; }
        public string? Barcode { get; set; }
        public string? ImageUrl { get; set; }
        public bool IsActive { get; set; }
        public decimal TaxRate { get; set; }
        public decimal DiscountPercent { get; set; }
        public string? Unit { get; set; }
        public string? Supplier { get; set; }
        public DateTime? LastRestockDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string? CreatedBy { get; set; }
        public string? ModifiedBy { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    // Create DTO
    public class CreateRetailItemsDto
    {
        [Required]
        [MaxLength(50)]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(50)]
        public string? CategoryId { get; set; }

        [MaxLength(200)]
        public string? CategoryName { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal UnitPrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? CostPrice { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal UnitInstock { get; set; } = 0;

        [Range(0, double.MaxValue)]
        public decimal ReorderLevel { get; set; } = 0;

        [MaxLength(50)]
        public string? Barcode { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        [Range(0, 100)]
        public decimal TaxRate { get; set; } = 0;

        [Range(0, 100)]
        public decimal DiscountPercent { get; set; } = 0;

        [MaxLength(20)]
        public string? Unit { get; set; }

        [MaxLength(100)]
        public string? Supplier { get; set; }
    }

    // Update DTO
    public class UpdateRetailItemsDto
    {
        [Required]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Description { get; set; }

        [MaxLength(50)]
        public string? CategoryId { get; set; }

        [MaxLength(200)]
        public string? CategoryName { get; set; }

        [Required]
        [Range(0, double.MaxValue)]
        public decimal UnitPrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal? CostPrice { get; set; }

        [Range(0, double.MaxValue)]
        public decimal ReorderLevel { get; set; } = 0;

        [MaxLength(50)]
        public string? Barcode { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        [Range(0, 100)]
        public decimal TaxRate { get; set; } = 0;

        [Range(0, 100)]
        public decimal DiscountPercent { get; set; } = 0;

        [MaxLength(20)]
        public string? Unit { get; set; }

        [MaxLength(100)]
        public string? Supplier { get; set; }
    }

    // Stock Adjustment DTO
    public class StockAdjustmentDto
    {
        [Required]
        [MaxLength(50)]
        public string ProductId { get; set; } = string.Empty;

        [Required]
        [Range(-999999, 999999)]
        public decimal Quantity { get; set; }

        [Required]
        [MaxLength(20)]
        public string Operation { get; set; } = string.Empty; // "Add", "Subtract", "Set"

        [MaxLength(500)]
        public string? Reason { get; set; }
    }

    // Low Stock Alert DTO
    public class LowStockItemDto
    {
        public string ProductId { get; set; } = string.Empty;
        public string ProductName { get; set; } = string.Empty;
        public decimal UnitInstock { get; set; }
        public decimal ReorderLevel { get; set; }
        public decimal Shortage { get; set; }
        public string? Supplier { get; set; }
    }
}
