namespace PowerTraderPOS.API.DTOs
{
    // Read DTO
    public class GiftCardDto
    {
        public int GiftCardId { get; set; }
        public string CardNumber { get; set; } = string.Empty;
        public decimal InitialBalance { get; set; }
        public decimal CurrentBalance { get; set; }
        public DateTime IssueDate { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string Status { get; set; } = string.Empty;
        public string? IssuedBy { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public string? Notes { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string OrganisationCode { get; set; } = string.Empty;
        public string Branchcode { get; set; } = string.Empty;
    }

    // Create DTO
    public class CreateGiftCardDto
    {
        public decimal InitialBalance { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public string? CustomerID { get; set; }
        public string? CustomerName { get; set; }
        public string? Notes { get; set; }
    }

    // Redeem DTO
    public class RedeemGiftCardDto
    {
        public string CardNumber { get; set; } = string.Empty;
        public decimal Amount { get; set; }
        public string? InvoiceNr { get; set; }
        public string? Remarks { get; set; }
    }

    // Balance DTO
    public class GiftCardBalanceDto
    {
        public string CardNumber { get; set; } = string.Empty;
        public decimal CurrentBalance { get; set; }
        public string Status { get; set; } = string.Empty;
        public DateTime? ExpiryDate { get; set; }
    }
}
