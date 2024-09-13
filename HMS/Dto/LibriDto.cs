using BibliotekaMS.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace BibliotekaMS.Dto
{
    public class LibriDto
    {
        public string isbn { get; set; }
        public string Titulli { get; set; }
        public string Pershkrimi { get; set; }
        public string Fotoja { get; set; }

        public int Sasia {get; set;}

    }
}