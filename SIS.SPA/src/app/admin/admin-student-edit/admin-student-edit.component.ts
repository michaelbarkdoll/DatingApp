import { Component, OnInit } from '@angular/core';
import { Advisors } from '../../_models/Advisors';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators } from '../../../../node_modules/@angular/forms';
import { AuthHttp } from '../../../../node_modules/angular2-jwt';
import { User } from '../../_models/User';

@Component({
  selector: 'app-admin-student-edit',
  templateUrl: './admin-student-edit.component.html',
  styleUrls: ['./admin-student-edit.component.css']
})
export class AdminStudentEditComponent implements OnInit {
  advisors: Advisors[];
  studentEditForm: FormGroup;
  user: User;

  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService,
    private authHttp: AuthHttp,
    private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });

    this.createStudentEditForm();

    console.log('test');
    console.log(this.user.firstName);
  }

  createStudentEditForm() {
    this.studentEditForm = this.formBuilder.group({
      gender: ['male'],
      knownAs: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],

      dawgTag: ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],

      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      advisor: [''],
      studentLevel: ['BA'],
      bachelorStartDate: [null],

      bachelorFacultyMentor: [''],
      seniorProjectAdvisor: [''],
      bachelorGraduationDate: [null],
      seniorProjectTitle: [''],
      seniorProjectURL: [''],
      masterFocus: ['Project'],
      masterAdvisor: [''],
      masterCommitteeMember1: [''],
      masterCommitteeMember2: [''],
      masterCommitteeMember3: [''],
      masterDefenseDate: [null],
      masterProjectTitle: [''],
      masterThesisTitle: [''],
      masterGraduationDate: [null],
      doctorateStartDate: [null],
      doctorateCandidateAcceptDate: [null],
      doctorateAdvisor: [''],
      doctorateCommitteeMember1: [''],
      doctorateCommitteeMember2: [''],
      doctorateCommitteeMember3: [''],
      doctorateCommitteeMember4: [''],
      doctorateCommitteeMember5: [''],
      doctorateCommitteeMember6: [''],
      dissertationDefenseDate: [null],
      dissertationTitle: [''],
      doctorateGraduationDate: [null],
      BA: [null],
      BS: [null],
      MS: [null],
      PHD: [null]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  updateUser() {
    if (this.studentEditForm.valid) {

      /* this.setStudentLevel(this.studentLevel);
      this.registerForm.patchValue({
        BA: this.isBA(),
        BS: this.isBS(),
        MS: this.isMasters(),
        PHD: this.isDoctorate()
      }); */

      this.user = Object.assign({}, this.studentEditForm.value);

      // Set the default knownAs name to their first name
      if (this.user.knownAs === '') {
        this.user.knownAs = this.user.firstName;
      }


      // this.route.snapshot.params['id'] = potential admin's userId
      this.userService.updateUserAsAdmin(this.route.snapshot.params['id'], this.user).subscribe(next => {
      this.alertify.success('Profile updated successfully');
      this.studentEditForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });







      /* // Run this in case they never changed the default value.
      this.setStudentLevel(this.studentLevel);
      // Set the user model values according to what was selected on the form.
      this.user.BA = this.isBA();
      this.user.BS = this.isBS();
      this.user.MS = this.isMasters();
      this.user.PHD = this.isDoctorate(); */

      // console.log(this.user);
      /* this.authService.registerReturnUser(this.user).subscribe(() => {
        this.alertify.success('Registration successfull');
      }, error => {
        this.alertify.error(error);
      }, () => {
        // this.router.navigate(['/students']);
      }); */
    }
  }

  updateUser2() {
    // this.route.snapshot.params['id'] = potential admin's userId
    this.userService.updateUserAsAdmin(this.route.snapshot.params['id'], this.user).subscribe(next => {
    this.alertify.success('Profile updated successfully');
    this.studentEditForm.reset(this.user);
  }, error => {
    this.alertify.error(error);
  });
}

}
