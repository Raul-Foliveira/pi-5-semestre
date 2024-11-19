const mysql = require('mysql2');

const db = mysql.createConnection({
  host: '127.0.0.1',       // Usando o host correto
  port: 3306,              // Porta correta (3306 é a padrão para MySQL)
  user: 'Abrigo',          // Nome do usuário
  password: 'Leonel@110820',   // Senha do usuário
  database: 'abrigo_animais'  // Nome correto do banco de dados
});

db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão com o banco de dados estabelecida com sucesso');
});


// Exportando a conexão
module.exports = db;