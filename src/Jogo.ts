// Base da atividade. Este objeto coordena o protótipo. Continue pelas etapas do card do jogo.

import { montarBlocos, Raquete , Bola } from "./Dominio.ts";
import type { Cena } from "./telaDoJogo.ts";
import { acionada, type Comandos, type EstadoGeral } from "./tipos.ts";

export class Jogo {
  private raquete = new Raquete();
  private bola = new Bola();
 
  reiniciar(): void {
    this.raquete = new Raquete();
    this.bola = new Bola();
  }

  atualizar(dt: number, comandos: Comandos): void {
    const esquerda = acionada(comandos.ativas, "arrowleft", "a");
    const direita = acionada(comandos.ativas, "arrowright", "d");
    const espaco = acionada(comandos.ativas," ");
    this.raquete.mover(Number(direita) - Number(esquerda), dt);
    this.bola.moverbola(Number(0.5), dt)
    // TODO 1. Guardar a bola em um objeto e dar velocidade ao sacar.
    // TODO 2. Detectar rebotes e chamar o mesmo método de impacto para os dois blocos.
    // TODO 3. Atualizar bolas disponíveis, pontos e resultado.
  }

  obterEstado(): EstadoGeral & Cena {
    const raquete = this.raquete.area;
    const bola = this.bola.area;
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
