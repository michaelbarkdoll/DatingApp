import { Injectable } from '../../../node_modules/@angular/core';
import { CanDeactivate } from '../../../node_modules/@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChangesGuard implements CanDeactivate<MemberEditComponent> {
    canDeactivate(component: MemberEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to contine? Any unsaved changes will be lost!');
        }
        return true;
    }
}
