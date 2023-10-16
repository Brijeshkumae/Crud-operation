import { Component, OnInit } from '@angular/core';
import{Router} from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import{ FormGroup,FormBuilder,Validators} from '@angular/forms';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit{
  userForm!:FormGroup
  submitted=false;

  constructor(private userService:UserService,
    private router:Router,private formBuilder:FormBuilder,private _toast:ToastrService) {}
 
  ngOnInit(){
    this. userForm=this.formBuilder.group({
      name:['',Validators.required],
      phone:['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      email:['',[Validators.required,Validators.email]],
      website:['',Validators.required]

    })
  }
 
  create(){
    this.submitted=true
    if(this.userForm.invalid){
      return;
    }
    else{
      const newUser: User = {
        id: 0, 
        name: this.userForm.get('name')?.value, 
        phone: this.userForm.get('phone')?.value,
        email:this.userForm.get('email')?.value,
        website:this.userForm.get('website')?.value
      };
      this.userService.create(newUser)
      .subscribe({
        next:(data) => {
          this.router.navigate(["/user/home"])
          this.showSuccess();
        },
        error:(err) => {
          console.log(err);
        }
      })
      
    }
  }

  public showSuccess():void{
    this._toast.success('User Data Successfully Added',this.userForm.get('name')?.value);
  }
}