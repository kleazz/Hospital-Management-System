namespace LMS.Dto
{
    public class ReviewDto
    {
        public int ReviewId { get; set; }

        public string Username { get; set; }

        public string Komenti { get; set; }
        public DateTime Date { get; set; }
        public Boolean IsEdited { get; set; }

        public string Isbn { get; set; }

        public string Id { get; set; }
    }
}
