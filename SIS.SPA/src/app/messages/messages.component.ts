import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../_models/User';
import { UserFile } from '../_models/UserFile';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  user: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
    console.log('--- Start of admin-student-edit component ---');
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
    console.log('for-loop');
    this.user.files.forEach(element => {
      console.log(element.id);
      console.log(element.description);
      console.log(element.fileName);
    });

    console.log('for-loop');
    this.user.photos.forEach(element => {
      console.log(element.description);
    });
    if (this.user.photos == null) {
      console.log('photos is null');
    }
    if (this.user.photos != null) {
      console.log('create user.photos');
      // console.log(this.user.files.toString());
    }
    console.log(this.user.photos);

    console.log('user.username:');
    console.log(this.user.username);
    console.log('--- End of admin-student-edit component ---');
  }

}
