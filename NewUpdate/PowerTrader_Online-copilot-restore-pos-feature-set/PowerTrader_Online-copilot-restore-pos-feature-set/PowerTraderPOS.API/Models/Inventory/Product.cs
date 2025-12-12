using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Inventory
{
    /// <summary>
    /// Represents a product in the inventory system.
    /// Products are tenant-scoped with unique product codes per organization/branch.
    /// </summary>
    [Table("products_tbl")]
    [Index(nameof(ProductCode), nameof(OrganisationCode), nameof(BranchCode), 
           Name = "IX_Product_Code_Tenant", IsUnique = true)]
    [Index(nameof(ProductName), nameof(OrganisationCode), nameof(BranchCode), 
           Name = "IX_Product_Name_Tenant")]
    [Index(nameof(CategoryId), Name = "IX_Product_Category")]
    public class Product : TenantEntity
    {
        /// <summary>
        /// Gets or sets the unique identifier for the product.
        /// </summary>
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }

        /// <summary>
        /// Gets or sets the unique product code (SKU).
        /// Must be unique within an organization/branch.
        /// </summary>
        [Required]
        [Column("product_code")]
        [MaxLength(50)]
        public string ProductCode { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the name of the product.
        /// </summary>
        [Required]
        [Column("product_name")]
        [MaxLength(200)]
        public string ProductName { get; set; } = string.Empty;

        /// <summary>
        /// Gets or sets the detailed description of the product.
        /// </summary>
        [Column("product_description")]
        [MaxLength(500)]
        public string? ProductDescription { get; set; }

        /// <summary>
        /// Gets or sets the selling price per unit.
        /// </summary>
        [Column("unit_price")]
        [Precision(18, 2)]
        public decimal? UnitPrice { get; set; }

        /// <summary>
        /// Gets or sets the cost price per unit (for profit calculation).
        /// </summary>
        [Column("cost_price")]
        [Precision(18, 2)]
        public decimal? CostPrice { get; set; }

        /// <summary>
        /// Gets or sets the category identifier for product categorization.
        /// Foreign key to Category table.
        /// </summary>
        [Column("category_id")]
        public int? CategoryId { get; set; }

        /// <summary>
        /// Gets or sets the subcategory identifier for finer product classification.
        /// </summary>
        [Column("subcategory_id")]
        public int? SubcategoryId { get; set; }

        /// <summary>
        /// Gets or sets whether the product is active and available for sale.
        /// </summary>
        [Column("is_active")]
        public bool IsActive { get; set; } = true;
    }
}
