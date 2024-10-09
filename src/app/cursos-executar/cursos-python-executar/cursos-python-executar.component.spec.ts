import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosPythonExecutarComponent } from './cursos-python-executar.component';

describe('CursosPythonExecutarComponent', () => {
  let component: CursosPythonExecutarComponent;
  let fixture: ComponentFixture<CursosPythonExecutarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosPythonExecutarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursosPythonExecutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
