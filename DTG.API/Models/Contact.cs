namespace DTG.API.Models
{
    public class Contact
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string TelephoneNumber { get; set; }
        public int Extension { get; set; }
        public int Cellular { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }
    }
}