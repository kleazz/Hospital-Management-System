namespace HMS.Authentication
{
    public class UserDto
    {
        public Guid id { get; set; }
        public string Username { get; set; }

        public String Email { get; set; }
        public string Role { get; set; }
    }
}
