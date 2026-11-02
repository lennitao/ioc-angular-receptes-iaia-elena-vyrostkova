import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaRecepta } from './etiqueta-recepta.component';

describe('EtiquetaRecepta', () => {
  let component: EtiquetaRecepta;
  let fixture: ComponentFixture<EtiquetaRecepta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaRecepta],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaRecepta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
