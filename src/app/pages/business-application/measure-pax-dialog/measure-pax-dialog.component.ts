import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { LineOfBusinessMeasurePaxModel } from 'src/app/data-model/line-of-business-measure-pax-model';
import { LineOfBusinessModel } from 'src/app/data-model/line-of-business-model';
import { SetupMeasurePaxModel } from 'src/app/data-model/setup-measure-pax-model';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';

export interface DialogData {
  selection: SetupMeasurePaxModel[],
  selectionLineBusiness: LineOfBusinessModel[],
  dataSelected: LineOfBusinessModel,
}

@Component({
  selector: 'app-measure-pax-dialog',
  templateUrl: './measure-pax-dialog.component.html',
  styleUrls: ['./measure-pax-dialog.component.scss']
})
export class MeasurePaxDialogComponent implements OnInit {
  formTitle: string = "Line of Business";
  lineBusinessSelected: { value: string; text: string } = {value: "", text: ""};
  measurePaxSelected: { value: string; text: string } = {value: "", text: ""};
  units: number = 0;
  capacity: number = 0;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<MeasurePaxDialogComponent>,
    private notifService : NotificationService,
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
  }

  lineBusinessSelectedValue(event: MatSelectChange) {
    this.lineBusinessSelected = {
      value: event.value,
      text: event.source.triggerValue
    };
  }

  measurePaxSelectedValue(event: MatSelectChange) {
    this.measurePaxSelected = {
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
    if (this.measurePaxSelected.text == "") {
      this.notifService.showNotification(NotificationType.error, "Please select Measure or Pax!");
      return;
    }

    var ret: LineOfBusinessMeasurePaxModel = new LineOfBusinessMeasurePaxModel(
      "",
      this.lineBusinessSelected.text,
      this.measurePaxSelected.text,
      this.units,
      this.capacity,
      "",
    )

    this.dialogRef.close(ret);
  }
}
