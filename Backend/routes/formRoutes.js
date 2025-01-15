const express = require('express');
const db = require('../db'); // Sua configuração de banco de dados

const router = express.Router();

// Rota para pegar os formulários pendentes
router.get('/pendingForms', (req, res) => {
  const query = "SELECT * FROM formularios_adocao WHERE concorda_com_orientacoes = 'Sim'"; // Filtra os formulários completos

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erro ao buscar os formulários:', err);
      return res.status(500).json({ message: 'Erro ao buscar os formulários.' });
    }

    res.json(results); // Envia os resultados para o frontend
  });
});

// Rota para editar um formulário pendente
router.put('/pendingForms/:id', (req, res) => {
  const { id } = req.params;
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
    compatibilidade_animais
  } = req.body;

  const query = `
    UPDATE formularios_adocao
    SET
      nome = ?,
      cpf = ?,
      email = ?,
      telefone = ?,
      motivo_adocao = ?,
      experiencia_cuidados = ?,
      espaco_adequado = ?,
      disponibilidade_tempo = ?,
      responsabilidades_adocao = ?,
      compatibilidade_animais = ?
    WHERE id_form = ?
  `;

  db.query(query, [
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
    id
  ], (err, results) => {
    if (err) {
      console.error('Erro ao editar o formulário:', err);
      return res.status(500).json({ message: 'Erro ao editar o formulário.' });
    }

    res.json({ message: 'Formulário atualizado com sucesso.' });
  });
});

// Rota para excluir um formulário pendente
router.delete('/pendingForms/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM formularios_adocao WHERE id_form = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao excluir o formulário:', err);
      return res.status(500).json({ message: 'Erro ao excluir o formulário.' });
    }

    res.json({ message: 'Formulário excluído com sucesso.' });
  });
});

// Rota para marcar como concluído
router.put('/pendingForms/complete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE formularios_adocao SET isCompleted = 1 WHERE id_form = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao concluir o formulário:', err);
      return res.status(500).json({ message: 'Erro ao concluir o formulário.' });
    }

    res.json({ message: 'Formulário concluído com sucesso.' });
  });
});

// Rota para desmarcar como concluído
router.put('/pendingForms/uncomplete/:id', (req, res) => {
  const { id } = req.params;
  const query = 'UPDATE formularios_adocao SET isCompleted = 0 WHERE id_form = ?';

  db.query(query, [id], (err, results) => {
    if (err) {
      console.error('Erro ao desmarcar o formulário:', err);
      return res.status(500).json({ message: 'Erro ao desmarcar o formulário.' });
    }

    res.json({ message: 'Formulário desmarcado com sucesso.' });
  });
});

module.exports = router;
