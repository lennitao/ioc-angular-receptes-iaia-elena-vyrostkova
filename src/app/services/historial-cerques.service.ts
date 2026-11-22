import { Injectable } from '@angular/core';
import { CategoriaRecepta } from '../models/recepta.model';

export interface CercaGuardada {
  cerca: string;
  categoria: CategoriaRecepta | '';
  dataHora: string;
}

@Injectable({
  providedIn: 'root',
})
export class HistorialCerquesService {
  private readonly CLAU_ULTIMA = 'receptes_iaia_ultima_cerca';
  private readonly CLAU_HISTORIAL = 'receptes_iaia_historial_cerques';
  private readonly MAX_HISTORIAL = 5;

  obtenirUltimaCerca(): CercaGuardada | null {
    try {
      const dades = localStorage.getItem(this.CLAU_ULTIMA);
      return dades ? (JSON.parse(dades) as CercaGuardada) : null;
    } catch {
      return null;
    }
  }

  obtenirHistorial(): CercaGuardada[] {
    try {
      const dades = localStorage.getItem(this.CLAU_HISTORIAL);
      const llista = dades ? (JSON.parse(dades) as CercaGuardada[]) : [];
      return Array.isArray(llista) ? llista : [];
    } catch {
      return [];
    }
  }

  desarCerca(cerca: string, categoria: CategoriaRecepta | ''): CercaGuardada[] {
    const neta = cerca.trim();
    const registre: CercaGuardada = {
      cerca: neta,
      categoria,
      dataHora: new Date().toLocaleTimeString('ca-ES', {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    try {
      localStorage.setItem(this.CLAU_ULTIMA, JSON.stringify(registre));

      if (!neta && !categoria) {
        return this.obtenirHistorial();
      }

      const actual = this.obtenirHistorial().filter(
        (item) =>
          !(
            item.cerca.toLocaleLowerCase('ca') === neta.toLocaleLowerCase('ca') &&
            item.categoria === categoria
          ),
      );

      const actualitzat = [registre, ...actual].slice(0, this.MAX_HISTORIAL);
      localStorage.setItem(this.CLAU_HISTORIAL, JSON.stringify(actualitzat));
      return actualitzat;
    } catch {
      return [];
    }
  }

  esborrarHistorial(): void {
    try {
      localStorage.removeItem(this.CLAU_ULTIMA);
      localStorage.removeItem(this.CLAU_HISTORIAL);
    } catch {
      // Ignorem errors d'emmagatzematge
    }
  }
}
