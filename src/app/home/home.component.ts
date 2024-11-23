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
      title: 'Desenvolvimento Web Completo',
      description: 'Aprenda do zero ao avançado com HTML, CSS, JavaScript e frameworks modernos',
      image: 'assets/images/cursos/desenvolvimento-web.jpg',
      instructor: 'Paulo Sérgio',
      instructorImage: 'assets/images/instructors/paulo.jpg',
      duration: '120h',
      modules: 12,
      level: 'Iniciante'
    },
    {
      title: 'Desenvolvimento de Apps Mobile',
      description: 'Crie aplicativos iOS e Android com React Native e Flutter',
      image: 'assets/images/cursos/desenvolvimento-apps.jpg',
      instructor: 'Marcos Andrade',
      instructorImage: 'assets/images/instructors/marcos.jpg',
      duration: '100h',
      modules: 10,
      level: 'Intermediário'
    },
    {
      title: 'Python para Dados',
      description: 'Análise de dados, machine learning e visualização com Python',
      image: 'assets/images/cursos/python.png',
      instructor: 'Júlio Santos',
      instructorImage: 'assets/images/instructors/julio.jpg',
      duration: '90h',
      modules: 8,
      level: 'Avançado'
    }
  ];

  constructor() {}

  ngOnInit(): void {}
}
