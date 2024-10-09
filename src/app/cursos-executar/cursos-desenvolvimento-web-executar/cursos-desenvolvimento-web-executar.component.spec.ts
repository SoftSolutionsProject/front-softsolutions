import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosDesenvolvimentoWebExecutarComponent } from './cursos-desenvolvimento-web-executar.component';

describe('CursosDesenvolvimentoWebExecutarComponent', () => {
  let component: CursosDesenvolvimentoWebExecutarComponent;
  let fixture: ComponentFixture<CursosDesenvolvimentoWebExecutarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursosDesenvolvimentoWebExecutarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursosDesenvolvimentoWebExecutarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
