import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationService } from 'src/app/services/notification.service';
import { BusinessApplicationModel } from 'src/app/data-model/business-application-model';
import { MatSelectChange } from '@angular/material/select';
import { NotificationType } from 'src/app/util/notification_type';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { BusinessApplicationStatusMessageModel, BusinessApplicationStatusModel } from 'src/app/data-model/business-application-status-model';

export interface DialogData {
  selectedData: BusinessApplicationModel;
}

@Component({
  selector: 'app-change-status-dialog',
  templateUrl: './change-status-dialog.component.html',
  styleUrls: ['./change-status-dialog.component.css']
})
export class ChangeStatusDialogComponent implements OnInit {
  listStatus: BusinessApplicationStatusModel[] = [];
  listMessage: BusinessApplicationStatusMessageModel[] = [];
  selectedStatus: { value: string; text: string } = {value: "", text: ""};
  message: { value: string; text: string } = {value: "", text: ""};
  otherMessage: string = "";
  selectedData: BusinessApplicationModel;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<ChangeStatusDialogComponent>,
    public dialog: MatDialog,
    private notifService : NotificationService,
    private httpRequest: HttpRequestService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initStatus();
    if (this.data != undefined) {
      if (this.data.selectedData) {
        this.selectedData = this.data.selectedData;
      }
    }
  }

  initStatus() {
    this.httpRequest.getApplicationStatus().subscribe((result) => {
      if (result.statusCode == 200) {
        this.listStatus = result.data;
      }
    });
  }
  
  statusSelectedValue(event: MatSelectChange) {
    this.selectedStatus = {
      value: event.value,
      text: event.source.triggerValue
    };
    this.listMessage = this.listStatus.find(s => s.id == event.value)?.msg ?? [];
    this.listMessage.push(new BusinessApplicationStatusMessageModel("-", "Others (Please Specify)"))
  }
  
  messageSelectedValue(event: MatSelectChange) {
    this.message = {
      value: event.value,
      text: event.source.triggerValue
    };
  }

  updateStatus() {
    if (this.selectedStatus.text == "") {
      this.notifService.showNotification(NotificationType.error, "Please select status.");
      return;
    }
    if (this.selectedStatus.text == this.selectedData.application_status && (this.message.value == "-" ? this.otherMessage : this.message.text) == this.selectedData.remarks) {
      this.notifService.showNotification(NotificationType.error, "Status not changed. Please select new status");
      return;
    }
    if (this.message.text == "") {
      this.notifService.showNotification(NotificationType.error, "Please select message.");
      return;
    }
    if (this.message.value == "-" && this.otherMessage == "") {
      this.notifService.showNotification(NotificationType.error, "Please input message.");
      return;
    }
    this.httpRequest.updateBusinessStatus(this.selectedData.id, this.selectedStatus.text, (this.message.value == "-" ? this.otherMessage : this.message.text)).subscribe((result) => {
      if (result.statusCode == 200) {
        this.notifService.showNotification(NotificationType.success, "Successfully saved!");
        this.dialogRef.close(true);
      } else {
        this.notifService.showNotification(NotificationType.error, "Saving Data Failed!");
      }
    });
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
