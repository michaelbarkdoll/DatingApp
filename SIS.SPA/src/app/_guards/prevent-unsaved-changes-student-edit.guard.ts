import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { StudentEditComponent } from '../students/student-edit/student-edit.component';

@Injectable()
export class PreventUnsavedChangesStudentEditGuard implements CanDeactivate<StudentEditComponent> {

    canDeactivate(component: StudentEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to contine? Any unsaved changes will be lost!');
        }
        return true;
    }
}
