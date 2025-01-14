
const express = require('express');
const db = require('../db'); // Conexão com o banco de dados
const router = express.Router();

// Middleware para processar uploads de arquivos (base64 diretamente)
router.use(express.json({ limit: '10mb' })); // Aumentar o limite de tamanho, se necessário

// Rota para cadastrar um novo animal
router.post('/api/animals/register', async (req, res) => {
    try {
        const {
            nome,
            especie,
            tamanho,
            descricao,
            localizacao,
            data_nascimento,
            sexo,
            fotoBase64, // A imagem será enviada como base64 pelo frontend
        } = req.body;

        // Validação dos campos obrigatórios
        if (!nome || !especie || !tamanho || !descricao || !localizacao || !data_nascimento || !sexo) {
            return res.status(400).json({ message: 'Todos os campos são obrigatórios.' });
        }

        // Inserir os dados do animal na tabela 'animais'
        const sqlAnimal = `
            INSERT INTO animais (nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo, data_cadastro)
            VALUES (?, ?, ?, ?, ?, ?, ?, NOW())
        `;
        const valuesAnimal = [nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo];

        const [resultAnimal] = await db.promise().query(sqlAnimal, valuesAnimal);
        const idAnimal = resultAnimal.insertId;

        // Inserir a imagem na tabela 'fotos', se fornecida
        if (fotoBase64) {
            const sqlFoto = `
                INSERT INTO fotos (id_animal, url, ordem)
                VALUES (?, ?, ?)
            `;
            const valuesFoto = [idAnimal, fotoBase64, 1]; // `fotoBase64` contém a string base64 da imagem

            await db.promise().query(sqlFoto, valuesFoto);
            return res.status(201).json({ message: 'Animal registrado com sucesso e imagem salva!' });
        }

        res.status(201).json({ message: 'Animal registrado com sucesso sem imagem.' });
    } catch (err) {
        console.error('Erro ao cadastrar animal:', err);
        res.status(500).json({ message: 'Erro interno no servidor.', error: err.message });
    }
});

module.exports = router;
