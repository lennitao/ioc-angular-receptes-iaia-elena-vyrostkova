import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ReceptesService } from '../../services/receptes.service';
import { BarraFiltresComponent } from './barra-filtres.component';

describe('BarraFiltresComponent', () => {
  let component: BarraFiltresComponent;
  let fixture: ComponentFixture<BarraFiltresComponent>;

  const receptesServiceMock = {
    comprovarExistenciaTerme: (terme: string) => of(terme.toLowerCase().includes('escudella')),
  };

  beforeEach(async () => {
    localStorage.clear();

    await TestBed.configureTestingModule({
      imports: [BarraFiltresComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: ReceptesService, useValue: receptesServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BarraFiltresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('ha de marcar error síncron quan la cerca té menys de 3 caràcters', () => {
    component.campCerca.setValue('es');
    expect(component.campCerca.hasError('minlength')).toBe(true);
  });

  it('ha de marcar error síncron quan s’introdueixen caràcters prohibits', () => {
    component.campCerca.setValue('escudella<script>');
    expect(component.campCerca.hasError('caractersProhibits')).toBe(true);
  });

  it('ha de marcar error asíncron quan el terme no existeix a l’API', async () => {
    component.campCerca.setValue('paella');

    await new Promise((resolve) => setTimeout(resolve, 350));
    expect(component.campCerca.hasError('senseCoincidenciesApi')).toBe(true);
  });

  it('ha de desar la cerca a l’historial de localStorage en enviar el formulari', () => {
    component.campCerca.setValue('escudella');
    component.actualitzarFiltres();

    expect(component.historial.length).toBe(1);
    expect(component.historial[0].cerca).toBe('escudella');
    expect(localStorage.getItem('receptes_iaia_historial_cerques')).toContain('escudella');
  });
});
