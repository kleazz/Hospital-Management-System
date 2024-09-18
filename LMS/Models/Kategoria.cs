namespace LMS.Models
{
    public class Kategoria
    {
        public int KategoriaId { get; set; }
        public string EmriKategorise { get; set; }

        public ICollection<KategoriaELibrit> KategoriaELibrit { get; set; }

    }
}
