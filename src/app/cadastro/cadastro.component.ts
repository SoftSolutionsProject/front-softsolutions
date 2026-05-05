import { Component } from '@angular/core';
import { MaterialModule } from '../material.module';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  cadastroForm: FormGroup;
  message: string = ''; // Inicializando a propriedade 'message'

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.cadastroForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      telefone: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const { nome, email, senha, telefone } = this.cadastroForm.value;
      this.message = this.userService.addUser(email, senha, nome, telefone);
      this.cadastroForm.reset();
    }
  }
}
