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
import { RequestOptions, ResponseContentType } from '../../../../node_modules/@angular/http';
import { AuthHttp } from '../../../../node_modules/angular2-jwt';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-admin-student-upload',
  templateUrl: './admin-student-upload.component.html',
  styleUrls: ['./admin-student-upload.component.css']
})
export class AdminStudentUploadComponent implements OnInit {
  // @Input() photos: Photo[];
  // @Input() photos: Photo[];
  // @Input() photoUserId: number;
  @Input() userFiles: UserFile[];
  @Input() userId: number;
  user: User;
  // testuser: User;

  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  baseUrl = environment.apiUrl;

  // Add for file setMain
  // currentMain: UserFile;
  // @Output() getMemberPhotoChange = new EventEmitter<string>();

  constructor(private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private authHttp: AuthHttp,
    private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();

    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
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
        this.userFiles.splice(_.findIndex(this.userFiles, {id: userFileId}), 1);
        this.alertifyService.success('File has been deleted');
      }, error => {
        this.alertifyService.error('Failed to delete file');
        // this.alertifyService.error('Failed to delete photo');
      });
    });
  }

  DownloadFile(fileId: number): void {
    let fileNameToDownload: string;

    const options = new RequestOptions({
      responseType: ResponseContentType.Blob
    });

    this.userFiles.forEach(element => {
      if ( element.id === fileId) {
        fileNameToDownload = element.fileName;
      }
    });

    if (fileNameToDownload === null) {
      console.log('Unable to find a filename to download!');
      return;
    }

    this.authHttp.get('http://localhost:5000/api/users/download/' + fileId, options).subscribe(res => {
      saveAs((<any>res)._body, fileNameToDownload);
      // saveAs((<any>res)._body, 'a.png');
    });
  }

}
