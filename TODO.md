# ToDo:

- Add students
- Delete students
- Sort users by adviser, work-in-progress
- Add more fields to user records

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

- API side [member/edit] need student/edit
  - need to provide information for admin level users


- need edit page
  - populated with detailed view of member
  - admin users need to be able to edit the page