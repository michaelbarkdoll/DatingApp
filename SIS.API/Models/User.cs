using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;

namespace SIS.API.Models {

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
        public bool? BA = false;
        public bool? BS = false;
        public bool? MS = false;
        public bool? PHD = false;

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
        public DateTime? BachelorStartDate { get; set; }
        public string BachelorFacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
        public DateTime? BachelorGraduationDate { get; set; }
        // New propertites
        public string SeniorProjectTitle { get; set; }
        public string SeniorProjectURL { get; set; }
        // Master's specific details
        public DateTime? MasterStartDate { get; set; }
        public bool? MasterThesis = false;
        public bool? MasterProject = false;
        public string MasterCommitteeMember1 { get; set; }
        public string MasterCommitteeMember2 { get; set; }
        public string MasterCommitteeMember3 { get; set; }
        public DateTime? MasterDefenseDate { get; set; }
        public string MasterThesisTitle { get; set; }
        public DateTime? MasterGraduationDate { get; set; }
        // Phd specific details
        public DateTime? DoctorateStartDate { get; set; }
        public DateTime? DoctorateCandidateAcceptDate { get; set; }
        public string DoctorateAdvisor { get; set; }
        public string DoctorateCommitteeMember1 { get; set; }
        public string DoctorateCommitteeMember2 { get; set; }
        public string DoctorateCommitteeMember3 { get; set; }
        public string DoctorateCommitteeMember4 { get; set; }
        public string DoctorateCommitteeMember5 { get; set; }
        public string DoctorateCommitteeMember6 { get; set; }
        public DateTime? DissertationDefenseDate { get; set; }
        public string DissertationTitle { get; set; }
        public DateTime? DoctorateGraduationDate { get; set; }
        // Exit Survey
        /* bool? AdvismentExceeded = false;
        bool? AdvismentMeets = false;
        bool? AdvismentMarginallyAcceptable = false;
        bool? AdvismentUnacceptable = false;
        bool? EducationExceeded = false;
        bool? EducationMeets = false;
        bool? EducationMarginallyAcceptable = false;
        bool? EducationUnacceptable = false; */

        // Career plans
        /* bool? PlanToPursueGraduateDegree = false;
        public string FutureSchool { get; set; }
        public string FutureMajor { get; set; }
        bool? Scholarship = false;
        bool? Assistantship = false;  */
        // Employment plans
        /* public string EmployerName { get; set; }
        public string EmployerLocation { get; set; }
        public string EmployerURL { get; set; }
        public string JobTitle { get; set; }
        public string EmployerPhoneNumber { get; set; } */
        // Job Networking
        /* bool? ReferQuestions = false;
        bool? ContactForJobs = false; */

        public string MasterFocus { get; set; }
        public string StudentLevel { get; set; }

        // 7.21.2018
        // Advisor Class Object
        public AdvisorDetails AdvisorDetails { get; set; }
        // public Advisor DoctorateAdvisorDetails { get; set; }


        // 7.22.2018
        public string MasterAdvisor { get; set; }
        public string MasterProjectTitle { get; set; }

        public User () {
            Photos = new Collection<Photo> ();
            // UserBachelorDetail = new UserBachelorDetails();
        }
    }
}