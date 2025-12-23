namespace PowerTraderPOS.API.DTOs
{
    // Read DTO
    public class SalesDetailsGiftsDto
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
        public string? CustomerAccountNr { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public DateTime? EntryDate { get; set; }
        public string? Remarks { get; set; }
        public decimal? PrevStock { get; set; }
        public decimal? PrevReorder { get; set; }
        public decimal? CostPrice { get; set; }
        public decimal? ProfitOrLoss { get; set; }
        public decimal? Amountpaid { get; set; }
        public decimal? Change_Balance { get; set; }
        public decimal? Tax { get; set; }
        public string? Attendant { get; set; }
        public string? TillName { get; set; }
        public string? Time { get; set; }
        public string? Session { get; set; }
        public string? Barcodenr { get; set; }
        public string? SalesType { get; set; }
        public string? AmountInwords { get; set; }
        public string? Ordernr { get; set; }
        public int? qtyremaining { get; set; }
        public int? qtyreturned { get; set; }
        public decimal? Previous_Balance { get; set; }
        public decimal? Current_Balance { get; set; }
        public string? Currency { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    // Create DTO
    public class CreateSalesDetailsGiftsDto
    {
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
        public string? CustomerAccountNr { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public string? Remarks { get; set; }
        public decimal? PrevStock { get; set; }
        public decimal? PrevReorder { get; set; }
        public decimal? CostPrice { get; set; }
        public decimal? ProfitOrLoss { get; set; }
        public decimal? Amountpaid { get; set; }
        public decimal? Change_Balance { get; set; }
        public decimal? Tax { get; set; }
        public string? Attendant { get; set; }
        public string? TillName { get; set; }
        public string? Session { get; set; }
        public string? Barcodenr { get; set; }
        public string? SalesType { get; set; }
        public string? AmountInwords { get; set; }
        public string? Ordernr { get; set; }
        public int? qtyremaining { get; set; }
        public int? qtyreturned { get; set; }
        public decimal? Previous_Balance { get; set; }
        public decimal? Current_Balance { get; set; }
        public string? Currency { get; set; }
    }
}
