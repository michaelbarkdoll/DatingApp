import { Component, OnInit, Input } from '@angular/core';
import { UserFile } from '../../_models/UserFile';
import { ActivatedRoute } from '../../../../node_modules/@angular/router';
import { AuthService } from '../../_services/auth.service';
import { UserService } from '../../_services/user.service';
import { AlertifyService } from '../../_services/alertify.service';
import { User } from '../../_models/User';
import _ = require('underscore');
import { FileUploader } from '../../../../node_modules/ng2-file-upload';
import { environment } from '../../../environments/environment';
import { Photo } from '../../_models/Photo';


@Component({
  selector: 'app-admin-student-upload',
  templateUrl: './admin-student-upload.component.html',
  styleUrls: ['./admin-student-upload.component.css']
})
export class AdminStudentUploadComponent implements OnInit {
  // @Input() photos: Photo[];
  @Input() photos: Photo[];
  // @Input() photoUserId: number;
  @Input() userFiles: UserFile[];
  @Input() userId: number;
  user: User;
  testuser: User;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  // Add for file setMain
  currentMain: UserFile;
  // @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    console.log('-- Start of admin-student-upload component --');

    this.initializeUploader();

    console.log('userId');
    console.log(this.userId);

    this.route.data.subscribe(data => {
      // this.user = data['user'];
      // this.user.userFiles = data.files;
      // this.user.id = data.id;
      // this.userFiles = data['files'];
      this.user = data['user'];
    });

    /* console.log('userFiles for user ' + '{{userId}}');
    console.log(this.userId);
    console.log('users userFiles: ');
    console.log(this.user.userFiles);
    console.log('username: ');
    console.log(this.user.username);
    console.log(this.user.firstName);
    console.log(this.user.country);
    console.log(this.user.toString());
    console.log('userFiles'); */

    // this.userFiles = this.user.userFiles;
    console.log('this.user.userFiles: ');
    console.log(this.user.userFiles);
    console.log('userFiles: ');
    console.log(this.userFiles);
    console.log('-- End of admin-student-upload component --');
  }

  // Old photo editor
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  initializeUploader() {
    this.uploader = new FileUploader({
      // url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',

      // url: this.baseUrl + 'users/' + this.photoUserId + '/photos',
      url: this.baseUrl + 'users/' + this.userId + '/files',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      // allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // const res: Photo = JSON.parse(response);
        const res: UserFile = JSON.parse(response);
        // const photo = {
        const userFile = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isThesis: res.isThesis,
          isProject: res.isProject,
          fileName: res.fileName
        };
        // this.photos.push(photo);
        console.log('-- Start of upload response component --');
        console.log(userFile);

        this.userFiles.push(userFile);
        console.log('-- End of upload response component --');
        // this.user.files.push(userFile);

        // if (photo.isMain) {
        /* if (userFile.isThesis) {
          // this.authService.changeMemberPhoto(photo.url);
          this.authService.changeMemberThesis(userFile.url);
          this.authService.currentUser.photoUrl = photo.url;
          localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
        } */
      }
    };
  }

  // deletePhoto(photoId: number) {
  deleteUserFile(userFileId: number) {
    this.alertifyService.confirm('Are you sure you want to delete this file?', () => {
      // this.photoUserId
      // this.userService.deletePhoto(this.authService.decodedToken.nameid, photoId).subscribe(() => {

        this.userService.deleteFile(this.userId, userFileId).subscribe(() => {
        // this.userService.deletePhoto(this.photoUserId, photoId).subscribe(() => {
        console.log(this.userFiles);
        this.userFiles.splice(_.findIndex(this.userFiles, {userFileId: userFileId}), 1);
        console.log(this.userFiles);
        // this.photos.splice(_.findIndex(this.photos, {photoId: photoId}), 1);
        this.alertifyService.success('File has been deleted');
        // this.alertifyService.success('Photo has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete file');
        // this.alertifyService.error('Failed to delete photo');
      });
    });
  }

}
