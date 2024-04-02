import { DatePipe } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import * as _moment from 'moment';
import {default as _rollupMoment, Moment} from 'moment';
import { BusinessApplicationModel } from 'src/app/data-model/business-application-model';
import { CommonFunctionService } from 'src/app/services/common-function.service';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { BusinessApplicationEntryComponent } from '../business-application-entry/business-application-entry.component';
import { ChangeStatusDialogComponent } from '../change-status-dialog/change-status-dialog.component';

const moment = _rollupMoment || _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-business-application-list',
  templateUrl: './business-application-list.component.html',
  styleUrls: ['./business-application-list.component.css'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class BusinessApplicationListComponent implements OnInit {
  // #region Common Variables
  module = this;
  isLoading = false;
  datepipe: DatePipe = new DatePipe('en-US');
  numberFormat = Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  textFilterStr: string = "";
  dateFilterType: string = "Quarter";
  dateFrom: Date = new Date();
  dateTo: Date =  new Date();
  qtrFilter: string = "0";
  qtrYearFilter: number = (new Date).getFullYear();
  qtrYearSelection: number[] = [];
  dateValue = new FormControl(moment());
  // #endregion
  
  displayedColumns: string[] = [
    'transaction_no',
    'application_type',
    'payment_type',
    'tax_year',
    'organization_type',
    'business_name',
    'trade_name',
    'tin_no',
    'dtiseccda_registration_date',
    'dtiseccda_registration_no',
    'user_name',
    'remarks',
    'action',
  ];
  dataSource: MatTableDataSource<BusinessApplicationModel> = new MatTableDataSource<BusinessApplicationModel>([]);
  selectedData: BusinessApplicationModel;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('printButton') printBtn: ElementRef<HTMLElement>;

  constructor(
    public commonFunction: CommonFunctionService,
    public dialog: MatDialog,
    private httpRequest: HttpRequestService,
  ) { }

  ngOnInit(): void {
    this.initFilters();
  }

  // #region Common Functions

  initFilters() {
    this.setQuarter(new Date());
    const ctrlValue = this.dateValue.value;
    ctrlValue.year((new Date()).getFullYear());
    ctrlValue.month((new Date()).getMonth());
    this.dateValue.setValue(ctrlValue);

    for (var i = 2022; i <= (new Date).getFullYear() + 1; i ++) {
      this.qtrYearSelection.push(i);
    }
  }

  async ngAfterViewInit() {
    this.commonFunction.createFn = this.createFn;
    this.commonFunction.editFn = this.editFn;
    this.commonFunction.deleteFn = this.deleteFn;
    this.commonFunction.printFn = this.printFn;
    this.commonFunction.printPreviewFn = this.printPreview;
    this.commonFunction.exportFn = this.exportToExcel;
    this.commonFunction.module = this.module;
    this.commonFunction.printBtn = this.printBtn;
    this.commonFunction.dialog = this.dialog;
  }

  setQuarter(date: Date) {
    this.qtrFilter = Math.floor(((date).getMonth() + 3) / 3).toString();
  }
  
  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.dateValue.value;
    ctrlValue.year(normalizedYear.year());
    this.dateValue.setValue(ctrlValue);
  }

  chosenMonthHandler(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.dateValue.value;
    ctrlValue.month(normalizedMonth.month());
    this.dateValue.setValue(ctrlValue);
    datepicker.close();
  }

  formatDate(value: any): string {
    return this.datepipe.transform(value, 'MMM d, yyyy') || "";
  }

  createFn() {
    const dialogRef = this.dialog.open(BusinessApplicationEntryComponent, {
      data: {
        selectedBusinessApplication: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.module.loadData();
      }
    });
  }

  editFn() {
    
  }

  deleteFn() {

  }

  printFn() {

  }

  printPreview() {

  }

  exportToExcel() {

  }

  rowSelected(row: BusinessApplicationModel) {
    this.selectedData = row;
  }
  // #endregion

  loadData() {
    this.textFilterStr = "";
    this.isLoading = true;
    switch (this.dateFilterType) {
      case "Monthly":
        this.httpRequest.getAllBusinessApplicationByMonthYear(this.datepipe.transform(this.dateValue.value.toDate(), 'yyyy-MM-dd')).subscribe((result) => {
          if (result.statusCode == 200) {
            this.dataSource = new MatTableDataSource<BusinessApplicationModel>(result.data);
            this.dataSource.paginator = this.paginator;
          }
          this.isLoading = false;
        });
        break;
      case "DateRange":
        this.httpRequest.getAllBusinessApplicationByDateRange(this.datepipe.transform(this.dateFrom, 'yyyy-MM-dd'), this.datepipe.transform(this.dateTo, 'yyyy-MM-dd')).subscribe((result) => {
          if (result.statusCode == 200) {
            this.dataSource = new MatTableDataSource<BusinessApplicationModel>(result.data);
            this.dataSource.paginator = this.paginator;
          }
          this.isLoading = false;
        });
        break;
      case "Quarter":
        this.httpRequest.getAllBusinessApplicationByQuarter(Number.parseInt(this.qtrFilter), this.qtrYearFilter).subscribe((result) => {
          if (result.statusCode == 200) {
            this.dataSource = new MatTableDataSource<BusinessApplicationModel>(result.data);
            this.dataSource.paginator = this.paginator;
          }
          this.isLoading = false;
        });
        break
    }
  }

  viewItems(data: BusinessApplicationModel) {
    // const dialogRef = this.dialog.open(PrListItemsComponent, {
    //   data: {
    //     selectedData: data,
    //     typeList: this.itemTypeList
    //   },
    // });
  }

  editApplication(data: BusinessApplicationModel) {
    const dialogRef = this.dialog.open(BusinessApplicationEntryComponent, {panelClass: 'custom-dialog-container', data: {
      selectedBusinessApplication: data
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.module.loadData();
      }
    });
  }

  changeStatus(data: BusinessApplicationModel) {
    const dialogRef = this.dialog.open(ChangeStatusDialogComponent, {panelClass: 'custom-dialog-container', data: {
      selectedData: data
    }});

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadData();
      }
    });
  }

  textFilter(event: Event) {
    var filterValue: string;
    filterValue = (event.target as HTMLInputElement).value
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    if (filterValue.substring(0,2) == "d$") {
      if (filterValue.substring(2) != "") {
        // this.dataSource.filter = filterValue.substring(2);
        // this.dataSource.filterPredicate = function(data, filter: string): boolean {
        //   return data.departmentName.toLowerCase().includes(filter);
        // };      
      }
    } else {
      this.dataSource.filter = filterValue;
    }
  }

  selectDateRange() {
  }

  selectQtr() {
  }

}
