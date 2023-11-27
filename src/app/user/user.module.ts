import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';

import { UserformComponent } from '../model/userform/userform.component';
import { HomeComponent } from '../model/home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavBarComponent } from '../model/nav-bar/nav-bar.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SignupComponent,
    LoginComponent,
    HomeComponent,
    UserformComponent,
    NavBarComponent
   

  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right",
      preventDuplicates:true,
      timeOut:3000,
     
    }),
    NgxPaginationModule,
    ToastrModule,
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule,
   

    
  ]
})
export class UserModule { }