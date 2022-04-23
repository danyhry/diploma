import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postPerson(data : any) {
    return this.http.post<any>("http://localhost:8080/api/v1/persons/", data);
  }
  getPerson() {
    return this.http.get<any>("http://localhost:8080/api/v1/persons");
  }
  editPerson(data : any, id : number) {
    return this.http.put<any>("http://localhost:8080/api/v1/persons/" + id, data);
  }
  deletePerson(id : number) {
    return this.http.delete<any>("http://localhost:8080/api/v1/persons/" + id);
  }
}
