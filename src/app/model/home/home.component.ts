import { Component ,OnInit} from '@angular/core';

import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import{Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest,of } from "rxjs";
import { map } from "rxjs/operators";
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  private readonly user$ = this.userService.getAllUser();
  private readonly appUser$ = this.authService.appUser$;

  searchQuery: string = '';
  clearIcon: boolean = false; 
  p: number = 1; 
  itemsPerPage: number = 10;

  userData$ = combineLatest([this.user$, this.appUser$]).pipe(
    map(([user, appUser]) => ({
      
      userList: user,
      appUser,
    }))
    
  );
  
  constructor(private userService: UserService,
              private toast:ToastrService,
              private router:Router,
              private authService : AuthService){

                
              }
  ngOnInit(): void {
    
     
  }
  searchControl = new FormControl();

  delete(userId: string) {
    if (confirm("Are you sure you want to delete this employee record?")) {
      this.userService.deleteUser(userId).subscribe(
        () => {
          this.showError();
        },
        (error) => {
          // Handle any potential errors here
          console.error("Error deleting user:", error);
        }
      );
    }
  }
  
search() {
  if (this.searchQuery.trim() !== '') {
  this.userService.getAllUser().subscribe((data) => {
  const searchQuery = this.searchQuery.toLowerCase().trim();
  const filteredUsers = data.filter((user) =>
  user.name.toLowerCase().includes(searchQuery)
  );
  
  this.userData$ = combineLatest([of(filteredUsers), this.appUser$]).pipe(
  map(([user, appUser]) => ({
    userList: user,
    appUser,
  }))
  );
  });
  }
    this.clearIcon = true;
  
  }
    
    
  clearSearch() {
    this.searchQuery = '';
    this.clearIcon = false;
  this.userData$ = combineLatest([this.userService.getAllUser(), this.appUser$]).pipe(
  map(([user, appUser]) => ({
  userList: user,
  appUser,
  }))
  );
  }
  
  


  public showError(){
    this.toast.error('Data Has Deleted','Delete message');
  }

}