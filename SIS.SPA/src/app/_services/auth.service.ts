import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observable } from 'rxjs/Observable';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {
    // Provide location of the API for auth service
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;
    decodedToken: any;
    jwtHelper: JwtHelper = new JwtHelper();
    currentUser: User;
    private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
    currentPhotoUrl = this.photoUrl.asObservable();

    // Inject into constructor the http service for angular
    constructor(private http: Http) { }

    changeMemberPhoto(photoUrl: string) {
        this.photoUrl.next(photoUrl);
    }

    // need a method to call our login method in our api
    // pass in username and password that we get from our login form
    login(model: any) {
        // const headers = new Headers({'Content-type': 'application/json'});
        // const options = new RequestOptions({headers: headers});
        return this.http.post(this.baseUrl + 'login', model, this.requestOptions()).map((response: Response) => {
            const user = response.json();
            if (user) {
                localStorage.setItem('token', user.tokenString);
                localStorage.setItem('user', JSON.stringify(user.user) );
                this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
                this.currentUser = user.user;
                // console.log(this.decodedToken);
                this.userToken = user.tokenString;
                this.changeMemberPhoto(this.currentUser.photoUrl);
            }
        }).catch(this.handleError);
    }

    register(model: any) {
        // model just contains username and password at this point.
        // All we're returning from this register method at the moment from the api is status code of 201
        //  so we really don't need to pass anything back or map anything back to our component in this case.
        return this.http.post(this.baseUrl + 'register', model, this.requestOptions()).catch(this.handleError);
    }

    registerReturnUser(user: User) {
        // model just contains username and password at this point.
        // All we're returning from this register method at the moment from the api is status code of 201
        //  so we really don't need to pass anything back or map anything back to our component in this case.
        return this.http.post(this.baseUrl + 'register', user, this.requestOptions()).catch(this.handleError);
    }

    loggedIn() {
        return tokenNotExpired('token');
    }

    private requestOptions() {
        const headers = new Headers({'Content-type': 'application/json'});
        return new RequestOptions({headers: headers});
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
