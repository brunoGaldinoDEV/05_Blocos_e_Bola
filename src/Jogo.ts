// Base da atividade. Este objeto coordena o protótipo. Continue pelas etapas do card do jogo.

import { montarBlocos } from "./Dominio.ts";
import {Raquete} from "./Retangulo.ts";
import {Bola} from "./Bola";
import type { Cena } from "./telaDoJogo.ts";
import { acionada, type Comandos, type EstadoGeral } from "./tipos.ts";

let status = true;
export class Jogo {
  private raquete = new Raquete();
  private bola = new Bola();
 
  reiniciar(): void {
    this.raquete = new Raquete();
    this.bola = new Bola();
    status = true;
  }

  atualizar(dt: number, comandos: Comandos): void {
    const esquerda = acionada(comandos.ativas, "arrowleft", "a");
    const direita = acionada(comandos.ativas, "arrowright", "d");
    const espaco = acionada(comandos.ativas, " ");
    if(!espaco) this.bola.mover(status,Number(direita) - Number(esquerda), dt);
    else{ 
      this.iniciar(dt);
      status = false;
    }
    this.raquete.mover(Number(direita) - Number(esquerda), dt);
    // TODO 1. Guardar a bola em um objeto e dar velocidade ao sacar.
    // TODO 2. Detectar rebotes e chamar o mesmo método de impacto para os dois blocos.
    // TODO 3. Atualizar bolas disponíveis, pontos e resultado.
  }
  iniciar(dt: number): void{
    this.bola.lanca(Number(0.5),dt) 
  };
  obterEstado(): EstadoGeral & Cena {
    const raquete = this.raquete.area;
    const bola = this.bola;
    return {
      situacao: "protótipo",
      mensagem: "Teste a raquete. O próximo passo é programar o saque da bola.",
      indicadores: [["Blocos no painel", montarBlocos().length]],
      raquete,
      bola,
      blocos: montarBlocos(),
    };
  }
}
