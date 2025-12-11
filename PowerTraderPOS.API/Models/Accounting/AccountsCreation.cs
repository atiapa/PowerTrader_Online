using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;
using PowerTraderPOS.API.Models.Base;

namespace PowerTraderPOS.API.Models.Accounting
{
    /// <summary>
    /// Represents an account in the Chart of Accounts.
    /// Used for account setup, configuration, and classification.
    /// Inherits multi-tenant isolation and audit tracking from TenantEntity.
    /// </summary>
    [Table("Accounts_Creation")]
    [Index(nameof(AccountNr), nameof(OrganisationCode), nameof(BranchCode), IsUnique = true, Name = "IX_AccountsCreation_AccountNr_Tenant")]
    public class AccountsCreation : TenantEntity
    {
        /// <summary>
        /// Primary key - Reference number
        /// </summary>
        [Key]
        [Column("Refno")]
        public decimal Refno { get; set; }

        /// <summary>
        /// Account group classification (e.g., Assets, Liabilities, Revenue)
        /// </summary>
        [Column("AccountGroup")]
        [MaxLength(50)]
        public string? AccountGroup { get; set; }

        /// <summary>
        /// Descriptive name of the account
        /// </summary>
        [Column("AccountName")]
        [MaxLength(50)]
        [Required(ErrorMessage = "Account Name is required")]
        public string AccountName { get; set; } = string.Empty;

        /// <summary>
        /// Unique account number/code
        /// </summary>
        [Column("AccountNr")]
        [MaxLength(50)]
        [Required(ErrorMessage = "Account Number is required")]
        public string AccountNr { get; set; } = string.Empty;

        /// <summary>
        /// Opening balance for the account
        /// </summary>
        [Column("OpeningBalance", TypeName = "money")]
        public decimal? OpeningBalance { get; set; }

        /// <summary>
        /// Nature of the account (Debit/Credit)
        /// </summary>
        [Column("Nature")]
        [MaxLength(50)]
        public string? Nature { get; set; }

        /// <summary>
        /// Credit limit for the account (if applicable)
        /// </summary>
        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        /// <summary>
        /// Descriptive narration or notes for the account
        /// </summary>
        [Column("Narration")]
        [MaxLength(500)]
        public string? Narration { get; set; }

        /// <summary>
        /// Legacy branch code field - maintained for backward compatibility.
        /// Use BranchCode from TenantEntity base class for new code.
        /// </summary>
        [Column("Branchcode")]
        [MaxLength(50)]
        [Obsolete("Use BranchCode property from TenantEntity base class")]
        public string? Branchcode { get; set; }

        /// <summary>
        /// Legacy entry ID field - maintained for backward compatibility.
        /// Use CreatedBy from AuditableEntity base class for new code.
        /// </summary>
        [Column("EntryID")]
        [MaxLength(50)]
        [Obsolete("Use CreatedBy property from AuditableEntity base class")]
        public string? EntryID { get; set; }

        /// <summary>
        /// Legacy entry date field - maintained for backward compatibility.
        /// Use CreatedDate from AuditableEntity base class for new code.
        /// </summary>
        [Column("EntryDate")]
        [MaxLength(50)]
        [Obsolete("Use CreatedDate property from AuditableEntity base class")]
        public string? EntryDate { get; set; }

        /// <summary>
        /// Tax Identification Number (TIN) for the account
        /// </summary>
        [Column("TIN")]
        [MaxLength(50)]
        public string? TIN { get; set; }

        /// <summary>
        /// Type of account (e.g., Current, Savings, Expense, etc.)
        /// </summary>
        [Column("AccountType")]
        [MaxLength(50)]
        public string? AccountType { get; set; }

        /// <summary>
        /// Current status of the account (Active, Inactive, Closed)
        /// </summary>
        [Column("AccountStatus")]
        [MaxLength(50)]
        public string? AccountStatus { get; set; }

        /// <summary>
        /// Income Statement status flag
        /// </summary>
        [Column("IS_Status")]
        [MaxLength(50)]
        public string? IS_Status { get; set; }

        /// <summary>
        /// Balance Sheet status flag
        /// </summary>
        [Column("BS_Status")]
        [MaxLength(50)]
        public string? BS_Status { get; set; }

        /// <summary>
        /// Cash Flow status flag
        /// </summary>
        [Column("CF_Status")]
        [MaxLength(50)]
        public string? CF_Status { get; set; }

        /// <summary>
        /// Retained Earnings status flag
        /// </summary>
        [Column("RE_Status")]
        [MaxLength(50)]
        public string? RE_Status { get; set; }

        /// <summary>
        /// Legacy organisation name field - maintained for backward compatibility.
        /// Organisation data should be fetched via OrganisationCode from TenantEntity.
        /// </summary>
        [Column("OrganisationName")]
        [MaxLength(50)]
        [Obsolete("Fetch organisation name via OrganisationCode relationship")]
        public string? OrganisationName { get; set; }

        /// <summary>
        /// Legacy branch name field - maintained for backward compatibility.
        /// Branch data should be fetched via BranchCode from TenantEntity.
        /// </summary>
        [Column("BranchName")]
        [MaxLength(50)]
        [Obsolete("Fetch branch name via BranchCode relationship")]
        public string? BranchName { get; set; }

        // Navigation properties can be added here in future phases
        // For example:
        // public virtual Branch Branch { get; set; }
        // public virtual Organisation Organisation { get; set; }
    }
}
