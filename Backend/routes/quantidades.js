const express = require('express');
const db = require('../db'); // Importando o arquivo de conexão com o banco
const router = express.Router();

// Rota para buscar o total de animais
router.get('/total-animais', (req, res) => {
    const query = 'SELECT COUNT(*) AS total FROM animais WHERE status = "disponivel"'; // Conta os animais disponíveis
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar total de animais.' });
        }
        res.json(results[0].total);
    });
});

// Rota para buscar as adoções realizadas no mês
router.get('/adoções-realizadas', (req, res) => {
    const query = `SELECT COUNT(*) AS total FROM adocoes WHERE MONTH(data_adocao) = MONTH(CURRENT_DATE)`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar adoções realizadas.' });
        }
        res.json(results[0].total);
    });
});

// Rota para buscar o número de novos administradores
router.get('/novos-administradores', (req, res) => {
    const query = `SELECT COUNT(*) AS total FROM administradores WHERE MONTH(data_cadastro) = MONTH(CURRENT_DATE)`;
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Erro ao buscar novos administradores.' });
        }
        res.json(results[0].total);
    });
});

module.exports = router;
