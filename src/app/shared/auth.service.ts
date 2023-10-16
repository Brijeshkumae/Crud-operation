import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router';

import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth  : AngularFireAuth, private router : Router) { }

  //login method
  login(email :  string, passsword : string){
    this.fireauth.signInWithEmailAndPassword(email,passsword).then(() =>{
      localStorage.setItem('token','true');
      this.router.navigate(['/user/home'])
    }, err =>{
      alert('something went wrong');
      this.router.navigate(['/login']);
    })
  }

  // signup method
  signup(email: string, passsword : string) {
    this.fireauth.createUserWithEmailAndPassword(email, passsword).then(() => {
      alert('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/signup']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(["/login"]);
    }, err =>{
      alert(err.message);
    });
  }


googlesignIn(){
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( () => {
 this.router.navigate(['/user/home']);
 localStorage.setItem('token','true');
  }, err => {
    alert(err.message)
  })
}

}
