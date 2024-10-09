import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoPythonInicianteComponent } from './curso-python-iniciante.component';

describe('CursoPythonInicianteComponent', () => {
  let component: CursoPythonInicianteComponent;
  let fixture: ComponentFixture<CursoPythonInicianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoPythonInicianteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoPythonInicianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
