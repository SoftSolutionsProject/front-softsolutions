import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { Category } from '../category';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})

export class DialogComponent implements OnInit{

    constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  ) {

    if(data.leftButtonLabel != null) {
      this.leftButtonLabel = data.leftButtonLabel
    }

    if(data.rightButtonLabel != null) {
      this.rightButtonLabel = data.rightButtonLabel
    }

    if(data.dialogMsg != null) {
      this.dialogMsg = data.dialogMsg
    }

  }

  public dialogMsg: string = 'Confirma esta Ação';
  public leftButtonLabel: string = 'Cancelar 2';
  public rightButtonLabel: string = 'Confirmar';

  public clickLeftButton() {
    console.log('sim deletado');
    this.dialogRef.close(false);    
  };

  public clickRightButton() {
    console.log('não deletado');
    this.dialogRef.close(true);
  };

  ngOnInit(): void { }

}
