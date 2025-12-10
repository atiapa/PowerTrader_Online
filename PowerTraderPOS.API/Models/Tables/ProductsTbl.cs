using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("products_tbl")]
    public class ProductsTbl
    {
        [Key]
        [Column("product_id")]
        public int ProductId { get; set; }

        [Column("product_code")]
        [MaxLength(50)]
        public string? ProductCode { get; set; }

        [Column("product_name")]
        [MaxLength(200)]
        public string? ProductName { get; set; }

        [Column("product_description")]
        [MaxLength(500)]
        public string? ProductDescription { get; set; }

        [Column("unit_price")]
        [Precision(18, 2)]
        public decimal? UnitPrice { get; set; }

        [Column("cost_price")]
        [Precision(18, 2)]
        public decimal? CostPrice { get; set; }

        [Column("category_id")]
        public int? CategoryId { get; set; }

        [Column("subcategory_id")]
        public int? SubcategoryId { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
