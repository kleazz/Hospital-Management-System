namespace BibliotekaMS.Models
{
    public class KategoriaELibrit
    {
        public string Isbn { get; set; }

        public int KategoriaId { get; set; }

        public Libri Libri { get; set; }
        public Kategoria Kategoria { get; set; }
    }
}
