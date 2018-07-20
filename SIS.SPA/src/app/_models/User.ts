import { Photo } from './Photo';

export interface User {
  id: number;
  username: string;
  knownAs: string;
  age: number;
  gender: string;
  created: Date;
  lastActive: Date;
  photoUrl: string;
  city: string;
  country: string;
  interests?: string;
  introduction?: string;
  lookingFor?: string;
  photos?: Photo[];
  advisor?: string;
  // userBachelorDetail?: UserBachelorDetails;
  // Added later
  userLevel?: string;
  dawgTag?: number;
  firstName: string;
  lastName: string;
  BA?: boolean;
  BS?: boolean;
  MS?: boolean;
  PHD?: boolean;
  notes?: string;
  state: string;
  zipCode: string;
  phoneNumber1?: string;
  phoneNumber2?: string;
  // Bachelor Information
  bachelorStartDate?: Date;
  bachelorFacultyMentor?: string;
  seniorProjectAdvisor?: string;
  bachelorGraduationDate?: Date;
  // 07/19/2018 extended
  seniorProjectTitle?: string;
  seniorProjectURL?: string;
  // Master's specific details
  masterStartDate?: Date;
  masterThesis?: boolean;
  masterProject?: boolean;
  masterCommitteeMember1?: string;
  masterCommitteeMember2?: string;
  masterCommitteeMember3?: string;
  masterDefenseDate?: Date;
  masterThesisTitle?: string;
  masterGraduationDate?: Date;
  // Phd specific details
  doctorateStartDate?: Date;
  doctorateCandidateAcceptDate?: Date;
  doctorateAdvisor?: string;
  doctorateCommitteeMember1?: string;
  doctorateCommitteeMember2?: string;
  doctorateCommitteeMember3?: string;
  doctorateCommitteeMember4?: string;
  doctorateCommitteeMember5?: string;
  doctorateCommitteeMember6?: string;
  dissertationDefenseDate?: Date;
  dissertationTitle?: string;
  doctorateGraduationDate?: Date;
  // Exit Survey
  /* bool AdvismentExceeded = false;
        bool AdvismentMeets = false;
        bool AdvismentMarginallyAcceptable = false;
        bool AdvismentUnacceptable = false;
        bool EducationExceeded = false;
        bool EducationMeets = false;
        bool EducationMarginallyAcceptable = false;
        bool EducationUnacceptable = false; */

  // Career plans
  /* bool PlanToPursueGraduateDegree = false;
        public string FutureSchool { get; set; }
        public string FutureMajor { get; set; }
        bool Scholarship = false;
        bool Assistantship = false;  */
  // Employment plans
  /* public string EmployerName { get; set; }
        public string EmployerLocation { get; set; }
        public string EmployerURL { get; set; }
        public string JobTitle { get; set; }
        public string EmployerPhoneNumber { get; set; } */
  // Job Networking
  /* bool ReferQuestions = false;
        bool ContactForJobs = false; */
    dateOfBirth?: Date;
}
