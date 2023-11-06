import { CanActivateFn } from '@angular/router';
import { User } from '../user/user';
import firebase from 'firebase/compat/app';

export const authGuard: CanActivateFn = (route, state) => {
 
     const login = route.url[0].path;
  if( login == 'home'){
    return true;
  } else {
    alert('access denied');
    return false;
  }
 
};
