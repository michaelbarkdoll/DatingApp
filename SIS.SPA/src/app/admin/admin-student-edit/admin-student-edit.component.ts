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
      gender: [this.user.gender, Validators.required],
      knownAs: [this.user.knownAs, Validators.required],
      firstName: [this.user.firstName, Validators.required],
      lastName: [this.user.lastName, Validators.required],
      dateOfBirth: [this.user.dateOfBirth, Validators.required],
      city: [this.user.city, Validators.required],
      country: [this.user.country, Validators.required],

      dawgTag: [this.user.dawgTag],

      /*
      username: [this.user.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      */
      advisor: [this.user.advisor],
      studentLevel: [this.user.studentLevel],
      bachelorStartDate: [this.user.bachelorStartDate],

      bachelorFacultyMentor: [this.user.bachelorFacultyMentor],
      seniorProjectAdvisor: [this.user.seniorProjectAdvisor],
      bachelorGraduationDate: [this.user.bachelorGraduationDate],
      seniorProjectTitle: [this.user.seniorProjectTitle],
      seniorProjectURL: [this.user.seniorProjectURL],
      masterFocus: [this.user.masterFocus],
      masterAdvisor: [this.user.masterAdvisor],
      masterCommitteeMember1: [this.user.masterCommitteeMember1],
      masterCommitteeMember2: [this.user.masterCommitteeMember2],
      masterCommitteeMember3: [this.user.masterCommitteeMember3],
      masterDefenseDate: [this.user.masterDefenseDate],
      masterProjectTitle: [this.user.masterProjectTitle],
      masterThesisTitle: [this.user.masterThesisTitle],
      masterGraduationDate: [this.user.masterGraduationDate],
      doctorateStartDate: [this.user.doctorateStartDate],
      doctorateCandidateAcceptDate: [this.user.doctorateCandidateAcceptDate],
      doctorateAdvisor: [this.user.doctorateAdvisor],
      doctorateCommitteeMember1: [this.user.doctorateCommitteeMember1],
      doctorateCommitteeMember2: [this.user.doctorateCommitteeMember2],
      doctorateCommitteeMember3: [this.user.doctorateCommitteeMember3],
      doctorateCommitteeMember4: [this.user.doctorateCommitteeMember4],
      doctorateCommitteeMember5: [this.user.doctorateCommitteeMember5],
      doctorateCommitteeMember6: [this.user.doctorateCommitteeMember6],
      dissertationDefenseDate: [this.user.dissertationDefenseDate],
      dissertationTitle: [this.user.dissertationTitle],
      doctorateGraduationDate: [this.user.doctorateGraduationDate],
      BA: [this.user.BA],
      BS: [this.user.BS],
      MS: [this.user.MS],
      PHD: [this.user.PHD]
    });
    // }, { });
   // }, { validator: this.passwordMatchValidator });
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

      switch (this.user.studentLevel) {
        case 'BA':
          this.user.BA = true;
          break;
        case 'BS':
          this.user.BS = true;
          break;
        case 'MS':
          this.user.MS = true;
          break;
        case 'PHD':
          this.user.PHD = true;
          break;
        default:
          break;
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

  cancel() {
    this.router.navigate(['/students']);
  }

}
