namespace LMS.Models
{
    public class Autori
    {
            public int AutoriId { get; set; }
            public string Emri { get; set; }
            public string Mbiemri { get; set; }

            public ICollection<AutoriILibrit> AutoriILibrit { get; set; }
    }
    }
