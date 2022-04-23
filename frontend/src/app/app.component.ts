import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "./dialog/dialog.component";
import {ApiService} from "./services/api.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Angular Example';
  displayedColumns: string[] = ['id', 'name', 'surname', 'age', 'action'];
  dataSource !: MatTableDataSource<any>;

  @ViewChild(MatSort)
  sort !: MatSort;

  @ViewChild(MatPaginator)
  paginator !: MatPaginator;

  constructor(private dialog: MatDialog,
              private api: ApiService) {
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
    this.api.getPerson()
      .subscribe({
          next: (res) => {
            console.log(res);
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
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
      next:() => {
        alert("Person was deleted successfully");
        this.getAllPersons();
      },
      error:()=> {
        alert("Error while deleting")
      }
    })
  }
}
