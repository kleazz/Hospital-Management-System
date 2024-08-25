using HMS.Models;
using System.ComponentModel.DataAnnotations;

namespace HMS.Dto
{
    public class PatientDto : ApplicationUser
    {
        // ID (UUID) is inherited from ApplicationUser

        [Required]
        [MaxLength(50)]
        public string FirstName { get; set; }

        [Required]
        [MaxLength(50)]
        public string LastName { get; set; }

        [Required]
        public DateTime DateOfBirth { get; set; }

        [Required]
        [MaxLength(10)]
        public string Gender { get; set; }

        [MaxLength(250)]
        public string Address { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

    }
}
