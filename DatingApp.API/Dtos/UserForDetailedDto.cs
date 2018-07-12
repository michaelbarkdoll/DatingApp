using System;
using System.Collections.Generic;
using DatingApp.API.Models;

namespace DatingApp.API.Dtos {
    public class UserForDetailedDto {
        public int Id { get; set; }
        public string Username { get; set; }

        public string Gender { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string PhotoUrl { get; set; }
        public ICollection<PhotosForDetailedDto> Photos { get; set; }

        // Added for student information system
        public string UserLevel { get; set; }
        public string Advisor { get; set; }
        public int DawgTag { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        bool BA = false;
        bool BS = false;
        bool MS = false;
        bool PHD = false;

        public string Notes { get; set; }
        public string Address1 { get; set; }
        public string Address2 { get; set; }

        // public string City { get; set; }
        // public string Country { get; set; }
        public string State { get; set; }
        public string ZipCode { get; set; }
        public string PhoneNumber1 { get; set; }
        public string PhoneNumber2 { get; set; }
        // Bachelor Information
        public DateTime BachelorStartDate { get; set; }
        public string BachelorFacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
        public DateTime BachelorGraduationDate { get; set; }
    }
}