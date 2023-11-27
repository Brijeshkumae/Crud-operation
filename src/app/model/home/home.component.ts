import { Component ,OnInit} from '@angular/core';

import { UserService } from '../../shared/user.service';
import { ToastrService } from 'ngx-toastr';
import{NavigationStart, Router} from '@angular/router';
import { AuthService } from 'src/app/shared/auth.service';
import { combineLatest, of, Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { FormControl } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private mySubscription: Subscription | undefined;
  private readonly user$ = this.userService.getAllUser();
  private readonly appUser$ = this.authService.appUser$;
  

  searchQuery: string = '';
  clearIcon: boolean = false; 
  p: number = 1;
  itemsPerPage: number = 5;
  sortDirection: boolean = false; 
  sortColumn: string = '';

 

 

  userData$ = combineLatest([this.user$, this.appUser$]).pipe(
    map(([user, appUser]) => ({
      
      userList: user,
      appUser,
    }))
    
  );
  
  
  constructor(private userService: UserService,
              private toast:ToastrService,
              private router:Router,
              private authService : AuthService,
              private location: Location,){

                
              }
  ngOnInit(): void {
    this.loadData();
    this.disableNavigation();
     
   
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
      const filteredUsers = data
        .filter((user) => user.name.toLowerCase().includes(searchQuery))
        .sort((a, b) => a.name.localeCompare(b.name)); // Sort users in ascending order based on name

      this.userData$ = combineLatest([of(filteredUsers), this.appUser$]).pipe(
        map(([user, appUser]) => ({
          userList: user,
          appUser,
        }))
      );

      this.clearIcon = true; // Move inside the if block
    });
  } else {
    this.clearIcon = false; // If search query is empty, clearIcon should be false
  }
}

private sortDataArray(dataArray: any[], columnName: string, sortDirection: boolean): any[] {
  return dataArray.sort((a, b) => {
    const valueA = a[columnName];
    const valueB = b[columnName];


    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return sortDirection ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    } else {
      return sortDirection ? valueA - valueB : valueB - valueA;
    }
  });
}
  ngOnDestroy(): void {
    if (this.mySubscription) {
      this.mySubscription.unsubscribe();
    }
  }


  private disableNavigation(): void {
    this.mySubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.location.forward();
      }
    });
  }
    
  loadData() {
    this.userService.getAllUser().subscribe(users => {
      let sortedUsers = users.slice(); 
  
      if (this.sortColumn) {
        sortedUsers = this.sortDataArray(sortedUsers, this.sortColumn, this.sortDirection);
      }
  
      this.userData$ = combineLatest([of(sortedUsers), this.appUser$]).pipe(
        map(([user, appUser]) => ({
          userList: user,
          appUser,
        }))
      );
    });
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
  

 

 logout(){
  this.authService.logout();

 }

 getPages(userListLength: number, itemsPerPage: number): number[] {
  const pageCount = Math.ceil(userListLength / itemsPerPage);
  return Array.from({ length: pageCount }, (_, index) => index + 1);
}


sortData(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = !this.sortDirection;
  } else {
    this.sortColumn = column;
    this.sortDirection = false;
  }

  this.loadData();
}



  public showError(){
    this.toast.error('Data Has Deleted','Delete message');
  }


  
}