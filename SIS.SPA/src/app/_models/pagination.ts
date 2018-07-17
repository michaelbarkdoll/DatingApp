export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
}

// Store results received back from the server
export class PaginatedResult<T> {
    result: T;  // Stores the users
    pagination: Pagination;
}
