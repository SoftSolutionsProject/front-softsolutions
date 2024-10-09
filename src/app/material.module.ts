import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [MatSidenavModule, MatListModule, MatCheckboxModule,
              MatIconModule, MatToolbarModule, MatButtonModule, FormsModule,
              MatTableModule, RouterLink,
              MatDialogModule,  MatCardModule, ReactiveFormsModule,
              MatInputModule, MatDividerModule, MatSidenav, MatMenuModule, RouterOutlet, CommonModule ],

    exports: [MatSidenavModule, MatListModule, MatCheckboxModule,
              MatIconModule, MatToolbarModule, MatButtonModule, FormsModule,
              MatTableModule, RouterLink,
              MatDialogModule, MatCardModule, ReactiveFormsModule,
              MatInputModule, MatDividerModule, MatSidenav, MatMenuModule ],
})

export class MaterialModule {

 }

