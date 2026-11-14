# Breakout em TypeScript

Limpar um painel com raquete e bola. A partida oferece três bolas. Uma queda consome uma bola e preserva os blocos restantes.

## Abrir no VS Code

Com Node.js e npm instalados, abra a pasta que contém `package.json`.

```bash
npm ci
npm run dev
```

Abra o endereço exibido no terminal. Rode `npm run build` para conferir a compilação.

**Controles.** ← → ou A e D mover · Espaço sacar · R reiniciar

## O que a base já faz

Raquete móvel, bola apoiada e painel com blocos de dois tipos.

Comecem por `src/Jogo.ts` e vejam também `src/Dominio.ts`.
As etapas do card indicam quais controles e regras ainda devem ser ligados.

## Metas das três noites

1. Rode a base e ajuste o painel em Dominio.ts. Faça a bola sair da raquete com Espaço, avançar a cada quadro e rebater nas laterais, no topo e na raquete.
2. Faça a bola rebater nos blocos. O comum quebra com um impacto e soma 10 pontos. O reforçado quebra no segundo e soma 20. Trate a queda e encerre com painel limpo ou sem bolas.
3. Teste os dois impactos em um bloco reforçado, a queda e o reinício. Apresente o placar e as duas respostas ao impacto.

**Decisão da equipe.** Ajustem a disposição dos blocos comuns e reforçados.

**Entrega.** No README final, incluam os integrantes, a decisão com sua justificativa, as classes, os testes observados e a contribuição de cada pessoa.

## Onde demonstrar orientação a objetos

- **Abstração.** Bola representa o objeto em movimento. Bloco reúne área e resistência.
- **Encapsulamento.** Mantenha a velocidade e a resistência privadas. Use métodos para rebater e receber impactos.
- **Herança.** Crie BlocoComum e BlocoReforcado a partir de Bloco.
- **Polimorfismo.** Chame receberImpacto pelo tipo Bloco. Cada classe decide quando o impacto vale pontos.

## Teste de aceite

O primeiro impacto no reforçado muda sua resistência. O segundo remove o bloco e soma 20.
