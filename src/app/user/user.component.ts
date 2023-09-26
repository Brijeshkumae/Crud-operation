import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, FormControlName, AbstractControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataserviceService } from '../service/dataservice.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent {
  
  userform:FormGroup|any
    
  data:any;
  isedit:boolean=false;
  username:any;
  usernameShow:any;
  emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  integreRegex = /^\d+$/;
  constructor(private _dataservice:DataserviceService, private _toast:ToastrService,) { 
    
  }
  
  ngOnInit(): void {
    this.userform = new FormGroup({
      name:new FormControl('',[Validators.required, Validators.maxLength(32)]),
      email:new FormControl('',[Validators.required, Validators.maxLength(32), Validators.pattern(this.emailRegex)]),
      phone:new FormControl('',[Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(this.integreRegex)]),
      website:new FormControl('',[Validators.required, Validators.maxLength(32)])
      
     })
   this.getdata();
   
  }
  
  getControl(name: any): AbstractControl | null {

    return this.userform.get(name)

  }
  update(user:any){
    this.userform.id = user.id;
    this.usernameShow= this.userform.value.name;
    this._dataservice.update(this.userform.id, this.userform.value).subscribe(res=>{
      this.showInfo();
      this.getdata();
    })

  }
  sendata(userform:FormGroup){
    this.data.push(this.userform.value);
    this.username= this.userform.value.name;
    this._dataservice.postdata(this.userform.value).subscribe(res=>{
      this.showSuccess();
      this.getdata();
    })
  }

  getdata(){
    this._dataservice.getdata().subscribe(res=>{
      this.data = res;
    })
  }
  
  addmodel(){
    this.isedit=false;
    this.userform.reset();
  }

  edit(i:any, user:any){
    this.isedit=true;
    this.userform.id= user.id;
    this.userform.setValue({
      name:user.name,
      email:user.email,
      phone:user.phone,
      website:user.website
    })
  }

  delete(index:number, user:any){
    if (confirm("Are you sure you want to delete this user record ?")) {
      this._dataservice.delete(index,user);
      this.userform.id= user.id;
      this._dataservice.delete(this.userform.id, user).subscribe(res=>{
      this.data.splice(index, 1);
      this.showError();
     
    })
    }
  }
  

  



    public showSuccess():void{
      this._toast.success('User Data Successfully Added', this.username);
    }

    public showInfo():void{
      this._toast.info('Data Has Successfully Updated', this.usernameShow)
    }

    public showError():void{
      this._toast.error('Data Has Deleted');
    }
  
}
