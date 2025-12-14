using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Inventory
{
    /// <summary>
    /// Represents inventory stock levels for products across warehouses
    /// </summary>
    [Table("stock_master")]
    [Index(nameof(ProductId), nameof(WarehouseId), nameof(OrganisationCode), nameof(BranchCode), Name = "IX_StockLevel_Product_Warehouse_Tenant", IsUnique = true)]
    public class StockLevel : TenantEntity
    {
        /// <summary>
        /// Unique stock record identifier
        /// </summary>
        [Key]
        [Column("stock_id")]
        public int StockId { get; set; }

        /// <summary>
        /// Reference to the product
        /// </summary>
        [Column("product_id")]
        [Required]
        public int ProductId { get; set; }

        /// <summary>
        /// Reference to the warehouse location
        /// </summary>
        [Column("warehouse_id")]
        public int? WarehouseId { get; set; }

        /// <summary>
        /// Current quantity in stock
        /// </summary>
        [Column("quantity")]
        [Required]
        public int Quantity { get; set; }

        /// <summary>
        /// Minimum quantity before reorder is needed
        /// </summary>
        [Column("reorder_level")]
        public int? ReorderLevel { get; set; }

        /// <summary>
        /// Last time stock level was updated
        /// </summary>
        [Column("last_updated")]
        public DateTime? LastUpdated { get; set; }

        // Navigation properties can be added here
        // public virtual Product Product { get; set; }
        // public virtual Warehouse Warehouse { get; set; }
    }
}
