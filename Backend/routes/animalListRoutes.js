const express = require('express');
const pool = require('../db'); // Importa a conexão com o banco de dados
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

// Rota para editar um animal
router.put('/editar/:id', (req, res) => {
  const { id } = req.params;
  const { nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo } = req.body;

  const query = `
    UPDATE animais
    SET 
      nome = ?,
      especie = ?,
      tamanho = ?,
      descricao = ?,
      localizacao = ?,
      data_nascimento = ?,
      sexo = ?
    WHERE id_animal = ?
  `;

  const values = [nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo, id];

  pool.query(query, values, (err, results) => {
    if (err) {
      console.error('Erro ao editar o animal: ', err);
      return res.status(500).json({ error: 'Erro ao editar o animal' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    return res.json({ message: 'Animal atualizado com sucesso' });
  });
});

// Rota para excluir um animal
router.delete('/deletar/:id', (req, res) => {
  const { id } = req.params;

  const query = `
    DELETE FROM animais
    WHERE id_animal = ?
  `;

  pool.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir o animal: ', err);
      return res.status(500).json({ error: 'Erro ao excluir o animal' });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: 'Animal não encontrado' });
    }

    return res.json({ message: 'Animal excluído com sucesso' });
  });
});

module.exports = router;