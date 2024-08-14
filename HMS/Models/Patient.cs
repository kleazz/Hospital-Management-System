using Microsoft.AspNet.Identity.EntityFramework;
using System.ComponentModel.DataAnnotations;

namespace HMS.Models
{
    public class Patient : IdentityUser
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

        [Required]
        [Phone]
        [MaxLength(15)]
        public override string PhoneNumber { get; set; }

        [Required]
        [EmailAddress]
        public override string Email { get; set; }  // Email is inherited but can be overridden for custom validation

        [MaxLength(250)]
        public string Address { get; set; }

        public EmergencyContact EmergencyContact { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<Report> Reports { get; set; }

    }

    public class EmergencyContact
    {
        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(50)]
        public string Relation { get; set; }

        [Required]
        [Phone]
        [MaxLength(15)]
        public string PhoneNumber { get; set; }
    }
}
