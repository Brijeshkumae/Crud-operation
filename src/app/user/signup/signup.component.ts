
import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/shared/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password : string = '';
  hide: boolean = true;
  constructor(private router:Router,
    private auth : AuthService,
    private toast : ToastrService){}


  ngOnInit(): void {
      
  }
  username:FormControl = new FormControl('',Validators.required);
  pass: FormControl = new FormControl('',Validators.required)
  signup(){
    if(this.email == ''){
      this.toast.error('please enter email');
      return;
    }


    if(this.password == ''){
      this.toast.error('please enter password');
      return;


    }
     
    this.auth.signup(this.email,this.password);


    this.email = '';
    this.password = '';
    this.router.navigate(['/login'])
   

  }
  signInWithGoogle(){
    this.auth.googlesignIn();
  }

}