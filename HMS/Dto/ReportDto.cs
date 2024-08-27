using HMS.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace HMS.Dto
{
    public class ReportDto
    {
        [Key]
        public int Id { get; set; } // Primary Key

        [Required]
        public string PatientId { get; set; } // Foreign Key to Patients table

        [Required]
        public string DoctorId { get; set; } // Foreign Key to Doctors table

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
