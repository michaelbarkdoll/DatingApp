namespace SIS.API.Models
{
    public class AdvisorDetails
    {
        // Added 7.21.2018
        public int Id { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }
        
    }
}