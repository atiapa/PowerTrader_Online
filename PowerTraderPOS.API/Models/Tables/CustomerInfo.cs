using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("tbl_Customer_Info")]
    public class CustomerInfo
    {
        [Key]
        [Column("Refno")]
        public decimal Refno { get; set; }

        [Column("AccountName")]
        [MaxLength(200)]
        public string? AccountName { get; set; }

        [Column("Surname")]
        [MaxLength(50)]
        public string? Surname { get; set; }

        [Column("Othernames")]
        [MaxLength(100)]
        public string? Othernames { get; set; }

        [Column("AccountNr")]
        [MaxLength(50)]
        public string? AccountNr { get; set; }

        [Column("Address")]
        public string? Address { get; set; }

        [Column("City_Town")]
        [MaxLength(100)]
        public string? CityTown { get; set; }

        [Column("Region_State")]
        [MaxLength(100)]
        public string? RegionState { get; set; }

        [Column("PhoneNr")]
        [MaxLength(100)]
        public string? PhoneNr { get; set; }

        [Column("CreditLimit")]
        [Precision(18, 2)]
        public decimal? CreditLimit { get; set; }

        [Column("CustomerType")]
        [MaxLength(50)]
        public string? CustomerType { get; set; }

        [Column("Sales_Rep")]
        [MaxLength(100)]
        public string? SalesRep { get; set; }

        [Column("OpeningBalance")]
        [Precision(18, 2)]
        public decimal? OpeningBalance { get; set; }

        [Column("Email")]
        [MaxLength(100)]
        public string? Email { get; set; }

        [Column("DigitalAddress")]
        [MaxLength(50)]
        public string? DigitalAddress { get; set; }

        [Column("Barcodenr")]
        [MaxLength(50)]
        public string? Barcodenr { get; set; }

        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }
    }
}
