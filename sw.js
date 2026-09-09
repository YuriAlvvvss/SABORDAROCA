/* ========================================
   SABOR DA ROÇA — Service Worker
   Cache offline e performance
   ======================================== */

const NOME_CACHE = 'sabor-da-roca-v7';
const URLS_CACHE = [
  './',
  './index.html',
  './404.html',
  './css/style.css',
  './js/script.js',
  './manifest.json',
  './assets/favicon.png',
  './assets/og-cover.jpg',
  './assets/images/sobre.webp',
  './assets/images/foto1.webp',
  './assets/images/foto2.webp',
  './assets/images/foto3.webp',
  './assets/images/foto4.webp',
  './assets/images/foto5.webp',
  './assets/images/foto6.webp',
  './assets/images/foto7.webp',
  './assets/images/foto8.webp',
  './assets/images/foto9.webp',
  './assets/images/foto10.webp',
  './assets/images/foto11.webp'
];

/* HTML offline fallback */
const HTML_OFFLINE = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sabor da Roça — Offline</title>
  <style>
    body{font-family:'Segoe UI',sans-serif;display:flex;justify-content:center;align-items:center;min-height:100vh;margin:0;background:#F4E6CE;color:#5A1903;text-align:center;padding:2rem}
    .offline{max-width:400px}
    h1{font-size:1.5rem;margin-bottom:1rem}
    p{opacity:.8;line-height:1.6}
    .btn{display:inline-block;margin-top:1.5rem;padding:.8rem 1.6rem;background:#E86531;color:#FFF7E8;border-radius:8px;text-decoration:none;font-weight:600}
  </style>
</head>
<body>
  <div class="offline">
    <h1>Você está offline</h1>
    <p>Verifique sua conexão com a internet e tente novamente.</p>
    <a href="./" class="btn">Tentar novamente</a>
  </div>
</body>
</html>`;

/* Instalação — pré-cache dos ativos */
self.addEventListener('install', function (evento) {
  evento.waitUntil(
    caches.open(NOME_CACHE)
      .then(function (cache) {
        return cache.addAll(URLS_CACHE);
      })
      .then(function () {
        return self.skipWaiting();
      })
  );
});

/* Ativação — limpa caches antigos */
self.addEventListener('activate', function (evento) {
  evento.waitUntil(
    caches.keys()
      .then(function (nomes) {
        return Promise.all(
          nomes
            .filter(function (nome) {
              return nome !== NOME_CACHE;
            })
            .map(function (nome) {
              return caches.delete(nome);
            })
        );
      })
      .then(function () {
        return self.clients.claim();
      })
  );
});

/* Busca */
self.addEventListener('fetch', function (evento) {
  /* Ignora requests que não são GET */
  if (evento.request.method !== 'GET') {
    return;
  }

  /* Ignora requests de terceiros */
  if (!evento.request.url.startsWith(self.location.origin)) {
    return;
  }

  var ehDocumento = evento.request.destination === 'document';

  if (ehDocumento) {
    /* Network-first para documentos HTML */
    evento.respondWith(
      fetch(evento.request)
        .then(function (respostaRede) {
          /* Armazena cópia atualizada no cache */
          var respostaClone = respostaRede.clone();
          caches.open(NOME_CACHE).then(function (cache) {
            cache.put(evento.request, respostaClone);
          });
          return respostaRede;
        })
        .catch(function () {
          /* Se a rede falhar, usa o cache */
          return caches.match(evento.request)
            .then(function (respostaCache) {
              return respostaCache || new Response(HTML_OFFLINE, {
                headers: { 'Content-Type': 'text/html; charset=utf-8' }
              });
            });
        })
    );
  } else {
    /* Cache-first para outros ativos (CSS, JS, imagens) */
    evento.respondWith(
      caches.match(evento.request)
        .then(function (resposta) {
          if (resposta) {
            /* Atualiza cache em background (stale-while-revalidate) */
            fetch(evento.request)
              .then(function (respostaRede) {
                if (respostaRede && respostaRede.status === 200) {
                  caches.open(NOME_CACHE).then(function (cache) {
                    cache.put(evento.request, respostaRede);
                  });
                }
              })
              .catch(function () {});

            return resposta;
          }

          /* Se não está no cache, busca na rede e armazena */
          return fetch(evento.request)
            .then(function (respostaRede) {
              if (!respostaRede || respostaRede.status !== 200) {
                return respostaRede;
              }

              var respostaClone = respostaRede.clone();
              caches.open(NOME_CACHE).then(function (cache) {
                cache.put(evento.request, respostaClone);
              });

              return respostaRede;
            })
            .catch(function () {
              /* Fallback para imagens */
              if (evento.request.destination === 'image') {
                return new Response(
                  '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="150" viewBox="0 0 200 150"><rect fill="#E8D5B7" width="200" height="150"/><text fill="#5A1903" font-family="sans-serif" font-size="14" x="50%" y="50%" text-anchor="middle" dy=".3em">Imagem indisponível</text></svg>',
                  { headers: { 'Content-Type': 'image/svg+xml' } }
                );
              }
            });
        })
    );
  }
});
