using System;

namespace SIS.API.Dtos {
    public class UserForListDto {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        // Later added
        public string Advisor { get; set; }
        //07.23.2018
        public DateTime MasterGraduationDate { get; set; }
        public string MasterThesisTitle { get; set; }
        public string MasterProjectTitle { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string MasterAdvisor { get; set; }
        public string DoctorateAdvisor { get; set; }
        public string BachelorFacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
    }
}
