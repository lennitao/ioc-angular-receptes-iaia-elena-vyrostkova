# Models TypeScript i adaptador de receptes

## Fitxers

- **Models (`ReceptaApiResponse` i `Recepta`):** `src/app/models/recepta.model.ts`
- **Adaptador (`adaptarReceptaApi` i `adaptarReceptesApi`):** `src/app/adaptadors/recepta.adaptador.ts`

## Taula de mapatge API -> Model intern

| Camp API (`ReceptaApiResponse`) | Tipus API          | Camp intern (`Recepta`) | Tipus intern       | Normalització aplicada                                                                                                       |
| :------------------------------ | :----------------- | :---------------------- | :----------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `id`                            | `string \| number` | `id`                    | `string`           | Conversió segura a cadena de text (`String(api.id)`).                                                                        |
| `titol`                         | `string`           | `titol`                 | `string`           | Neteja d'espais amb `trim()` i valor per defecte si arriba buit.                                                             |
| `descripcio`                    | `string`           | `descripcio`            | `string`           | Neteja d'espais amb `trim()` i text alternatiu si manca.                                                                     |
| `categoria`                     | `string`           | `categoria`             | `CategoriaRecepta` | Normalització de majúscules/minúscules al tipus tancat (`Primers plats`, `Segons plats`, `Postres`, `Aperitius`, `Begudes`). |
| `estat`                         | `string`           | `estat`                 | `EstatPublicacio`  | Mapatge a estat intern (`Publicada`, `Esborrany`, `Revisada`) amb `Publicada` per defecte.                                   |
| `data_actualitzacio`            | `string`           | `dataActualitzacio`     | `string`           | Reanomenat a _camelCase_ i validació de format ISO `YYYY-MM-DD`.                                                             |
| `valoracio`                     | `number \| string` | `valoracio`             | `number`           | Conversió numèrica segura (`Number.isFinite`) acotada entre `0` i `5`.                                                       |
| `popular`                       | `boolean`          | `destacada`             | `boolean`          | Mapatge booleà explícit (`api.popular === true`).                                                                            |
