import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TargetaReceptaComponent } from './targeta-recepta.component';

describe('TargetaReceptaComponent', () => {
  let component: TargetaReceptaComponent;
  let fixture: ComponentFixture<TargetaReceptaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TargetaReceptaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TargetaReceptaComponent);

    fixture.componentRef.setInput('recepta', {
      id: 1,
      titol: 'Escudella',
      descripcio: 'Recepta tradicional catalana.',
      categoria: 'Primers plats',
      dataActualitzacio: '2026-01-01',
      valoracio: 5,
      destacada: true,
    });

    await fixture.whenStable();
  });

  it('should create', () => {
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
