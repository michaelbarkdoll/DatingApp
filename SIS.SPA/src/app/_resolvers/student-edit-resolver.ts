import { Resolve, ActivatedRouteSnapshot, Router } from '../../../node_modules/@angular/router';
import { User } from '../_models/User';
import { Injectable } from '../../../node_modules/@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from '../../../node_modules/rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { AuthService } from '../_services/auth.service';
import { UserFile } from '../_models/UserFile';

// We don't add Injectable to components because there already a subtype of components
@Injectable()
export class StudentEditResolver implements Resolve<User> {
    user: User;
    name: string;
    files: UserFile[];

    constructor(private userService: UserService,
        private router: Router,
        private alertify: AlertifyService,
        private authService: AuthService) {}
    // ActivateRouteSnapshot allows us to get the parameter from the url
    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        // We're going out to our member service and getting the user and returning it as an observable to our component.
        // In the case of a component we'd need to subscribe because we're returning an Observable
        // But the route resolver automatically subscribes for us so we dont need to use it here
        // return this.userService.getUserAsAdmin(route.params['id'], this.authService.decodedToken.nameid).catch(error => {
            console.log('--- Start of resolver ---');
            console.log('Passing in user data for id:');
            console.log(route.params['id']);
            const a = this.userService.getUserAsAdmin(route.params['id']);
            // console.log(a.);
            // a.subscribe( p => p )

            a.subscribe(data => {
                this.user = data['user'];
            });

            this.userService.getUserAsAdmin(route.params['id']).subscribe(data => {
                this.name = data['username'];
                // this.name = data['files'];
            });
            console.log('name is:');
            console.log(this.name);

            this.userService.getUserAsAdmin(route.params['id']).subscribe(data => {
                // this.user = data['user'];
                // this.user = Object.assign({}, data);
                this.files = data['files'];
            });
            // console.log(this.user.username);
            console.log(this.files);

            console.log('--- End of resolver ---');
            /* console.log('name after transfer is: ');
            console.log(this.user.username);
            console.log('name after transfer done.'); */

            // console.log(this.user.username);

        return this.userService.getUserAsAdmin(route.params['id']).catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/students']);
            return Observable.of(null);
        });
    }
}
