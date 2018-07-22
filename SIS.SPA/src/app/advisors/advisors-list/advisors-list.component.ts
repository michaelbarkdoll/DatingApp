import { Component, OnInit } from '@angular/core';
import { Advisors } from '../../_models/Advisors';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-advisors-list',
  templateUrl: './advisors-list.component.html',
  styleUrls: ['./advisors-list.component.css']
})
export class AdvisorsListComponent implements OnInit {
  advisors: Advisors[];

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });

    // console.log(this.advisors[0].firstName);
    // console.log(this.advisors);
  }

  deleteAdvisor(id: number) {
    this.userService.deleteAdvisor(id).subscribe(next => {
      this.alertify.success('Profile updated successfully');
    }, error => {
      this.alertify.error(error);
    });
  }

  addAdvisor() {
    this.router.navigate(['/addadvisor']);
  }

}
