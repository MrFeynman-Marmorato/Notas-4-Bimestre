// Função para buscar as notas do aluno com base no registro, senha e série
function getNotasAluno(registroAluno, senhaAluno, serie) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(serie); // Utiliza a série para escolher a aba correta
  if (!sheet) {
    return { error: "Série não encontrada." };
  }

  const data = sheet.getDataRange().getValues();
  const headers = data[0]; // Captura os cabeçalhos das colunas

  for (let i = 1; i < data.length; i++) { // Começando em 1 para pular o cabeçalho
    if (data[i][1] == registroAluno && data[i][headers.length - 1] == senhaAluno) { // Verificando o registro e a senha
      let notas = {}; // Objeto que armazenará as notas dinamicamente
      for (let j = 3; j < headers.length - 1; j++) { // Começa na coluna 3 (onde começam as notas) e vai até a penúltima (antes da senha)
        notas[headers[j]] = data[i][j]; // Armazena a nota com o nome da coluna
      }
      return notas; // Retorna o objeto com as notas
    }
  }
  return { error: "Registro ou senha incorretos." };
}

// Função para expor a API web
function doGet(e) {
  const registroAluno = e.parameter.registro;
  const senhaAluno = e.parameter.senha;
  const serie = e.parameter.serie; // Captura a série selecionada pelo usuário
  const resultado = getNotasAluno(registroAluno, senhaAluno, serie);
  return ContentService.createTextOutput(JSON.stringify(resultado)).setMimeType(ContentService.MimeType.JSON);
}
