using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("Retail_Items")]
    public class RetailItems
    {
        [Key]
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

        [Column(TypeName = "decimal(18, 2)")]
        public decimal UnitPrice { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? CostPrice { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal UnitInstock { get; set; } = 0;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal ReorderLevel { get; set; } = 0;

        [MaxLength(50)]
        public string? Barcode { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public bool IsActive { get; set; } = true;

        [Column(TypeName = "decimal(5, 2)")]
        public decimal TaxRate { get; set; } = 0;

        [Column(TypeName = "decimal(5, 2)")]
        public decimal DiscountPercent { get; set; } = 0;

        [MaxLength(20)]
        public string? Unit { get; set; }

        [MaxLength(100)]
        public string? Supplier { get; set; }

        public DateTime? LastRestockDate { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime? ModifiedDate { get; set; }

        [MaxLength(50)]
        public string? CreatedBy { get; set; }

        [MaxLength(50)]
        public string? ModifiedBy { get; set; }

        // Multi-tenant properties
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
