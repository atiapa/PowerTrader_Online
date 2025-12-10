using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("suppliers")]
    public class Suppliers
    {
        [Key]
        [Column("supplier_id")]
        public int SupplierId { get; set; }

        [Column("supplier_name")]
        [MaxLength(200)]
        public string? SupplierName { get; set; }

        [Column("supplier_phone")]
        [MaxLength(50)]
        public string? SupplierPhone { get; set; }

        [Column("supplier_email")]
        [MaxLength(100)]
        public string? SupplierEmail { get; set; }

        [Column("supplier_address")]
        [MaxLength(500)]
        public string? SupplierAddress { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
