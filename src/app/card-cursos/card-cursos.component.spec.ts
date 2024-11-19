import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardCursosComponent } from './card-cursos.component';

describe('CardCursosComponent', () => {
  let component: CardCursosComponent;
  let fixture: ComponentFixture<CardCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
