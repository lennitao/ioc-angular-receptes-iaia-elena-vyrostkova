# Receptes de la iaia

Aplicació web desenvolupada amb Angular per consultar, filtrar i afegir receptes tradicionals de casa nostra connectant-se a una API local. Permet cercar receptes pel títol, filtrar-les per categoria, conservar un historial de cerques i consultar-ne els detalls.

## Tecnologies i versions

- Angular: 22.2.1
- Angular CLI: 22.2.1
- Node.js: 24.21.0
- npm: 11.19.0
- TypeScript: 6.0.3
- API local: `json-server`

## Branca de desenvolupament

`ra3-serveis`

## Instal·lació i execució

Clonar el repositori:

```bash
git clone [https://github.com/lennitao/ioc-angular-receptes-iaia-elena-vyrostkova.git](https://github.com/lennitao/ioc-angular-receptes-iaia-elena-vyrostkova.git)
```

Entrar a la carpeta del projecte:

```bash
cd ioc-angular-receptes-iaia-elena-vyrostkova
```

Instal·lar les dependències:

```bash
npm install
```

Canviar a la branca de treball:

```bash
git switch ra3-serveis
```

Arrencar l'API local amb `json-server` (port `4301`):

```bash
npm run api
```

L'endpoint principal queda disponible a `http://localhost:4301/receptes`.

En una segona terminal, iniciar el servidor de desenvolupament d'Angular:

```bash
ng serve
```

Obrir el navegador a `http://localhost:4200/`.

## Construcció del projecte

Per compilar l'aplicació:

```bash
npm run build
```

## Estructura principal (EAC3)

- **API local:** `tools/api/receptes.json` (10 receptes inicials) i URL base centralitzada a `src/environments/environment.ts`.
- **Models i adaptador:**
  - `src/app/models/recepta.model.ts`: interfícies `ReceptaApiResponse`, `Recepta`, `NovaRecepta` i `EstatReceptes`.
  - `src/app/adaptadors/recepta.adaptador.ts`: normalització i transformació entre l'API i el model intern.
- **Serveis:**
  - `src/app/services/receptes.service.ts`: comunicació HTTP amb `GET`, `POST`, flux reactiu amb `switchMap`, gestió d'estats (`inicial`, `carregant`, `exit`, `error`) i reintent d'última consulta.
  - `src/app/services/historial-cerques.service.ts`: persistència de l'última cerca i historial recent a `localStorage`.
- **Components i formularis:**
  - `BarraFiltresComponent`: formulari reactiu (`ReactiveFormsModule`) amb `valueChanges`, `debounceTime(350)`, validació síncrona, validació asíncrona (`src/app/validadors/cerca.validadors.ts`) i reutilització de cerques recents.
  - `LlistaReceptesComponent`, `TargetaReceptaComponent` i `EtiquetaReceptaComponent`: visualització i detall desplegable de receptes.
- **Documentació tècnica:** `docs/models.md`, `docs/serveis.md` i `docs/formularis.md`.

## Funcionalitats

- Càrrega de receptes des de l'API local amb estat de càrrega, gestió d'errors i botó **Reintentar**.
- Alta de noves receptes mitjançant petició `POST` i actualització automàtica del llistat.
- Cerca reactiva per títol i categoria amb validació síncrona (mínim 3 caràcters i caràcters permesos) i asíncrona.
- Historial persistent de les últimes 5 cerques en `localStorage` amb recuperació en recarregar la pàgina.
- Visualització del detall de la recepta seleccionada i comptador de resultats.

## Accessibilitat i disseny responsive

- Enllaç de salt al contingut principal.
- Focus visible en la navegació amb teclat.
- Etiquetes associades als camps dels formularis.
- Ús de `aria-live`, `role="status"` i `role="alert"`.
- Disseny adaptable a pantalles petites i escriptori.

## Proves

Per executar les proves unitàries:

```bash
npm test -- --watch=false
```

## Repositori i lliurament

- **Repositori GitHub:** https://github.com/lennitao/ioc-angular-receptes-iaia-elena-vyrostkova
- **Branca de treball:** `ra3-serveis`
- **Branca publicada:** https://github.com/lennitao/ioc-angular-receptes-iaia-elena-vyrostkova/tree/ra3-serveis

Per consultar l'historial de canvis:

```bash
git log --oneline --decorate --max-count=5
```
