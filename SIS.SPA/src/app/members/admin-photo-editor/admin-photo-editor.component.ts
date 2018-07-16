import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { Photo } from '../../_models/Photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../_services/auth.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import _ = require('underscore');

@Component({
  selector: 'app-admin-photo-editor',
  templateUrl: './admin-photo-editor.component.html',
  styleUrls: ['./admin-photo-editor.component.css']
})
export class AdminPhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];
  @Input() photoUserId: number;
  user: User;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  // Add for photo setMain
  currentMain: Photo;
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService) { }

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

  // Two new functions for setting Main Photo and Deleting Photo's as Admin:
  setMainPhoto(photo: Photo) {
    // this.photoUserId
    // this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.userService.setMainPhoto(this.photoUserId, photo.id).subscribe(() => {
      this.currentMain = _.findWhere(this.photos, {isMain: true});
      this.currentMain.isMain = false;
      photo.isMain = true;
      // this.getMemberPhotoChange.emit(photo.url);
      this.authService.changeMemberPhoto(photo.url);
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertifyService.error(error);
    });
  }

  deletePhoto(photoId: number) {
    this.alertifyService.confirm('Are you sure you want to delete this photo?', () => {
      // this.photoUserId
      // this.userService.deletePhoto(this.authService.decodedToken.nameid, photoId).subscribe(() => {
        this.userService.deletePhoto(this.photoUserId, photoId).subscribe(() => {
        this.photos.splice(_.findIndex(this.photos, {photoId: photoId}), 1);
        this.alertifyService.success('Photo has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete photo');
      });
    });
  }
}
