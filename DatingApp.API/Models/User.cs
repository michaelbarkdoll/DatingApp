using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace DatingApp.API.Models {

    public class User {
        public int Id { get; set; }
        public string Username { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        public string Gender { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string KnownAs { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string Introduction { get; set; }
        public string LookingFor { get; set; }
        public string Interests { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public ICollection<Photo> Photos { get; set; }
        

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

        // An additional add:
        // public UserBachelorDetails UserBachelorDetail { get; set; }

        // Bachelor specific data fields
        public DateTime BachelorStartDate { get; set; }
        public string BachelorFacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
        public DateTime BachelorGraduationDate { get; set; }
        public User () {
            Photos = new Collection<Photo> ();
            // UserBachelorDetail = new UserBachelorDetails();
        }
    }
}