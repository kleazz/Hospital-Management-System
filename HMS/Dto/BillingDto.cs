using HMS.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HMS.Dto
{
    public class BillingDto
    {
        [Key]
        public Guid Id { get; set; } // Primary Key

        [Required]
        public Guid AppointmentId { get; set; } // Foreign Key to Appointments table

        [Required]
        [Column(TypeName = "decimal(18, 2)")]
        public decimal Amount { get; set; }

        [Required]
        [MaxLength(50)]
        public string PaymentStatus { get; set; } // e.g., pending, paid, refunded

        public DateTime PaymentDate { get; set; }

        [MaxLength(50)]
        public string PaymentMethod { get; set; } // e.g., credit card, cash, insurance

        public string InsuranceDetails { get; set; } // JSONB stored as string

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
