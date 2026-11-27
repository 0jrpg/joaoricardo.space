# joaoricardo.space

Portfólio de **João Ricardo** — React + TypeScript + Vite, sem bibliotecas de animação (tudo em CSS + hooks próprios).

## Rodando

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # typecheck + build de produção
npm run preview  # testar o build
```

## Como a página abre

1. **Skeleton screen (3s)** — esqueleto que imita o layout real, com brilho (shimmer), barra de progresso e contador de 0 a 100%.
2. **Logo** — anel desenhado em SVG, "JR" surgindo e o nome do site.
3. **Cortina** — 7 faixas sobem em sequência e, ao mesmo tempo, o conteúdo começa a animar.

Os tempos ficam em `src/data/site.ts` (`BOOT`). Para mudar a duração do skeleton, altere só `BOOT.skeleton`.

## Estrutura

```
src/
├─ boot/          abertura: BootProvider (linha do tempo), Boot (overlay), Skeleton
├─ components/
│  ├─ fx/         Starfield (canvas), CursorGlow, BackgroundFX, ScrollProgress, BackToTop
│  ├─ layout/     Header, MobileMenu, LangSwitch, SideSocial, Footer
│  ├─ sections/   Hero, Marquee, Stats, Stack, Projects, Alpha, Contact
│  └─ ui/         Reveal, SplitText, Title, Card, Button, Magnetic, Icons
├─ data/          site (links/tempos), projects, stack  ← edite aqui para mudar o conteúdo
├─ hooks/         useInView, useTyped, useTypewriter, useCountUp, useActiveSection, useReducedMotion
├─ i18n/          dictionary (PT/EN) + provider
├─ lib/           photo (foto com fallback), css (helper de custom properties)
└─ styles/        tokens, base, background, boot, layout, hero, sections, motion
```

## Animações

Fundo: céu estrelado em canvas (parallax, constelações perto do cursor, estrelas cadentes), aurora flutuante, grade em movimento, brilho que segue o mouse, granulado.
Entrada: letras que sobem uma a uma, texto digitado em loop, revelações ao rolar (6 variações), contadores, chips em cascata.
Interação: cards com spotlight + inclinação 3D + borda de gradiente girando, botões magnéticos com ripple e brilho, partículas no clique, menu mobile em círculo, cabeçalho que esconde/mostra, indicador deslizante de seção, barra de progresso do scroll.

Quem tem `prefers-reduced-motion` ativado no sistema recebe a versão sem movimento.

## Conteúdo

- **Projetos** → `src/data/projects.ts`
- **Tecnologias** → `src/data/stack.ts`
- **Textos PT/EN** → `src/i18n/dictionary.ts`
- **Foto** → `src/lib/photo.ts` (CDN primeiro; se falhar, usa `src/images`; por último, as iniciais "JR")

## CDN (`https://cdn.files.joaoricardo.space/<arquivo>`)

Todos os arquivos estáticos vêm do CDN. A base está em `src/data/site.ts` (`CDN` / `cdn()`). Arquivos esperados na raiz do CDN:

`joao-ricardo.jpeg`, `favicon.svg`, `grain.svg`, `flag-br.svg`, `flag-us.svg`,
`icon-github.svg`, `icon-mail.svg`, `icon-arrow.svg`, `icon-arrow-up.svg`, `icon-copy.svg`,
`icon-check.svg`, `icon-send.svg`, `icon-globe.svg`, `icon-database.svg`, `icon-code.svg`

Os ícones `icon-*.svg` são usados como **máscara CSS** (para herdar a cor do texto), e navegadores exigem CORS para isso.
O CDN precisa responder com `Access-Control-Allow-Origin: *` (ou `https://joaoricardo.space`).

