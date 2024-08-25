using HMS.Models;
using System.ComponentModel.DataAnnotations;

namespace HMS.Dto
{
    public class DoctorDto : ApplicationUser
    {
        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        [MaxLength(100)]
        public string Specialty { get; set; }

        [Required]
        public TimeSpan BeginsShift { get; set; }

        [Required]
        public TimeSpan EndsShift { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
