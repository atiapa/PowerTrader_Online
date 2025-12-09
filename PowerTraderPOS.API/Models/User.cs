namespace PowerTraderPOS.API.Models
{
    public class User
    {
        public int Id { get; set; }
        public int TenantId { get; set; }
        public string Username { get; set; } = string.Empty;
        public string FullName { get; set; } = string.Empty;
        public string PIN { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty; // Admin, Finance, HR, Fleet, Service, Suppliers, Customers, Sales
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? LastLoginDate { get; set; }

        // Navigation properties
        public Tenant Tenant { get; set; } = null!;
        public ICollection<Sale> Sales { get; set; } = new List<Sale>();
    }
}
