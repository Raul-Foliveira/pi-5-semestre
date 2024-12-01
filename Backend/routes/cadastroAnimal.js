const express = require('express');
const router = express.Router();
const db = require('../db'); // Conexão com o banco de dados
const multer = require('multer'); // Para lidar com uploads de arquivos
const path = require('path');

// Configuração do multer para upload de fotos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Pasta onde as fotos serão armazenadas
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Nome único para a foto
    }
});

const upload = multer({ storage: storage });

// Rota POST para cadastrar um animal
router.post('/', upload.single('foto'), (req, res) => {
    const { nome, especie, tamanho, descricao, localizacao, data_nascimento, sexo, id_admin } = req.body;
    const foto = req.file ? `/uploads/${req.file.filename}` : null; // Caminho para a foto

    // Verificar se todos os campos obrigatórios estão presentes
    if (!nome || !especie || !tamanho || !sexo || !id_admin) {
        return res.status(400).json({ message: 'Campos obrigatórios ausentes' });
    }

    const dataCadastro = new Date();

    // Inserir o animal na tabela "animais"
    const query = `
        INSERT INTO animais (nome, especie, tamanho, descricao, localizacao, data_nascimento, id_admin, data_cadastro, sexo)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [nome, especie, tamanho, descricao, localizacao, data_nascimento, id_admin, dataCadastro, sexo];

    db.query(query, values, (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Erro ao cadastrar animal' });
        }

        // Se houver foto, também cadastrar na tabela "fotos"
        if (foto) {
            const animalId = result.insertId; // ID do animal recém-criado
            const fotoQuery = `
                INSERT INTO fotos (id_animal, url, ordem) 
                VALUES (?, ?, ?)
            `;
            const fotoValues = [animalId, foto, 1]; // Ordem da foto (pode ser 1, se for a principal)

            db.query(fotoQuery, fotoValues, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ message: 'Erro ao cadastrar foto' });
                }
                res.status(201).json({ message: 'Animal e foto cadastrados com sucesso!' });
            });
        } else {
            res.status(201).json({ message: 'Animal cadastrado com sucesso, sem foto.' });
        }
    });
});

module.exports = router;
