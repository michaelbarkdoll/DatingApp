import { Component, OnInit } from '@angular/core';
import { User } from '../../_models/User';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { Pagination, PaginatedResult } from '../../_models/pagination';
import { UserParams } from '../../_models/UserParams';
import { Advisor } from '../../_models/Advisor';

@Component({
  selector: 'app-member-list-paginated',
  templateUrl: './member-list-paginated.component.html',
  styleUrls: ['./member-list-paginated.component.css']
})
export class MemberListPaginatedComponent implements OnInit {
  users: User[];

  user: User = JSON.parse(localStorage.getItem('user'));
  genderList = [{ value: 'all', display: 'All'}, { value: 'male', display: 'Males'}, { value: 'female', display: 'Females'}];
  // userParams: any = {};
  userParams: UserParams;

  showBoundaryLinks = true;
  pagination: Pagination;

  advisorList: any;
  advisors: Advisor[];

  constructor(private userService: UserService,
    private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      // this.users = data['users'];
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.getAdvisors();

    this.userParams = {};
    // this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.gender = 'all';
    this.userParams.minAge = 15;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
  }

  getAdvisors() {
    this.userService.getAdvisors().subscribe((advisors: Advisor[]) => {
      this.advisors = advisors;
    }, error => {
      this.alertify.error(error);
    });
  }


  loadUsers() {
    // this.userService.getUsersPaginated(this.pagination.currentPage, this.pagination.itemsPerPage)
    this.userService.getUsersPaginated(this.pagination.currentPage, this.pagination.itemsPerPage, this.userParams)
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

  resetFilters() {
    // this.userParams.gender = this.user.gender === 'female' ? 'male' : 'female';
    this.userParams.gender = 'all';
    this.userParams.minAge = 15;
    this.userParams.maxAge = 99;
    this.userParams.orderBy = 'lastActive';
    this.userParams.advisor = null;
    this.loadUsers();
  }
}
