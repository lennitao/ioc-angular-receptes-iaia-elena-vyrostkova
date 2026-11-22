# Formulari reactiu i persistència local

## Formulari de cerca (`BarraFiltresComponent`)

Implementat amb `ReactiveFormsModule` (`FormGroup` i `FormControl`) a `src/app/components/barra-filtres/barra-filtres.component.ts`:

- **Camps:** `cerca` (input de text) i `categoria` (desplegable).
- **Cerca reactiva:** subscripció a `valueChanges` amb `debounceTime(350)` i `distinctUntilChanged()` per evitar peticions innecessàries mentre s'escriu.
- **Validacions síncrones:** `Validators.minLength(3)` i `termeCercaValidValidator()` (rebutja cadenes amb només espais o caràcters prohibits com `<`, `>`, `{`, `}`, `;`).
- **Validació asíncrona:** `termeExistentAsyncValidator()` a `src/app/validadors/cerca.validadors.ts`. Consulta `ReceptesService.comprovarExistenciaTerme()` amb un retard de 300 ms per avisar si el terme no coincideix amb cap recepta de l'API.

## Historial amb `localStorage` (`HistorialCerquesService`)

Gestionat a `src/app/services/historial-cerques.service.ts`:

- **Claus utilitzades:** `receptes_iaia_ultima_cerca` i `receptes_iaia_historial_cerques`.
- **Control de duplicats i límit:** abans de desar una cerca nova, s'eliminen entrades repetides amb el mateix text i categoria i es mantenen les 5 més recents.
- **Gestió d'errors:** totes les lectures i escriptures a `localStorage` estan protegides dins de blocs `try/catch`.
