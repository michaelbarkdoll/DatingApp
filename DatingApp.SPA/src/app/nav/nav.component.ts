import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    // console.log(this.model);
    this.authService.login(this.model).subscribe(data => {
      console.log('logged in successfully');
    }, error => {
      console.log(error);
      //console.log('failed to login');
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    console.log('logged out');
  }

  loggedIn() {
    // Just check if there is a token inside localStorage
    const token = localStorage.getItem('token');
    // If there is a variable in our token then we'll return true, if not then false
    return !!token;
  }

}
