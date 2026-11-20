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
      id: 'rec-01',
      titol: 'Escudella',
      descripcio: 'Recepta tradicional catalana.',
      categoria: 'Primers plats',
      estat: 'Publicada',
      dataActualitzacio: '2026-10-15',
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
