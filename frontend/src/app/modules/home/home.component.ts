import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../services/auth.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAuthority: boolean;
  isAdmin: boolean;
  isUser: boolean;
  isNoGuest: boolean;


  constructor(public httpService: NotificationService,
              public dialog: MatDialog,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.isAuthority = localStorage.getItem('Authorization') !== null;
    this.isAdmin = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'admin';
    this.isUser = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') === 'user';
    this.isNoGuest = localStorage.getItem('currentUserRole') !== null && localStorage.getItem('currentUserRole') !== 'guest';
    if (this.isAuthority) {
    }
  }
}
