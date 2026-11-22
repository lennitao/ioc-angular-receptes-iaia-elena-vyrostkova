# Serveis HTTP i gestió d'estats

## Configuració de l'API local

- **Servidor:** `json-server` instal·lat com a dependència de desenvolupament.
- **Fitxer de dades:** `tools/api/receptes.json` (10 receptes inicials).
- **Script d'execució:** `npm run api` (port `4301`).
- **URL base:** definida a `src/environments/environment.ts` (`http://localhost:4301`).

## ReceptesService (`src/app/services/receptes.service.ts`)

Encapsula tota la comunicació amb l'API mitjançant `HttpClient`:

- **Flux reactiu amb `switchMap` (`iniciarFluxCerca`):** utilitza un `BehaviorSubject` amb els criteris de cerca (`terme` i `categoria`). Cada vegada que canvien els criteris, `switchMap` cancel·la qualsevol petició anterior pendent i llança la nova consulta.
- **Consulta (`GET /receptes`):** `obtenirReceptesApi()` envia el filtre opcional de `categoria` per `HttpParams`, transforma la resposta amb `adaptarReceptesApi()` i filtra pel text introduït.
- **Creació (`POST /receptes`):** `crearRecepta()` prepara les dades amb `prepararReceptaApi()`, les envia a l'API i crida `reintentarUltimaConsulta()` per refrescar la llista.
- **Gestió d'estats (`estat$`):** exposa un `Observable<EstatReceptes>` amb els estats `inicial`, `carregant`, `exit` i `error`. En cas d'error HTTP, mostra un missatge descriptiu a la interfície i permet repetir la consulta amb el botó **Reintentar** (`reintentarUltimaConsulta()`).
