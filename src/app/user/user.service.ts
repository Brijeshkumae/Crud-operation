import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  get():Observable<any>{
    return this.http.get<User[]>('http://localhost:3000/user');
  }

  searchByName(name: string): Observable<User[]> {
    const params = {
      name_like: name 
    };
  
    return this.http.get<User[]>('http://localhost:3000/user', { params });
  }

  create(payload: User) {
    return this.http.post<User>('http://localhost:3000/user', payload);
  }

  getById(id: number) {
    return this.http.get<User>(`http://localhost:3000/user/${id}`);
   }
    
   update(payload:User){
    return this.http.put(`http://localhost:3000/user/${payload.id}`,payload);
   }

   delete(id:number){
    return this.http.delete<User>(`http://localhost:3000/user/${id}`);
 }
   
}