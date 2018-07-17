import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-list-paginated',
  templateUrl: './member-list-paginated.component.html',
  styleUrls: ['./member-list-paginated.component.css']
})
export class MemberListPaginatedComponent implements OnInit {
  users: User[];

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.users = data['users'];
      this.users = data['users'].result;
    });
  }

}
