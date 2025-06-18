const cadastro = document.querySelector('header form');
const tcorpo = document.querySelector('main tbody');
let listaArmazenada = JSON.parse(window.localStorage.getItem('contatos'));
let indexEditando = null;

if (!listaArmazenada) {
    window.localStorage.setItem('contatos', JSON.stringify([]));
    listaArmazenada = [];
} else {
    preencherTabela();
}

cadastro.addEventListener('submit', async e => {
    e.preventDefault();

 
    const novoRegistro = {
        nome: cadastro.nome.value,
        email: cadastro.email.value,
        telefone: cadastro.telefone.value,
        endereco: cadastro.endereco.value,
        cpf: cadastro.cpf.value,
        rg: cadastro.rg.value
    };

    if (indexEditando !== null) {
        listaArmazenada[indexEditando] = novoRegistro; 
        indexEditando = null; 
    } else {
        listaArmazenada.push(novoRegistro); 
    }

    await preencherTabela();
    await salvar();
    limparFormulario(); 
});

async function preencherTabela() {
    tcorpo.innerHTML = '';
    listaArmazenada.forEach((c, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${c.nome}</td>
            <td>${c.email}</td>
            <td>${c.telefone}</td>
            <td>${c.endereco}</td>
            <td>${c.cpf}</td>
            <td>${c.rg}</td>
            <td>
                <button class="btn btn-danger" onclick="excluir(${i})">-</button>
                <button class="btn btn-warning" onclick="editar(${i})">Editar</button>
            </td>
        `;
        tcorpo.appendChild(tr);
    });
}

async function excluir(index) {
    listaArmazenada.splice(index, 1);
    await preencherTabela();
    await salvar();
}

async function salvar() {
    window.localStorage.setItem('contatos', JSON.stringify(listaArmazenada));
}

function editar(index) {
    const contato = listaArmazenada[index];
    
  
    cadastro.nome.value = contato.nome;
    cadastro.email.value = contato.email;
    cadastro.telefone.value = contato.telefone;
    cadastro.endereco.value = contato.endereco;
    cadastro.cpf.value = contato.cpf;
    cadastro.rg.value = contato.rg;


    indexEditando = index;
}

function limparFormulario() {
    cadastro.nome.value = '';
    cadastro.email.value = '';
    cadastro.telefone.value = '';
    cadastro.endereco.value = '';
    cadastro.cpf.value = '';
    cadastro.rg.value = '';
}
