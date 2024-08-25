using HMS.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HMS.Dto
{
    public class AppointmentDto
    {
        [Key]
        public Guid Id { get; set; } // UUID

        [Required]
        public string PatientId { get; set; } // Foreign Key

        public Patient Patient { get; set; } // Navigation property

        [Required]
        public string DoctorId { get; set; } // Foreign Key

        [Required]
        public DateTime AppointmentDate { get; set; } // Timestamp

        [Required]
        [MaxLength(20)]
        public string AppointmentStatus { get; set; } // Status e.g., scheduled, completed, canceled

        public string Notes { get; set; } // Optional notes

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
