export type CategoriaRecepta =
  'Primers plats' | 'Segons plats' | 'Postres' | 'Aperitius' | 'Begudes';

export interface Recepta {
  id: number;
  titol: string;
  descripcio: string;
  categoria: CategoriaRecepta;
  dataActualitzacio: string;
  valoracio: number;
  destacada?: boolean;
}
