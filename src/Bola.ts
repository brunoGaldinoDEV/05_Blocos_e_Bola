import { limitar } from "./tipos.ts";

export const LARGURA = 600;
export const ALTURA = 410;


export interface IBola {
  x: number;
  y: number;
  largura: number;
  altura: number;
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
