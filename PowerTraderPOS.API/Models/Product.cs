namespace PowerTraderPOS.API.Models
{
    public class Product
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public decimal Cost { get; set; }
        public int StockQuantity { get; set; }
        public string? Category { get; set; }
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedDate { get; set; }

        // Navigation properties
        public Tenant Tenant { get; set; } = null!;
    }
}
