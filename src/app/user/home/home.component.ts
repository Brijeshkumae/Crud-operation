import { Component ,OnInit } from '@angular/core';

import { User } from '../user';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router';

declare var window: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit{

 
  searchQuery: string = '';
  suggestions: User[] = [];
  allUsers:User[]=[];
  nextId: number = 1;
  deleteModal: any;
  idTodelete: number = 0;

  constructor(private userService:UserService,private _toast:ToastrService, private router:Router){}
  ngOnInit(): void {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
      this.get();
  }

  get(){
    this.userService.get().subscribe((data)=>{
    this.allUsers=data;
    this.sortUsersByName();
    this.resetUserIds();
    },
    (error) => {
      console.log(error);
    } 
    );
  }

  search() {
    if (this.searchQuery.trim() !== '') {
      this.userService.searchByName(this.searchQuery).subscribe((data) => {
        const searchQuery = this.searchQuery.toLowerCase().trim();
        data.sort((a:any, b:any) => {
          const nameA = a.name.toLowerCase();
          const nameB = b.name.toLowerCase();
          const aContainsQuery = nameA.includes(searchQuery);
          const bContainsQuery = nameB.includes(searchQuery);
          if (aContainsQuery && !bContainsQuery) {
            return -1; 
          } else if (!aContainsQuery && bContainsQuery) {
            return 1; 
          } else {
            return nameA.localeCompare(nameB);
          }
        });
        this.allUsers = data;
        this.resetUserIds();
      });
    } 
  }
  
  

  clearSearch() {
    this.searchQuery = '';
    this.userService.get().subscribe(data => {
      this.allUsers = data;
      this.sortUsersByName();
      this.resetUserIds();
    });
  }

  private resetUserIds() {
    for (let i = 0; i < this.allUsers.length; i++) {
      this.allUsers[i].id = i + 1;
    }
  }

  private sortUsersByName() {
    this.allUsers.sort((a: any, b: any) => {
      return a.name.localeCompare(b.name);
    });
  }

  openDeleteModal(id: number) {
    this.idTodelete = id;
    this.deleteModal.show();
  }
 
  delete() {
    this.userService.delete(this.idTodelete).subscribe({
      next: (data) => {
        this.allUsers = this.allUsers.filter(_ => _.id != this.idTodelete)
        this.resetUserIds();
        this.deleteModal.hide();
        this.showError();
      },
    });
  }

  public showError():void{
    this._toast.error('Data Has Deleted');
  }

}