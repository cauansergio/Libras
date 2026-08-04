/* =========================================================
   DADOS
   Cada seção tem: rótulo (label) e uma lista de itens.
   Cada item tem:
     - nome:      nome exibido (ex: "Centro")
     - imagem:    caminho da imagem que mostra como se escreve/soletra a palavra
     - instagram: link do post/reel PÚBLICO do Instagram com o vídeo do sinal
                  (ex: "https://www.instagram.com/reel/XXXXXXXXXXX/")
     - tag:       (opcional) etiqueta extra, ex: "Municipal"

   IMPORTANTE: o post do Instagram precisa ser de um perfil PÚBLICO,
   senão o vídeo não aparece incorporado.
========================================================= */
const secoes = {
  bairros: {
    label: "Bairros",
    itens: [
      { nome: "Cristo", imagem: "imagens/bairros/cristo.png", instagram: "https://www.instagram.com/reel/DbmANbOt0F4/" },
      { nome: "Algodoal", imagem: "imagens/bairros/algodoal.png", instagram: "https://www.instagram.com/reel/Dbl-_-LNVVB/" },
      { nome: "Mutirão", imagem: "imagens/bairros/mutirao.png", instagram: "https://www.instagram.com/reel/DbmAFwQtF27/" },
      { nome: "Jarumã", imagem: "imagens/bairros/jaruma.png", instagram: "https://www.instagram.com/reel/Dbl_8P-NON_/" },
      { nome: "Bosque", imagem: "imagens/bairros/bosque.png", instagram: "https://www.instagram.com/reel/Dbl_vwaho5J/" },
      { nome: "Santa Rosa", imagem: "imagens/bairros/santa-rosa.png", instagram: "https://www.instagram.com/reel/Dbl_dsHN9zs/" }
    ]
  },
  escolas: {
    label: "Escolas",
    itens: [
      { nome: "E.M.E.F. Nazaré Paes", imagem: "imagens/escolas/nazare-paes.png", instagram: "https://www.instagram.com/reel/EXEMPLO_NAZAREPAES/", tag: "Municipal" },
      { nome: "Colégio Estadual de Abaetetuba", imagem: "imagens/escolas/colegio-estadual.png", instagram: "https://www.instagram.com/reel/EXEMPLO_COLEGIOESTADUAL/", tag: "Estadual" },
      { nome: "Escola Dom Vicente Zico", imagem: "imagens/escolas/dom-vicente-zico.png", instagram: "https://www.instagram.com/reel/EXEMPLO_DOMVICENTEZICO/", tag: "Estadual" }
    ]
  },
  ruas: {
    label: "Ruas",
    itens: [
      { nome: "Rua Don Pedro I", imagem: "imagens/ruas/rua-don-pedro-i.png", instagram: "https://www.instagram.com/reel/DbgEDI4t1ZA/" },
      { nome: "Rua Siqueira Mendes", imagem: "imagens/ruas/siqueira-mendes.png", instagram: "https://www.instagram.com/reel/DbgFBVOt_D-/" },
      { nome: "Avenida 15 de Agosto", imagem: "imagens/ruas/av-15-de-agosto.png", instagram: "https://www.instagram.com/reel/DbgEl9HtFvy/" },
      { nome: "Rua Emanuel de Abreu", imagem: "imagens/ruas/emanuel-de-abreu.png", instagram: "https://www.instagram.com/reel/DbgEa6CNaHZ/" },
      { nome: "Avenida São Paulo", imagem: "imagens/ruas/av-sao-paulo.png", instagram: "https://www.instagram.com/reel/DbgFTUZNllv/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" },
      { nome: "Rua 7 de Setembro", imagem: "imagens/ruas/rua-7-de-setembro.png", instagram: "https://www.instagram.com/reel/DbgFYeXtUmA/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==" }
    ]
  },
  pontos: {
    label: "Pontos de Referência",
    itens: [
      { nome: "Porto de Abaetetuba", imagem: "imagens/pontos/porto.png", instagram: "https://www.instagram.com/reel/EXEMPLO_PORTO/" },
      { nome: "Praça Matriz", imagem: "imagens/pontos/praca-matriz.png", instagram: "https://www.instagram.com/reel/EXEMPLO_PRACAMATRIZ/" },
      { nome: "Mercado Municipal", imagem: "imagens/pontos/mercado-municipal.png", instagram: "https://www.instagram.com/reel/EXEMPLO_MERCADO/" }
    ]
  }
  // para criar uma nova seção, copie o formato acima com uma nova chave
};

let secaoAtual = "bairros";

const tabsNav = document.getElementById("tabsNav");
const gridContainer = document.getElementById("gridContainer");
const searchInput = document.getElementById("searchInput");
const sectionTitle = document.getElementById("sectionTitle");
const sectionCount = document.getElementById("sectionCount");
const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalCloseBtn = document.getElementById("modalCloseBtn");
const instagramEmbedWrap = document.getElementById("instagramEmbedWrap");
const modalLinkFallback = document.getElementById("modalLinkFallback");

/* ===== ABAS DE SEÇÃO ===== */
function renderizarAbas() {
  tabsNav.innerHTML = "";
  Object.keys(secoes).forEach(function (chave, indice) {
    const botao = document.createElement("button");
    botao.textContent = secoes[chave].label;
    botao.className = chave === secaoAtual ? "active" + (indice % 2 === 1 ? " vermelho" : "") : "";
    botao.addEventListener("click", function () {
      secaoAtual = chave;
      searchInput.value = "";
      renderizarAbas();
      renderizarCards();
    });
    tabsNav.appendChild(botao);
  });
}

/* ===== CARDS (IMAGEM + NOME) ===== */
function renderizarCards() {
  const termo = searchInput.value.trim().toLowerCase();
  const secao = secoes[secaoAtual];
  const itensFiltrados = secao.itens.filter(function (item) {
    return item.nome.toLowerCase().includes(termo);
  });

  sectionTitle.textContent = secao.label;
  sectionCount.textContent = itensFiltrados.length;

  gridContainer.innerHTML = "";

  if (itensFiltrados.length === 0) {
    gridContainer.innerHTML = `<p class="no-results">Nenhum item encontrado.</p>`;
    return;
  }

  itensFiltrados.forEach(function (item) {
    const card = document.createElement("div");
    card.className = "card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", "Ver vídeo do sinal " + item.nome + " no Instagram");

    card.innerHTML = `
      <div class="thumb-wrap">
        <img src="${item.imagem}" alt="Como se escreve ${item.nome}">
        <span class="play-badge">&#9654;</span>
      </div>
      <h3>${item.nome}</h3>
      ${item.tag ? `<span class="tag">${item.tag}</span>` : ""}
    `;

    card.addEventListener("click", function () { abrirModal(item); });
    card.addEventListener("keypress", function (evento) {
      if (evento.key === "Enter" || evento.key === " ") { abrirModal(item); }
    });

    gridContainer.appendChild(card);
  });
}

/* ===== ABERTURA / FECHAMENTO DO MODAL (EMBED INSTAGRAM) ===== */
function montarUrlEmbed(link) {
  // Remove parâmetros extras (ex: ?utm_source=...&igsh=...) e monta a URL de embed
  let url = link.trim().split("?")[0];
  if (!url.endsWith("/")) url += "/";
  return url + "embed";
}

function abrirModal(item) {
  modalTitle.textContent = item.nome;
  modalLinkFallback.href = item.instagram;

  instagramEmbedWrap.innerHTML = `
    <iframe
      src="${montarUrlEmbed(item.instagram)}"
      frameborder="0"
      scrolling="no"
      allow="autoplay; encrypted-media"
      allowfullscreen>
    </iframe>
  `;

  modalOverlay.classList.add("active");
}

function fecharModal() {
  modalOverlay.classList.remove("active");
  instagramEmbedWrap.innerHTML = ""; // remove o iframe para parar o vídeo
}

modalCloseBtn.addEventListener("click", fecharModal);
modalOverlay.addEventListener("click", function (evento) {
  if (evento.target === modalOverlay) { fecharModal(); }
});
document.addEventListener("keydown", function (evento) {
  if (evento.key === "Escape" && modalOverlay.classList.contains("active")) { fecharModal(); }
});

searchInput.addEventListener("input", renderizarCards);

/* ===== INICIALIZAÇÃO ===== */
renderizarAbas();
renderizarCards();