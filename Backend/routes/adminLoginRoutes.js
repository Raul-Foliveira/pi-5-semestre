// adminLoginRoutes.js
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../db'); // Conexão com o banco de dados

// Rota para login de administrador
router.post('/api/admin/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email e senha são obrigatórios!' });
    }

    try {
        db.query(
            'SELECT id_admin, senha FROM Administradores WHERE email = ?',
            [email],
            (err, rows) => {
                if (err) {
                    console.error('Erro ao consultar o banco de dados:', err);
                    return res.status(500).json({ message: 'Erro interno ao consultar o banco de dados' });
                }

                if (rows.length === 0) {
                    return res.status(404).json({ message: 'Administrador não encontrado' });
                }

                const administrador = rows[0];
                const hashedPassword = administrador.senha;

                bcrypt.compare(senha, hashedPassword, (err, result) => {
                    if (err) {
                        console.error('Erro ao comparar senhas:', err);
                        return res.status(500).json({ message: 'Erro ao comparar senhas' });
                    }

                    if (result) {
                        res.status(200).json({ message: 'Login bem-sucedido', id_admin: administrador.id_admin });
                    } else {
                        res.status(401).json({ message: 'Senha incorreta' });
                    }
                });
            }
        );
    } catch (error) {
        console.error('Erro ao processar o login:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

module.exports = router;
