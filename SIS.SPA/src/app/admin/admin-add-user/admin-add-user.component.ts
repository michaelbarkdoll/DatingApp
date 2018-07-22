import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/User';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { Headers, Response, RequestOptions, ResponseContentType, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-admin-add-user',
  templateUrl: './admin-add-user.component.html',
  styleUrls: ['./admin-add-user.component.css']
})

export class AdminAddUserComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  user: User;

  registerForm: FormGroup;
  studentLevel: string;
  BA: boolean; BS: boolean; MS: boolean; PHD: boolean;

  constructor(private authService: AuthService,
      private alertifyService: AlertifyService,
      private formBuilder: FormBuilder,
      private router: Router,
      private authHttp: AuthHttp) { }

  ngOnInit() {
    this.createRegisterForm();
    this.studentLevel = 'BA';
    this.BA = true; this.BS = false; this.MS = false; this.PHD = false;
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
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

  register() {
    if (this.registerForm.valid) {

      this.setStudentLevel(this.studentLevel);
      this.registerForm.patchValue({
        BA: this.isBA(),
        BS: this.isBS(),
        MS: this.isMasters(),
        PHD: this.isDoctorate()
      });

      this.user = Object.assign({}, this.registerForm.value);

      // Set the default knownAs name to their first name
      if (this.user.knownAs === '') {
        this.user.knownAs = this.user.firstName;
      }

      /* // Run this in case they never changed the default value.
      this.setStudentLevel(this.studentLevel);
      // Set the user model values according to what was selected on the form.
      this.user.BA = this.isBA();
      this.user.BS = this.isBS();
      this.user.MS = this.isMasters();
      this.user.PHD = this.isDoctorate(); */

      // console.log(this.user);
      this.authService.registerReturnUser(this.user).subscribe(() => {
        this.alertifyService.success('Registration successfull');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        // this.router.navigate(['/students']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/students']);
    // this.cancelRegister.emit(false);
    // console.log('cancelled');
  }

  DownloadFile(): void {

    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    this.authHttp.get('http://localhost:5000/api/users/download/a.png', options).subscribe(res => {
      saveAs((<any>res)._body, 'a.png');
      // this._FileSaverService.save((<any>res)._body);
    });
  }

  isBachelors() {
    switch (this.studentLevel) {
      case 'BA':
        return true;
      case 'BS':
        return true;
      default:
        return false;
    }
  }
  isBA() {
    switch (this.studentLevel) {
      case 'BA':
        return true;
      default:
        return false;
    }
  }
  isBS() {
    switch (this.studentLevel) {
      case 'BS':
        return true;
      default:
        return false;
    }
  }
  isMasters() {
    switch (this.studentLevel) {
      case 'MS':
        return true;
      default:
        return false;
    }
  }
  isDoctorate() {
    switch (this.studentLevel) {
      case 'PHD':
        return true;
      default:
        return false;
    }
  }
  setStudentLevel(level: string) {
    this.studentLevel = level;
    switch (level) {
      case 'BA':
        this.BA = true;  this.BS = false; this.MS = false; this.PHD = false;
        break;
      case 'BS':
        this.BS = true; this.BA = false; this.MS = false; this.PHD = false;
        break;
      case 'MS':
        this.BS = false; this.BA = false; this.MS = true; this.PHD = false;
        break;
      case 'PHD':
        this.BS = false; this.BA = false; this.MS = false; this.PHD = true;
        break;
    }
  }
}
