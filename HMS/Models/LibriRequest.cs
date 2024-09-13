using BibliotekaMS.Dto;

namespace BibliotekaMS.Models
{
    public class LibriRequest

    {
        public LibriDto libri { get; set; }
        public string[] kategorite { get; set; }
        public string[] autoret { get; set; }
    }
}
