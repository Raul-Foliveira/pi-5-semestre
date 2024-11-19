// backend/routes/adminRoutes.js
const express = require('express');
const db = require('../db');
const router = express.Router();

// Rota para obter todos os administradores
router.get('/', (req, res) => {
  db.query('SELECT * FROM Administradores', (err, results) => {
    if (err) {
      console.error('Erro ao obter administradores:', err);
      return res.status(500).json({ error: 'Erro ao obter administradores' });
    }
    res.json(results);
  });
});

// Rota para obter um administrador por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM Administradores WHERE id_admin = ?', [id], (err, results) => {
    if (err) {
      console.error('Erro ao obter administrador:', err);
      return res.status(500).json({ error: 'Erro ao obter administrador' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json(results[0]);
  });
});

// Rota para adicionar um novo administrador
router.post('/', (req, res) => {
  const { nome, email, senha, telefone, endereco } = req.body;
  const query = 'INSERT INTO Administradores (nome, email, senha, telefone, endereco) VALUES (?, ?, ?, ?, ?)';
  db.query(query, [nome, email, senha, telefone, endereco], (err, result) => {
    if (err) {
      console.error('Erro ao cadastrar administrador:', err);
      return res.status(500).json({ error: 'Erro ao cadastrar administrador' });
    }
    res.status(201).json({ id_admin: result.insertId });
  });
});

// Rota para atualizar um administrador
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, telefone, endereco } = req.body;
  const query = 'UPDATE Administradores SET nome = ?, email = ?, senha = ?, telefone = ?, endereco = ? WHERE id_admin = ?';
  db.query(query, [nome, email, senha, telefone, endereco, id], (err, result) => {
    if (err) {
      console.error('Erro ao atualizar administrador:', err);
      return res.status(500).json({ error: 'Erro ao atualizar administrador' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json({ message: 'Administrador atualizado com sucesso' });
  });
});

// Rota para excluir um administrador
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM Administradores WHERE id_admin = ?';
  db.query(query, [id], (err, result) => {
    if (err) {
      console.error('Erro ao excluir administrador:', err);
      return res.status(500).json({ error: 'Erro ao excluir administrador' });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Administrador não encontrado' });
    }
    res.json({ message: 'Administrador excluído com sucesso' });
  });
});

module.exports = router;
