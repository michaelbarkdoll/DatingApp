namespace SIS.API.Models
{
    public class Advisor
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string FullName { get; set; }
        public string Title { get; set; }

        /* // Added 7.21.2018
        public int UserId { get; set; }
        public User User { get; set; }
        public string BachelorAdvisorFirstName { get; set; }
        public string BachelorAdvisorLastName { get; set; }
        public string BachelorAdvisorFullName { get; set; }
        public string BachelorAdvisorTitle { get; set; }
        public string MastersAdvisorFirstName { get; set; }
        public string MastersAdvisorLastName { get; set; }
        public string MastersAdvisorFullName { get; set; }
        public string MastersAdvisorTitle { get; set; }
        public string DoctorateAdvisorFirstName { get; set; }
        public string DoctorateAdvisorLastName { get; set; }
        public string DoctorateAdvisorFullName { get; set; }
        public string DoctorateAdvisorTitle { get; set; } */

    }
}