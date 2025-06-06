import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  featuredCourses = [
    {
      title: 'Desenvolvimento Web',
      description: 'Aprenda do zero ao avançado com HTML, CSS, JavaScript e frameworks modernos',
      image: 'assets/images/cursos/desenvolvimento-web.jpg',
      instructor: 'Paulo Sérgio',
      instructorImage: 'assets/images/instructors/paulo.jpg',
      duration: '40h',
      modules: 4,
      level: 'Iniciante',
      id:7
    },
    {
      title: 'Introdução ao React Native Para Mobile',
      description: 'Crie aplicativos iOS e Android com React Native',
      image: 'assets/images/cursos/desenvolvimento-apps.jpg',
      instructor: 'Marcos Andrade',
      instructorImage: 'assets/images/instructors/marcos.jpg',
      duration: '40h',
      modules: 4,
      level: 'Intermediário',
      id:8
    },
    {
      title: 'Python para Análise de Dados',
      description: 'Análise de dados, machine learning e visualização com Python',
      image: 'assets/images/cursos/python.png',
      instructor: 'Júlio Santos',
      instructorImage: 'assets/images/instructors/julio.jpg',
      duration: '50h',
      modules: 4,
      level: 'Avançado',
      id:8
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
