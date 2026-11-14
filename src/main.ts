// Ponto de entrada. A cada quadro, lê as teclas, atualiza o domínio e envia os dados da partida ao
// desenho.

import { Entrada } from "./Entrada.ts";
import { Jogo } from "./Jogo.ts";
import { ficha, desenhar } from "./telaDoJogo.ts";
import "./style.css";

function elemento(id: string): HTMLElement {
  const alvo = document.getElementById(id);
  if (!alvo) throw new Error("Elemento ausente: " + id);
  return alvo;
}

// new cria uma instância da classe Jogo. Essa instância guarda a partida entre os quadros.
const jogo = new Jogo();
const entrada = new Entrada();
const canvas = elemento("jogo") as HTMLCanvasElement;
canvas.width = ficha.largura;
canvas.height = ficha.altura;
const contexto = canvas.getContext("2d");
if (!contexto) throw new Error("Canvas 2D indisponível.");

document.title = ficha.titulo;
document.documentElement.style.setProperty("--accent", ficha.cor);
elemento("referencia").textContent = ficha.referencia;
elemento("titulo").textContent = ficha.titulo;
elemento("descricao").textContent = ficha.descricao;

function atualizarLista(id: string, dados: ReadonlyArray<readonly [string, string | number]>): void {
  const lista = elemento(id);
  const assinatura = JSON.stringify(dados);
  if (lista.dataset.assinatura === assinatura) return;
  lista.dataset.assinatura = assinatura;
  lista.replaceChildren();
  for (const [rotulo, valor] of dados) {
    const linha = document.createElement("div");
    const termo = document.createElement("dt");
    const dado = document.createElement("dd");
    termo.textContent = rotulo;
    dado.textContent = String(valor);
    linha.append(termo, dado);
    lista.append(linha);
  }
}

atualizarLista("controles", ficha.controles);
elemento("reiniciar").addEventListener("click", () => {
  jogo.reiniciar();
  entrada.limpar();
  canvas.focus();
});
canvas.tabIndex = 0;

let tempoAnterior: number | undefined;
// O navegador informa o tempo em milissegundos. Converta para segundos e limite o passo para
// evitar saltos após perder o foco.
function quadro(tempo: number): void {
  const dt = tempoAnterior === undefined ? 0 : Math.min((tempo - tempoAnterior) / 1000, 0.05);
  tempoAnterior = tempo;
  const comandos = entrada.ler();
  if (comandos.novas.has("r")) {
    jogo.reiniciar();
    entrada.limpar();
  } else {
    jogo.atualizar(dt, comandos);
  }
  // O desenho recebe os dados da partida. Ele pode mostrar posição, pontos e vidas sem alterar as
  // regras.
  const estado = jogo.obterEstado();
  desenhar(contexto!, estado);
  elemento("situacao").textContent = estado.situacao;
  const mensagem = elemento("mensagem");
  if (mensagem.textContent !== estado.mensagem) mensagem.textContent = estado.mensagem;
  atualizarLista("indicadores", estado.indicadores);
  requestAnimationFrame(quadro);
}

requestAnimationFrame(quadro);
