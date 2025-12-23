using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("GiftCards")]
    public class GiftCards
    {
        [Key]
        public int GiftCardId { get; set; }

        [Required]
        [MaxLength(50)]
        public string CardNumber { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18, 2)")]
        public decimal InitialBalance { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal CurrentBalance { get; set; }

        public DateTime IssueDate { get; set; }

        public DateTime? ExpiryDate { get; set; }

        [Required]
        [MaxLength(20)]
        public string Status { get; set; } = "Active"; // Active, Redeemed, Expired, Cancelled

        [MaxLength(50)]
        public string? IssuedBy { get; set; }

        [MaxLength(50)]
        public string? CustomerID { get; set; }

        [MaxLength(200)]
        public string? CustomerName { get; set; }

        [MaxLength(500)]
        public string? Notes { get; set; }

        public DateTime CreatedDate { get; set; } = DateTime.Now;

        public DateTime? ModifiedDate { get; set; }

        // Multi-tenant properties
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
