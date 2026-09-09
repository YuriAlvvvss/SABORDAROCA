# Sabor da Roça

Landing page institucional e estática da marca Sabor da Roça, criada para apresentar o negócio, fortalecer a presença online e direcionar o cliente para contato direto via WhatsApp, Instagram e Google Maps.

## Estado atual do projeto

Site institucional responsivo e funcional, com:

- estrutura HTML semântica e acessível;
- layout visual rústico/sertanejo em tons quentes;
- navegação responsiva com menu mobile;
- carrossel de imagens com navegação por teclado, clique e swipe em dispositivos touch;
- suporte para redução de movimento e foco visível;
- SEO com domínio próprio (`sabordaroca.me`), canonical, Open Graph e JSON-LD;
- imagens otimizadas (13,9 MB → ~1 MB) com LCP priorizado;
- integração com PWA via manifest e Service Worker;
- fallback offline para páginas e imagens;
- dados estruturados em JSON-LD para LocalBusiness;
- botões de contato com WhatsApp, Instagram e Maps;
- CTA de avaliação no Google;
- cabeçalhos de segurança e cache via `_headers` (Cloudflare Pages).

Este projeto não inclui e-commerce, login, backend, banco de dados ou checkout. Ele funciona como uma vitrine digital para o negócio local.

## Informações do negócio

- Nome: Sabor da Roça
- Endereço: R. Barone Mercadante, 60 - Rio Pequeno, São Paulo - SP, 05399-010
- WhatsApp: +55 11 92134-7467
- Instagram: @saboor_da_roca
- E-mail: sabordarocaca@gmail.com (reserva — não exibido no site)
- Horário de funcionamento:
  - Segunda a sábado: 09:00 às 21:00
  - Domingo: 09:00 às 14:00
- Formas de pagamento: PIX, cartão de crédito/débito, vale-alimentação/refeição e dinheiro
- Retirada: no balcão, mediante pedido pelo WhatsApp

## Objetivo do site

O objetivo principal é transmitir a identidade da marca, apresentar os diferenciais do negócio e facilitar o contato do cliente com a loja para pedidos, dúvidas e visitas.

## Estrutura do projeto

```text
SABORDAROCA/
├── index.html              # Página principal do site
├── 404.html                # Página de erro com identidade + CTA (noindex)
├── _redirects              # www -> apex 301 (Cloudflare Pages)
├── css/
│   └── style.css          # Estilos completos do layout + banner LGPD
├── js/
│   └── script.js          # Interações: menu, carrossel, observadores, ano automático, LGPD
├── sw.js                  # Service Worker para cache offline e fallback (v5)
├── manifest.json          # PWA: start_url/scope /, sem orientation travada
├── _headers               # Cabeçalhos de segurança e cache (Cloudflare Pages)
├── CNAME                  # Domínio próprio: sabordaroca.me
├── assets/
│   ├── favicon.png        # Favicon 64x64
│   ├── icon-192.png       # Ícone PWA 192x192 (+ apple-touch-icon)
│   ├── icon-512.png       # Ícone PWA 512x512 (purpose any, otimizado)
│   ├── icon-maskable-512.png # Ícone maskable com padding
│   ├── og-cover.jpg       # OG/Twitter 1200x630 (a partir de foto6)
│   └── images/
│       ├── foto1.webp     # Carrossel (eager + fetchpriority high)
│       ├── foto2.webp
│       ├── foto3.webp
│       ├── foto4.webp
│       ├── foto5.webp
│       ├── foto6.webp
│       ├── foto7.webp
│       ├── foto8.webp
│       ├── foto9.webp
│       ├── foto10.webp
│       ├── foto11.webp
│       └── sobre.webp     # Seção sobre (533x800, lazy)
├── sitemap.xml            # Sitemap para SEO (sabordaroca.me)
├── robots.txt             # Orientações para crawlers
├── README.md              # Documentação do projeto
└── .gitignore             # Arquivos ignorados pelo Git
```

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 moderno com variáveis, responsividade e suporte a motion reduction
- JavaScript vanilla (código próprio, sem framework)
- JSON-LD para dados estruturados do negócio
- Metadata SEO para Open Graph e Twitter Cards
- PWA com manifest e Service Worker
- Arquivo `_headers` para hardening e cache em Cloudflare Pages
- Analytics: só Simple Analytics (anônimo, sem cookies, sem banner)

## Funcionalidades implementadas

- Header fixo com navegação principal
- Menu mobile com botão hambúrguer e controle de foco
- Hero section com CTA para WhatsApp e Instagram
- Seções de destaques, produtos, sobre, depoimentos, FAQ e contato
- Carrossel com navegação por botões, teclado e swipe
- Auto-play com pausa em hover/foco + botão pausar explícito (WCAG 2.2.2), live region e `aria-hidden/inert` nos slides
- Sem banner de cookies (sem GA, sem tracking pessoal)
- Primeira imagem do carrossel com `loading=eager` + `fetchpriority=high`
- Observação de interseção para revelar elementos e marcar link ativo
- Ano automático no rodapé
- Fallback de imagem em caso de erro de carregamento
- Offline cache para página e ativos principais
- Fallback HTML para página offline
- Meta tags e SEO de marca para compartilhamento em redes sociais
- Botão "Avalie-nos no Google" (link de review)
- Cards de horário e endereço com link para Google Maps

## Seções do site

- Início
- Destaques
- Especiais
- Sobre
- Depoimentos
- FAQ
- Contato
- Footer

## Como visualizar localmente

Não abra o `index.html` com duplo clique (`file://` quebra o Service Worker e caminhos relativos).

Use um servidor local na raiz do projeto:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Publicação e deploy

Domínio oficial: `https://sabordaroca.me/` (via arquivo `CNAME`).

### GitHub Pages (deploy principal)

Deploy padrão via GitHub Pages com domínio próprio. A URL canônica configurada no projeto é:

```text
https://sabordaroca.me/
```

Como o GitHub Pages não processa o arquivo `_headers`, as regras de segurança/cache ali definidas não são aplicadas por lá. O que vale no GitHub Pages é a camada de proteção dentro do código e as boas práticas de configuração do site.

### Cloudflare Pages (opcional)

O arquivo `_headers` é aplicado automaticamente no Cloudflare Pages e inclui hardening (CSP, HSTS, X-Frame-Options, etc.) e cache avançado (`/assets/` e `*.webp` imutáveis, `sw.js` sem cache). Recomendado se quiser a proteção completa descrita abaixo.

## SEO e acessibilidade

Otimizações e qualidade de experiência implementadas:

- meta description e título otimizados
- canonical URL para `https://sabordaroca.me/`
- Open Graph e Twitter Cards com imagem absoluta do domínio próprio
- `robots.txt` e `sitemap.xml` apontando para `sabordaroca.me`
- JSON-LD LocalBusiness com `url`, `image`, endereço, telefone e horários
- skip link para navegação
- foco visível em elementos interativos
- contraste e textos legíveis
- suporte a `prefers-reduced-motion`
- ARIA labels em elementos relevantes
- alt text descritivo nas imagens (carrossel + sobre)

## Performance

- Imagens WebP otimizadas: ~13,9 MB → ~1 MB total
  - `sobre.webp`: 1899 KB → ~37 KB (533x800, q72)
  - `foto1–11.webp`: 217–434 KB cada → 17–59 KB cada (máx 800px, q72)
  - `favicon/icon-192/icon-512`: 2863 KB cada → 8 KB / 69 KB / 476 KB (dimensões corretas)
- Removido `preload` indevido do `sobre.webp` (abaixo da dobra)
- `foto1.webp` com `eager` + `fetchpriority="high"`, demais com `lazy`
- `width`/`height` declarados para evitar CLS
- CSS crítico inline + `apple-touch-icon` reaproveitando `icon-192.png`

## PWA

O projeto conta com:

- `manifest.json` (nome, descrição, `lang: pt-BR`, `start_url/scope: /`, sem `orientation` travada, ícones 64/192/512 any + maskable separado)
- `sw.js` v5 (network-first para HTML, stale-while-revalidate para ativos, fallback SVG para imagens, precache de `404.html` + `og-cover.jpg`)
- ícones para 64x64 (favicon), 192x192 e 512x512 + `icon-maskable-512.png` com safe-zone
- `apple-touch-icon` para iOS + `mobile-web-app-capable`
- suporte para instalação em dispositivos móveis
- cache para página principal e ativos estáticos
- fallback offline para o site

## Analytics

- Só Simple Analytics (`scripts.simpleanalyticscdn.com`) no rodapé: contagem anônima, sem cookies, sem banner
- Google Analytics removido de propósito em 09/09/2026: overkill para vitrine local, exigia banner LGPD e pesava o site
- CSP liberando só Simple + WhatsApp/Instagram/Maps

## Segurança (`_headers`)

Aplicado no Cloudflare Pages (ignorado no GitHub Pages):

- `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `frame-ancestors 'none'`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Strict-Transport-Security` com preload
- `Content-Security-Policy` restritiva com exceção apenas para Simple Analytics + WhatsApp/Instagram/Maps
- Sem `COOP`/`COEP`/`CORP` (removidos de propósito — quebravam os scripts externos sem ganho real para vitrine estática)

## Observações importantes

As imagens atuais são fotografias reais da Sabor da Roça e já estão sendo utilizadas para compor a identidade visual do projeto.

Mesmo assim, vale confirmar antes da publicação final:

- se o WhatsApp está correto e ativo;
- Instagram mantido como `saboor_da_roca` por decisão do dono em 09/09/2026 (não alterar sem confirmar);
- se o endereço e horários são os do estabelecimento;
- se as imagens e textos refletem a realidade do negócio;
- se a URL canônica e os metadados seguem a identidade real da marca.

## Licença

Todos os direitos reservados © Sabor da Roça.
