import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { MaterialModule } from '../../material.module';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Category } from '../category';

export interface DialogData {
  actionName: string;
}

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.css'
})

export class CategoryFormComponent implements OnInit{

  public categoryForm!: FormGroup;
  public emitForm: boolean = false;
  public editedData: any;

  @Input() public actionName = 'Fixo';
  @Input() public editableCategory!: Category;

  constructor(public formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, ){

    if(data.actionName != null) {
        this.actionName = data.actionName
    }
    };

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      position: this.editableCategory != null ? this.editableCategory.position : '',
      name: this.editableCategory != null ? this.editableCategory.name : '',
      weight: this.editableCategory != null ? this.editableCategory.weight : '',
      symbol: this.editableCategory != null ? this.editableCategory.symbol : '',
      });
 }

 
public clickCancelar () {
this.dialogRef.close(false)   
}

public clickSalvar () {
  if (this.categoryForm.valid) {
    
    // Obtenha os dados do formulário
    const dadosAtualizados : Category = this.categoryForm.value;

    console.log(this.categoryForm.value)

    console.log("clickSalvar acionado")

    // Emita os dados atualizados de volta ao componente pai
    this.dialogRef.close(dadosAtualizados);
    }
  }
}
