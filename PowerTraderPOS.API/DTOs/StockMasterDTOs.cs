using System.ComponentModel.DataAnnotations;

namespace PowerTraderPOS.API.DTOs
{
    public class StockMasterDto
    {
        public decimal Refno { get; set; }
        public DateTime? TransDate { get; set; }
        public string? VoucherNr { get; set; }
        public string? ProductName { get; set; }
        public decimal? OpeningStock { get; set; }
        public decimal? Purchase { get; set; }
        public decimal? PurchaseReturn { get; set; }
        public decimal? InwardTransfer { get; set; }
        public decimal? Inward { get; set; }
        public decimal? Sales { get; set; }
        public decimal? SalesReturn { get; set; }
        public decimal? OutwardTransfer { get; set; }
        public decimal? Outward { get; set; }
        public decimal? Balance { get; set; }
        public string? Narration { get; set; }
        public string? EntryID { get; set; }
        public string? BatchNo { get; set; }
        public string? ExpiryDate { get; set; }
        public decimal? UnitInStock { get; set; }
        public string? Store { get; set; }
        public string? ProductID { get; set; }
        public string? Branchcode { get; set; }
        public DateTime? Session { get; set; }
        public string? OrganisationName { get; set; }
        public string? OrganisationCode { get; set; }
        public string? BranchName { get; set; }
    }

    public class CreateStockMasterDto
    {
        [Required]
        public string ProductName { get; set; } = string.Empty;
        
        public string? VoucherNr { get; set; }
        public decimal? OpeningStock { get; set; }
        public decimal? Purchase { get; set; }
        public decimal? Sales { get; set; }
        public decimal? Balance { get; set; }
        public string? Narration { get; set; }
        public string? EntryID { get; set; }
        public string? BatchNo { get; set; }
        public string? ProductID { get; set; }
        public string? Store { get; set; }
        public string? Branchcode { get; set; }
    }

    public class UpdateStockMasterDto
    {
        public decimal? Purchase { get; set; }
        public decimal? PurchaseReturn { get; set; }
        public decimal? Sales { get; set; }
        public decimal? SalesReturn { get; set; }
        public decimal? Balance { get; set; }
        public string? Narration { get; set; }
    }
}
