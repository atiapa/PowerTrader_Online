using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("Sales_Details_Gifts")]
    public class SalesDetailsGifts
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(TypeName = "numeric(18, 0)")]
        public decimal RefNo { get; set; }

        [MaxLength(100)]
        public string? InvoiceNr { get; set; }

        public string? ProductID { get; set; }

        public string? ProductName { get; set; }

        [MaxLength(100)]
        public string? BatchNo { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? HI_Unitprice { get; set; }

        [Column(TypeName = "decimal(19, 2)")]
        public decimal? UnitPrice { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Quantity { get; set; }

        [Column(TypeName = "decimal(19, 2)")]
        public decimal? Cost { get; set; }

        [Column(TypeName = "decimal(24, 2)")]
        public decimal? Discount { get; set; }

        [Column(TypeName = "decimal(19, 2)")]
        public decimal? ExtendedPrice { get; set; }

        public string? EntryID { get; set; }

        [MaxLength(50)]
        public string? CustomerAccountNr { get; set; }

        public string? CustomerID { get; set; }

        public string? CustomerName { get; set; }

        public DateTime? EntryDate { get; set; }

        public string? Remarks { get; set; }

        [Column(TypeName = "decimal(19, 2)")]
        public decimal? PrevStock { get; set; }

        [Column(TypeName = "decimal(19, 2)")]
        public decimal? PrevReorder { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? CostPrice { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? ProfitOrLoss { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Amountpaid { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Change_Balance { get; set; }

        [Column(TypeName = "decimal(18, 4)")]
        public decimal? Tax { get; set; }

        [MaxLength(50)]
        public string? Attendant { get; set; }

        [MaxLength(50)]
        public string? TillName { get; set; }

        [MaxLength(50)]
        public string? Time { get; set; }

        [MaxLength(50)]
        public string? Session { get; set; }

        [MaxLength(50)]
        public string? Barcodenr { get; set; }

        [MaxLength(50)]
        public string? SalesType { get; set; }

        [MaxLength(200)]
        public string? AmountInwords { get; set; }

        public byte[]? Barcodeimage { get; set; }

        [MaxLength(50)]
        public string? Ordernr { get; set; }

        public int? qtyremaining { get; set; }

        public int? qtyreturned { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Previous_Balance { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal? Current_Balance { get; set; }

        [MaxLength(50)]
        public string? Currency { get; set; }

        // Multi-tenant properties
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
