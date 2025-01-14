const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de que a conexão com o banco de dados está correta

// Rota para buscar os formulários históricos
router.get('/historico-formularios', (req, res) => {
  const query = 'SELECT * FROM formularios_adocao WHERE isCompleted = 1'; // Buscar formulários concluídos

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar históricos de formulários:', err);
      return res.status(500).json({ message: 'Erro ao buscar dados.' });
    }

    res.json(results); // Retorna os resultados no formato JSON
  });
});

module.exports = router;
