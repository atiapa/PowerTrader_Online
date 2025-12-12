using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PowerTraderPOS.API.Models.Base
{
    /// <summary>
    /// Base class for entities that require audit tracking.
    /// Automatically tracks who created/modified the entity and when.
    /// </summary>
    public abstract class AuditableEntity
    {
        /// <summary>
        /// User ID or username of the user who created this entity.
        /// </summary>
        [Column("CreatedBy")]
        [MaxLength(50)]
        public string? CreatedBy { get; set; }

        /// <summary>
        /// UTC timestamp when this entity was created.
        /// Defaults to current UTC time on creation.
        /// </summary>
        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; } = DateTime.UtcNow;

        /// <summary>
        /// User ID or username of the user who last modified this entity.
        /// </summary>
        [Column("ModifiedBy")]
        [MaxLength(50)]
        public string? ModifiedBy { get; set; }

        /// <summary>
        /// UTC timestamp when this entity was last modified.
        /// </summary>
        [Column("ModifiedDate")]
        public DateTime? ModifiedDate { get; set; }
    }
}
