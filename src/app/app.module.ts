import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';



import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';

import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, FormGroup }   from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';


import {MatIconModule} from '@angular/material/icon';



import { LoginComponent } from './components/login/login.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';


import { DcListComponent } from './components/dc-list/dc-list.component';
import { DcAddComponent } from './components/dc-add/dc-add.component';
import { DcVMComponent } from './components/dc-vm/dc-vm.component';
import { DcNetworkComponent } from './components/dc-network/dc-network.component';









@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  
    NavbarComponent,
 
  
 

    LoginComponent,

    DashboardComponent,


    DcListComponent,
    DcAddComponent,
    DcVMComponent,
    DcNetworkComponent,
    
  



   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,HttpClientModule,MatFormFieldModule,FormsModule,ReactiveFormsModule,MatInputModule,
    BrowserAnimationsModule,MatTableModule,MatButtonModule,MatDatepickerModule,MatDialogModule,MatNativeDateModule,MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
