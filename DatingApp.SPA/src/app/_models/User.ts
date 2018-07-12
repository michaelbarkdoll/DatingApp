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
}
