// routes/adoptionFormRoutes.js
const express = require('express');
const db = require('../db'); // Importa a conexão com o banco de dados

const router = express.Router();

// Rota para inserir dados do formulário de adoção
router.post('/submitAdoptionForm', (req, res) => {
  const {
    nome,
    cpf,
    email,
    telefone,
    motivo_adocao,
    experiencia_cuidados,
    espaco_adequado,
    disponibilidade_tempo,
    responsabilidades_adocao,
    compatibilidade_animais,
    concorda_com_orientacoes,
    concorda_com_atualizacoes,
    idade,
  } = req.body;

  // Validação dos dados (opcional)
  if (!nome || !cpf || !email || !telefone) {
    return res.status(400).json({ success: false, message: 'Campos obrigatórios não preenchidos!' });
  }

  // Query para inserir os dados
  const query = `
    INSERT INTO formularios_adocao 
    (nome, cpf, email, telefone, motivo_adocao, experiencia_cuidados, espaco_adequado, 
     disponibilidade_tempo, responsabilidades_adocao, compatibilidade_animais, concorda_com_orientacoes, 
     concorda_com_atualizacoes, idade) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [
    nome, cpf, email, telefone, motivo_adocao, experiencia_cuidados, espaco_adequado,
    disponibilidade_tempo, responsabilidades_adocao, compatibilidade_animais, concorda_com_orientacoes,
    concorda_com_atualizacoes, idade,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Erro ao salvar dados:', err);
      return res.status(500).json({ success: false, message: 'Erro ao salvar os dados no banco' });
    }
    res.json({ success: true, message: 'Formulário enviado com sucesso!' });
  });
});

// Exporta o router para ser usado no server.js
module.exports = router;
