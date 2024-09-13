using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace BibliotekaMS.Models
{
    public class Huazimi
    {
        [Key]
        public int HuazimiId { get; set; }

        public string Username { get; set; }

        public DateTime CurrentDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ReturnDate { get; set; }

        public Boolean IsReturned { get; set; }

        public Boolean HasRezervim { get; set; }

        [ForeignKey("Isbn")]
        public string Isbn { get; set; }
        public Libri Libri { get; set; }

        [ForeignKey("UserId")]
        public string Id { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
    }
}
