# Gabbe — site

Site da Gabbe (Gabriela Sette, Designer de Marcas).

Feito com Vite + React, GSAP, Motion e componentes do [React Bits](https://reactbits.dev) (`src/reactbits/`).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera o site estático em dist/
```

## Onde está cada coisa

- `src/data.js`: textos, serviços, projetos e paletas (HEX). RGB e CMYK são calculados.
- `src/components/`: abertura (`Intro`), topo (`Hero`), projetos com paletas (`Projects`), demais seções (`Sections`), símbolo em SVG (`Mark`), cursor.
- `src/styles.css`: cores da marca no `:root` e todo o visual.
- `public/img/`: logo, foto e mockups dos projetos.
