import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-admin-photo-editor',
  templateUrl: './admin-photo-editor.component.html',
  styleUrls: ['./admin-photo-editor.component.css']
})
export class AdminPhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() photoUserId: number;
  // @Input() user2: User;
  user: User;
  // @ViewChild('editForm') editForm: NgForm;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  constructor(private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit() {
    this.initializeUploader();

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });

  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      // url: this.baseUrl + 'users/' + this.user2.id + '/photos',
      url: this.baseUrl + 'users/' + this.photoUserId + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    };
  }
}
