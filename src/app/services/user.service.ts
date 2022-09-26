import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { User } from "../shared/interfaces";


@Injectable({providedIn: 'root'})
export class UserService {

  private url: string = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url)
  }

  getById(id: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`)
  }

}
