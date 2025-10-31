const students = [];

// Normalizar nomes
function normalizeName(raw) {
  if (!raw) return '';
  let s = raw.trim().replace(/\s+/g, ' ').toLowerCase();
  return s.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

// Converter string de notas em números
function parseGrades(raw) {
  if (!raw) return [];
  return raw.split(',').map(x => x.trim().replace(',', '.')).map(Number).filter(n => !isNaN(n));
}

// Adicionar aluno
function addStudent(nameRaw, gradesRaw) {
  const name = normalizeName(nameRaw);
  const grades = parseGrades(gradesRaw);
  if (!name) { showMessage('Nome inválido.'); return; }
  students.push({ name, grades, average: null });
  renderTable();
  showMessage(`Aluno "${name}" adicionado.`);
}

// Calcular médias (loop)
function calculateAverages() {
  for (let i = 0; i < students.length; i++) {
    const s = students[i];
    if (s.grades.length === 0) { s.average = null; continue; }
    let soma = 0;
    for (let j = 0; j < s.grades.length; j++) { soma += s.grades[j]; }
    s.average = +(soma / s.grades.length).toFixed(2);
  }
  renderTable();
  showMessage('Médias calculadas.');
}

// Busca sequencial
function sequentialSearch(nameRaw) {
  const name = normalizeName(nameRaw);
  for (let i = 0; i < students.length; i++) {
    if (students[i].name === name) return i;
  }
  return -1;
}

// Renderizar tabela
function renderTable() {
  const tbody = document.querySelector('#tabela tbody');
  tbody.innerHTML = '';
  students.forEach((s) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${s.name}</td>
      <td>${s.grades.join(', ') || '-'}</td>
      <td class="${s.average >= 7 ? 'avg-high' : ''}">${s.average ?? '-'}</td>
    `;
    tbody.appendChild(tr);
  });
}

// Mensagens
function showMessage(msg) {
  document.getElementById('mensagens').textContent = msg;
}

// Limpar lista
function clearAll() {
  students.length = 0;
  renderTable();
  showMessage('Lista de alunos limpa.');
}

// Eventos
window.onload = () => {
  document.getElementById('btnAdd').onclick = () => {
    addStudent(nome.value, notas.value);
    nome.value = ''; notas.value = '';
  };
  document.getElementById('btnCalc').onclick = () => calculateAverages();
  document.getElementById('btnSearch').onclick = () => {
    const idx = sequentialSearch(search.value);
    if (idx === -1) { showMessage('Aluno não encontrado.'); return; }
    const linhas = document.querySelectorAll('#tabela tbody tr');
    linhas.forEach(tr => tr.classList.remove('highlight'));
    linhas[idx].classList.add('highlight');
    linhas[idx].scrollIntoView({ behavior: 'smooth', block: 'center' });
    showMessage(`Aluno encontrado: ${students[idx].name}`);
  };
  document.getElementById('btnClear').onclick = () => clearAll();
};
