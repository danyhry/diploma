import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {PortService} from './port.service';
import {Observable} from 'rxjs';
import {User} from "../models/user";
import {ActivationMessage} from "../models/activation-message";
import {Token} from "../models/token";

@Injectable({
  providedIn: 'root'
})
export class AuthService extends PortService {

  httpHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
    super();
  }

  url = 'http://localhost:' + this.port;

  addUser(user: User): Observable<any> {
    return this.http.post(this.url + '/register', user);
  }

  auth(user: User): Observable<Token> {
    return this.http.post<Token>(this.url + '/auth', user);
  }

  current(): Observable<User> {
    // @ts-ignore
    this.httpHeaders = new HttpHeaders().append('Authorization', localStorage.getItem('Authorization').toString());
    return this.http.get<User>(this.url + '/current', {headers: this.httpHeaders});
  }

  getActivation(code: string): Observable<ActivationMessage> {
    return this.http.get<ActivationMessage>(this.url + '/activate/' + code);
  }

  isLogin(): boolean {
    return localStorage.getItem('Authorization') != null;
  }

  logout(): void {
    localStorage.removeItem('currentUserRole');
    localStorage.removeItem('Authorization');
  }
}
