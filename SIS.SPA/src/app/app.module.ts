import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, PaginationModule, ButtonsModule } from 'ngx-bootstrap';

import { AppComponent } from './app.component';
import { HttpModule } from '@angular/http';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AlertifyService } from './_services/alertify.service';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { AuthModule } from './auth/auth.module';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { NgxGalleryModule } from 'ngx-gallery';
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
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { FileUploadModule } from 'ng2-file-upload';
import { AdminPhotoEditorComponent } from './members/admin-photo-editor/admin-photo-editor.component';
import { MemberListPaginatedComponent } from './members/member-list-paginated/member-list-paginated.component';
import { MemberListPaginatedResolver } from './_resolvers/member-list-paginated.resolver';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AdminAddUserComponent } from './admin/admin-add-user/admin-add-user.component';


@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MemberListComponent,
      MemberCardComponent,
      MemberDetailComponent,
      ListsComponent,
      MessagesComponent,
      MemberEditComponent,
      StudentListComponent,
      StudentEditComponent,
      StudentDetailComponent,
      PhotoEditorComponent,
      AdminPhotoEditorComponent,
      MemberListPaginatedComponent,
      TimeAgoPipe,
      AdminAddUserComponent
   ],
   imports: [
      BrowserModule,
      HttpModule,
      FormsModule,
      ReactiveFormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      AuthModule,
      TabsModule.forRoot(),
      NgxGalleryModule,
      FileUploadModule,
      PaginationModule.forRoot(),
      ButtonsModule.forRoot()
   ],
    providers: [
        AuthService,
        AlertifyService,
        AuthGuard,
        UserService,
        MemberDetailResolver,
        MemberListResolver,
        MemberEditResolver,
        StudentEditResolver,
        StudentDetailResolver,
        StudentListResolver,
        MemberListPaginatedResolver,
        PreventUnsavedChangesGuard,
        PreventUnsavedChangesStudentEditGuard
    ],
    bootstrap: [AppComponent]
})

export class AppModule { }
