import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';

@Component({
  selector: 'app-member-list-paginated',
  templateUrl: './member-list-paginated.component.html',
  styleUrls: ['./member-list-paginated.component.css']
})
export class MemberListPaginatedComponent implements OnInit {
  users: User[];
  showBoundaryLinks = true;
  pagination: Pagination;

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.users = data['users'];
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });
  }

  loadUsers() {
    this.userService.getUsersPaginated(this.pagination.currentPage, this.pagination.itemsPerPage)
    .subscribe((res: PaginatedResult<User[]>) => {
      this.users = res.result;
      this.pagination = res.pagination;
    }, error => {
      this.alertify.error(error);
    });
  }

  pageChanged(event: any): void {
    // console.log('Page changed to: ' + event.page);
    // console.log('Number items per page: ' + event.itemsPerPage);

    this.pagination.currentPage = event.page;
    this.loadUsers();
  }
}
