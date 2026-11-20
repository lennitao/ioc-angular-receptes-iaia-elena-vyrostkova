import {
  CategoriaRecepta,
  EstatPublicacio,
  NovaRecepta,
  Recepta,
  ReceptaApiResponse,
} from '../models/recepta.model';

const CATEGORIES_MAP: Record<string, CategoriaRecepta> = {
  'primers plats': 'Primers plats',
  'segons plats': 'Segons plats',
  postres: 'Postres',
  aperitius: 'Aperitius',
  begudes: 'Begudes',
};

const ESTATS_MAP: Record<string, EstatPublicacio> = {
  publicada: 'Publicada',
  revisada: 'Revisada',
  esborrany: 'Esborrany',
};

function normalitzarCategoria(valor: string | undefined): CategoriaRecepta {
  const clau = (valor ?? '').trim().toLocaleLowerCase('ca');
  return CATEGORIES_MAP[clau] ?? 'Primers plats';
}

function normalitzarEstat(valor: string | undefined): EstatPublicacio {
  const clau = (valor ?? '').trim().toLocaleLowerCase('ca');
  return ESTATS_MAP[clau] ?? 'Publicada';
}

function normalitzarValoracio(valor: unknown): number {
  const num = Number(valor);
  if (!Number.isFinite(num)) return 0;
  return Math.min(5, Math.max(0, Number(num.toFixed(1))));
}

function normalitzarData(dataApi: string | undefined): string {
  const text = (dataApi ?? '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(text) ? text : new Date().toISOString().split('T')[0];
}

/** Transforma i normalitza un registre de l'API al model intern Recepta */
export function adaptarReceptaApi(api: ReceptaApiResponse): Recepta {
  return {
    id: String(api.id),
    titol: (api.titol ?? '').trim() || 'Recepta sense títol',
    descripcio: (api.descripcio ?? '').trim() || 'Sense descripció disponible.',
    categoria: normalitzarCategoria(api.categoria),
    estat: normalitzarEstat(api.estat),
    dataActualitzacio: normalitzarData(api.data_actualitzacio),
    valoracio: normalitzarValoracio(api.valoracio),
    destacada: api.popular === true,
  };
}

/** Transforma una llista de receptes de l'API */
export function adaptarReceptesApi(llistaApi: ReceptaApiResponse[]): Recepta[] {
  return Array.isArray(llistaApi) ? llistaApi.map(adaptarReceptaApi) : [];
}

/** Prepara una recepta nova per enviar-la a l'API amb POST */
export function prepararReceptaApi(nova: NovaRecepta): Omit<ReceptaApiResponse, 'id'> {
  return {
    titol: nova.titol.trim(),
    descripcio: nova.descripcio.trim(),
    categoria: nova.categoria,
    estat: 'publicada',
    data_actualitzacio: new Date().toISOString().split('T')[0],
    valoracio: normalitzarValoracio(nova.valoracio),
    popular: Boolean(nova.destacada),
  };
}
