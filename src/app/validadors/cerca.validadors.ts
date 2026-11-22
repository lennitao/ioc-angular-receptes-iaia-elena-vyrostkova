import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, map, of, switchMap, timer } from 'rxjs';
import { ReceptesService } from '../services/receptes.service';

/**
 * Validador síncron: comprova que el terme de cerca no contingui
 * caràcters especials prohibits (<, >, {, }, ;) ni només espais.
 */
export function termeCercaValidValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = String(control.value ?? '');
    if (!valor) {
      return null;
    }

    if (valor.trim().length === 0) {
      return { nomesEspais: true };
    }

    if (/[<>{};]/.test(valor)) {
      return { caractersProhibits: true };
    }

    return null;
  };
}

/**
 * Validador asíncron: consulta ReceptesService (sense HttpClient directe)
 * per avisar si el terme de cerca no coincideix amb cap recepta existent.
 */
export function termeExistentAsyncValidator(receptesService: ReceptesService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const terme = String(control.value ?? '').trim();

    if (terme.length < 3) {
      return of(null);
    }

    return timer(300).pipe(
      switchMap(() => receptesService.comprovarExistenciaTerme(terme)),
      map((existeix) => (existeix ? null : { senseCoincidenciesApi: true })),
    );
  };
}
