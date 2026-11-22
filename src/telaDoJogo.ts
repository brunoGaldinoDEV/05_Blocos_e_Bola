// Camada de apresentação. Use os dados recebidos para desenhar e informe os controles na ficha do
// jogo.


import type { Bola } from "./Bola.ts";
import type { IRetangulo } from "./Retangulo.ts";
import { ALTURA, LARGURA, RAIO } from "./Retangulo.ts";
import type { FichaJogo } from "./tipos.ts";

export const ficha: FichaJogo = {
  titulo: "Blocos e bola",
  referencia: "Inspirado em Breakout",
  descricao: "Controle a raquete, mantenha a bola em jogo e limpe o painel.",
  largura: LARGURA, altura: ALTURA, cor: "#ffc36b",
  controles: [["← → ou A D", "Mover raquete"], ["Espaço", "Sacar na versão final"], ["R", "Reiniciar"]],
};

export interface Cena {
  raquete: IRetangulo;
  bola: Bola;
  blocos: { area: IRetangulo; resistencia: number }[];
}

export function desenhar(ctx: CanvasRenderingContext2D, cena: Cena): void {
  ctx.fillStyle = "#131c2d";
  ctx.fillRect(0, 0, LARGURA, ALTURA);
  ctx.strokeStyle = "#2d405b";
  ctx.strokeRect(4, 4, LARGURA - 8, ALTURA - 8);
  for (const { area, resistencia } of cena.blocos) {
    ctx.fillStyle = resistencia === 2 ? "#f4a95f" : "#6cb9d2";
    ctx.fillRect(area.x, area.y, area.largura, area.altura);
    if (resistencia === 2) {
      ctx.fillStyle = "#76513d";
      ctx.fillRect(area.x + 5, area.y + 6, area.largura - 10, 3);
    }
  }
  const r = cena.raquete;
  ctx.fillStyle = "#b7e5ec";
  ctx.fillRect(r.x, r.y, r.largura, r.altura);
  ctx.fillStyle = "#fff2d7";
  ctx.beginPath();
  ctx.arc(cena.bola.x, cena.bola.y, RAIO, 0, Math.PI * 2);
  ctx.fill();
}
