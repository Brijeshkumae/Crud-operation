import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {


  appUser$ = this.authService.appUser$;
constructor(private readonly authService : AuthService){

}

  userLogin(){
    this.authService.googlesignIn();
  }

  logout(){
    this.authService.logout();
  }

}
