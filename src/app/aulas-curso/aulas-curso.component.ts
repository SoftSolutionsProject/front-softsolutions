import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UserService } from '../_service/user.service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-aulas-curso',
  standalone: true,
  imports: [CommonModule, MaterialModule],
  templateUrl: './aulas-curso.component.html',
  styleUrl: './aulas-curso.component.css'
})


export class AulasCursoComponent implements OnInit {
  curso: any; // Dados do curso
  currentVideoUrl: SafeResourceUrl | undefined; // URL do vídeo atual
  userId: number = parseInt(localStorage.getItem('_idUser') || '0'); // Usuário autenticado

  constructor(
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const idCurso = this.route.snapshot.params['id']; // Obter ID do curso da rota
    this.userService.getCursos().subscribe((cursos) => {
      this.curso = cursos.find((c) => c._idCurso === parseInt(idCurso));

      // Logs para debugging
      console.log('Curso carregado:', this.curso);
      console.log('Módulos:', this.curso?.modulos);
      this.curso?.modulos.forEach((modulo: any) => {
        console.log('Aulas no módulo', modulo.nomeModulo, ':', modulo.aulas);
      });

      if (this.curso && this.curso.modulos?.length > 0) {
        const primeiroModulo = this.curso.modulos[0];
        if (primeiroModulo.aulas?.length > 0) {
          this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
            primeiroModulo.aulas[0].videoUrl
          );
        }
      }
    });
  }

  playAula(videoUrl: string): void {
    if (videoUrl) {
      this.currentVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
    } else {
      console.warn('URL de vídeo inválida.');
    }
  }

  //**********IMPLEMENTAÇÕES FUTURAS PARA ENVIAR AO BACKEND
/*

  isAulaConcluida(aulaId: number): boolean {
    // Verifica se o progresso contém o ID da aula como concluído
    const progresso = this.curso.progresso || [];
    return progresso.some((modulo: any) =>
      modulo.aulasConcluidas?.includes(aulaId)
    );
  }

  toggleAulaConcluida(moduloId: number, aulaId: number, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;

    this.userService
      .updateAulaProgresso(this.userId, this.curso._idCurso, moduloId, aulaId, checked)
      .subscribe(
        () => {
          console.log('Progresso atualizado!');
          const modulo = this.curso.progresso.find((p: any) => p._idModulo === moduloId);
          if (checked) {
            modulo.aulasConcluidas.push(aulaId);
          } else {
            modulo.aulasConcluidas = modulo.aulasConcluidas.filter((id: any) => id !== aulaId);
          }
        },
        (error) => {
          console.error('Erro ao atualizar progresso:', error);
        }
      );
  }

  */
}
