import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../../../../services/auth.service";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../models/user";

@Component({
  selector: 'app-dialog-edit-picture',

  template: `
    <h2 mat-dialog-title>Upload a new profile picture</h2>
    <mat-dialog-content *ngIf="auth.user$ | async as user">
      
      <div *ngIf="!(downloadURL$ | async)"
           dropZone
           class="dropzone"
           (hovered)="toggleHovered($event)" 
           (dropped)="startUpload($event)"
           [class.hovering]="isHovering">
        
        <h3>Profile Picture Drop Zone</h3>
        <p>Drag and Drop an image file</p>
        
        <fa name="upload"></fa>

        <p>Or</p>
        
        <div class="file">
          <label for="profileUpload" class="file-label">
            choose a file
          </label>
          <input id="profileUpload" type="file" (change)="startUpload($event.target.files, user)" />
        </div>
        
        
      </div>
      <div *ngIf="persentage$ | async as persentage">
        <div *ngIf="persentage < 100">
          <mat-progress-bar mode="determinate"
                            [value]="persentage">
          </mat-progress-bar>
        </div>
      </div>

      
      <div class="completed d-flex justify-content-center" *ngIf="downloadURL$ | async as url">
        <img [src]="url">
      </div>
      
    </mat-dialog-content>
    <mat-dialog-actions>
      <button *ngIf="!(downloadURL$ | async)"mat-raised-button mat-dialog-close color="primary">Cancel</button>
      <button *ngIf="downloadURL$ | async" mat-raised-button mat-dialog-close color="primary">Done</button>
    </mat-dialog-actions>
  `,

  styleUrls: ['dialog-edit-picture.component.scss']

})
export class DialogEditPictureComponent {

  // Main task
  task: AngularFireUploadTask;

  // Process monitoring
  persentage$: Observable<number>;
  snapshot$: Observable<any>;
  downloadURL$: Observable<string>;

  isHovering: boolean;

  constructor(public dialogRef: MatDialogRef<DialogEditPictureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any,
              private storage: AngularFireStorage,
              private auth: AuthService,
              private userSvc: UserService) {

  }

    // onNoClick(): void {
    //   this.dialogRef.close();
    // }
  startUpload(event: FileList, user: User){

    // Get first file from the list (of uploaded files)
    const file = event.item(0);

    if(!file){
      console.warn('UPLOAD: No file provided!');
      return;
    }

    // Validate that the file is an image
    if(file.type.split('/')[0] !== 'image'){
      console.warn('UPLOAD: Upload was not of type: image!');
      return;
    }

    // The storage path
    const path = `profilepictures/${new Date().getTime()}_${file.name}`;

    // Add (optional) metadata to the image
    const metaData = {
      uid: 'temp',
      app: 'ecliptic-web'
    };

    // The upload task
    this.task = this.storage.upload(path, file); //, { metaData });

    // Monitoring progress
    this.persentage$ = this.task.percentageChanges();
    this.snapshot$   = this.task.snapshotChanges();

    // Observable that emits when the upload-task has completed!
    this.downloadURL$ = this.task.downloadURL();

    this.downloadURL$.take(1).subscribe(url => {
      user.photoURL = url;

      const promise = this.userSvc.updateUser(user);

      promise.then(
        _ => { console.log('user\'s profile picture updated successfully!') },
        err => { console.log(err, err.message) }
      )
    })
  }

  uploadIsRunning(snapshot){
    return snapshot.state === 'running' && snapshot.bytesTransferred < snapshot.totalBytes;
  }

  toggleHovered(bool){
    this.isHovering = bool;
  }

}
