- need edit page
  - populated with detailed view of member
  - admin users need to be able to edit the page

- API side [member/edit] need student/edit
  - need to provide information for admin level users

- Add students



# Done:

- move http://localhost:4200/students student profile view from:
  - http://localhost:4200/members/1
  - to:
  - http://localhost:4200/students/1
  - Note: There exists http://localhost:4200/student/edit/1

Using
StudentListComponent
MemberListResolver

Needing something like:
MemberDetailComponent
MemberDetailResolver

Needing something like:
MemberEditComponent
MemberEditResolver

PreventUnsavedChangesGuard