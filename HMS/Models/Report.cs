using HMS.Models;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS.Models
{
    public class Report
    {
        [Key]
        public int Id { get; set; } // Primary Key

        [Required]
        public string PatientId { get; set; } // Foreign Key to Patients table

        [ForeignKey(nameof(PatientId))]
        public Patient Patient { get; set; } // Navigation property for Patient

        [Required]
        public string DoctorId { get; set; } // Foreign Key to Doctors table

        [ForeignKey(nameof(DoctorId))]
        public Doctor Doctor { get; set; } // Navigation property for Doctor

        [Required]
        public DateTime ReportDate { get; set; }

        [Required]
        [MaxLength(50)]
        public string ReportType { get; set; } // e.g., diagnostic, treatment, discharge

        [Required]
        public string ReportContent { get; set; } // Detailed report content

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}
