import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(data => {
      this.alertifyService.success('logged in successfully');
    }, error => {
      this.alertifyService.error(error);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertifyService.message('logged out');
  }

  loggedIn() {
    return this.authService.loggedIn();
    // Just check if there is a token inside localStorage
    // const token = localStorage.getItem('token');
    // If there is a variable in our token then we'll return true, if not then false
    // return !!token;
  }

}
