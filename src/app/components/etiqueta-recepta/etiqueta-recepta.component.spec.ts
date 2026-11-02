import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EtiquetaReceptaComponent } from './etiqueta-recepta.component';

describe('EtiquetaReceptaComponent', () => {
  let component: EtiquetaReceptaComponent;
  let fixture: ComponentFixture<EtiquetaReceptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EtiquetaReceptaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EtiquetaReceptaComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
