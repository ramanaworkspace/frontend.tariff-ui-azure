import { Routes } from '@angular/router';
import { TariffFormComponent } from './tariff-form.component';
import { ResultsComponent } from './results.component';
import { AdminRulesUploadComponent } from './rules-upload.component';

export const routes: Routes = [
  { path: '', component: TariffFormComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'admin/rules', component: AdminRulesUploadComponent },
  { path: '**', redirectTo: '' }
];
