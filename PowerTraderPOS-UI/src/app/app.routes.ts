import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SalesPointComponent } from './components/sales-point/sales-point.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FinanceDashboardComponent } from './components/finance-dashboard/finance-dashboard.component';
import { HrDashboardComponent } from './components/hr-dashboard/hr-dashboard.component';
import { FleetDashboardComponent } from './components/fleet-dashboard/fleet-dashboard.component';
import { ServiceDashboardComponent } from './components/service-dashboard/service-dashboard.component';
import { SuppliersDashboardComponent } from './components/suppliers-dashboard/suppliers-dashboard.component';
import { CustomersDashboardComponent } from './components/customers-dashboard/customers-dashboard.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sales', component: SalesPointComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [authGuard] },
  { path: 'finance', component: FinanceDashboardComponent, canActivate: [authGuard] },
  { path: 'hr', component: HrDashboardComponent, canActivate: [authGuard] },
  { path: 'fleet', component: FleetDashboardComponent, canActivate: [authGuard] },
  { path: 'service', component: ServiceDashboardComponent, canActivate: [authGuard] },
  { path: 'suppliers', component: SuppliersDashboardComponent, canActivate: [authGuard] },
  { path: 'customers', component: CustomersDashboardComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '/login' }
];
