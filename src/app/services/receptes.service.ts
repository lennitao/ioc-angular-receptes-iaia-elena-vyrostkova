import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  delay,
  finalize,
  map,
  of,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { environment } from '../../environments/environment';
import {
  adaptarReceptaApi,
  adaptarReceptesApi,
  prepararReceptaApi,
} from '../adaptadors/recepta.adaptador';
import { EstatReceptes, NovaRecepta, Recepta, ReceptaApiResponse } from '../models/recepta.model';

export interface CriterisCercaReceptes {
  terme: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root',
})
export class ReceptesService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/receptes`;

  private readonly criterisSubject = new BehaviorSubject<CriterisCercaReceptes>({
    terme: '',
    categoria: '',
  });

  private readonly estatSubject = new BehaviorSubject<EstatReceptes>({
    estat: 'inicial',
    receptes: [],
  });

  readonly estat$: Observable<EstatReceptes> = this.estatSubject.asObservable();

  constructor() {
    this.iniciarFluxCerca();
  }

  // Escolta els canvis de cerca i cancel·la peticions anteriors amb switchMap
  private iniciarFluxCerca(): void {
    this.criterisSubject
      .pipe(
        tap(() => {
          this.estatSubject.next({
            ...this.estatSubject.value,
            estat: 'carregant',
            error: undefined,
          });
        }),
        switchMap((criteris) =>
          this.obtenirReceptesApi(criteris).pipe(
            catchError((err: Error) => {
              this.estatSubject.next({
                estat: 'error',
                receptes: [],
                error: err.message,
              });
              return of<Recepta[] | null>(null);
            }),
          ),
        ),
      )
      .subscribe((receptes) => {
        if (receptes !== null) {
          this.estatSubject.next({
            estat: 'exit',
            receptes,
          });
        }
      });
  }

  /** Petició HTTP GET amb adaptador i filtratge */
  obtenirReceptesApi(criteris: CriterisCercaReceptes): Observable<Recepta[]> {
    let params = new HttpParams();
    if (criteris.categoria) {
      params = params.set('categoria', criteris.categoria);
    }

    return this.http.get<ReceptaApiResponse[]>(this.apiUrl, { params }).pipe(
      // Petit retard de 300ms per fer visible i comprovable l'estat de càrrega
      delay(300),
      map((respostaApi) => adaptarReceptesApi(respostaApi)),
      map((receptes) => this.filtrarPerText(receptes, criteris.terme)),
      catchError((error: HttpErrorResponse) =>
        throwError(
          () =>
            new Error(
              error.status === 0
                ? 'No s’ha pogut connectar amb el servidor de receptes.'
                : `Error del servidor (${error.status}) en carregar les receptes.`,
            ),
        ),
      ),
    );
  }

  /** Actualitza els criteris de cerca i dispara el flux amb switchMap */
  cercar(criteris: CriterisCercaReceptes): void {
    this.criterisSubject.next({
      terme: criteris.terme.trim(),
      categoria: criteris.categoria,
    });
  }

  /** Repeteix l'última consulta realitzada */
  reintentarUltimaConsulta(): void {
    this.criterisSubject.next({ ...this.criterisSubject.value });
  }

  /** Petició HTTP POST per crear una recepta nova i refrescar el llistat */
  crearRecepta(nova: NovaRecepta): Observable<Recepta> {
    this.estatSubject.next({
      ...this.estatSubject.value,
      estat: 'carregant',
      error: undefined,
    });

    const payload = prepararReceptaApi(nova);

    return this.http.post<ReceptaApiResponse>(this.apiUrl, payload).pipe(
      map((respostaApi) => adaptarReceptaApi(respostaApi)),
      tap(() => {
        this.reintentarUltimaConsulta();
      }),
      catchError((error: HttpErrorResponse) => {
        const missatge =
          error.status === 0
            ? 'No s’ha pogut desar la recepta perquè l’API no respon.'
            : `Error (${error.status}) en crear la recepta.`;
        this.estatSubject.next({
          ...this.estatSubject.value,
          estat: 'error',
          error: missatge,
        });
        return throwError(() => new Error(missatge));
      }),
      finalize(() => {
        // L'estat final queda actualitzat pel tap (reintentar) o pel catchError
      }),
    );
  }

  /** Mètode auxiliar per al validador asíncron (l'Exercici 4) */
  comprovarExistenciaTerme(terme: string): Observable<boolean> {
    const net = terme.trim().toLocaleLowerCase('ca');
    if (!net) return of(true);

    return this.http.get<ReceptaApiResponse[]>(this.apiUrl).pipe(
      map((llista) => adaptarReceptesApi(llista)),
      map((receptes) => this.filtrarPerText(receptes, net).length > 0),
      catchError(() => of(true)),
    );
  }

  private filtrarPerText(receptes: Recepta[], terme: string): Recepta[] {
    const consulta = terme.trim().toLocaleLowerCase('ca');
    if (!consulta) return receptes;

    return receptes.filter(
      (r) =>
        r.titol.toLocaleLowerCase('ca').includes(consulta) ||
        r.descripcio.toLocaleLowerCase('ca').includes(consulta),
    );
  }
}
