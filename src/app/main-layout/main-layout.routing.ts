import { Routes } from '@angular/router';

import { DashboardComponent } from '../pages/dashboard/dashboard.component';
import { FormsComponent } from '../pages/forms/forms.component';
import { UnderDevelopmentComponent } from '../under-development/under-development.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { UserSetupComponent } from '../setup/user-setup/user-setup.component';
import { DashboardListComponent } from '../pages/dashboard-list/dashboard-list.component';
import { BusinessApplicationListComponent } from '../pages/business-application/business-application-list/business-application-list.component';

export const MainLayoutRoutes: Routes = [
  { path: 'user-setup', component: UserSetupComponent },
  { path: 'under-development', component: UnderDevelopmentComponent },
  { path: 'page-not-found', component: PageNotFoundComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'dashboard-list', component: DashboardListComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'business-application-list', component: BusinessApplicationListComponent },
];
