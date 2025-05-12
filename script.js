function mostrarFormulario() {
    document.getElementById("formulario").style.display = "block";
    document.getElementById("lista").style.display = "none";
}

function mostrarLista() {
    document.getElementById("formulario").style.display = "none";
    document.getElementById("lista").style.display = "block";
}

function mostrarFormularioComum() {
    mostrarFormulario();
    document.getElementById("campo-local").style.display = "none";
}

function mostrarFormularioInterior() {
    mostrarFormulario();
    document.getElementById("campo-local").style.display = "block";
}

function mostrarDeletar() {
    const nome = prompt("Digite o nome da planta a deletar:");
    const linhas = document.querySelectorAll("#tabela-corpo tr");
    let removido = false;

    linhas.forEach((linha) => {
        if (linha.children[0].textContent === nome) {
            linha.remove();
            removido = true;
        }
    });

    if (removido) {
        alert("Planta removida!");
    } else {
        alert("Planta não encontrada.");
    }
}

function sair() {
    alert("Saindo do sistema do jardim!");
}

// Captura envio do formulário
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("planta-form");
    const tabela = document.getElementById("tabela-corpo");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nome = document.getElementById("nome").value;
        const tipo = document.getElementById("tipo").value;
        const freq = document.getElementById("frequencia").value;
        const local = document.getElementById("local").value;

        const linha = document.createElement("tr");
        linha.innerHTML = `
            <td>${nome}</td>
            <td>${tipo}</td>
            <td>${freq} dias</td>
            <td>${local || '-'}</td>
        `;
        tabela.appendChild(linha);

        form.reset();
        mostrarLista();
    });
});

