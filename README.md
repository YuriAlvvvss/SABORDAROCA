# Sabor da Roça

Landing page institucional e estática da marca Sabor da Roça, criada para apresentar o negócio, fortalecer a presença online e direcionar o cliente para contato direto via WhatsApp, Instagram e e-mail.

## Estado atual do projeto

O projeto já está em um estado funcional de site institucional responsivo, com:

- estrutura HTML semântica e acessível;
- layout visual rústico/sertanejo em tons quentes;
- navegação responsiva com menu mobile;
- carrossel de imagens com navegação por teclado, clique e swipe em dispositivos touch;
- suporte para redução de movimento e foco visível;
- SEO básico para busca e redes sociais;
- integração com PWA via manifest e Service Worker;
- fallback offline para páginas e imagens;
- dados estruturados em JSON-LD para LocalBusiness;
- botões de contato com WhatsApp, Instagram e e-mail.

Este projeto não inclui e-commerce, login, backend, banco de dados ou checkout. Ele funciona como uma vitrine digital para o negócio local.

## Informações do negócio

- Nome: Sabor da Roça
- Endereço: R. Barone Mercadante, 60 - Rio Pequeno, São Paulo - SP, 05399-010
- WhatsApp: +55 11 92134-7467
- Instagram: @saboor_da_roca
- E-mail: sabordarocaca@gmail.com
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
├── css/
│   └── style.css          # Estilos completos do layout
├── js/
│   └── script.js          # Interações: menu, carrossel, observadores, ano automático
├── sw.js                  # Service Worker para cache offline e fallback
├── manifest.json          # Configuração da aplicação web progressiva (PWA)
├── _headers               # Cabeçalhos de segurança para Cloudflare Pages
├── assets/
│   ├── favicon.png        # Favicon do site
│   ├── icon-192.png       # Ícone PWA 192x192
│   ├── icon-512.png       # Ícone PWA 512x512
│   └── images/
│       ├── foto1.webp
│       ├── foto2.webp
│       ├── foto3.webp
│       ├── foto4.webp
│       ├── foto5.webp
│       ├── foto6.webp
│       ├── foto7.webp
│       ├── foto8.webp
│       └── sobre.webp
├── sitemap.xml            # Sitemap para SEO
├── robots.txt             # Orientações para crawlers
├── README.md              # Documentação do projeto
└── .gitignore             # Arquivos ignorados pelo Git
```

## Tecnologias utilizadas

- HTML5 semântico
- CSS3 moderno com variáveis, responsividade e suporte a motion reduction
- JavaScript vanilla sem dependências externas
- JSON-LD para dados estruturados do negócio
- Metadata SEO para Open Graph e Twitter Cards
- PWA com manifest e Service Worker
- Arquivo `_headers` para hardening em Cloudflare Pages

## Funcionalidades implementadas

- Header fixo com navegação principal
- Menu mobile com botão hambúrguer e controle de foco
- Hero section com CTA para WhatsApp e Instagram
- Seções de destaques, produtos, sobre, depoimentos, FAQ e contato
- Carrossel com navegação por botões, teclado e swipe
- Auto-play com pausa em hover/foco
- Observação de interseção para revelar elementos e marcar link ativo
- Ano automático no rodapé
- Fallback de imagem em caso de erro de carregamento
- Offline cache para página e ativos principais
- Fallback HTML para página offline
- Meta tags e SEO de marca para compartilhamento em redes sociais

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

Abra o arquivo `index.html` diretamente no navegador.

Se quiser testar em um servidor local, pode usar qualquer servidor simples, por exemplo:

```bash
python -m http.server 8000
```

Depois acesse:

```text
http://localhost:8000
```

## Publicação e deploy

O projeto já está preparado para publicação estática em hospedagens como GitHub Pages ou Cloudflare Pages.

### GitHub Pages

A estrutura está pronta para ser publicada em um repositório do GitHub Pages. A URL canônica configurada no projeto é:

```text
https://yurialvvvss.github.io/SABORDAROCA/
```

### Cloudflare Pages

O arquivo `_headers` está configurado para funcionar em Cloudflare Pages e inclui cabeçalhos de segurança e cache. Em GitHub Pages, esses cabeçalhos não são aplicados pela plataforma.

## SEO e acessibilidade

O projeto já implementa alguns pontos importantes de otimização e qualidade de experiência:

- meta description e título otimizados
- canonical URL
- Open Graph e Twitter Cards
- `robots.txt` e `sitemap.xml`
- JSON-LD LocalBusiness
- skip link para navegação
- foco visível em elementos interativos
- contraste e textos legíveis
- suporte a `prefers-reduced-motion`
- ARIA labels em elementos relevantes
- alt text descritivo nas imagens

## PWA

O projeto conta com:

- `manifest.json`
- `sw.js`
- ícones para 192x192 e 512x512
- suporte para instalação em dispositivos móveis
- cache para página principal e ativos estáticos
- fallback offline para o site

## Observações importantes

A versão atual usa imagens ilustrativas e temporárias para compor a identidade visual. Elas servem como placeholder visual e devem ser substituídas por fotografias reais da marca quando estiverem disponíveis.

Também vale confirmar antes da publicação final:

- se o WhatsApp está correto e ativo;
- se o Instagram e e-mail são oficiais;
- se o endereço e horários são os do estabelecimento;
- se as imagens e textos refletem a realidade do negócio;
- se a URL canônica e os metadados seguem a identidade real da marca.

## Licença

Todos os direitos reservados © Sabor da Roça.

