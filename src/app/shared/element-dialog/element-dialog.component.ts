import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
//import { PeriodicElement } from 'src/app/models/despesas';
import { DespesaModel } from 'src/app/despesas/despesa.model';

@Component({
  selector: 'app-element-dialog',
  templateUrl: './element-dialog.component.html',
  styleUrls: ['./element-dialog.component.css']
})
export class ElementDialogComponent implements OnInit {
  
  despesa!: DespesaModel;
  isChange!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: DespesaModel,
    public dialogRef: MatDialogRef<ElementDialogComponent>
    ) {}

  ngOnInit(): void {

    console.log(this.data.codigo);
    if (+this.data.codigo !== 0) {
      this.isChange = true;
    } else {
      this.isChange = false;
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
