import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { MaterialModule } from '../../angular-material.module';
import { MainLayoutRoutes } from './main-layout.routing';
import { FormHeaderComponent } from '../header/form-header/form-header.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxPrintModule } from 'ngx-print';

import {NgxMatDatetimePickerModule, NgxMatNativeDateModule, NgxMatTimepickerModule} from '@angular-material-components/datetime-picker';
import { PrintHeaderComponent } from '../header/print-header/print-header.component';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { UnderDevelopmentComponent } from '../under-development/under-development.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { UserSetupComponent } from '../setup/user-setup/user-setup.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MainLayoutRoutes),
    FormsModule,
    OverlayModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    NgxPrintModule,
    CurrencyMaskModule,
  ],
  declarations: [
    UserSetupComponent,
    UnderDevelopmentComponent,
    PageNotFoundComponent,
    FormHeaderComponent,
    PrintHeaderComponent,
  ]
})

export class AdminLayoutModule { }
