namespace LMS.Dto
{
    public class HuazimiDto
    {
        public int HuazimiId { get; set; }

        public string Username { get; set; }

        public DateTime CurrentDate { get; set; }
        public DateTime DueDate { get; set; }
        public DateTime ReturnDate { get; set; }
        public Boolean IsReturned { get; set; }

        public Boolean HasRezervim { get; set; }

        public string Isbn { get; set; }

        public string Id { get; set; }
    }
}
    