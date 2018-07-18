import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { User } from '../_models/User';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/UserParams';


@Injectable()
export class UserService {

    baseUrl = environment.apiUrl;

    constructor(private http: Http, private authHttp: AuthHttp) { }

    getUsers(): Observable<User[]> {
        // return this.http
        //    .get(this.baseUrl + 'users', this.jwt())
        return this.authHttp
            .get(this.baseUrl + 'users')
            .map(response => <User[]>response.json())
            .catch(this.handleError);
    }

    // getUsersPaginated(page?: number, itemsPerPage?: number): Observable<User[]> {
    // getUsersPaginated(page?: number, itemsPerPage?: number, userParams?: any) {
    getUsersPaginated(page?: number, itemsPerPage?: number, userParams?: UserParams) {
        // return this.http
        //    .get(this.baseUrl + 'users', this.jwt())
        const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();
        let queryString = '?';

        if (page != null && itemsPerPage != null) {
            queryString += 'pageNumber=' + page + '&pageSize=' + itemsPerPage + '&';
        }

        if (userParams != null) {
            queryString +=
                'minAge=' + userParams.minAge +
                '&maxAge=' + userParams.maxAge +
                '&gender=' + userParams.gender +
                '&orderBy=' + userParams.orderBy +
                '&advisor=' + userParams.advisor;
        }

        return this.authHttp
            .get(this.baseUrl + 'users/pagedlist' + queryString)
            // .map(response => <User[]>response.json())
            .map((response: Response) => {
                paginatedResult.result = response.json();  // response.json gets the body of the response.

                if (response.headers.get('Pagination') != null) {
                    paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
                }

                // This includes the users (paginatedResult.result) and the pagination headers (paginatedResult.pagination)
                return paginatedResult;
            })
            .catch(this.handleError);
    }
    /*
    private jwt() {
        const token = localStorage.getItem('token');
        if (token) {
            const headers = new Headers({ 'Authorization': 'Bearer ' + token });
            headers.append('Content-type', 'application/json');
            return new RequestOptions({headers: headers});
        }
    }
    */

    // map the response
    getUser(id): Observable<User> {
        return this.authHttp
            .get(this.baseUrl + 'users/' + id)
            .map(response => <User>response.json())
            .catch(this.handleError);
    }

    updateUser(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/' + id, user).catch(this.handleError);
    }

    // map the response
    getUserAsAdmin(id: number): Observable<User> {
        return this.authHttp
            .get(this.baseUrl + 'users/admin/' + id)
            .map(response => <User>response.json())
            .catch(this.handleError);
    }

    updateUserAsAdmin(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/admin/' + id, user).catch(this.handleError);
    }

    getDetailedUsersAsAdmin(): Observable<User[]> {
        // return this.http
        //    .get(this.baseUrl + 'users', this.jwt())
        return this.authHttp
            .get(this.baseUrl + 'users/detailedusers')
            .map(response => <User[]>response.json())
            .catch(this.handleError);
    }

    setMainPhoto(userId: number, photoId: number) {
        return this.authHttp.post(this.baseUrl + 'users/' + userId + '/photos/' + photoId + '/setMain', {}).catch(this.handleError);
    }

    deletePhoto(userId: number, photoId: number) {
        return this.authHttp.delete(this.baseUrl + 'users/' + userId + '/photos/' + photoId).catch(this.handleError);
    }

    getAdvisors() {
        return this.authHttp
        .get(this.baseUrl + 'users/advisors')
        .map(response => <string>response.json())
        .catch(this.handleError);
    }


    // We passed in the header
    private handleError(error: any) {
        // Get the error from the header
        const applicationError = error.headers.get('Application-Error');

        if (applicationError) {
            return Observable.throw(applicationError);
        }

        // model errors
        const serverError = error.json();
        let modelStateErrors = '';
        if (serverError) {
            for (const key in serverError) {
                if (serverError[key]) {
                    modelStateErrors += serverError[key] + '\n';
                }
            }
        }
        return Observable.throw(
            modelStateErrors || 'Server error'
        );
    }

}
