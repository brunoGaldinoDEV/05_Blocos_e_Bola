// Contratos entre teclado, partida e tela. Os tipos documentam os dados esperados e são
// verificados na compilação.

export interface Comandos {
  readonly ativas: ReadonlySet<string>;
  readonly novas: ReadonlySet<string>;
}

export interface EstadoGeral {
  situacao: "protótipo" | "em jogo" | "vitória" | "derrota" | "encerrado";
  mensagem: string;
  indicadores: ReadonlyArray<readonly [string, string | number]>;
}

export interface FichaJogo {
  titulo: string;
  referencia: string;
  descricao: string;
  largura: number;
  altura: number;
  cor: string;
  controles: ReadonlyArray<readonly [string, string]>;
}

export function limitar(valor: number, minimo: number, maximo: number): number {
  return Math.min(maximo, Math.max(minimo, valor));
}

export function acionada(teclas: ReadonlySet<string>, ...opcoes: string[]): boolean {
  return opcoes.some((tecla) => teclas.has(tecla));
}
