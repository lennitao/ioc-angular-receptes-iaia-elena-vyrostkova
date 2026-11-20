export type CategoriaRecepta =
  'Primers plats' | 'Segons plats' | 'Postres' | 'Aperitius' | 'Begudes';

export type EstatPublicacio = 'Publicada' | 'Revisada' | 'Esborrany';

/** Model intern utilitzat pels components de l'aplicació */
export interface Recepta {
  id: string;
  titol: string;
  descripcio: string;
  categoria: CategoriaRecepta;
  estat: EstatPublicacio;
  dataActualitzacio: string;
  valoracio: number;
  destacada?: boolean;
}

/** Estructura exacta que retorna l'API local (json-server) */
export interface ReceptaApiResponse {
  id: string | number;
  titol: string;
  descripcio?: string;
  categoria: string;
  estat?: string;
  data_actualitzacio?: string;
  valoracio?: number | string;
  popular?: boolean;
}

/** Dades necessàries per donar d'alta una recepta nova amb POST */
export type NovaRecepta = Pick<
  Recepta,
  'titol' | 'descripcio' | 'categoria' | 'valoracio' | 'destacada'
>;

/** Estats possibles del servei HTTP */
export type EstatServei = 'inicial' | 'carregant' | 'exit' | 'error';

export interface EstatReceptes {
  estat: EstatServei;
  receptes: Recepta[];
  error?: string;
}
