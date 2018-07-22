import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Advisors } from '../../_models/Advisors';

@Component({
  selector: 'app-advisor-add',
  templateUrl: './advisor-add.component.html',
  styleUrls: ['./advisor-add.component.css']
})
export class AdvisorAddComponent implements OnInit {
  advisors: Advisors[];

  constructor(private userService: UserService, private alertify: AlertifyService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });
  }

}
