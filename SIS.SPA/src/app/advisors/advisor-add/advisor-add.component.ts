import { Component, OnInit } from '@angular/core';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { Advisors } from '../../_models/Advisors';
import { FormGroup, FormBuilder, Validators } from '../../../../node_modules/@angular/forms';
import { AuthHttp } from '../../../../node_modules/angular2-jwt';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-advisor-add',
  templateUrl: './advisor-add.component.html',
  styleUrls: ['./advisor-add.component.css']
})
export class AdvisorAddComponent implements OnInit {
  advisors: Advisors[];
  addAdvisorForm: FormGroup;
  advisor: Advisors;

  constructor(private authService: AuthService,
    private alertifyService: AlertifyService,
    private userService: UserService,
    private alertify: AlertifyService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private authHttp: AuthHttp) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.advisors = data['advisors'];
    });

    this.createaddAdvisorForm();
  }

  createaddAdvisorForm() {
    this.addAdvisorForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: ['', Validators.required],
      title: ['', Validators.required]
     });
    // }, { validator: this.Validator });
  }

   Validator(formGroup: FormGroup) {
    return formGroup.get('firstName').value === formGroup.get('firstName').value ? null : {'mismatch' : true};

    // return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {'mismatch' : true};
   }

  /*
  {
  "firstName": "Michael",
  "lastName": "Barkdoll",
  "fullName": "Michael Barkdoll",
  "title": "Staff"
  }
  */

 addAdvisor() {
  if (this.addAdvisorForm.valid) {
    console.log('Test');

    this.advisor = Object.assign({}, this.addAdvisorForm.value);

    // this.authService.registerReturnUser(this.advisor).subscribe(() => {
    this.userService.addAdvisor(this.advisor).subscribe(() => {
      this.alertifyService.success('Advisor created successfully');
      this.router.navigate(['/advisors']);
    }, error => {
      this.alertifyService.error(error);
    }, () => {
      // this.router.navigate(['/students']);
    });

  }
 }

 cancel() {
  this.router.navigate(['/advisors']);
 }

}
