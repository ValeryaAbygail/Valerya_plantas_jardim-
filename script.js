let plantas = [];
let datasRega = {};

function esconderTudo() {
  document.getElementById('formulario').style.display = 'none';
  document.getElementById('lista').style.display = 'none';
  document.getElementById('deletar').style.display = 'none';
  document.getElementById('controle-rega').style.display = 'none';
  document.getElementById('lista-tempo-rega').style.display = 'none';
}

function mostrarFormulario() {
  esconderTudo();
  document.getElementById('formulario').style.display = 'block';
}

function mostrarLista() {
  esconderTudo();
  document.getElementById('lista').style.display = 'block';

  const tabela = document.getElementById('tabela-lista');
  tabela.innerHTML = '';

  plantas.forEach(planta => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${planta.nome}</td>
      <td>${planta.tipo}</td>
      <td>${planta.frequencia}</td>
    `;
    tabela.appendChild(tr);
  });
}

function mostrarDeletar() {
  esconderTudo();
  document.getElementById('deletar').style.display = 'block';
}

function mostrarControleRega() {
  esconderTudo();
  document.getElementById('controle-rega').style.display = 'block';

  const select = document.getElementById('planta-rega');
  select.innerHTML = '<option value="">Selecione</option>';

  plantas.forEach(planta => {
    const option = document.createElement('option');
    option.value = planta.nome;
    option.textContent = planta.nome;
    select.appendChild(option);
  });

  document.getElementById('data-rega').value = '';
}

function salvarPlanta() {
  const nome = document.getElementById('nome').value.trim();
  const tipo = document.getElementById('tipo').value;
  const frequencia = parseInt(document.getElementById('frequencia').value);

  if (!nome || !tipo || isNaN(frequencia) || frequencia <= 0) {
    alert('Preencha todos os campos corretamente.');
    return;
  }

  const existe = plantas.some(p => p.nome.toLowerCase() === nome.toLowerCase());
  if (existe) {
    alert('Planta já cadastrada.');
    return;
  }

  plantas.push({ nome, tipo, frequencia });
  alert('Planta cadastrada com sucesso!');

  document.getElementById('nome').value = '';
  document.getElementById('tipo').value = '';
  document.getElementById('frequencia').value = '';

  mostrarLista();
}

function deletarPlanta() {
  const nome = document.getElementById('nome-deletar').value.trim();
  if (!nome) {
    alert('Informe o nome da planta a deletar.');
    return;
  }

  const index = plantas.findIndex(p => p.nome.toLowerCase() === nome.toLowerCase());
  if (index === -1) {
    alert('Planta não encontrada.');
    return;
  }

  plantas.splice(index, 1);
  delete datasRega[nome];

  alert('Planta deletada.');
  document.getElementById('nome-deletar').value = '';

  mostrarLista();
}

function salvarDataRega() {
  const select = document.getElementById('planta-rega');
  const nome = select.value;
  const data = document.getElementById('data-rega').value;

  if (!nome) {
    alert('Selecione uma planta.');
    return;
  }
  if (!data) {
    alert('Informe a data da última rega.');
    return;
  }

  datasRega[nome] = data;
  alert(`Data da última rega para ${nome} salva com sucesso!`);
}

function verTempoParaRega() {
  if (plantas.length === 0) {
    alert('Nenhuma planta cadastrada.');
    return;
  }

  esconderTudo();
  const secaoTempoRega = document.getElementById('lista-tempo-rega');
  secaoTempoRega.style.display = 'block';

  const lista = document.getElementById('lista-regas');
  lista.innerHTML = '';

  plantas.forEach(planta => {
    const ultimaData = datasRega[planta.nome];
    let texto = '';

    if (!ultimaData) {
      texto = `Última rega não registrada.`;
    } else {
      const dataUltimaRega = new Date(ultimaData);
      const freqDias = planta.frequencia;

      const proximaRega = new Date(dataUltimaRega);
      proximaRega.setDate(proximaRega.getDate() + freqDias);

      const hoje = new Date();
      const diffMs = proximaRega - hoje;
      const diffDias = Math.ceil(diffMs / (1000 * 60 * 60 * 24));

      if (diffDias <= 0) {
        texto = `Precisa ser regada agora ou está atrasada!`;
      } else {
        texto = `Próxima rega em ${diffDias} dia(s).`;
      }
    }

    const li = document.createElement('li');
    li.innerHTML = `<strong>${planta.nome}</strong>: ${texto}`;
    lista.appendChild(li);
  });
}





