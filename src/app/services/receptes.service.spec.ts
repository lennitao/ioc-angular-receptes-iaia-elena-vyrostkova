import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../environments/environment';
import { EstatReceptes, ReceptaApiResponse } from '../models/recepta.model';
import { ReceptesService } from './receptes.service';

describe('ReceptesService', () => {
  let service: ReceptesService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/receptes`;

  const mockRespostaApi: ReceptaApiResponse[] = [
    {
      id: 'rec-01',
      titol: '  Escudella i carn d’olla  ',
      descripcio: 'Plat tradicional català.',
      categoria: 'primers plats',
      estat: 'publicada',
      data_actualitzacio: '2026-10-15',
      valoracio: 4.9,
      popular: true,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReceptesService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(ReceptesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('ha de carregar i normalitzar les receptes mitjançant GET', () => {
    let darrerEstat: EstatReceptes | undefined;
    service.estat$.subscribe((estat) => (darrerEstat = estat));

    // Petició inicial disparada pel constructor
    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRespostaApi);

    // Esperem els 300ms del delay del servei
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(darrerEstat?.estat).toBe('exit');
        expect(darrerEstat?.receptes.length).toBe(1);
        expect(darrerEstat?.receptes[0].titol).toBe('Escudella i carn d’olla');
        expect(darrerEstat?.receptes[0].categoria).toBe('Primers plats');
        resolve();
      }, 350);
    });
  });

  it('ha de gestionar correctament un error HTTP i exposar estat error', () => {
    let darrerEstat: EstatReceptes | undefined;
    service.estat$.subscribe((estat) => (darrerEstat = estat));

    const req = httpMock.expectOne(apiUrl);
    req.flush('Error intern', { status: 500, statusText: 'Server Error' });

    expect(darrerEstat?.estat).toBe('error');
    expect(darrerEstat?.error).toContain('500');
  });

  it('ha de crear una recepta nova mitjançant POST i adaptar la resposta', () => {
    // Descartem la petició inicial
    httpMock.expectOne(apiUrl).flush([]);

    let titolCreat = '';
    service
      .crearRecepta({
        titol: 'Trinxat de la Cerdanya',
        descripcio: 'Col, patata i cansalada.',
        categoria: 'Primers plats',
        valoracio: 4.8,
        destacada: true,
      })
      .subscribe((recepta) => {
        titolCreat = recepta.titol;
      });

    const reqPost = httpMock.expectOne(apiUrl);
    expect(reqPost.request.method).toBe('POST');
    reqPost.flush({
      id: 'rec-99',
      titol: 'Trinxat de la Cerdanya',
      descripcio: 'Col, patata i cansalada.',
      categoria: 'Primers plats',
      estat: 'publicada',
      data_actualitzacio: '2026-11-22',
      valoracio: 4.8,
      popular: true,
    });

    // El POST dispara reintentarUltimaConsulta()
    const reqRefresc = httpMock.expectOne(apiUrl);
    expect(reqRefresc.request.method).toBe('GET');
    reqRefresc.flush([]);

    expect(titolCreat).toBe('Trinxat de la Cerdanya');
  });
});
