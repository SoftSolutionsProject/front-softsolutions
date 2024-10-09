import { Component, Inject, Input, OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MaterialModule } from '../../material.module';
import { PeriodicElement } from '../../category/category.component';


@Component({
  selector: 'app-element-dialog',
  standalone: true,
  imports: [MaterialModule, MatFormFieldModule, MatInputModule],
  templateUrl: './element-dialog.component.html',
  styleUrl: './element-dialog.component.css'
})

export class ElementDialogComponent implements OnInit {
   
  @Input() public actionName = 'Fixo';
  @Input() public editableCategory!: PeriodicElement;

  public element!: PeriodicElement;
  public dialogMsg: string = 'Create Element';

  constructor(
  @Inject(MAT_DIALOG_DATA) 
  public data : PeriodicElement,
  public dialogRef: MatDialogRef<ElementDialogComponent>) {

    /*
    if(data.dialogMsg != null) {
      this.dialogMsg = data.dialogMsg
    }
    */
  }

  ngOnInit(): void {
    
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}

    
