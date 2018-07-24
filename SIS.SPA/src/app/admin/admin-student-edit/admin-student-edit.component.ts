import { Component, OnInit } from '@angular/core';
import { Advisors } from '../../_models/Advisors';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '../../../../node_modules/@angular/forms';
import { AuthHttp } from '../../../../node_modules/angular2-jwt';
import { User } from '../../_models/User';
import { DatePipe } from '../../../../node_modules/@angular/common';
import { UserFile } from '../../_models/UserFile';

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
    console.log('- Start of admin-student-edit component');
    console.log('user.files:');
    console.log(this.user.files ? 'yes' : 'no');
    if (this.user.files == null) {
      console.log('it is null');
      this.user.files = Array<UserFile>();
    }
    if (this.user.files == null) {
      console.log('it is null');
    } else {
      console.log('created user.files');
      console.log(this.user.files.toString());
    }
    console.log('user.username:');
    console.log(this.user.username);
    console.log('- End of admin-student-edit component');

    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });

    this.createStudentEditForm();

    this.studentEditForm.patchValue({dateOfBirth: this.fixDate(this.user.dateOfBirth)});
    this.studentEditForm.patchValue({bachelorStartDate: this.fixDate(this.user.bachelorStartDate)});
    this.studentEditForm.patchValue({bachelorGraduationDate: this.fixDate(this.user.bachelorGraduationDate)});
    this.studentEditForm.patchValue({doctorateCandidateAcceptDate: this.fixDate(this.user.doctorateCandidateAcceptDate)});
    this.studentEditForm.patchValue({doctorateGraduationDate: this.fixDate(this.user.doctorateGraduationDate)});
    this.studentEditForm.patchValue({doctorateStartDate: this.fixDate(this.user.doctorateStartDate)});
    this.studentEditForm.patchValue({masterDefenseDate: this.fixDate(this.user.masterDefenseDate)});
    this.studentEditForm.patchValue({masterGraduationDate: this.fixDate(this.user.masterGraduationDate)});
    // this.studentEditForm.patchValue({masterStartDate: this.fixDate(this.user.masterStartDate)});
    this.studentEditForm.patchValue({dissertationDefenseDate: this.fixDate(this.user.dissertationDefenseDate)});
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
   // }, { validator: this.passwordMatchValidator });
  }


  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  fixDate(date: Date) {
    const dp = new DatePipe(navigator.language);
    const p = 'y-MM-dd'; // YYYY-MM-DD
    // const dtr = dp.transform(new Date(Date.parse(this.user.dateOfBirth.toString())), p);
    const dtr = dp.transform(new Date(Date.parse(date.toString())), p);
    // this.studentEditForm.patchValue({dateOfBirth: dtr});
    // return {dateOfBirth: dtr};
    return dtr;
  }

  updateValues() {
    this.user.gender = this.studentEditForm.value['gender'];
    this.user.knownAs = this.studentEditForm.value['knownAs'];
    this.user.firstName = this.studentEditForm.value['firstName'];
    this.user.lastName = this.studentEditForm.value['lastName'];
    this.user.dateOfBirth = this.studentEditForm.value['dateOfBirth'];
    this.user.city = this.studentEditForm.value['city'];
    this.user.country = this.studentEditForm.value['country'];
    this.user.dawgTag = this.studentEditForm.value['dawgTag'];
    this.user.advisor = this.studentEditForm.value['advisor'];
    this.user.studentLevel = this.studentEditForm.value['studentLevel'];
    this.user.bachelorStartDate = this.studentEditForm.value['bachelorStartDate'];
    this.user.bachelorFacultyMentor = this.studentEditForm.value['bachelorFacultyMentor'];
    this.user.seniorProjectAdvisor = this.studentEditForm.value['seniorProjectAdvisor'];
    this.user.bachelorGraduationDate = this.studentEditForm.value['bachelorGraduationDate'];
    this.user.seniorProjectTitle = this.studentEditForm.value['seniorProjectTitle'];
    this.user.seniorProjectURL = this.studentEditForm.value['seniorProjectURL'];
    this.user.masterFocus = this.studentEditForm.value['masterFocus'];
    this.user.masterAdvisor = this.studentEditForm.value['masterAdvisor'];
    this.user.masterCommitteeMember1 = this.studentEditForm.value['masterCommitteeMember1'];
    this.user.masterCommitteeMember2 = this.studentEditForm.value['masterCommitteeMember2'];
    this.user.masterCommitteeMember3 = this.studentEditForm.value['masterCommitteeMember3'];
    this.user.masterDefenseDate = this.studentEditForm.value['masterDefenseDate'];
    this.user.masterProjectTitle = this.studentEditForm.value['masterProjectTitle'];
    this.user.masterThesisTitle = this.studentEditForm.value['masterThesisTitle'];
    this.user.masterGraduationDate = this.studentEditForm.value['masterGraduationDate'];
    this.user.doctorateStartDate = this.studentEditForm.value['doctorateStartDate'];
    this.user.doctorateCandidateAcceptDate = this.studentEditForm.value['doctorateCandidateAcceptDate'];
    this.user.doctorateAdvisor = this.studentEditForm.value['doctorateAdvisor'];
    this.user.doctorateCommitteeMember1 = this.studentEditForm.value['doctorateCommitteeMember1'];
    this.user.doctorateCommitteeMember2 = this.studentEditForm.value['doctorateCommitteeMember2'];
    this.user.doctorateCommitteeMember3 = this.studentEditForm.value['doctorateCommitteeMember3'];
    this.user.doctorateCommitteeMember4 = this.studentEditForm.value['doctorateCommitteeMember4'];
    this.user.doctorateCommitteeMember5 = this.studentEditForm.value['doctorateCommitteeMember5'];
    this.user.doctorateCommitteeMember6 = this.studentEditForm.value['doctorateCommitteeMember6'];
    this.user.dissertationDefenseDate = this.studentEditForm.value['dissertationDefenseDate'];
    this.user.dissertationTitle = this.studentEditForm.value['dissertationTitle'];
    this.user.doctorateGraduationDate = this.studentEditForm.value['doctorateGraduationDate'];
    this.user.BA = this.studentEditForm.value['BA'];
    this.user.BS = this.studentEditForm.value['BS'];
    this.user.MS = this.studentEditForm.value['MS'];
    this.user.PHD = this.studentEditForm.value['PHD'];

      /*
      username: [this.user.username, Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required],
      */
  }

  updateUser() {
    if (this.studentEditForm.valid) {

      // this.user = Object.assign({}, this.studentEditForm.value);
      this.updateValues();

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


      // this.route.snapshot.params['id'] = student id of the profile being editted.
      this.userService.updateUserAsAdmin(this.route.snapshot.params['id'], this.user).subscribe(next => {
        this.alertify.success('Profile updated successfully');
        this.router.navigate(['/students']);
        this.studentEditForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });

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

  cancel() {
    this.router.navigate(['/students']);
  }

}
