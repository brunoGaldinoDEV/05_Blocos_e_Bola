// Contratos entre teclado, partida e tela. Os tipos documentam os dados esperados e são
// verificados na compilação.

// BR ANOTAÇÃO: ??
export interface Comandos {
  readonly ativas: ReadonlySet<string>;
  readonly novas: ReadonlySet<string>;
}
// BR ANOTAÇÃO: Status do jogo
export interface EstadoGeral {
  situacao: "protótipo" | "em jogo" | "vitória" | "derrota" | "encerrado";
  mensagem: string;
  indicadores: ReadonlyArray<readonly [string, string | number]>;
}

// BR ANOTAÇÃO: ??
export interface FichaJogo {
  titulo: string;
  referencia: string;
  descricao: string;
  largura: number;
  altura: number;
  cor: string;
  controles: ReadonlyArray<readonly [string, string]>;
}

// BR ANOTAÇÃO: ??
export function limitar(valor: number, minimo: number, maximo: number): number {
  return Math.min(maximo, Math.max(minimo, valor));
}

//// BR ANOTAÇÃO: Verificando a tecla que foi acionada na função acionada 
export function acionada(teclas: ReadonlySet<string>, ...opcoes: string[]): boolean {
  return opcoes.some((tecla) => teclas.has(tecla));
}

