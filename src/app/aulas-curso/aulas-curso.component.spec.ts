import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AulasCursoComponent } from './aulas-curso.component';

describe('AulasCursoComponent', () => {
  let component: AulasCursoComponent;
  let fixture: ComponentFixture<AulasCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AulasCursoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AulasCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
