using HMS.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Models
{
    public class Appointment
    {
        [Key]
        public int Id { get; set; } 

        [Required]
        public string PatientId { get; set; } // Foreign Key

        public Patient Patient { get; set; } // Navigation property

        [Required]
        public string DoctorId { get; set; } // Foreign Key

        [ForeignKey(nameof(DoctorId))]
        public Doctor Doctor { get; set; } // Navigation property

        [Required]
        public DateTime AppointmentDate { get; set; } // Timestamp

        [Required]
        [MaxLength(20)]
        public string AppointmentStatus { get; set; } // Status e.g., scheduled, completed, canceled

        public string Notes { get; set; } // Optional notes

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        public Billing Billing { get; set; }
    }
}
