using System.ComponentModel.DataAnnotations.Schema;

namespace LMS.Models
{
    public class Libri
    {
        public string Isbn { get; set; }
        public string Titulli { get; set; }
        public string Pershkrimi { get; set; }
        public string Fotoja { get; set; }

        public int Sasia { get; set; }

        public ICollection<KategoriaELibrit> KategoriaELibrit { get; set; }
        public ICollection<AutoriILibrit> AutoriILibrit { get; set; }
        public ICollection<Rezervimi> Rezervimet { get; set; }

        public ICollection<Huazimi> Huazimet { get; set; }

        public ICollection<Review> Reviews { get; set; }
    }
}