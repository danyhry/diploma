import {Component, OnInit} from '@angular/core';
import {DialogComponent} from "../dialog/dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../../services/user.service";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dataSource !: MatTableDataSource<any>;
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', 'action'];

  constructor(
    private dialog: MatDialog,
    private api: UserService) {
  }

  ngOnInit(): void {
    this.getAllPersons();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%'
    }).afterClosed().subscribe(value => {
      if (value === 'save') {
        this.getAllPersons();
      }
    })
  }

  getAllPersons() {
    this.api.getPerson().subscribe({
          next: (res) => {
            console.log(res);
            // @ts-ignore
            this.dataSource = new MatTableDataSource(res);
            // this.dataSource.paginator = this.paginator;
            // this.dataSource.sort = this.sort;
          },
          error: () => {
            alert("Error while fetching the Records!")
          }
        }
      )
  }

  editPerson(element: any) {
    this.dialog.open(DialogComponent, {
      width: '30%',
      data: element
    }).afterClosed().subscribe(value => {
      if (value === 'update') {
        this.getAllPersons();
      }
    })
  }

  deletePerson(id: number) {
    this.api.deletePerson(id).subscribe({
      next: () => {
        alert("Person was deleted successfully");
        this.getAllPersons();
      },
      error: () => {
        alert("Error while deleting")
      }
    })
  }

}
