import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
 
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  userForm: User = {
    id: 0,
    name: '',
    phone: 0,
    email: '',
    website: ''
  };
  constructor(
    private route: ActivatedRoute,
    private router:Router,
    private userService: UserService,
    private _toast: ToastrService
  ) {}
 
  ngOnInit(): void {
    this.route.paramMap.subscribe((param) => {
      var id = Number(param.get('id'));
      this.getById(id);
    });
  }
 
  getById(id: number) {
    this.userService.getById(id).subscribe((data) => {
      this.userForm = data;
    });
  }
 
  update() {
    this.userService.update(this.userForm)
    .subscribe({
      next:(data) => {
        this.router.navigate(["/user/home"]);
        this.showInfo();
      },
      error:(err) => {
        console.log(err);
      }
    })
  }

  public showInfo():void{
    this._toast.info('Data Has Successfully Updated',this.userForm.name)
  }
}