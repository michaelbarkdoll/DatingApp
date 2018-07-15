import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
// import { Http, RequestOptions, Headers } from '@angular/http';
import { User } from '../_models/User';
// import { Observable } from '../../../node_modules/rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Http, RequestOptions, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';


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
            .get(this.baseUrl + 'users/admin' + id)
            .map(response => <User>response.json())
            .catch(this.handleError);
    }

    updateUserAsAdmin(id: number, user: User) {
        return this.authHttp.put(this.baseUrl + 'users/admin' + id, user).catch(this.handleError);
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
