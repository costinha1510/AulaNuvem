/* ==========================================
   CONTROLE FINANCEIRO - FINTECH X
========================================== */


/* ==========================================
   VALORES INICIAIS
========================================== */

let receitas = 128450;

let despesas = 52380;


/* ==========================================
   ELEMENTOS DO HTML
========================================== */

const receitaElement =
    document.getElementById("receita");

const despesaElement =
    document.getElementById("despesa");

const saldoElement =
    document.getElementById("saldo");

const margemElement =
    document.getElementById("margem");

const donutTotal =
    document.getElementById("donutTotal");

const modal =
    document.getElementById("modal");

const openModal =
    document.getElementById("openModal");

const closeModal =
    document.getElementById("closeModal");

const form =
    document.getElementById("transactionForm");

const transactionList =
    document.getElementById("transactionList");


/* ==========================================
   FORMATA MOEDA
========================================== */

function formatarMoeda(valor) {

    return valor.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ==========================================
   FORMATA VALOR DO DONUT
========================================== */

function formatarMilhar(valor) {

    if (valor >= 1000) {

        return "R$ " +
            (valor / 1000)
                .toFixed(1)
                .replace(".", ",") +
            "K";

    }

    return formatarMoeda(valor);

}


/* ==========================================
   ATUALIZA DASHBOARD
========================================== */

function atualizarDashboard() {

    const saldo =
        receitas - despesas;


    /* RECEITA */

    receitaElement.textContent =
        formatarMoeda(receitas);


    /* DESPESA */

    despesaElement.textContent =
        formatarMoeda(despesas);


    /* SALDO */

    saldoElement.textContent =
        formatarMoeda(saldo);


    /* MARGEM DE LUCRO */

    let margem = 0;

    if (receitas > 0) {

        margem =
            (saldo / receitas) * 100;

    }


    margemElement.textContent =
        margem.toFixed(1).replace(".", ",") + "%";


    /* DONUT */

    donutTotal.textContent =
        formatarMilhar(despesas);

}


/* ==========================================
   ABRIR MODAL
========================================== */

openModal.addEventListener(
    "click",
    function () {

        modal.classList.add("active");

        document
            .getElementById("description")
            .focus();

    }
);


/* ==========================================
   FECHAR MODAL
========================================== */

closeModal.addEventListener(
    "click",
    function () {

        modal.classList.remove("active");

    }
);


/* ==========================================
   FECHAR CLICANDO FORA
========================================== */

modal.addEventListener(
    "click",
    function (event) {

        if (event.target === modal) {

            modal.classList.remove("active");

        }

    }
);


/* ==========================================
   ESC FECHA MODAL
========================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            modal.classList.contains("active")
        ) {

            modal.classList.remove("active");

        }

    }
);


/* ==========================================
   ADICIONAR TRANSAÇÃO
========================================== */

form.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* PEGA OS VALORES */

        const description =
            document
                .getElementById("description")
                .value
                .trim();


        const type =
            document
                .getElementById("type")
                .value;


        const amount =
            Number(
                document
                    .getElementById("amount")
                    .value
            );


        const category =
            document
                .getElementById("category")
                .value;


        /* VALIDAÇÃO */

        if (
            description === "" ||
            !Number.isFinite(amount) ||
            amount <= 0
        ) {

            alert(
                "Digite uma descrição e um valor válido."
            );

            return;

        }


        /* ======================================
           ALTERA OS VALORES
        ====================================== */

        if (type === "income") {

            receitas += amount;

        } else {

            despesas += amount;

        }


        /* ======================================
           DATA ATUAL
        ====================================== */

        const hoje =
            new Date();


        const data =
            hoje.toLocaleDateString(
                "pt-BR"
            );


        /* ======================================
           CONFIGURAÇÃO VISUAL
        ====================================== */

        let simbolo;

        let simboloClasse;

        let valorClasse;

        let sinal;


        if (type === "income") {

            simbolo = "↗";

            simboloClasse =
                "income-symbol";

            valorClasse =
                "income-value";

            sinal = "+";

        } else {

            simbolo = "↘";

            simboloClasse =
                "expense-symbol";

            valorClasse =
                "expense-value";

            sinal = "-";

        }


        /* ======================================
           CRIA NOVA LINHA
        ====================================== */

        const novaLinha =
            document.createElement("tr");


        novaLinha.innerHTML = `

            <td>

                <div class="transaction-name">

                    <div class="transaction-symbol ${simboloClasse}">
                        ${simbolo}
                    </div>

                    ${description}

                </div>

            </td>


            <td>
                ${category}
            </td>


            <td>
                ${data}
            </td>


            <td>

                <span class="status completed">
                    Concluído
                </span>

            </td>


            <td class="value ${valorClasse}">

                ${sinal}
                ${formatarMoeda(amount)}

            </td>

        `;


        /* COLOCA A TRANSAÇÃO NO TOPO */

        transactionList.prepend(
            novaLinha
        );


        /* ======================================
           ATUALIZA TUDO
        ====================================== */

        atualizarDashboard();


        /* ======================================
           LIMPA FORMULÁRIO
        ====================================== */

        form.reset();


        /* ======================================
           FECHA MODAL
        ====================================== */

        modal.classList.remove(
            "active"
        );

    }
);


/* ==========================================
   MENU LATERAL
========================================== */

const menuItems =
    document.querySelectorAll(
        ".menu-item"
    );


menuItems.forEach(
    function (item) {

        item.addEventListener(
            "click",
            function (event) {

                event.preventDefault();


                menuItems.forEach(
                    function (menu) {

                        menu.classList.remove(
                            "active"
                        );

                    }
                );


                item.classList.add(
                    "active"
                );

            }
        );

    }
);


/* ==========================================
   SELETOR DO GRÁFICO
========================================== */

const period =
    document.getElementById("period");


period.addEventListener(
    "change",
    function () {

        const quantidade =
            Number(period.value);


        const grupos =
            document.querySelectorAll(
                ".bar-group"
            );


        grupos.forEach(
            function (grupo, index) {

                if (
                    quantidade === 6 &&
                    index === 0
                ) {

                    grupo.style.display =
                        "none";

                } else {

                    grupo.style.display =
                        "flex";

                }

            }
        );

    }
);


/* ==========================================
   INICIALIZAÇÃO
========================================== */

atualizarDashboard();