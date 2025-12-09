using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Tables
{
    [Table("staff_information")]
    public class StaffInformation
    {
        [Key]
        [Column("staff_id")]
        public int StaffId { get; set; }

        [Column("staff_name")]
        [MaxLength(200)]
        public string? StaffName { get; set; }

        [Column("staff_phone")]
        [MaxLength(50)]
        public string? StaffPhone { get; set; }

        [Column("staff_email")]
        [MaxLength(100)]
        public string? StaffEmail { get; set; }

        [Column("staff_role")]
        [MaxLength(50)]
        public string? StaffRole { get; set; }

        [Column("is_active")]
        public bool? IsActive { get; set; }
    }
}
