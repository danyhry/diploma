import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {PortService} from "./port.service";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class UserService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
    this.httpHeaders = new HttpHeaders({
      Authorization: localStorage.getItem('Authorization') || ''
    })
  }

  url = 'http://localhost:' + this.port + 'api/v1/users';

  postPerson(data: any) {
    return this.http.post<any>(this.url, data);
  }

  getPerson(): Observable<User> {
    return this.http.get<User>(this.url);
  }

  editPerson(data: any, id: number) {
    return this.http.put<any>(this.url + id, data);
  }

  deletePerson(id: number) {
    return this.http.delete<any>(this.url + id);
  }
}
