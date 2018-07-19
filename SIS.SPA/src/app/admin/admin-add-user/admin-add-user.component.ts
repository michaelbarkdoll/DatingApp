import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/User';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { Router } from '../../../../node_modules/@angular/router';
import { Headers, Response, RequestOptions, ResponseContentType, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AuthHttp } from 'angular2-jwt';
// import { FileSaverService } from 'ngx-filesaver';

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

  type: string;
  fromRemote: boolean;

  constructor(private authService: AuthService,
      private alertifyService: AlertifyService,
      private formBuilder: FormBuilder,
      private router: Router,
     // private http: Http,
      private authHttp: AuthHttp) { }
      // private _FileSaverService: FileSaverService) { }

  ngOnInit() {
    this.createRegisterForm();
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
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', Validators.required]
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
        // this.cancel();
        // this.router.navigate(['/students']);
        /* this.authService.login(this.user).subscribe(() => {
          this.router.navigate(['/members']);
        }); */
      });
    }
/*     this.authService.register(this.model).subscribe(() => {
      this.alertifyService.success('Registration successful');
    }, error => {
      this.alertifyService.error(error);
    }); */
  }

  cancel() {
    this.router.navigate(['/students']);
    // this.cancelRegister.emit(false);
    // console.log('cancelled');
  }

/*   DownloadFile(): void {

    this.type = 'png';
    this.fromRemote = true;

    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    this.authHttp.get('http://localhost:5000/api/users/download/a.png', options).subscribe(res => {
      this._FileSaverService.save((<any>res)._body);
    });
  } */
}

    /* this.authHttp.get('../../../assets/user.png', options).subscribe(res => {
      this._FileSaverService.save((<any>res)._body);
    }); */

    /* this.http.get('../../../assets/user.png', options).subscribe(res => {
      this._FileSaverService.save((<any>res)._body);
    }); */


    /* this.authHttp.get('http://localhost:5000/api/users/download/a.png').subscribe(fileData => {
      const b: any = new Blob([fileData], { type: 'application/zip' });
      const url = window.URL.createObjectURL(b);
        window.open(url);
      }
    ); */
    /* this.getFile('http://localhost:5000/api/users/download/a.png')
    .subscribe(fileData => {
      const b: any = new Blob([fileData], { type: 'application/zip' });
      const url = window.URL.createObjectURL(b);
        window.open(url);
      }
    ); */



