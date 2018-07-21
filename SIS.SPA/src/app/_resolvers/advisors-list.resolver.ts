import { Resolve, ActivatedRouteSnapshot, Router } from '../../../node_modules/@angular/router';
import { User } from '../_models/User';
import { Injectable } from '../../../node_modules/@angular/core';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable } from '../../../node_modules/rxjs';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import { Advisors } from '../_models/Advisors';

// We don't add Injectable to components because there already a subtype of components
@Injectable()
export class AdvisorsListResolver implements Resolve<Advisors[]> {
    constructor(private userService: UserService,
        private router: Router, private alertify: AlertifyService) {}
    // ActivateRouteSnapshot allows us to get the parameter from the url
    // resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
    resolve(route: ActivatedRouteSnapshot): Observable<Advisors[]> {
        // We're going out to our member service and getting the user and returning it as an observable to our component.
        // In the case of a component we'd need to subscribe because we're returning an Observable
        // But the route resolver automatically subscribes for us so we dont need to use it here
        return this.userService.getAdvisorList().catch(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/home']);
            return Observable.of(null);
        });
    }
}
