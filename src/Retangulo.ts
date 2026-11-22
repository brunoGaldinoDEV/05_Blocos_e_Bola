import { limitar } from "./tipos.ts";

export const LARGURA = 600;
export const ALTURA = 410;
export const RAIO = 7;

export interface Retangulo {
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
}