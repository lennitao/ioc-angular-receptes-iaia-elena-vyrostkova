# Receptes de la iaia

Aplicació web desenvolupada amb Angular per consultar receptes tradicionals de casa nostra. Permet cercar receptes pel títol, filtrar-les per categoria i consultar els detalls.

## Tecnologies i versions

- Angular: 22.2.1
- Angular CLI: 22.2.1
- Node.js: 24.21.0
- npm: 11.19.0
- TypeScript: 6.0.3

## Branca de desenvolupament

`ra2-components`

## Instal·lació i execució

Clonar el repositori:

```bash
git clone https://github.com/lennitao/ioc-angular-receptes-iaia-elena-vyrostkova.git
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
git switch ra2-components
```

Iniciar el servidor de desenvolupament:

```bash
ng serve
```

Obrir el navegador a `http://localhost:4200/`.

## Construcció del projecte

Per compilar l'aplicació:

```bash
ng build
```

## Components creats

- **LlistaReceptesComponent:** mostra el conjunt de receptes.
- **TargetaReceptaComponent:** mostra la informació de cada recepta i permet seleccionar-la.
- **EtiquetaReceptaComponent:** mostra la categoria i si la recepta és destacada.
- **BarraFiltresComponent:** permet cercar receptes pel títol i filtrar-les per categoria.

## Model i dades

- `Recepta`: model que defineix l'estructura de les receptes.
- `RECEPTES_MOCK`: conjunt de 10 receptes de prova.

## Funcionalitats

- Visualització de receptes.
- Cerca per títol amb validació de longitud mínima de 3 caràcters quan s'introdueix text.
- Filtratge per categoria independentment de la cerca per títol.
- Restabliment dels filtres.
- Comptador de resultats.
- Visualització del detall de la recepta seleccionada.
- Missatge informatiu quan no hi ha resultats.

## Accessibilitat i disseny responsive

- Enllaç de salt al contingut principal.
- Focus visible en la navegació amb teclat.
- Etiquetes associades als camps del formulari.
- Ús de `aria-live`, `role="status"` i `role="alert"`.
- Disseny adaptable a pantalles petites amb punts de ruptura de 600 px.

## Proves

Per executar les proves unitàries:

```bash
ng test
```
