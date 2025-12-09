using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("tbl_customer_info")]
    public class CustomerInfo
    {
        [Key]
        [Column("customer_id")]
        public int CustomerId { get; set; }

        [Column("customer_name")]
        [MaxLength(200)]
        public string? CustomerName { get; set; }

        [Column("customer_phone")]
        [MaxLength(50)]
        public string? CustomerPhone { get; set; }

        [Column("customer_email")]
        [MaxLength(100)]
        public string? CustomerEmail { get; set; }

        [Column("customer_address")]
        [MaxLength(500)]
        public string? CustomerAddress { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
