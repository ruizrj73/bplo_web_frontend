import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from 'src/angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SidebarModule } from './sidebar/sidebar.module';
import { NavbarComponent } from './navbar/navbar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { FormsComponent } from './pages/forms/forms.component';
import { SideBarService } from './sidebar/sidebar.service';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { ReportSelectionComponent } from './report-selection/report-selection.component';
import { EmployeeSelectionComponent } from './employee-selection/employee-selection.component';
import { ConfirmationDialogComponent } from './navbar/confirmation-dialog/confirmation-dialog.component';
import { DashboardListComponent } from './pages/dashboard-list/dashboard-list.component';
import { BusinessApplicationListComponent } from './pages/business-application/business-application-list/business-application-list.component';
import { BusinessApplicationEntryComponent } from './pages/business-application/business-application-entry/business-application-entry.component';
import { AttachmentViewComponent } from './pages/business-application/attachment-view/attachment-view.component';
import { ChangeStatusDialogComponent } from './pages/business-application/change-status-dialog/change-status-dialog.component';
import { FileUploadModule } from 'ng2-file-upload';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as cloudinary from 'cloudinary-core';
import cloudinaryConfiguration from './../config';
import { LineOfBusinessDialogComponent } from './pages/business-application/line-of-business-dialog/line-of-business-dialog.component';
import { MeasurePaxDialogComponent } from './pages/business-application/measure-pax-dialog/measure-pax-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainLayoutComponent,
    NavbarComponent,
    DashboardComponent,
    FormsComponent,
    ConfirmationDialogComponent,
    EmployeeSelectionComponent,
    ReportSelectionComponent,
    DashboardListComponent,
    BusinessApplicationListComponent,
    BusinessApplicationEntryComponent,
    AttachmentViewComponent,
    ChangeStatusDialogComponent,
    LineOfBusinessDialogComponent,
    MeasurePaxDialogComponent,
  ],
  imports: [
    ToastrModule.forRoot({
      maxOpened: 1,
      autoDismiss: true
    }),
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CurrencyMaskModule,
    FlexLayoutModule,
    SidebarModule,
    FileUploadModule,
    CloudinaryModule.forRoot(cloudinary, cloudinaryConfiguration),
  ],
  providers: [SideBarService],
  bootstrap: [AppComponent]
})
export class AppModule { }
