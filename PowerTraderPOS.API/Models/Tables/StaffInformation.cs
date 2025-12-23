using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("Staff_Information")]
    public class StaffInformation
    {
        [Key]
        [Column("refno")]
        public int Refno { get; set; }

        [Column("StaffID")]
        [MaxLength(15)]
        public string? StaffID { get; set; }

        [Column("Surname")]
        [MaxLength(20)]
        public string? Surname { get; set; }

        [Column("OtherNames")]
        [MaxLength(50)]
        public string? OtherNames { get; set; }

        [Column("Gender")]
        [MaxLength(10)]
        public string? Gender { get; set; }

        [Column("DateOfBirth")]
        public DateTime? DateOfBirth { get; set; }

        [Column("StreetAddress")]
        [MaxLength(100)]
        public string? StreetAddress { get; set; }

        [Column("City")]
        [MaxLength(50)]
        public string? City { get; set; }

        [Column("Country")]
        [MaxLength(50)]
        public string? Country { get; set; }

        [Column("HomePhone")]
        [MaxLength(15)]
        public string? HomePhone { get; set; }

        [Column("CellPhone")]
        [MaxLength(15)]
        public string? CellPhone { get; set; }

        [Column("Email")]
        [MaxLength(50)]
        public string? Email { get; set; }

        [Column("DateOfEmployment")]
        public DateTime? DateOfEmployment { get; set; }

        [Column("Designation")]
        [MaxLength(50)]
        public string? Designation { get; set; }

        [Column("Department")]
        [MaxLength(50)]
        public string? Department { get; set; }

        [Column("OrganisationName")]
        [MaxLength(200)]
        public string? OrganisationName { get; set; }

        [Column("BranchName")]
        [MaxLength(50)]
        public string? BranchName { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
