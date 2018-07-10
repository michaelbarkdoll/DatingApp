import { Photo } from './Photo';
import { UserBachelorDetails } from './UserBachelorDetails';

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
    advisor: string;
    userBachelorDetails: UserBachelorDetails;
}
