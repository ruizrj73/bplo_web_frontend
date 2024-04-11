import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { BusinessApplicationModel } from 'src/app/data-model/business-application-model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BusinessAttachmentModel } from 'src/app/data-model/business-attachment-model';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationService } from 'src/app/services/notification.service';
import { NotificationType } from 'src/app/util/notification_type';
import { AttachmentViewComponent } from '../attachment-view/attachment-view.component';
import { ConfirmationDialogComponent } from 'src/app/navbar/confirmation-dialog/confirmation-dialog.component';
import { BusinessOwnerInfoModel } from 'src/app/data-model/business-owner-info-model';
import { BusinessContactInfoModel } from 'src/app/data-model/business-contact-info-model';
import { BusinessAddressInfoModel } from 'src/app/data-model/business-address-info-model';
import { BusinessOperationInfoModel } from 'src/app/data-model/business-operation-info-model';
import { HttpRequestService } from 'src/app/services/http-request.service';
import { LineOfBusinessModel } from 'src/app/data-model/line-of-business-model';
import { LineOfBusinessMeasurePaxModel } from 'src/app/data-model/line-of-business-measure-pax-model';
import { LineOfBusinessDialogComponent } from '../line-of-business-dialog/line-of-business-dialog.component';
import { MeasurePaxDialogComponent } from '../measure-pax-dialog/measure-pax-dialog.component';
import { SetupLineBusinessModel } from 'src/app/data-model/setup-line-business-model';
import { SetupMeasurePaxModel } from 'src/app/data-model/setup-measure-pax-model';

export interface DialogData {
  selectedBusinessApplication: BusinessApplicationModel,
}

@Component({
  selector: 'app-business-application-entry',
  templateUrl: './business-application-entry1.component.html',
  styleUrls: ['./business-application-entry.component.scss']
})
export class BusinessApplicationEntryComponent implements OnInit {
  formTitle: string = "Business Permit Application";
  entryStep: number = 0;

  businessApplicationFormGroup: FormGroup;
  taxYearSelection: string[] = ['2024', '2025'];
  paymentModeSelection: string[] = ['Annually', 'Semi-Annually', 'Quarterly'];
  orgTypeSelection: string[] = ['Sole Proprietorship', 'Partnership', 'Corporation', 'Cooperative', 'One Person Corporation'];
  businessOperationSelection: string[] = ["Main Office", "Branch Office", "Admin Office", "Others"];
  lineOfBusinessSelection: SetupLineBusinessModel[] = [];
  measurePaxSelection: SetupMeasurePaxModel[] = [];
  zipcodeSelection: string[] = ["6000"];
  regionSelection: string[] = ["Region 7"];
  provinceSelection: string[] = ["Cebu"];
  cityMunicipalitySelection: string[] = ["Cebu City"];
  barangaySelection: string[] = [
    "Adlaon",
    "Agsungot",
    "Apas",
    "Babag",
    "Bacayan",
    "Banilad",
    "Basak Pardo",
    "Basak San Nicolas",
    "Binaliw",
    "Bonbon",
    "Budlaan",
    "Buhisan",
    "Bulacao",
    "Buot",
    "Busay",
    "Calamba",
    "Cambinocot",
    "Capitol Site",
    "Carreta",
    "Cogon Pardo",
    "Cogon Ramos",
    "Day-as",
    "Duljo Fatima",
    "Ermita",
    "Guadalupe",
    "Guba",
    "Hipodromo",
    "Inayawan",
    "Kalubihan",
    "Kalunasan",
    "Kamagayan",
    "Kamputhaw (Camputhaw)",
    "Kasambagan",
    "Kinasang-an Pardo",
    "Labangon",
    "Lahug",
    "Lorega San Miguel",
    "Lusaran",
    "Luz",
    "Mabini",
    "Mabolo",
    "Malubog",
    "Mambaling",
    "Pahina Central",
    "Pahina San Nicolas",
    "Pamutan",
    "Pari-an",
    "Paril",
    "Pasil",
    "Pit-os",
    "Poblacion Pardo",
    "Pulangbato",
    "Pung-ol Sibugay",
    "Punta Princesa",
    "Quiot Pardo",
    "Sambag I",
    "Sambag II",
    "San Antonio",
    "San Jose",
    "San Nicolas Proper",
    "San Roque",
    "Santa Cruz",
    "Santo Niño (Poblacion)",
    "Sapangdaku",
    "Sawang Calero",
    "Sinsin",
    "Sirao",
    "Suba",
    "Sudlon I",
    "Sudlon II",
    "T. Padilla",
    "Tabunan",
    "Tagba-o",
    "Talamban",
    "Taptap",
    "Tejero (Villa Gonzalo)",
    "Tinago",
    "Tisa",
    "To-ong",
    "Zapatera",
  ];
  docRequirements: MatTableDataSource<BusinessAttachmentModel> = new MatTableDataSource<BusinessAttachmentModel>([]);
  lineOfBusinessList: MatTableDataSource<LineOfBusinessModel> = new MatTableDataSource<LineOfBusinessModel>([]);
  measurePaxList: MatTableDataSource<LineOfBusinessMeasurePaxModel> = new MatTableDataSource<LineOfBusinessMeasurePaxModel>([]);
  displayedColumnsAttachment: string[] = [
    'file_description',
    'file_url',
    'file_name',
    'action',
  ];
  displayedColumnsLineOfBusiness: string[] = [
    'code',
    'description',
    'type',
    'units',
    'capital',
    'essential',
    'non-essential',
    'action',
  ]
  displayedColumnsMeasurePax: string[] = [
    'unit',
    'capacity',
    'measurepax',
    'lineofbusiness',
    'action',
  ]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<BusinessApplicationEntryComponent>,
    public dialog: MatDialog,
    private notifService : NotificationService,
    private httpRequest: HttpRequestService
  ) {
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {
    this.initForm();
    this.initSetup();
    this.initDocRequirements();

    if (this.data.selectedBusinessApplication != null) {
      this.initData(this.data.selectedBusinessApplication);
    }
  }

  initSetup() {
    this.httpRequest.getLineOfBusiness().subscribe((result) => {
      if (result.statusCode == 200) {
        this.lineOfBusinessSelection = result.data;
      }
    });

    this.httpRequest.getMeasurePax().subscribe((result) => {
      if (result.statusCode == 200) {
        this.measurePaxSelection = result.data;
      }
    });
  }

  initData(data: BusinessApplicationModel) {
    this.businessApplicationFormGroup.controls['id'].setValue(data.id);
    this.businessApplicationFormGroup.controls['transaction_no'].setValue(data.transaction_no);
    this.businessApplicationFormGroup.controls['user_id'].setValue(data.user_id);
    this.businessApplicationFormGroup.controls['user_name'].setValue(data.user_name);
    this.businessApplicationFormGroup.controls['remarks'].setValue(data.remarks);
    this.businessApplicationFormGroup.controls['application_status'].setValue(data.application_status);

    this.businessApplicationFormGroup.controls['application_type'].setValue(data.application_type);
    this.businessApplicationFormGroup.controls['payment_type'].setValue(data.payment_type);
    this.businessApplicationFormGroup.controls['tax_year'].setValue(data.tax_year);
    this.businessApplicationFormGroup.controls['business_name'].setValue(data.business_name);
    this.businessApplicationFormGroup.controls['trade_name'].setValue(data.trade_name);
    this.businessApplicationFormGroup.controls['organization_type'].setValue(data.organization_type);
    this.businessApplicationFormGroup.controls['tin_no'].setValue(data.tin_no);
    this.businessApplicationFormGroup.controls['dtiseccda_registration_date'].setValue(data.dtiseccda_registration_date);
    this.businessApplicationFormGroup.controls['dtiseccda_registration_no'].setValue(data.dtiseccda_registration_no);
    this.businessApplicationFormGroup.controls['first_name'].setValue(data.business_owner_info[0].first_name);
    this.businessApplicationFormGroup.controls['middle_name'].setValue(data.business_owner_info[0].middle_name);
    this.businessApplicationFormGroup.controls['last_name'].setValue(data.business_owner_info[0].last_name);
    this.businessApplicationFormGroup.controls['suffix'].setValue(data.business_owner_info[0].suffix);
    this.businessApplicationFormGroup.controls['gender'].setValue(data.business_owner_info[0].gender);
    this.businessApplicationFormGroup.controls['mobile_number'].setValue(data.business_contact_info[0].mobile_number);
    this.businessApplicationFormGroup.controls['tel_fax_number'].setValue(data.business_contact_info[0].tel_fax_number);
    this.businessApplicationFormGroup.controls['email_address'].setValue(data.business_contact_info[0].email_address);
    // this.businessApplicationFormGroup.controls['isSameAddress'].setValue(data.isSameAddress);
    this.businessApplicationFormGroup.controls['business_region'].setValue(data.business_address_info[0].region);
    this.businessApplicationFormGroup.controls['business_province'].setValue(data.business_address_info[0].province);
    this.businessApplicationFormGroup.controls['business_city_municipality'].setValue(data.business_address_info[0].city_municipality);
    this.businessApplicationFormGroup.controls['business_barangay'].setValue(data.business_address_info[0].barangay);
    this.businessApplicationFormGroup.controls['business_zip_code'].setValue(data.business_address_info[0].zip_code);
    this.businessApplicationFormGroup.controls['business_house_bldg_no'].setValue(data.business_address_info[0].house_bldg_no);
    this.businessApplicationFormGroup.controls['business_building_name'].setValue(data.business_address_info[0].building_name);
    this.businessApplicationFormGroup.controls['business_lot_unit_no'].setValue(data.business_address_info[0].lot_unit_no);
    this.businessApplicationFormGroup.controls['business_block_floor_no'].setValue(data.business_address_info[0].block_floor_no);
    this.businessApplicationFormGroup.controls['business_street'].setValue(data.business_address_info[0].street);
    this.businessApplicationFormGroup.controls['business_subdivision'].setValue(data.business_address_info[0].subdivision);
    this.businessApplicationFormGroup.controls['owner_region'].setValue(data.business_owner_address_info[0].region);
    this.businessApplicationFormGroup.controls['owner_province'].setValue(data.business_owner_address_info[0].province);
    this.businessApplicationFormGroup.controls['owner_city_municipality'].setValue(data.business_owner_address_info[0].city_municipality);
    this.businessApplicationFormGroup.controls['owner_barangay'].setValue(data.business_owner_address_info[0].barangay);
    this.businessApplicationFormGroup.controls['owner_zip_code'].setValue(data.business_owner_address_info[0].zip_code);
    this.businessApplicationFormGroup.controls['owner_house_bldg_no'].setValue(data.business_owner_address_info[0].house_bldg_no);
    this.businessApplicationFormGroup.controls['owner_building_name'].setValue(data.business_owner_address_info[0].building_name);
    this.businessApplicationFormGroup.controls['owner_lot_unit_no'].setValue(data.business_owner_address_info[0].lot_unit_no);
    this.businessApplicationFormGroup.controls['owner_block_floor_no'].setValue(data.business_owner_address_info[0].block_floor_no);
    this.businessApplicationFormGroup.controls['owner_street'].setValue(data.business_owner_address_info[0].street);
    this.businessApplicationFormGroup.controls['owner_subdivision'].setValue(data.business_owner_address_info[0].subdivision);
    this.businessApplicationFormGroup.controls['business_activity'].setValue(data.business_operation_info.business_activity);
    this.businessApplicationFormGroup.controls['business_area'].setValue(data.business_operation_info.business_area);
    this.businessApplicationFormGroup.controls['total_floor_area'].setValue(data.business_operation_info.total_floor_area);
    this.businessApplicationFormGroup.controls['number_male_employee'].setValue(data.business_operation_info.number_male_employee);
    this.businessApplicationFormGroup.controls['number_female_employee'].setValue(data.business_operation_info.number_female_employee);
    this.businessApplicationFormGroup.controls['total_number_employee_establishment'].setValue(data.business_operation_info.total_number_employee_establishment);
    this.businessApplicationFormGroup.controls['total_number_employee_residing_lgu'].setValue(data.business_operation_info.total_number_employee_residing_lgu);
    this.businessApplicationFormGroup.controls['has_delivery_vehicles'].setValue(!data.business_operation_info.has_delivery_vehicles);
    this.businessApplicationFormGroup.controls['total_delivery_vehicle_van_truck'].setValue(data.business_operation_info.total_delivery_vehicle_van_truck);
    this.businessApplicationFormGroup.controls['total_delivery_vehicle_motorcycle'].setValue(data.business_operation_info.total_delivery_vehicle_motorcycle);
    this.businessApplicationFormGroup.controls['place_owned_rented'].setValue(data.business_operation_info.place_owned_rented);
    this.businessApplicationFormGroup.controls['taxdec_number'].setValue(data.business_operation_info.taxdec_number);
    this.businessApplicationFormGroup.controls['property_index_number'].setValue(data.business_operation_info.property_index_number);
    this.businessApplicationFormGroup.controls['government_tax_incentives_enjoy'].setValue(data.business_operation_info.government_tax_incentives_enjoy);
    this.businessApplicationFormGroup.controls['community_tax_certificate'].setValue(data.business_operation_info.community_tax_certificate);
    this.businessApplicationFormGroup.controls['barangay_micro_business_enterprise_registered'].setValue(data.business_operation_info.barangay_micro_business_enterprise_registered);
    this.businessApplicationFormGroup.controls['bangko_sentral_registered'].setValue(data.business_operation_info.bangko_sentral_registered);

    data.attachment.forEach((att) => {
      if (att.file_description != "") {
        this.docRequirements.data.find((_att) => _att.file_description == att.file_description).file_url += att.file_url + " | ";
        this.docRequirements.data.find((_att) => _att.file_description == att.file_description).file_name += att.file_name + " | ";
      }
    })

    this.lineOfBusinessList.data = data.line_of_business ?? [];
    this.refreshLineOfBusinessTable();
    this.measurePaxList.data = data.line_of_business_measure_pax ?? [];
    this.refreshMeasurePaxTable();
  }

  initDocRequirements() {
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "DTI/SEC/CDA (Complete Page & Valid)", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Barangay Clearance for Business", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Community Tax Certificate for Business", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "If Place is Owned (CTC Tax Dec or Affidavit of Consent)", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "If Rented from LGU (Contract of Lease or Rental Clearance)", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "If Rented from Non-LGU (Contract of Lease or Tax Clearance)", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "If Location is Subdivision (Home Owners Consent)", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Sketch Map Location of Business Address", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Updated Tax Declaration of Land", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Updated Tax Declaration of Building", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Updated Tax Map", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Certificate of Occupancy or Annual Inspection", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Health Card Certificate", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Sanitary Permit", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Solid Waste Management Certificate", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Environmental Certificate", "", ""));
    this.docRequirements.data.push(new BusinessAttachmentModel("", "", "", "Business Zoning Certificate", "", ""));
  }

  initForm() {
    this.businessApplicationFormGroup = new FormGroup({
      id: new FormControl(""),
      transaction_no: new FormControl(""),
      user_id: new FormControl(""),
      user_name: new FormControl(""),
      remarks: new FormControl("Documentary  requirements, still waiting for approval.", [Validators.required]),
      application_status: new FormControl("Waiting List", [Validators.required]),
      application_type: new FormControl("New", [Validators.required]),
      payment_type: new FormControl("", [Validators.required]),
      tax_year: new FormControl("", [Validators.required]),
      business_name: new FormControl("", [Validators.required]),
      trade_name: new FormControl("", [Validators.required]),
      organization_type: new FormControl("", [Validators.required]),
      tin_no: new FormControl("", [Validators.required]),
      dtiseccda_registration_date: new FormControl(new Date(), [Validators.required]),
      dtiseccda_registration_no: new FormControl("", [Validators.required]),
      first_name: new FormControl("", [Validators.required]),
      middle_name: new FormControl(""),
      last_name: new FormControl("", [Validators.required]),
      suffix: new FormControl(""),
      gender: new FormControl("", [Validators.required]),
      mobile_number: new FormControl("", [Validators.required]),
      tel_fax_number: new FormControl("", [Validators.required]),
      email_address: new FormControl("", [Validators.required]),
      isSameAddress: new FormControl(false, [Validators.required]),
      business_region: new FormControl("", [Validators.required]),
      business_province: new FormControl("", [Validators.required]),
      business_city_municipality: new FormControl("", [Validators.required]),
      business_barangay: new FormControl("", [Validators.required]),
      business_zip_code: new FormControl("", [Validators.required]),
      business_house_bldg_no: new FormControl(""),
      business_building_name: new FormControl(""),
      business_lot_unit_no: new FormControl(""),
      business_block_floor_no: new FormControl(""),
      business_street: new FormControl(""),
      business_subdivision: new FormControl(""),
      owner_region: new FormControl("", [Validators.required]),
      owner_province: new FormControl("", [Validators.required]),
      owner_city_municipality: new FormControl("", [Validators.required]),
      owner_barangay: new FormControl("", [Validators.required]),
      owner_zip_code: new FormControl("", [Validators.required]),
      owner_house_bldg_no: new FormControl(""),
      owner_building_name: new FormControl(""),
      owner_lot_unit_no: new FormControl(""),
      owner_block_floor_no: new FormControl(""),
      owner_street: new FormControl(""),
      owner_subdivision: new FormControl(""),
      business_activity: new FormControl("", [Validators.required]),
      business_area: new FormControl("", [Validators.required]),
      total_floor_area: new FormControl("", [Validators.required]),
      number_male_employee: new FormControl("", [Validators.required]),
      number_female_employee: new FormControl("", [Validators.required]),
      total_number_employee_establishment: new FormControl("", [Validators.required]),
      total_number_employee_residing_lgu: new FormControl("", [Validators.required]),
      has_delivery_vehicles: new FormControl(false, [Validators.required]),
      total_delivery_vehicle_van_truck: new FormControl("", [Validators.required]),
      total_delivery_vehicle_motorcycle: new FormControl("", [Validators.required]),
      place_owned_rented: new FormControl("Owned", [Validators.required]),
      taxdec_number: new FormControl("", [Validators.required]),
      property_index_number: new FormControl("", [Validators.required]),
      government_tax_incentives_enjoy: new FormControl("Yes", [Validators.required]),
      community_tax_certificate: new FormControl("", [Validators.required]),
      barangay_micro_business_enterprise_registered: new FormControl("Yes", [Validators.required]),
      bangko_sentral_registered: new FormControl("No", [Validators.required]),
    });
  }

  setAddressValue(value: any) {
    this.businessApplicationFormGroup.controls['owner_region'].setValue(value ? this.businessApplicationFormGroup.get("business_region")?.value : "");
    this.businessApplicationFormGroup.controls['owner_province'].setValue(value ? this.businessApplicationFormGroup.get("business_province")?.value : "");
    this.businessApplicationFormGroup.controls['owner_city_municipality'].setValue(value ? this.businessApplicationFormGroup.get("business_city_municipality")?.value : "");
    this.businessApplicationFormGroup.controls['owner_barangay'].setValue(value ? this.businessApplicationFormGroup.get("business_barangay")?.value : "");
    this.businessApplicationFormGroup.controls['owner_zip_code'].setValue(value ? this.businessApplicationFormGroup.get("business_zip_code")?.value : "");
    this.businessApplicationFormGroup.controls['owner_house_bldg_no'].setValue(value ? this.businessApplicationFormGroup.get("business_house_bldg_no")?.value : "");
    this.businessApplicationFormGroup.controls['owner_building_name'].setValue(value ? this.businessApplicationFormGroup.get("business_building_name")?.value : "");
    this.businessApplicationFormGroup.controls['owner_lot_unit_no'].setValue(value ? this.businessApplicationFormGroup.get("business_lot_unit_no")?.value : "");
    this.businessApplicationFormGroup.controls['owner_block_floor_no'].setValue(value ? this.businessApplicationFormGroup.get("business_block_floor_no")?.value : "");
    this.businessApplicationFormGroup.controls['owner_street'].setValue(value ? this.businessApplicationFormGroup.get("business_street")?.value : "");
    this.businessApplicationFormGroup.controls['owner_subdivision'].setValue(value ? this.businessApplicationFormGroup.get("business_subdivision")?.value : "");
  }

  setDeliveryNotApplicable(value: any) {
    this.businessApplicationFormGroup.controls['total_delivery_vehicle_van_truck'].setValue(0);
    this.businessApplicationFormGroup.controls['total_delivery_vehicle_motorcycle'].setValue(0);
  }

  setStep(index: number) {
    this.entryStep = index;
  }

  nextStep() {
    this.entryStep++;
  }

  prevStep() {
    this.entryStep--;
  }

  addAttachment(index: number) {
    const dialogRef = this.dialog.open(AttachmentViewComponent, {
      data: {
        attachments: [],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        var img_urls: string = "";
        for (var i = 0; i < result.length; i++) {
          img_urls += result[i];
          if (i < result.length-1) {
            img_urls += " | ";
          }
        }
        this.docRequirements.data[index].file_url = img_urls;
      }
    });
  }

  addLineOfBusiness()  {
    const dialogRef = this.dialog.open(LineOfBusinessDialogComponent, {
      data: {
        selection: this.lineOfBusinessSelection,
        dataSelected: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lineOfBusinessList.data.push(result);
        this.refreshLineOfBusinessTable();
      }
    });
  }

  editLineOfBusiness(index: number) {
    const dialogRef = this.dialog.open(LineOfBusinessDialogComponent, {
      data: {
        selection: this.lineOfBusinessSelection,
        dataSelected: this.lineOfBusinessList.data[index],
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.lineOfBusinessList.data.push(result);
        this.refreshLineOfBusinessTable();
      }
    });
  }

  removeLineOfBusiness(index: number) {
    this.lineOfBusinessList.data.splice(index, 1);
    this.refreshLineOfBusinessTable();
  }

  refreshLineOfBusinessTable() {
    let cloned = this.lineOfBusinessList.data.slice();
    this.lineOfBusinessList.data = cloned;
  }

  addMeasurePax() {
    const dialogRef = this.dialog.open(MeasurePaxDialogComponent, {
      data: {
        selection: this.measurePaxSelection,
        selectionLineBusiness: this.lineOfBusinessList.data,
        dataSelected: null,
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.measurePaxList.data.push(result);
        this.refreshMeasurePaxTable();
      }
    });
  }

  editMeasurePax(index: number) {

  }

  removeMeasurePax(index: number) {
    this.measurePaxList.data.splice(index, 1);
    this.refreshMeasurePaxTable();
  }

  refreshMeasurePaxTable() {
    let cloned = this.measurePaxList.data.slice();
    this.measurePaxList.data = cloned;
  }

  viewAttachment(index: number) {
    const dialogRef = this.dialog.open(AttachmentViewComponent, {
      data: {
        attachments: this.docRequirements.data[index].file_url.split(" | "),
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
      }
    });
  }

  preSaveConfirmation() {
    if (!this.businessApplicationFormGroup.valid) {
      this.notifService.showNotification(NotificationType.error, "Please input required fields!");
      return;
    };
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: "Confirm",
        message: "Are you sure do you want to " + (this.data.selectedBusinessApplication != null ? "update" : "save") + " this transaction?",
        btnOkText: "Yes",
        btnCancelText: "No",
      },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.saveApplication();
      }
    });
  }

  saveAsDraft() {
    this.notifService.showNotification(NotificationType.success, "Successfully saved as draft!");
  }

  saveApplication() {
    var boi: BusinessOwnerInfoModel = new BusinessOwnerInfoModel(
      "",
      this.businessApplicationFormGroup.get("first_name")?.value,
      this.businessApplicationFormGroup.get("middle_name")?.value,
      this.businessApplicationFormGroup.get("last_name")?.value,
      this.businessApplicationFormGroup.get("suffix")?.value,
      this.businessApplicationFormGroup.get("gender")?.value,
      "",
    );
    var bci: BusinessContactInfoModel = new BusinessContactInfoModel(
      "",
      this.businessApplicationFormGroup.get("mobile_number")?.value,
      this.businessApplicationFormGroup.get("tel_fax_number")?.value,
      this.businessApplicationFormGroup.get("email_address")?.value,
      "",
    )
    var bai: BusinessAddressInfoModel = new BusinessAddressInfoModel(
      "",
      this.businessApplicationFormGroup.get("business_region")?.value,
      this.businessApplicationFormGroup.get("business_province")?.value,
      this.businessApplicationFormGroup.get("business_city_municipality")?.value,
      this.businessApplicationFormGroup.get("business_barangay")?.value,
      this.businessApplicationFormGroup.get("business_zip_code")?.value,
      this.businessApplicationFormGroup.get("business_house_bldg_no")?.value,
      this.businessApplicationFormGroup.get("business_building_name")?.value,
      this.businessApplicationFormGroup.get("business_lot_unit_no")?.value,
      this.businessApplicationFormGroup.get("business_block_floor_no")?.value,
      this.businessApplicationFormGroup.get("business_street")?.value,
      this.businessApplicationFormGroup.get("business_subdivision")?.value,
      "",
    )
    var boai: BusinessAddressInfoModel = new BusinessAddressInfoModel(
      "",
      this.businessApplicationFormGroup.get("owner_region")?.value,
      this.businessApplicationFormGroup.get("owner_province")?.value,
      this.businessApplicationFormGroup.get("owner_city_municipality")?.value,
      this.businessApplicationFormGroup.get("owner_barangay")?.value,
      this.businessApplicationFormGroup.get("owner_zip_code")?.value,
      this.businessApplicationFormGroup.get("owner_house_bldg_no")?.value,
      this.businessApplicationFormGroup.get("owner_building_name")?.value,
      this.businessApplicationFormGroup.get("owner_lot_unit_no")?.value,
      this.businessApplicationFormGroup.get("owner_block_floor_no")?.value,
      this.businessApplicationFormGroup.get("owner_street")?.value,
      this.businessApplicationFormGroup.get("owner_subdivision")?.value,
      "",
    )
    var bOperation: BusinessOperationInfoModel = new BusinessOperationInfoModel(
      "",
      this.businessApplicationFormGroup.get("business_activity")?.value,
      this.businessApplicationFormGroup.get("business_area")?.value,
      this.businessApplicationFormGroup.get("total_floor_area")?.value,
      this.businessApplicationFormGroup.get("number_male_employee")?.value,
      this.businessApplicationFormGroup.get("number_female_employee")?.value,
      this.businessApplicationFormGroup.get("total_number_employee_establishment")?.value,
      this.businessApplicationFormGroup.get("total_number_employee_residing_lgu")?.value,
      this.businessApplicationFormGroup.get("has_delivery_vehicles")?.value,
      this.businessApplicationFormGroup.get("total_delivery_vehicle_van_truck")?.value,
      this.businessApplicationFormGroup.get("total_delivery_vehicle_motorcycle")?.value,
      this.businessApplicationFormGroup.get("place_owned_rented")?.value,
      this.businessApplicationFormGroup.get("taxdec_number")?.value,
      this.businessApplicationFormGroup.get("property_index_number")?.value,
      this.businessApplicationFormGroup.get("government_tax_incentives_enjoy")?.value,
      this.businessApplicationFormGroup.get("community_tax_certificate")?.value,
      this.businessApplicationFormGroup.get("barangay_micro_business_enterprise_registered")?.value,
      this.businessApplicationFormGroup.get("bangko_sentral_registered")?.value,
      "",
    )
    var bAttachment: BusinessAttachmentModel[] = [];
    this.docRequirements.data.forEach((r) => {
      if (r.file_url != "") {
        var u: string[] = r.file_url.split(" | ");
        u.forEach((url) => {
          if (url.trim() != "") {
            bAttachment.push(new BusinessAttachmentModel(
              "",
              url.split(".").reverse()[0],
              url.split("/").reverse()[0],
              r.file_description,
              url.trim(),
              "",
            ))
          }
        })
      }
    });

    var businessApp: BusinessApplicationModel = new BusinessApplicationModel(
      this.businessApplicationFormGroup.get("id")?.value,
      this.businessApplicationFormGroup.get("transaction_no")?.value,
      this.businessApplicationFormGroup.get("user_id")?.value,
      this.businessApplicationFormGroup.get("user_name")?.value,
      this.businessApplicationFormGroup.get("application_type")?.value,
      this.businessApplicationFormGroup.get("payment_type")?.value,
      this.businessApplicationFormGroup.get("tax_year")?.value,
      this.businessApplicationFormGroup.get("organization_type")?.value,
      this.businessApplicationFormGroup.get("business_name")?.value,
      this.businessApplicationFormGroup.get("trade_name")?.value,
      this.businessApplicationFormGroup.get("tin_no")?.value,
      this.businessApplicationFormGroup.get("dtiseccda_registration_date")?.value,
      this.businessApplicationFormGroup.get("dtiseccda_registration_no")?.value,
      this.businessApplicationFormGroup.get("remarks")?.value,
      this.businessApplicationFormGroup.get("application_status")?.value,
      bAttachment,
      [boi],
      [bci],
      [bai],
      [boai],
      bOperation,
      this.lineOfBusinessList.data,
      this.measurePaxList.data
    )
    if (this.data.selectedBusinessApplication != null) {
      this.httpRequest.updateBusinessApplication(this.businessApplicationFormGroup.get("id")?.value, businessApp).subscribe((result) => {
        if (result.statusCode == 200) {
          this.notifService.showNotification(NotificationType.success, "Successfully updated!");
          this.dialogRef.close(true);
        } else {
          this.notifService.showNotification(NotificationType.error, "Saving Data Failed!");
        }
      });
    } else {
      this.httpRequest.saveBusinessApplication(businessApp).subscribe((result) => {
        if (result.statusCode == 201) {
          this.notifService.showNotification(NotificationType.success, "Successfully saved!");
          this.dialogRef.close(true);
        } else {
          this.notifService.showNotification(NotificationType.error, "Saving Data Failed!");
        }
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

}
