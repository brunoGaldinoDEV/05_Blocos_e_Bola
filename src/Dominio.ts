import { limitar } from "./tipos.ts";

export const LARGURA = 600;
export const ALTURA = 410;
export const RAIO = 7;
export const PLANTA = [
  "22222222",
  "11111111",
  "11111111",
] as const;

export interface Retangulo {
  x: number;
  y: number;
  largura: number;
  altura: number;
}

export interface IBola {
  x: number;
  y: number;
  largura: number;
  altura: number;
}

export class Raquete {
  private x = LARGURA / 2 - 48;

  mover(direcao: number, dt: number): void {
    this.x = limitar(this.x + direcao * 420 * dt, 0, LARGURA - 96);
  }

  get area(): Retangulo {
    return { x: this.x, y: 374, largura: 96, altura: 12 };
  }
  get areaBoll(): IBola {
    return {x: this.x, y:100, largura: 0, altura: 12 }
  }
}
export class Bola {
  public x = LARGURA / 2;
  public y = ALTURA - 43;



    moverbola(direcao: number, dt: number): void {
      
      this.x = limitar(this.x + direcao * 420 * dt, 0, LARGURA );
      this.y = limitar(this.y + direcao * -420 * dt, 0, ALTURA );
      if(this.x >= LARGURA ){
          this.x = limitar(this.x + -direcao * -420 * dt, 0, LARGURA );
          this.y = limitar(this.y + direcao * 420 * dt, 0, ALTURA );
      }


  }
  

  get area(): IBola {
    return { x: this.x, y: this.y, largura: 90, altura: 12 };
  }
}


export function montarBlocos() {
  return PLANTA.flatMap((linha, fila) => [...linha].flatMap((tipo, coluna) =>
    tipo === "." ? [] : [{
      area: { x: 26 + coluna * 69, y: 48 + fila * 27, largura: 64, altura: 20 },
      resistencia: Number(tipo),
    }],
  ));
}
