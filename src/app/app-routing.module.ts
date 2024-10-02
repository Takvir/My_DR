import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';






import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth.guard';



import { DashboardComponent } from './components/dashboard/dashboard.component';


import { DcListComponent } from './components/dc-list/dc-list.component';
import { DcAddComponent } from './components/dc-add/dc-add.component';
import { DcVMComponent } from './components/dc-vm/dc-vm.component';
import { DcNetworkComponent } from './components/dc-network/dc-network.component';


const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },



  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },


  { path: 'dc-list', component: DcListComponent, canActivate: [AuthGuard] },
  { path: 'dc-add', component: DcAddComponent, canActivate: [AuthGuard] },
  { path: 'dc-VM-list', component: DcVMComponent, canActivate: [AuthGuard] },
  { path: 'dc-network', component: DcNetworkComponent, canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
