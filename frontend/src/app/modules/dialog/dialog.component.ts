import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  personForm !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
              private api: ApiService,
              @Inject(MAT_DIALOG_DATA) public editData: any,
              private dialogRef: MatDialogRef<DialogComponent>) {
  }

  ngOnInit(): void {
    this.personForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      age: ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.personForm.controls['name'].setValue(this.editData.name);
      this.personForm.controls['surname'].setValue(this.editData.surname);
      this.personForm.controls['age'].setValue(this.editData.age);
    }
  }

  addPerson() {
    if (!this.editData) {
      console.log(this.personForm.value);
      if (this.personForm.valid) {
        this.api.postPerson(this.personForm.value)
          .subscribe({
            next: (res) => {
              alert("Person added succesfully")
              this.personForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the person")
            }
          })
      }
    } else {
      this.updatePerson();
    }
  }

  private updatePerson() {
    this.api.editPerson(this.personForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Person was updated successfully");
          this.personForm.reset();
          this.dialogRef.close('update');
        },
        error: () => {
          alert("Error while updating the record");
        }
      })
  }
}
