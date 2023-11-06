import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  email: string = '';
  password : string = '';
  loginForm! : FormGroup;
  submitted =false;
  showPassword: boolean = false;
  hide: boolean = true;
  
  constructor(  private router : Router,
    private auth : AuthService,
    private formBuilder : FormBuilder,
    private _toast : ToastrService,
  ){

  }

  ngOnInit(): void {
    
    
  }

  username:FormControl = new FormControl('',[Validators.required,Validators.email]);
  pass: FormControl = new FormControl('',Validators.required)
 
    
     
       
      
  

  login(){
    if(this.email == ''){
      this._toast.error("please enter email");
      return;
    }

    if(this.password == ''){
      this._toast.error('please enter password');
      return;

    }
    
     
    this.auth.login(this.email, this.password );

    this.email = '';
    this.password = '';
    this.router.navigate(['/home'])
  }

  signInWithGoogle(){
    this.auth.googlesignIn();
  }

  togglePasswordVisibility(){
    this.showPassword = !this.showPassword;
  }
}