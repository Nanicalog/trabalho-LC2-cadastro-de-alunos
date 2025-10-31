// Vetor para armazenar os alunos
const alunos = [];

// Função para formatar nomes (ex: "maria silva" -> "Maria Silva")
function formatarNome(nome) {
    return nome
        .toLowerCase()
        .split(' ')
        .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
        .join(' ');
}

// Adicionar aluno
function adicionarAluno() {
    const nome = formatarNome(document.getElementById('nome').value);
    const nota1 = parseFloat(document.getElementById('nota1').value);
    const nota2 = parseFloat(document.getElementById('nota2').value);
    const nota3 = parseFloat(document.getElementById('nota3').value);

    if (!nome) {
        alert('Digite o nome do aluno!');
        return;
    }

    alunos.push({
        nome: nome,
        notas: [nota1, nota2, nota3],
        media: null
    });

    mostrarAlunos();
    alert('Aluno adicionado!');
}

// Calcular médias
function calcularMedias() {
    for (let aluno of alunos) {
        let soma = 0;
        let contador = 0;

        for (let nota of aluno.notas) {
            if (!isNaN(nota)) {
                soma += nota;
                contador++;
            }
        }

        aluno.media = contador > 0 ? (soma / contador).toFixed(2) : '-';
    }

    mostrarAlunos();
    alert('Médias calculadas!');
}

// Buscar aluno
function buscarAluno() {
    const nomeBusca = formatarNome(document.getElementById('busca').value);
    let encontrado = false;

    for (let aluno of alunos) {
        if (aluno.nome === nomeBusca) {
            alert(`Encontrado: ${aluno.nome}`);
            encontrado = true;
            break;
        }
    }

    if (!encontrado) {
        alert('Aluno não encontrado!');
    }
}

// Limpar lista
function limparLista() {
    alunos.length = 0;
    mostrarAlunos();
    alert('Lista limpa!');
}

// Mostrar alunos na tabela
function mostrarAlunos() {
    const tabela = document.querySelector('#tabelaAlunos tbody');
    tabela.innerHTML = '';

    for (let aluno of alunos) {
        const linha = document.createElement('tr');

        linha.innerHTML = `
      <td>${aluno.nome}</td>
      <td>${isNaN(aluno.notas[0]) ? '-' : aluno.notas[0]}</td>
      <td>${isNaN(aluno.notas[1]) ? '-' : aluno.notas[1]}</td>
      <td>${isNaN(aluno.notas[2]) ? '-' : aluno.notas[2]}</td>
      <td>${aluno.media || '-'}</td>
    `;

        tabela.appendChild(linha);
    }
}

// Adicionar eventos aos botões
document.getElementById('btnAdicionar').onclick = adicionarAluno;
document.getElementById('btnCalcularTodas').onclick = calcularMedias;
document.getElementById('btnBuscar').onclick = buscarAluno;
document.getElementById('btnLimpar').onclick = limparLista;