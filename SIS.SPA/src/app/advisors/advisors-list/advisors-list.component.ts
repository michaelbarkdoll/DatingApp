import { Component, OnInit } from '@angular/core';
import { Advisors } from '../../_models/Advisors';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-advisors-list',
  templateUrl: './advisors-list.component.html',
  styleUrls: ['./advisors-list.component.css']
})
export class AdvisorsListComponent implements OnInit {
  advisors: Advisors[];

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });
    console.log('cancelled');
    console.log(this.advisors);
    this.alertify.success('test');
  }

}
