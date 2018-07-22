using System;
using System.ComponentModel.DataAnnotations;

namespace SIS.API.Dtos
{
    public class UserForRegisterDto
    {
        public UserForRegisterDto()
        {
            Created = DateTime.Now;
            LastActive = DateTime.Now;

            switch(StudentLevel) {
                case "BA":
                    this.BA = true;
                    break;
                case "BS":
                    this.BS = true;
                    break;
                case "MS":
                    this.MS = true;
                    break;
                case "PHD":
                    this.PHD = true;
                    break;
                default:
                    break;
            }
        }
        [Required]
        public string Username { get; set; }
        [Required]
        [StringLength(8, MinimumLength = 4, ErrorMessage = "You must specify a password between 4 and 8 characters")]
        public string Password { get; set; }
        // [Required]
        public string Gender { get; set; } 
        // [Required]
        public string KnownAs { get; set; }
        // [Required]
        public DateTime DateOfBirth { get; set; }
        // [Required]
        public string City { get; set; }
        // [Required]
        public string Country { get; set; } 
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        
        // Add the following for more detailed SPA registeration
        public string FirstName { get; set; }
        public string LastName { get; set; }

        // 07-19-2018
        public bool? BA = false;
        public bool? BS = false;
        public bool? MS = false;
        public bool? PHD = false;
        /*
        public string State { get; set; }
        public string ZipCode { get; set; } */

        public DateTime? BachelorStartDate { get; set; }
        public string BachelorFacultyMentor { get; set; }
        public string SeniorProjectAdvisor { get; set; }
        public DateTime? BachelorGraduationDate { get; set; }

        // 07-19-2018
        // New propertites
        public string SeniorProjectTitle { get; set; }
        public string SeniorProjectURL { get; set; }
        // Master's specific details
        public DateTime? MasterStartDate { get; set; }
        public bool? MasterThesis;
        public bool? MasterProject;
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

        public string StudentLevel { get; set; }
        public string MasterFocus { get; set; }
        // 7-22-2018
        public string MasterAdvisor { get; set; }
        public string MasterProjectTitle { get; set; }
    }
}