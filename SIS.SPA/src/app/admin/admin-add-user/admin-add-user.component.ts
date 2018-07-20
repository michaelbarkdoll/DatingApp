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

  constructor(private authService: AuthService,
      private alertifyService: AlertifyService,
      private formBuilder: FormBuilder,
      private router: Router,
      private authHttp: AuthHttp) { }

  ngOnInit() {
    this.createRegisterForm();
    this.studentLevel = 'BA';
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
      masterCommitteeMember1: [''],
      masterCommitteeMember2: [''],
      masterCommitteeMember3: [''],
      masterDefenseDate: [null],
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
      doctorateGraduationDate: [null]
    }, { validator: this.passwordMatchValidator });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'mismatch' : true};
  }

  register() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);

      // Set the default knownAs name to their first name
      if (this.user.knownAs === '') {
        this.user.knownAs = this.user.firstName;
      }

      // console.log(this.user);
      this.authService.registerReturnUser(this.user).subscribe(() => {
        this.alertifyService.success('Registration successfull');
      }, error => {
        this.alertifyService.error(error);
      }, () => {
        this.router.navigate(['/students']);
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
        break;
      case 'BS':
        return true;
        break;
      default:
        return false;
    }
  }
  isMasters() {
    switch (this.studentLevel) {
      case 'MS':
        return true;
        break;
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
  }
}
