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

Os tempos ficam em `src/data/site.ts` (`BOOT`; a troca de idioma usa `LANG_FX`). Para mudar a duração do skeleton, altere só `BOOT.skeleton`.

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
├─ i18n/          dictionary (PT/EN/ES) + provider
├─ lib/           photo (foto com fallback), css (helper de custom properties)
└─ styles/        tokens, base, background, boot, layout, hero, sections, motion
```

## Animações

Fundo: céu estrelado em canvas (parallax, constelações perto do cursor, estrelas cadentes), aurora flutuante, grade em movimento, brilho que segue o mouse, granulado.
Entrada: letras que sobem uma a uma, texto digitado em loop, revelações ao rolar (6 variações), contadores, chips em cascata.
Troca de idioma (PT/EN/ES): cortina de 5 faixas cobre a tela, mostra bandeira e nome do idioma, o texto troca por trás e as seções animam de novo. O formulário de contato mantém o que foi digitado.
Interação: cards com spotlight + inclinação 3D + borda de gradiente girando, botões magnéticos com ripple e brilho, partículas no clique, menu mobile em círculo, cabeçalho que esconde/mostra, indicador deslizante de seção, barra de progresso do scroll.

Quem tem `prefers-reduced-motion` ativado no sistema recebe a versão sem movimento.

## Conteúdo

- **Projetos** → `src/data/projects.ts`
- **Tecnologias** → `src/data/stack.ts`
- **Textos PT/EN/ES** → `src/i18n/dictionary.ts`
- **Foto** → `src/lib/photo.ts` (CDN primeiro; se falhar, usa `src/images`; por último, as iniciais "JR")

## CDN (`https://cdn.files.joaoricardo.space/<arquivo>`)

Todos os arquivos estáticos vêm do CDN. A base está em `src/data/site.ts` (`CDN` / `cdn()`); as fontes ficam em `src/styles/fonts.css`; o favicon e o preload das fontes, em `index.html`.
Os arquivos ficam **na raiz** do CDN (sem pastas):

| Tipo | Arquivos |
|---|---|
| Foto | `joao-ricardo.jpeg` |
| Site | `favicon.svg`, `grain.svg` |
| Bandeiras | `flag-br.svg`, `flag-us.svg`, `flag-es.svg` |
| Ícones | `icon-github.svg`, `icon-mail.svg`, `icon-arrow.svg`, `icon-arrow-up.svg`, `icon-copy.svg`, `icon-check.svg`, `icon-send.svg`, `icon-globe.svg`, `icon-database.svg`, `icon-code.svg` |
| Fontes (Inter) | `inter-400.woff`, `inter-500.woff`, `inter-600.woff`, `inter-700.woff` |
| Fontes (JetBrains Mono) | `jetbrains-mono-400.woff`, `jetbrains-mono-700.woff` |
| Fontes (Space Grotesk) | `space-grotesk-500.woff2`, `space-grotesk-600.woff2`, `space-grotesk-700.woff2` → gere com `node scripts/baixar-space-grotesk.mjs` (pasta `cdn-fonts/`) |

### CORS (obrigatório para as fontes)

Navegadores só carregam **fontes** de outro domínio se o CDN enviar `Access-Control-Allow-Origin`. Sem isso o site usa a fonte do sistema (continua funcionando, só muda a aparência). Imagens e ícones (`<img>`) não precisam disso.

Next.js (`next.config.js` do projeto do CDN):

```js
module.exports = {
  async headers() {
    return [{ source: '/:path*', headers: [{ key: 'Access-Control-Allow-Origin', value: '*' }] }]
  },
}
```

Ou, na Vercel (`vercel.json`):

```json
{ "headers": [{ "source": "/(.*)", "headers": [{ "key": "Access-Control-Allow-Origin", "value": "*" }] }] }
```

Confira também os tipos de arquivo servidos: `.svg` → `image/svg+xml`, `.woff` → `font/woff`, `.woff2` → `font/woff2`.

### O que continua fora do CDN

O JS e o CSS gerados pelo build (nomes com hash que mudam a cada deploy; e `<script type="module">` também exige CORS) e o `index.html` ficam na Vercel. Dois SVGs animados ficam inline de propósito: o anel do botão "voltar ao topo" e o logo da abertura (o JS/CSS anima o traço deles).
