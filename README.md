# Sabor da Roça

Landing page institucional para a marca **Sabor da Roça**, um negócio local de produtos artesanais em Rio Pequeno, São Paulo/SP.

## Sobre

Site estático e responsivo, inspirado em estética rústica e sertaneja. O objetivo é apresentar a marca e direcionar o visitante para contato via Instagram e WhatsApp. Não há funcionalidades de e-commerce, carrinho, cadastro ou pagamento.

## Estrutura

```
sabor-da-roca/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── sw.js
├── manifest.json
├── _headers
├── assets/
│   ├── favicon.svg
│   ├── favicon.png
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
├── sitemap.xml
├── robots.txt
└── README.md
```

## Tecnologias

- HTML5 semântico com JSON-LD (LocalBusiness)
- CSS3 com variáveis, mobile-first, Critical CSS inline
- JavaScript vanilla (menu mobile, carrossel, Service Worker)
- PWA com manifest.json e Service Worker (cache offline)
- Nenhuma dependência externa

## Como visualizar

Abra o arquivo `index.html` diretamente no navegador.

Para publicar no GitHub Pages, publique a pasta do repositório e ative a branch `main` nas configurações de Pages.

## Antes de publicar

- [ ] Substituir `5511921347467` pelo número correto do WhatsApp (se necessário)
- [ ] Adicionar fotos em `assets/images/`: `hero.webp`, `destaque-01.webp`, `destaque-02.webp`, `destaque-03.webp`, `destaque-04.webp`, `sobre.webp`
- [ ] Ajustar textos dos cards de produtos conforme cardápio real
- [ ] Revisar frases e descrições
- [ ] Validar o HTML, o sitemap e os dados estruturados antes da publicação
- [ ] Testar navegação por teclado, menu mobile e contraste em celular

## Imagens

As imagens utilizadas nesta primeira versão são **ilustrativas e temporárias**. Elas servem apenas como referência visual para compor a identidade da página e devem ser substituídas por fotos reais da Sabor da Roça assim que estiverem disponíveis.

### Diretrizes

- As imagens atuais são genéricas e não representam produtos, locais ou pessoas reais da marca.
- Não afirmam, sugerem ou dão a entender que os alimentos, pratos, embalagens ou ambientes das imagens pertencem à Sabor da Roça.
- Não contêm marcas, logotipos ou embalagens comerciais reconhecíveis.
- Devem ser substituídas por fotografias próprias da marca.

### Arquivos esperados

| Arquivo | Tipo sugerido |
|---|---|
| `hero.webp` | Imagem horizontal de comida caseira, mesa rústica ou cenário de roça |
| `destaque-01.webp` | Ilustração de alimento artesanal (bolo, pão, sobremesa) |
| `destaque-02.webp` | Ilustração de ingredientes rurais, temperos ou cestas |
| `destaque-03.webp` | Ilustração de produto sendo preparado ou embalado |
| `destaque-04.webp` | Ilustração de especialidade regional ou prato típico |
| `sobre.webp` | Ilustração de preparo artesanal ou ambiente de cozinha caseira |

### Onde obter imagens ilustrativas

Caso não possua fotos próprias, utilize imagens de bancos com licença adequada:

- [Pexels](https://www.pexels.com/) — licença livre para uso comercial
- [Unsplash](https://unsplash.com/) — licença livre para uso comercial
- [Pixabay](https://pixabay.com/) — licença Pixabay (livre para uso)

> **Importante:** Revise a licença de cada imagem antes de publicar. Alguns bancos exigem atribuição ou possuem restrições de uso.

## Acessibilidade e SEO

O site inclui:
- Skip link para pular navegação
- Contraste WCAG AA em todos os textos
- Navegação por teclado e foco visível
- Menu mobile com gerenciamento de foco e `inert`
- Suporte a redução de movimento (`prefers-reduced-motion`)
- Metadados Open Graph e Twitter Cards
- JSON-LD LocalBusiness com endereço, telefone e horários
- Alt texts descritivos em todas as imagens
- Service Worker com cache offline
- PWA com manifest.json

Antes de publicar, confirme se endereço, telefone, horários, Instagram, URL canônica e imagens representam informações reais da marca.

## Segurança

### Arquivo `_headers`

O arquivo `_headers` configura cabeçalhos de segurança para Cloudflare Pages:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Strict-Transport-Security` (HSTS)
- `Content-Security-Policy` (CSP)
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` (bloqueia câmera, microfone)

> **Nota:** O GitHub Pages não suporta o arquivo `_headers`. Para usar esses cabeçalhos, migre para Cloudflare Pages ou configure um proxy com essas regras.

### Antes de publicar

- [ ] Confirmar que o site está acessível somente por HTTPS
- [ ] Ativar autenticação de dois fatores na conta do GitHub
- [ ] Ativar secret scanning e push protection no repositório
- [ ] Proteger a branch de publicação e exigir revisão antes de alterações
- [ ] Confirmar que não existem tokens, senhas ou chaves no código e no histórico Git
- [ ] Manter links externos com `rel="noopener noreferrer"`
- [ ] Revisar periodicamente os links do WhatsApp, Instagram, Maps e sitemap

## Licença

Todos os direitos reservados © Sabor da Roça.
