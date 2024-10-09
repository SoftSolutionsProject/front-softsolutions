import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDesenvolvimentoAppComponent } from './curso-desenvolvimento-app.component';

describe('CursoDesenvolvimentoAppComponent', () => {
  let component: CursoDesenvolvimentoAppComponent;
  let fixture: ComponentFixture<CursoDesenvolvimentoAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDesenvolvimentoAppComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoDesenvolvimentoAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
