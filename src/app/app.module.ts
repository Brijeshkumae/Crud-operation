import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule} from '@angular/fire/compat'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { UserModule } from './user/user.module';
import { NgxPaginationModule } from 'ngx-pagination';
  
import { ToastrModule } from 'ngx-toastr';
import { NavBarComponent } from './model/nav-bar/nav-bar.component';
import { provideStorage , getStorage } from '@angular/fire/storage' 
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import {  MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import { environment } from 'src/environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    BrowserAnimationsModule,
    UserModule,
    NgxPaginationModule,
    ToastrModule,
    
    MatInputModule,
    MatFormFieldModule, 
    MatIconModule,
    ToastrModule.forRoot({
      positionClass:"toast-top-right",
      preventDuplicates:true,
      timeOut:3000,
     
    }),
    
   
    
   

    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }