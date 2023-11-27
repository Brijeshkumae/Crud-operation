import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router'; 
import { LoginComponent } from './user/login/login.component';
import { SignupComponent } from './user/signup/signup.component';
import { HomeComponent } from './model/home/home.component';
import { UserformComponent } from './model/userform/userform.component'; 
import {  authGuard } from './guards/auth.guard'
// import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

// const redirectUnauthorizedToLogin = {} => redirectUnauthorizedTo(['/login']);

const routes: Routes = [
  {path: '', redirectTo:'login', pathMatch:'full'},
  {
    path:'login',
    component:LoginComponent,
    // canActivate:[AngularFireAuthGuard], data: {authGuardPipe: redirectUnauthorizedToLogin}
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'home',
    component:HomeComponent,
    canActivate:[authGuard]
    
  },
  
  {
    path:'userform/add',
    component:UserformComponent,
    canActivate:[authGuard]
    
  },
  {
    path:'userform/edit/:id',
    component:UserformComponent,
    canActivate:[authGuard]
    
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { }