namespace PowerTraderPOS.API.DTOs
{
    public class CreateSaleRequest
    {
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty; // Cash, Card, MobileMoney
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public string? Notes { get; set; }
        public List<SaleItemRequest> Items { get; set; } = new List<SaleItemRequest>();
    }

    public class SaleItemRequest
    {
        public string ProductName { get; set; } = string.Empty;
        public string ProductCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetPrice { get; set; }
    }

    public class SaleResponse
    {
        public int Id { get; set; }
        public string TransactionNumber { get; set; } = string.Empty;
        public decimal TotalAmount { get; set; }
        public decimal TaxAmount { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetAmount { get; set; }
        public string PaymentMethod { get; set; } = string.Empty;
        public string Status { get; set; } = string.Empty;
        public DateTime TransactionDate { get; set; }
        public string? CustomerName { get; set; }
        public string? CustomerPhone { get; set; }
        public List<SaleItemResponse> Items { get; set; } = new List<SaleItemResponse>();
    }

    public class SaleItemResponse
    {
        public int Id { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public string ProductCode { get; set; } = string.Empty;
        public int Quantity { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal TotalPrice { get; set; }
        public decimal DiscountAmount { get; set; }
        public decimal NetPrice { get; set; }
    }
}
