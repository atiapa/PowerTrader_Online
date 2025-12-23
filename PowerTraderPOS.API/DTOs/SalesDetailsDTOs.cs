using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class SalesDetailsDto
    {
        public decimal RefNo { get; set; }
        public string? InvoiceNr { get; set; }
        public string? ProductID { get; set; }
        public string? ProductName { get; set; }
        public string? BatchNo { get; set; }
        public decimal? HI_Unitprice { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Cost { get; set; }
        public decimal? Discount { get; set; }
        public decimal? ExtendedPrice { get; set; }
        public string? EntryID { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public DateTime? EntryDate { get; set; }
        public string? Remarks { get; set; }
        public decimal? PrevStock { get; set; }
        public decimal? ProfitOrLoss { get; set; }
        public decimal? Amountpaid { get; set; }
        public decimal? Change_Balance { get; set; }
        public decimal? Tax { get; set; }
        public string? Attendant { get; set; }
        public string? TillName { get; set; }
        public string? Time { get; set; }
        public DateTime? Session { get; set; }
        public string? Barcodenr { get; set; }
        public string? SalesType { get; set; }
        public string? Store { get; set; }
        public string? BranchCode { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateSalesDetailsDto
    {
        [Required]
        public string InvoiceNr { get; set; } = string.Empty;
        
        [Required]
        public string ProductID { get; set; } = string.Empty;
        
        [Required]
        public string ProductName { get; set; } = string.Empty;
        
        public decimal? UnitPrice { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Cost { get; set; }
        public decimal? Discount { get; set; }
        public decimal? Tax { get; set; }
        public decimal? ExtendedPrice { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public string? EntryID { get; set; }
        public string? Remarks { get; set; }
        public string? Attendant { get; set; }
        public string? TillName { get; set; }
        public string? SalesType { get; set; }
        public string? Store { get; set; }
        public string? BranchCode { get; set; }
    }

    public class UpdateSalesDetailsDto
    {
        public string? ProductName { get; set; }
        public decimal? UnitPrice { get; set; }
        public decimal? Quantity { get; set; }
        public decimal? Discount { get; set; }
        public decimal? Tax { get; set; }
        public decimal? ExtendedPrice { get; set; }
        public string? Remarks { get; set; }
        public string? SalesType { get; set; }
    }
}
