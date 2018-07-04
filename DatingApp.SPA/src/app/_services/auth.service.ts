import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
    // Provide location of the API for auth service
    baseUrl = 'http://localhost:5000/api/auth/';
    userToken: any;

    // Inject into constructor the http service for angular
    constructor(private http: Http) { }

    // need a method to call our login method in our api
    // pass in username and password that we get from our login form
    login(model: any) {
        const headers = new Headers({'Content-type': 'application/json'});
        const options = new RequestOptions({headers: headers});
        return this.http.post(this.baseUrl + 'login', model, options).map((response: Response) => {
            const user = response.json();
            if (user) {
                localStorage.setItem('token', user.tokenString);
                this.userToken = user.tokenString;
            }
        });
    }
}
