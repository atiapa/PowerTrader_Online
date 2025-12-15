namespace PowerTraderPOS.API.Models
{
    public class Sale
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public int UserId { get; set; }
        public string TransactionNumber { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty; // Cash, Card, MobileMoney
        public string Status { get; set; } = "Completed"; // Completed, Pending, Cancelled
        public DateTime TransactionDate { get; set; } = DateTime.UtcNow;
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? Notes { get; set; }

        // Navigation properties
        public Tenant Tenant { get; set; } = null!;
        public User User { get; set; } = null!;
        public ICollection<SaleItem> SaleItems { get; set; } = new List<SaleItem>();
    }
}
