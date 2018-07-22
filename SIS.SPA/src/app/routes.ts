import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentEditComponent } from './students/student-edit/student-edit.component';
import { StudentEditResolver } from './_resolvers/student-edit-resolver';
import { PreventUnsavedChangesStudentEditGuard } from './_guards/prevent-unsaved-changes-student-edit.guard';
import { StudentDetailComponent } from './students/student-detail/student-detail.component';
import { StudentDetailResolver } from './_resolvers/student-detail.resolver';
import { StudentListResolver } from './_resolvers/student-list.resolver';
import { MemberListPaginatedComponent } from './members/member-list-paginated/member-list-paginated.component';
import { MemberListPaginatedResolver } from './_resolvers/member-list-paginated.resolver';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';
import { AdvisorsListComponent } from './advisors/advisors-list/advisors-list.component';
import { AdvisorsListResolver } from './_resolvers/advisors-list.resolver';
import { AdvisorAddComponent } from './advisors/advisor-add/advisor-add.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent },
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            { path: 'allmembers', component: MemberListComponent, resolve: {users: MemberListResolver} },
            { path: 'members', component: MemberListPaginatedComponent, resolve: {users: MemberListPaginatedResolver} },
            { path: 'members/:id', component: MemberDetailComponent, resolve: {user: MemberDetailResolver} },
            { path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChangesGuard] },
            { path: 'students', component: StudentListComponent, resolve: {users: StudentListResolver} },
            { path: 'students/:id', component: StudentDetailComponent, resolve: {user: StudentDetailResolver} },
            { path: 'student/edit/:id', component: StudentEditComponent,
                resolve: {user: StudentEditResolver}, canDeactivate: [PreventUnsavedChangesStudentEditGuard] },
            { path: 'adduser', component: AdminAddUserComponent, resolve: {user: StudentListResolver} },
            { path: 'messages', component: MessagesComponent },
            { path: 'lists', component: ListsComponent },
            { path: 'advisors', component: AdvisorsListComponent, resolve: {advisors: AdvisorsListResolver} },
            { path: 'addadvisor', component: AdvisorAddComponent, resolve: {advisors: AdvisorsListResolver} }
        ]
    },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
