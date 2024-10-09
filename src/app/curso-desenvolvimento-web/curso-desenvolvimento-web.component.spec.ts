import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoDesenvolvimentoWebComponent } from './curso-desenvolvimento-web.component';

describe('CursoDesenvolvimentoWebComponent', () => {
  let component: CursoDesenvolvimentoWebComponent;
  let fixture: ComponentFixture<CursoDesenvolvimentoWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoDesenvolvimentoWebComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoDesenvolvimentoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
