import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { LineOfBusinessModel } from 'src/app/data-model/line-of-business-model';
import { SetupLineBusinessModel } from 'src/app/data-model/setup-line-business-model';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

export interface DialogData {
  selection: SetupLineBusinessModel[],
  dataSelected: LineOfBusinessModel,
}

@Component({
  selector: 'app-line-of-business-dialog',
  templateUrl: './line-of-business-dialog.component.html',
  styleUrls: ['./line-of-business-dialog.component.scss']
})
export class LineOfBusinessDialogComponent implements OnInit {
  formTitle: string = "Line of Business";
  lineBusinessSelected: { value: string; text: string } = {value: "", text: ""};
  type: string = "New";
  units: number = 0;
  capital: number = 0;
  essential: number = 0;
  nonEssential: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<LineOfBusinessDialogComponent>,
    private notifService : NotificationService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    if (this.data.dataSelected != null) {
      
    }
  }

  lineBusinessSelectedValue(event: MatSelectChange) {
    this.lineBusinessSelected = {
      value: event.value,
      text: event.source.triggerValue
    };
  }

  closeDialog() {
    this.dialogRef.close();
  }

  saveLineBusiness() {
    if (this.lineBusinessSelected.text == "") {
      this.notifService.showNotification(NotificationType.error, "Please select Line of Business!");
      return;
    }

    var ret: LineOfBusinessModel = new LineOfBusinessModel(
      "",
      this.data.selection.find((s) => s.id == this.lineBusinessSelected.value)?.code,
      this.lineBusinessSelected.text,
      this.type,
      this.units,
      this.capital,
      this.essential,
      this.nonEssential,
      "",
    )

    this.dialogRef.close(ret);
  }

}
