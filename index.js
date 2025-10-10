    const nomes = [];
    const notas1 = [];
    const notas2 = [];
    const medias = [];

    function normalizarNome(nome) {
      return nome.trim().toUpperCase();
    }

    function cadastrarAluno() {
      const nomeInput = document.getElementById("nome").value;
      const nota1 = parseFloat(document.getElementById("nota1").value);
      const nota2 = parseFloat(document.getElementById("nota2").value);

      if (!nomeInput || isNaN(nota1) || isNaN(nota2)) {
        alert("Preencha todos os campos corretamente.");
        return;
      }

      const nome = normalizarNome(nomeInput);
      const media = (nota1 + nota2) / 2;

      nomes.push(nome);
      notas1.push(nota1);
      notas2.push(nota2);
      medias.push(media);

      mostrarAlunos();
      limparCampos();
    }

    function mostrarAlunos() {
      const lista = document.getElementById("listaAlunos");
      lista.innerHTML = "";

      for (let i = 0; i < nomes.length; i++) {
        lista.innerHTML += `
          <div class="aluno">
            <strong>Nome:</strong> ${nomes[i]}<br>
            <strong>Nota 1:</strong> ${notas1[i]}<br>
            <strong>Nota 2:</strong> ${notas2[i]}<br>
            <strong>Média:</strong> ${medias[i].toFixed(2)}
          </div>
        `;
      }
    }

    function limparCampos() {
      document.getElementById("nome").value = "";
      document.getElementById("nota1").value = "";
      document.getElementById("nota2").value = "";
    }

    function calcularMediaTurma() {
      if (medias.length === 0) {
        document.getElementById("mediaTurma").innerText = "Nenhum aluno cadastrado.";
        return;
      }

      let soma = 0;
      for (let i = 0; i < medias.length; i++) {
        soma += medias[i];
      }

      const mediaTurma = soma / medias.length;
      document.getElementById("mediaTurma").innerText = `Média da turma: ${mediaTurma.toFixed(2)}`;
    }

    function buscarAluno() {
      const busca = normalizarNome(document.getElementById("buscaNome").value);
      const index = nomes.indexOf(busca);

      const resultado = document.getElementById("listaAlunos");
      resultado.innerHTML = "";

      if (index !== -1) {
        resultado.innerHTML = `
          <div class="aluno">
            <strong>Nome:</strong> ${nomes[index]}<br>
            <strong>Nota 1:</strong> ${notas1[index]}<br>
            <strong>Nota 2:</strong> ${notas2[index]}<br>
            <strong>Média:</strong> ${medias[index].toFixed(2)}
          </div>
        `;
      } else {
        resultado.innerHTML = `<p>Aluno não encontrado.</p>`;
      }
    }
