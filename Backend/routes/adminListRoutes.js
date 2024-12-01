const express = require('express');
const router = express.Router();
const db = require('../db'); // Importe a conexão com o banco de dados

// Endpoint para listar administradores
router.get('/admins', async (req, res) => {
  try {
    const query = 'SELECT * FROM administradores'; // Consulta SQL para pegar todos os administradores
    db.query(query, (err, results) => {
      if (err) {
        console.error('Erro ao consultar administradores: ', err);
        return res.status(500).json({ error: 'Erro ao consultar administradores' });
      }
      return res.json(results); // Retorna os administradores em formato JSON
    });
  } catch (error) {
    console.error('Erro inesperado: ', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});



router.put('/admins/:id', async (req, res) => {
    const { id } = req.params; // Pega o ID do administrador a ser atualizado
    const { nome, email, telefone } = req.body; // Pega os dados atualizados
  
    // Verifique se todos os campos necessários foram fornecidos
    if (!nome || !email || !telefone) {
      return res.status(400).json({ error: 'Todos os campos (nome, email, telefone) são obrigatórios' });
    }
  
    try {
      const query = `
        UPDATE administradores 
        SET nome = ?, email = ?, telefone = ? 
        WHERE id_admin = ?
      `;
  
      // Log para garantir que estamos recebendo os dados corretamente
      console.log('Dados recebidos para atualização:', nome, email, telefone);
  
      db.query(query, [nome, email, telefone, id], (err, results) => {
        if (err) {
          console.error('Erro ao atualizar administrador: ', err);
          return res.status(500).json({ error: 'Erro ao atualizar administrador' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        return res.status(200).json({ message: 'Administrador atualizado com sucesso' });
      });
    } catch (error) {
      console.error('Erro inesperado: ', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  

  

/// Endpoint para excluir um administrador
router.delete('/admins/:id', async (req, res) => {
    const { id } = req.params; // Pega o id do administrador a ser excluído
    try {
      const query = 'DELETE FROM administradores WHERE id_admin = ?'; // A consulta SQL para excluir o administrador
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error('Erro ao excluir administrador: ', err);
          return res.status(500).json({ error: 'Erro ao excluir administrador' });
        }
        if (results.affectedRows === 0) {
          return res.status(404).json({ error: 'Administrador não encontrado' });
        }
        return res.status(200).json({ message: 'Administrador excluído com sucesso' });
      });
    } catch (error) {
      console.error('Erro inesperado: ', error);
      res.status(500).json({ error: 'Erro interno do servidor' });
    }
  });
  

module.exports = router;
