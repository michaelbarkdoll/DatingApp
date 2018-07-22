import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { StudentEditComponent } from '../students/student-edit/student-edit.component';
import { AdminStudentEditComponent } from '../admin/admin-student-edit/admin-student-edit.component';

@Injectable()
export class PreventUnsavedChangesAdminStudentEditGuard implements CanDeactivate<AdminStudentEditComponent> {

    canDeactivate(component: AdminStudentEditComponent) {
        if (component.studentEditForm.dirty) {
            return confirm('Are you sure you want to contine? Any unsaved changes will be lost!');
        }
        return true;
    }
}
