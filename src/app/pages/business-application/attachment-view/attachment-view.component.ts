import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { FileItem, FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

export interface DialogData {
  attachments: string[],
}

@Component({
  selector: 'app-attachment-view',
  templateUrl: './attachment-view.component.html',
  styleUrls: ['./attachment-view.component.scss']
})
export class AttachmentViewComponent implements OnInit {
  formTitle: string = "Business Application Attachments";
  img_url: string = "/assets/img/no_preview.png";

  fileNames: string[] = [];
  selectedItem: string = "";
  filesSelected: File[] = [];

  uploader: FileUploader;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<AttachmentViewComponent>,
    private cloudinary: Cloudinary,
    private notifService : NotificationService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.attachments.length > 0) {
      this.data.attachments.forEach((_att) => {
        if (_att != "") {
          this.fileNames.push(_att);
        }
      })
    }

    var fileName: string = "bplo-attachment/dev/Business/Attachment/" + sessionStorage.getItem("userId") + "/BusinessRequirement/";
    const uploaderOptions: FileUploaderOptions = {
      url: `https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`,
      // Upload files automatically upon addition to upload queue
      autoUpload: true,
      isHTML5: true,
      removeAfterUpload: true,
      headers: [
        {
          name: 'X-Requested-With',
          value: 'XMLHttpRequest'
        }
      ]
    };

    this.uploader = new FileUploader(uploaderOptions);

    this.uploader.onBuildItemForm = (fileItem: any, form: FormData): any => {
      var _fileName: string = fileItem.file.name;
      var _ext: string = _fileName.split(".")[_fileName.split(".").length-1];
      var _nFileName: string = _fileName.substring(0, _fileName.length - _ext.length) + Date.now().toString();
      
      
      form.append('upload_preset', this.cloudinary.config().upload_preset);
      form.append('file', fileItem);
      form.append('public_id', fileName + _nFileName);

      // Use default "withCredentials" value for CORS requests
      fileItem.withCredentials = false;
      return {fileItem, form};
    };

    this.uploader.onSuccessItem = (item: FileItem, response: string, status: number, headers: ParsedResponseHeaders) => {
      var res = JSON.parse(response);
      this.fileNames.push(res["secure_url"]);
    }
  }
  
  deleteImage(indx: number) {
    this.fileNames.splice(indx, 1);
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveAttachment() {
    if (this.fileNames.length == 0) {
      this.notifService.showNotification(NotificationType.error, "Please select file/s!");
    } else {
      this.dialogRef.close(this.fileNames);
    }
  }

}
