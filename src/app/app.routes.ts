
import { Routes } from '@angular/router';

import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

export const routes = [
  {
    path: '',
    component: EmployeeListComponent
  },
  {
    path: 'add-employee',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'employee/:id',
    component: EmployeeDetailsComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
