import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/read/read.component';
import { AddOrderComponent } from './addOrder/dashboard.component';
import { CollectionComponent } from './collection/read/read.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DashboardComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'collections', component: CollectionComponent },
      { path: 'add-order', component: AddOrderComponent },



    ],
  },
];
