using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Core
{
    /// <summary>
    /// Represents a country with its currency information.
    /// This is a reference/lookup table used across the system.
    /// Note: Countries are global data, not tenant-specific, so inherits from AuditableEntity only.
    /// </summary>
    [Table("countries")]
    [Index(nameof(CountryCode), Name = "IX_Country_Code", IsUnique = true)]
    public class Country : AuditableEntity
    {
        /// <summary>
        /// Primary key - Unique country identifier
        /// </summary>
        [Key]
        [Column("id")]
        public int Id { get; set; }

        /// <summary>
        /// Country name - Required
        /// </summary>
        [Required]
        [Column("country_name")]
        [MaxLength(200)]
        public string CountryName { get; set; } = string.Empty;

        /// <summary>
        /// ISO country code (e.g., "US", "GB", "GH")
        /// </summary>
        [Required]
        [Column("country_code")]
        [MaxLength(10)]
        public string CountryCode { get; set; } = string.Empty;

        /// <summary>
        /// Currency name (e.g., "US Dollar", "British Pound")
        /// </summary>
        [Column("currency_name")]
        [MaxLength(100)]
        public string? CurrencyName { get; set; }

        /// <summary>
        /// ISO currency code (e.g., "USD", "GBP", "GHS")
        /// </summary>
        [Column("currency_code")]
        [MaxLength(10)]
        public string? CurrencyCode { get; set; }

        /// <summary>
        /// Currency symbol (e.g., "$", "£", "₵")
        /// </summary>
        [Column("currency_symbol")]
        [MaxLength(10)]
        public string? CurrencySymbol { get; set; }

        /// <summary>
        /// Comma-separated list of note/bill denominations
        /// </summary>
        [Column("note_names")]
        [MaxLength(500)]
        public string? NoteNames { get; set; }

        /// <summary>
        /// Comma-separated list of coin denominations
        /// </summary>
        [Column("coin_names")]
        [MaxLength(500)]
        public string? CoinNames { get; set; }
    }
}
