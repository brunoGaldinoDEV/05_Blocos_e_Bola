export const PLANTA = [
  "22222222",
  "11111111",
  "11111111",
] as const;

export function montarBlocos() {
  return PLANTA.flatMap((linha, fila) => [...linha].flatMap((tipo, coluna) =>
    tipo === "." ? [] : [{
      area: { x: 26 + coluna * 69, y: 48 + fila * 27, largura: 64, altura: 20 },
      resistencia: Number(tipo),
    }],
  ));
}
