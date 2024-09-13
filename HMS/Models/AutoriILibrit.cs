namespace BibliotekaMS.Models
{
    public class AutoriILibrit
    {
        public string Isbn { get; set; }
        public int AutoriId { get; set; }
        public Libri Libri { get; set; }
        public Autori Autori { get; set; }
    }
}
