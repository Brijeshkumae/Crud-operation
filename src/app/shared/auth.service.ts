import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth'
import { ActivatedRoute, Router } from '@angular/router';
import firebase from "firebase/compat/app";
import { GoogleAuthProvider, GithubAuthProvider } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  appUser$ = this.fireauth.authState;


  // const returnUrl: string | null  =
  //     this.route.snapshot.queryParamMap.get("returnUrl") || this.router.url;

  //     localStorage.setItem("returnurl" returnUrl ) ;

  constructor(private fireauth  : AngularFireAuth, private router : Router,
    private afs : AngularFirestore,  private readonly route: ActivatedRoute,
    private toast : ToastrService) { }



    isLoggedIn(): Promise<boolean> {
      return new Promise((resolve) => {
        this.fireauth.authState.subscribe((user: firebase.User | null) => {
          resolve(user !== null);
        });
      });
    }


 //login method
 login(email :  string, passsword : string){
  this.fireauth.signInWithEmailAndPassword(email,passsword).then(() =>{
    localStorage.setItem('token','false');


    this.fireauth
    .signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((credential) => this.updateUserData(credential.user));
    
    this.router.navigate(['/home'])
  }, err =>{
    this.toast.error('something went wrong');
    this.router.navigate(['/login']);
  })
}


 


  // signup method
  signup(email: string, passsword : string) {
    this.fireauth.createUserWithEmailAndPassword(email, passsword).then(() => {
      this.toast.error('Registration Successful');
      this.router.navigate(['/login']);
    }, err => {
      this.toast.error(err.message);
      this.router.navigate(['/signup']);
    })
  }


  // sign out
  logout() {
    console.log("Logging out...");
    this.fireauth.signOut().then(() => {
      this.toast.success("Successfully signed out.");
      localStorage.removeItem('token');
      this.router.navigate(["/login"]);
    }).catch(err => {
      console.error("Error while signing out:", err);
      alert(err.message);
    });
  }
  



googlesignIn(){
  return this.fireauth.signInWithPopup(new GoogleAuthProvider).then( () => {
 this.router.navigate(['/home']);
 localStorage.setItem('token','true');
  }, err => {
    this.toast.error(err.message)
  })
}


private updateUserData(user : any ) {
  const userRef = this.afs.doc(`appusers/${user.id}`);
  const data = {
    name: user.displayName,
    email: user.email,
    
  };
  return userRef.set(data, { merge: true });
}



}