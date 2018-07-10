using System;

namespace DatingApp.API.Models
{
    public class UserBachelorDetails
    {
        // These are for cross references between tables
        public int Id { get; set; }
        public User User { get; set; }
        public int UserId { get; set; }

        // Bachelor specific data fields
        DateTime StartDate = new DateTime ();
        public string FacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
        DateTime GraduationDate = new DateTime();
    }
}