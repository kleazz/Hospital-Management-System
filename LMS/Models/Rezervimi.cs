using Microsoft.AspNetCore.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.Models
{
    public class Rezervimi
    {
        [Key]
        public int RezervimiId { get; set; }

        public string Username { get; set; }
        public DateTime DueDate { get; set; }


        [ForeignKey("Isbn")]
        public string Isbn { get; set; }
        public Libri Libri { get; set; }

        [ForeignKey("UserId")]
        public string Id { get; set; } 
        public ApplicationUser ApplicationUser { get; set; }
    }
}
