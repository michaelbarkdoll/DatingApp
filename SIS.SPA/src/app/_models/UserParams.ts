export interface UserParams {
    userId?: number;
    gender?: string;
    minAge?: number;
    maxAge?: number;
    maxPageSize?: number;
    minPageSize?: number;
    pageNumber?: number;
    orderBy?: string;
}
