import { limitar } from "./tipos.ts";


export const LARGURA = 600;
export const ALTURA = 410;


export interface IBola {
  x: number;
  y: number;
  largura: number;
  altura: number;
  Status: boolean;
}

export class Bola {
  public x = LARGURA / 2 ;
  public y = ALTURA - 43;
    //Status para ver se o jogo iniciou ou não
    mover(Status: boolean,direcao: number, dt: number): void {

      if(Status){
         this.x = limitar(this.x + direcao * 420 * dt, 0, LARGURA);
        if(this.x <= 40){
          this.x = 40;
        }
        if(this.x >= 560){
          this.x = 560;
        }
     }
    }
  lanca( direcao: number, dt: number): void {
    let xdir = 1;
    let ydir = 1;

    if(this.x <= 500){
      xdir = -1;      
    }
    if(this.y >= 0){
      ydir = -1;
    }
    this.x = limitar(this.x * xdir + direcao * 420 * dt, 0, LARGURA );
    this.y = limitar(this.y * ydir + direcao * -420 * dt, 0, ALTURA );   
    
    setTimeout(() => {
        this.lanca(direcao, dt);
       },60) 
  }

  Status = true;
  get area(): IBola {
      return { x: this.x, y: this.y, largura: 90, altura: 12,Status: this.Status};
  }
}
