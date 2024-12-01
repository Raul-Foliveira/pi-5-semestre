// routes/animalListRoutes.js
const express = require('express');
const pool = require('../db');  // Importando a conexão com o banco de dados
const router = express.Router();

// Rota para listar todos os animais
router.get('/listar', (req, res) => {
  const query = `
    SELECT id_animal, nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo
    FROM animais
    ORDER BY data_cadastro DESC
  `;

  pool.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao listar os animais: ', err);
      return res.status(500).json({ error: 'Erro ao listar os animais' });
    }
    return res.json(results); // Retorna os resultados em formato JSON
  });
});

module.exports = router;
