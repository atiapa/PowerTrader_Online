using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    /// <summary>
    /// Accounts Ledger model for double-entry bookkeeping
    /// Stores all financial transactions with debit/credit entries
    /// </summary>
    [Table("Accounts_Ledger")]
    public class AccountsLedger
    {
        [Key]
        public int LedgerId { get; set; }

        [Required]
        public DateTime TransactionDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string AccountCode { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string AccountName { get; set; } = string.Empty;

        /// <summary>
        /// Asset, Liability, Equity, Revenue, Expense
        /// </summary>
        [Required]
        [MaxLength(20)]
        public string AccountType { get; set; } = string.Empty;

        [Column(TypeName = "decimal(18,2)")]
        public decimal DebitAmount { get; set; }

        [Column(TypeName = "decimal(18,2)")]
        public decimal CreditAmount { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        /// <summary>
        /// Invoice/Return/Transaction reference
        /// </summary>
        [MaxLength(100)]
        public string? ReferenceNumber { get; set; }

        [MaxLength(50)]
        public string? EnteredBy { get; set; }

        public DateTime EntryDate { get; set; } = DateTime.Now;

        /// <summary>
        /// Multi-tenant: Organisation code for data isolation
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string OrganisationCode { get; set; } = string.Empty;

        /// <summary>
        /// Multi-tenant: Branch code for data isolation
        /// </summary>
        [Required]
        [MaxLength(50)]
        public string Branchcode { get; set; } = string.Empty;
    }
}
