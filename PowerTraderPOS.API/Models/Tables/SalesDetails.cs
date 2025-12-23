using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("sales_details")]
    public class SalesDetails
    {
        [Key]
        [Column("sale_id")]
        public int SaleId { get; set; }

        [Column("invoice_no")]
        [MaxLength(50)]
        public string? InvoiceNo { get; set; }

        [Column("sale_date")]
        public DateTime? SaleDate { get; set; }

        [Column("customer_id")]
        public int? CustomerId { get; set; }

        [Column("total_amount")]
        [Precision(18, 2)]
        public decimal? TotalAmount { get; set; }

        [Column("tax_amount")]
        [Precision(18, 2)]
        public decimal? TaxAmount { get; set; }

        [Column("discount_amount")]
        [Precision(18, 2)]
        public decimal? DiscountAmount { get; set; }

        [Column("net_amount")]
        [Precision(18, 2)]
        public decimal? NetAmount { get; set; }

        [Column("payment_method")]
        [MaxLength(50)]
        public string? PaymentMethod { get; set; }

        [Column("user_id")]
        public int? UserId { get; set; }

        [Column("session_id")]
        public int? SessionId { get; set; }

        [Column("status")]
        [MaxLength(50)]
        public string? Status { get; set; }
    }
}
