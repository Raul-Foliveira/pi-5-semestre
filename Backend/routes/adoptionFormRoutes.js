const express = require('express');
const router = express.Router();
const db = require('../db'); // Certifique-se de importar a conexão com o banco de dados

// Rota para salvar o formulário de adoção no banco de dados
router.post('/submitAdoptionForm', (req, res) => {
    const {
        fullName, cpf, email, phone, reason, experience, space, timeAvailability, responsibilities,
        petCompatibility, agreeToFollowGuidelines, agreeToProvideUpdates, age
    } = req.body;

    // Prepara a consulta SQL para inserir os dados no banco
    const query = `
        INSERT INTO formularios_adocao 
        (full_name, cpf, email, phone, reason, experience, space, 
        time_availability, responsibilities, pet_compatibility, 
        agree_to_follow_guidelines, agree_to_provide_updates, age)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    // Executa a consulta para inserir os dados
    db.query(query, [
        fullName, cpf, email, phone, reason, experience, space, 
        timeAvailability, responsibilities, petCompatibility, 
        agreeToFollowGuidelines, agreeToProvideUpdates, age
    ], (err, result) => {
        if (err) {
            console.error('Erro ao inserir o formulário de adoção: ', err);
            return res.status(500).json({ error: 'Erro ao salvar o formulário de adoção' });
        }
        res.status(200).json({ message: 'Formulário de adoção enviado com sucesso!' });
    });
});

module.exports = router;
