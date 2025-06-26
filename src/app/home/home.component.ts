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
      title: 'Fundamentos em Python',
      description: 'Estude os principais fundamentos da linguagem Python.',
      image: 'assets/images/cursos/python.png',
      instructor: 'Dilermando Piva',
      instructorImage: 'assets/images/instructors/paulo.jpg',
      duration: '10h',
      modules: 8,
      level: 'Iniciante',
      id:13
    },
    {
      title: 'Introdução ao React Native Para Mobile',
      description: 'Crie aplicativos iOS e Android com React Native',
      image: 'assets/images/cursos/desenvolvimento-apps.jpg',
      instructor: 'Marcos Andrade',
      instructorImage: 'assets/images/instructors/marcos.jpg',
      duration: '50h',
      modules: 5,
      level: 'Intermediário',
      id:2
    },
    {
      title: 'JavaScript Avançado para Web',
      description: 'Análise de dados, machine learning e visualização com Python',
      image: 'assets/images/cursos/desenvolvimento-web.jpg',
      instructor: 'Camila Oliveira',
      instructorImage: 'assets/images/instructors/julio.jpg',
      duration: '55h',
      modules: 5,
      level: 'Avançado',
      id:12
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
