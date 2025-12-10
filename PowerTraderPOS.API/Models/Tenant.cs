namespace PowerTraderPOS.API.Models
{
    public class Tenant
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Code { get; set; } = string.Empty;
        public bool IsActive { get; set; } = true;
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedDate { get; set; }

        // Navigation properties
        public ICollection<User> Users { get; set; } = new List<User>();
        public ICollection<Sale> Sales { get; set; } = new List<Sale>();
    }
}
