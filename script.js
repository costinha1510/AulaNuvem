

  /*
  =====================================================
  CONFIGURAÇÕES
  =====================================================
  */

  // COLOQUE AQUI O WHATSAPP DA SUA LANCHONETE
  // Exemplo: 5585999999999
  const WHATSAPP = "5585999999999";

  const TAXA_ENTREGA = 5.00;


  /*
  =====================================================
  CARDÁPIO
  =====================================================
  */

  const produtos = [

    {
      id: 1,
      nome: "X-Burger",
      descricao: "Pão, hambúrguer, queijo, presunto, alface e tomate.",
      preco: 15.00,
      categoria: "Hambúrgueres",
      emoji: "🍔"
    },

    {
      id: 2,
      nome: "X-Salada",
      descricao: "Hambúrguer, queijo, presunto, alface, tomate e molho especial.",
      preco: 18.00,
      categoria: "Hambúrgueres",
      emoji: "🍔"
    },

    {
      id: 3,
      nome: "X-Bacon",
      descricao: "Hambúrguer, queijo, bacon crocante e molho especial.",
      preco: 22.00,
      categoria: "Hambúrgueres",
      emoji: "🥓"
    },

    {
      id: 4,
      nome: "X-Tudo",
      descricao: "Hambúrguer, queijo, presunto, bacon, ovo, salada e molho.",
      preco: 28.00,
      categoria: "Hambúrgueres",
      emoji: "🍔"
    },

    {
      id: 5,
      nome: "Hot Dog Tradicional",
      descricao: "Salsicha, molho, milho, ervilha, batata palha e queijo.",
      preco: 12.00,
      categoria: "Hot Dogs",
      emoji: "🌭"
    },

    {
      id: 6,
      nome: "Hot Dog Especial",
      descricao: "2 salsichas, bacon, queijo, milho, ervilha e batata palha.",
      preco: 18.00,
      categoria: "Hot Dogs",
      emoji: "🌭"
    },

    {
      id: 7,
      nome: "Batata Frita",
      descricao: "Porção de batata frita crocante.",
      preco: 15.00,
      categoria: "Porções",
      emoji: "🍟"
    },

    {
      id: 8,
      nome: "Batata com Cheddar e Bacon",
      descricao: "Batata frita com cheddar cremoso e bacon.",
      preco: 22.00,
      categoria: "Porções",
      emoji: "🍟"
    },

    {
      id: 9,
      nome: "Coca-Cola Lata",
      descricao: "Coca-Cola 350ml gelada.",
      preco: 6.00,
      categoria: "Bebidas",
      emoji: "🥤"
    },

    {
      id: 10,
      nome: "Guaraná Lata",
      descricao: "Guaraná 350ml gelado.",
      preco: 6.00,
      categoria: "Bebidas",
      emoji: "🥤"
    },

    {
      id: 11,
      nome: "Suco Natural",
      descricao: "Suco natural feito na hora.",
      preco: 8.00,
      categoria: "Bebidas",
      emoji: "🧃"
    },

    {
      id: 12,
      nome: "Água Mineral",
      descricao: "Água mineral 500ml.",
      preco: 4.00,
      categoria: "Bebidas",
      emoji: "💧"
    }

  ];


  /*
  =====================================================
  VARIÁVEIS
  =====================================================
  */

  let carrinho =
    JSON.parse(localStorage.getItem("carrinho")) || [];

  let categoriaAtual = "Todos";


  /*
  =====================================================
  FORMATAÇÃO DE PREÇO
  =====================================================
  */

  function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL"
    });

  }


  /*
  =====================================================
  MOSTRAR PRODUTOS
  =====================================================
  */

  function renderProdutos() {

    const container =
      document.getElementById("products");

    const busca =
      document
      .getElementById("search")
      .value
      .toLowerCase();

    let lista = produtos.filter(produto => {

      const correspondeCategoria =
        categoriaAtual === "Todos" ||
        produto.categoria === categoriaAtual;

      const correspondeBusca =
        produto.nome
        .toLowerCase()
        .includes(busca) ||

        produto.descricao
        .toLowerCase()
        .includes(busca);

      return correspondeCategoria && correspondeBusca;

    });


    if (lista.length === 0) {

      container.innerHTML = `
        <div class="empty">
          <h3>Nenhum produto encontrado 😕</h3>
          <p>Tente outra busca.</p>
        </div>
      `;

      return;
    }


    container.innerHTML = lista.map(produto => `

      <div class="product">

        <div class="product-image">
          ${produto.emoji}
        </div>

        <div class="product-info">

          <h3>${produto.nome}</h3>

          <p>${produto.descricao}</p>

          <div class="product-bottom">

            <span class="price">
              ${formatarPreco(produto.preco)}
            </span>

            <button
              class="add-button"
              onclick="adicionarCarrinho(${produto.id})"
            >
              + Adicionar
            </button>

          </div>

        </div>

      </div>

    `).join("");

  }


  /*
  =====================================================
  SELECIONAR CATEGORIA
  =====================================================
  */

  function selecionarCategoria(categoria, botao) {

    categoriaAtual = categoria;

    document
      .querySelectorAll(".category-btn")
      .forEach(btn => btn.classList.remove("active"));

    botao.classList.add("active");

    renderProdutos();

  }


  /*
  =====================================================
  ADICIONAR AO CARRINHO
  =====================================================
  */

  function adicionarCarrinho(id) {

    const produto =
      produtos.find(p => p.id === id);

    const item =
      carrinho.find(p => p.id === id);


    if (item) {

      item.quantidade++;

    } else {

      carrinho.push({
        ...produto,
        quantidade: 1
      });

    }


    salvarCarrinho();

    atualizarContador();

    mostrarMensagem(`${produto.nome} adicionado ao carrinho!`);

  }


  /*
  =====================================================
  SALVAR CARRINHO
  =====================================================
  */

  function salvarCarrinho() {

    localStorage.setItem(
      "carrinho",
      JSON.stringify(carrinho)
    );

  }


  /*
  =====================================================
  CONTADOR
  =====================================================
  */

  function atualizarContador() {

    const quantidade =
      carrinho.reduce(
        (total, item) =>
        total + item.quantidade,
        0
      );

    document.getElementById("cartCount")
      .textContent = quantidade;

  }


  /*
  =====================================================
  ABRIR CARRINHO
  =====================================================
  */

  function abrirCarrinho() {

    document.getElementById("cartModal")
      .style.display = "block";

    renderCarrinho();

  }


  /*
  =====================================================
  FECHAR CARRINHO
  =====================================================
  */

  function fecharCarrinho() {

    document.getElementById("cartModal")
      .style.display = "none";

  }


  /*
  =====================================================
  RENDERIZAR CARRINHO
  =====================================================
  */

  function renderCarrinho() {

    const container =
      document.getElementById("cartItems");

    const summary =
      document.getElementById("cartSummary");


    if (carrinho.length === 0) {

      container.innerHTML = `
        <div class="empty">
          <h3>Seu carrinho está vazio 🛒</h3>
          <p>Adicione alguns produtos!</p>
        </div>
      `;

      summary.innerHTML = "";

      return;

    }


    container.innerHTML =
      carrinho.map(item => `

        <div class="cart-item">

          <div class="cart-item-info">

            <strong>
              ${item.emoji} ${item.nome}
            </strong>

            <span>
              ${formatarPreco(item.preco)}
            </span>

          </div>


          <div class="quantity">

            <button
              onclick="alterarQuantidade(${item.id}, -1)"
            >
              −
            </button>

            <strong>
              ${item.quantidade}
            </strong>

            <button
              onclick="alterarQuantidade(${item.id}, 1)"
            >
              +
            </button>

          </div>

        </div>

      `).join("");


    const subtotal = calcularSubtotal();

    const total = subtotal + TAXA_ENTREGA;


    summary.innerHTML = `

      <div class="cart-total">

        <div class="total-line">
          <span>Subtotal:</span>
          <strong>${formatarPreco(subtotal)}</strong>
        </div>

        <div class="total-line">
          <span>Entrega:</span>
          <strong>${formatarPreco(TAXA_ENTREGA)}</strong>
        </div>

        <div class="total-line total-final">
          <span>Total:</span>
          <strong>${formatarPreco(total)}</strong>
        </div>

        <button
          class="checkout-button"
          onclick="abrirCheckout()"
        >
          Continuar para pagamento
        </button>

      </div>

    `;

  }


  /*
  =====================================================
  ALTERAR QUANTIDADE
  =====================================================
  */

  function alterarQuantidade(id, quantidade) {

    const item =
      carrinho.find(p => p.id === id);

    if (!item) return;


    item.quantidade += quantidade;


    if (item.quantidade <= 0) {

      carrinho =
        carrinho.filter(p => p.id !== id);

    }


    salvarCarrinho();

    atualizarContador();

    renderCarrinho();

  }


  /*
  =====================================================
  CALCULAR SUBTOTAL
  =====================================================
  */

  function calcularSubtotal() {

    return carrinho.reduce(
      (total, item) =>
        total + item.preco * item.quantidade,
      0
    );

  }


  /*
  =====================================================
  ABRIR CHECKOUT
  =====================================================
  */

  function abrirCheckout() {

    if (carrinho.length === 0) {

      alert("Seu carrinho está vazio.");

      return;

    }


    fecharCarrinho();

    document.getElementById("checkoutModal")
      .style.display = "block";


    atualizarTotalCheckout();

  }


  /*
  =====================================================
  FECHAR CHECKOUT
  =====================================================
  */

  function fecharCheckout() {

    document.getElementById("checkoutModal")
      .style.display = "none";

  }


  /*
  =====================================================
  TOTAL DO CHECKOUT
  =====================================================
  */

  function atualizarTotalCheckout() {

    const subtotal = calcularSubtotal();

    const total = subtotal + TAXA_ENTREGA;


    document.getElementById("checkoutTotal")
      .innerHTML = `

        <div class="cart-total">

          <div class="total-line">
            <span>Subtotal:</span>
            <strong>${formatarPreco(subtotal)}</strong>
          </div>

          <div class="total-line">
            <span>Entrega:</span>
            <strong>${formatarPreco(TAXA_ENTREGA)}</strong>
          </div>

          <div class="total-line total-final">
            <span>Total:</span>
            <strong>${formatarPreco(total)}</strong>
          </div>

        </div>

      `;

  }


  /*
  =====================================================
  FORMA DE PAGAMENTO
  =====================================================
  */

  document.getElementById("pagamento")
    .addEventListener("change", function() {

      const trocoContainer =
        document.getElementById("trocoContainer");


      if (this.value === "Dinheiro") {

        trocoContainer.style.display = "block";

      } else {

        trocoContainer.style.display = "none";

      }

    });


  /*
  =====================================================
  FINALIZAR PEDIDO
  =====================================================
  */

  function finalizarPedido() {

    const nome =
      document.getElementById("clienteNome")
      .value.trim();

    const telefone =
      document.getElementById("clienteTelefone")
      .value.trim();

    const endereco =
      document.getElementById("clienteEndereco")
      .value.trim();

    const bairro =
      document.getElementById("clienteBairro")
      .value.trim();

    const complemento =
      document.getElementById("clienteComplemento")
      .value.trim();

    const pagamento =
      document.getElementById("pagamento")
      .value;

    const troco =
      document.getElementById("troco")
      .value;

    const observacao =
      document.getElementById("observacao")
      .value.trim();


    if (!nome) {

      alert("Digite seu nome.");

      return;

    }


    if (!telefone) {

      alert("Digite seu telefone.");

      return;

    }


    if (!endereco) {

      alert("Digite seu endereço.");

      return;

    }


    if (!bairro) {

      alert("Digite seu bairro.");

      return;

    }


    if (!pagamento) {

      alert("Selecione a forma de pagamento.");

      return;

    }


    if (
      pagamento === "Dinheiro" &&
      (!troco || Number(troco) <= 0)
    ) {

      alert("Informe o valor para o troco.");

      return;

    }


    const subtotal = calcularSubtotal();

    const total = subtotal + TAXA_ENTREGA;


    let mensagem =
      `*🍔 NOVO PEDIDO - POINT DO LANCHE*%0A%0A`;


    mensagem +=
      `*CLIENTE*%0A`;

    mensagem +=
      `Nome: ${nome}%0A`;

    mensagem +=
      `Telefone: ${telefone}%0A%0A`;


    mensagem +=
      `*ENDEREÇO*%0A`;

    mensagem +=
      `${endereco}%0A`;

    mensagem +=
      `Bairro: ${bairro}%0A`;


    if (complemento) {

      mensagem +=
        `Complemento: ${complemento}%0A`;

    }


    mensagem += `%0A*PEDIDO*%0A`;


    carrinho.forEach(item => {

      const totalItem =
        item.preco * item.quantidade;


      mensagem +=
        `${item.quantidade}x ${item.nome} - ${formatarPreco(totalItem)}%0A`;

    });


    mensagem += `%0A`;


    mensagem +=
      `Subtotal: ${formatarPreco(subtotal)}%0A`;

    mensagem +=
      `Taxa de entrega: ${formatarPreco(TAXA_ENTREGA)}%0A`;

    mensagem +=
      `*TOTAL: ${formatarPreco(total)}*%0A%0A`;


    mensagem +=
      `*PAGAMENTO*%0A`;

    mensagem +=
      `${pagamento}%0A`;


    if (pagamento === "Dinheiro") {

      mensagem +=
        `Troco para: ${formatarPreco(Number(troco))}%0A`;

    }


    if (observacao) {

      mensagem += `%0A*OBSERVAÇÃO*%0A`;

      mensagem +=
        `${observacao}%0A`;

    }


    mensagem += `%0AObrigado! 😊`;


    const url =
      `https://wa.me/${WHATSAPP}?text=${mensagem}`;


    window.open(url, "_blank");


    /*
    Limpa o carrinho depois de enviar
    */

    carrinho = [];

    salvarCarrinho();

    atualizarContador();

    fecharCheckout();

  }


  /*
  =====================================================
  MENSAGEM TEMPORÁRIA
  =====================================================
  */

  function mostrarMensagem(texto) {

    const mensagem =
      document.createElement("div");


    mensagem.textContent = texto;


    mensagem.style.position = "fixed";
    mensagem.style.bottom = "25px";
    mensagem.style.left = "50%";
    mensagem.style.transform = "translateX(-50%)";
    mensagem.style.background = "#222";
    mensagem.style.color = "#fff";
    mensagem.style.padding = "13px 20px";
    mensagem.style.borderRadius = "30px";
    mensagem.style.zIndex = "9999";
    mensagem.style.boxShadow =
      "0 5px 20px rgba(0,0,0,.25)";


    document.body.appendChild(mensagem);


    setTimeout(() => {

      mensagem.remove();

    }, 2000);

  }


  /*
  =====================================================
  FECHAR MODAIS CLICANDO FORA
  =====================================================
  */

  window.onclick = function(event) {

    const cartModal =
      document.getElementById("cartModal");

    const checkoutModal =
      document.getElementById("checkoutModal");


    if (event.target === cartModal) {

      fecharCarrinho();

    }


    if (event.target === checkoutModal) {

      fecharCheckout();

    }

  };


  /*
  =====================================================
  INICIALIZAÇÃO
  =====================================================
  */

  renderProdutos();

  atualizarContador();




