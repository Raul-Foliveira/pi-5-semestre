const express = require('express');
const bcrypt = require('bcrypt'); // Importa o bcrypt para hash de senha
const router = express.Router();
const db = require('../db'); // Importa a conexão do banco de dados

// Rota para cadastrar um administrador
router.post('/api/admin', async (req, res) => {
    const { nome, email, senha, telefone, endereco } = req.body;

    // Validação básica
    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Nome, email e senha são obrigatórios!' });
    }

    try {
        // Verifica se o email já está cadastrado
        db.query(
            'SELECT id_admin FROM Administradores WHERE email = ?',
            [email],
            (err, rows) => {
                if (err) {
                    console.error('Erro ao consultar o banco de dados:', err);
                    return res.status(500).json({ message: 'Erro interno ao consultar o banco de dados' });
                }

                if (rows.length > 0) {
                    return res.status(409).json({ message: 'Email já cadastrado!' });
                }

                // Gera o hash da senha
                const saltRounds = 10;
                bcrypt.hash(senha, saltRounds, (err, hashedPassword) => {
                    if (err) {
                        console.error('Erro ao gerar hash da senha:', err);
                        return res.status(500).json({ message: 'Erro ao gerar hash da senha' });
                    }

                    // Insere o administrador no banco
                    const query = `
                        INSERT INTO Administradores (nome, email, senha, telefone, endereco)
                        VALUES (?, ?, ?, ?, ?)
                    `;
                    const values = [nome, email, hashedPassword, telefone || null, endereco || null];
                    db.query(query, values, (err, results) => {
                        if (err) {
                            console.error('Erro ao inserir administrador:', err);
                            return res.status(500).json({ message: 'Erro ao cadastrar administrador' });
                        }

                        res.status(201).json({ message: 'Administrador cadastrado com sucesso!' });
                    });
                });
            }
        );
    } catch (error) {
        console.error('Erro ao cadastrar administrador:', error);
        res.status(500).json({ message: 'Erro interno no servidor.' });
    }
});

module.exports = router;
