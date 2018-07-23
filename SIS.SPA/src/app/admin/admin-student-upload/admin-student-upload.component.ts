import { Component, OnInit, Input } from '@angular/core';
import { UserFile } from '../../_models/UserFile';

@Component({
  selector: 'app-admin-student-upload',
  templateUrl: './admin-student-upload.component.html',
  styleUrls: ['./admin-student-upload.component.css']
})
export class AdminStudentUploadComponent implements OnInit {
  // @Input() photos: Photo[];
  // @Input() photoUserId: number;
  @Input() userFiles: UserFile[];
  @Input() userId: number;

  constructor() { }

  ngOnInit() {
  }

}
