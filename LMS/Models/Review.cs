using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace LMS.Models
{
    public class Review
    {
        [Key]
        public int ReviewId { get; set; }
        public string Username { get; set; }

        public string Komenti { get; set; }
        public DateTime Date { get; set; }
        public Boolean IsEdited { get; set; }

        [ForeignKey("Isbn")]
        public string Isbn { get; set; }
        public Libri Libri { get; set; }

        [ForeignKey("UserId")]
        public string Id { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
