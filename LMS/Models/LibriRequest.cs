using LMS.Dto;

namespace LMS.Models
{
    public class LibriRequest

    {
        public LibriDto libri { get; set; }
        public string[] kategorite { get; set; }
        public string[] autoret { get; set; }
    }
}
