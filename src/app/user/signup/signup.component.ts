import { HttpClient } from '@angular/common/http';
import { Component ,OnInit} from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  email: string = '';
  password : string = '';
  constructor(private http:HttpClient,private router:Router,private toastr:ToastrService,
    private auth : AuthService){}

  ngOnInit(): void {
      
  }
  signup(){
    if(this.email == ''){
      alert('please enter email');
      return;
    }

    if(this.password == ''){
      alert('please enter password');
      return;

    }
     
    this.auth.signup(this.email,this.password);

    this.email = '';
    this.password = '';
   

  }

}