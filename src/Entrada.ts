// Adapta eventos do teclado para dois conjuntos de comandos. O domínio recebe esses conjuntos e
// pode ser testado sem o navegador.

import type { Comandos } from "./tipos.ts";

// Teclas mantidas servem ao movimento contínuo. Novas teclas servem a ações únicas.
export class Entrada {
  private ativas = new Set<string>();
  private novas = new Set<string>();
  private readonly usadas = new Set([
    "arrowup", "arrowdown", "arrowleft", "arrowright", "w", "a", "s", "d", "x", " ", "r",
  ]);

  constructor() {
    window.addEventListener("keydown", (evento) => {
      const tecla = evento.key.toLowerCase();
      if (!this.usadas.has(tecla) || evento.ctrlKey || evento.altKey || evento.metaKey) return;
      // Espaço sobre um botão deve conservar a ação padrão de ativá-lo.
      if (tecla === " " && evento.target instanceof HTMLButtonElement) return;
      evento.preventDefault();
      if (!this.ativas.has(tecla)) this.novas.add(tecla);
      this.ativas.add(tecla);
    });
    window.addEventListener("keyup", (evento) => this.ativas.delete(evento.key.toLowerCase()));
    window.addEventListener("blur", () => this.limpar());
  }

  // Uma tecla nova vale por um quadro. A tecla ativa permanece no conjunto enquanto estiver
  // pressionada.
  ler(): Comandos {
    const leitura = { ativas: this.ativas, novas: this.novas };
    this.novas = new Set<string>();
    return leitura;
  }

  limpar(): void {
    this.ativas.clear();
    this.novas.clear();
  }
}
