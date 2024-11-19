const express = require('express');
const db = require('../db'); // Conexão com o banco de dados

const router = express.Router();

// Endpoint para buscar os animais com filtros
router.get('/api/animals', (req, res) => {
    const { filter } = req.query; // Captura o filtro da query string

    // Consulta base, calculando a idade a partir da data de nascimento
    let query = `
        SELECT 
            a.id_animal, 
            a.nome, 
            a.especie, 
            a.tamanho, 
            a.descricao, 
            a.localizacao, 
            a.data_nascimento, 
            a.data_cadastro,
            FLOOR(DATEDIFF(CURDATE(), a.data_nascimento) / 365) AS idade,  -- Calcula a idade
            GROUP_CONCAT(f.url ORDER BY f.ordem) AS fotos_url,  -- Concatena as fotos ordenadas
            COUNT(v.id_visualizacao) AS total_visualizacoes  -- Contagem das visualizações
        FROM Animais a
        LEFT JOIN Fotos f ON a.id_animal = f.id_animal  -- Faz a junção com a tabela de fotos
        LEFT JOIN Visualizacoes v ON a.id_animal = v.id_animal  -- Faz a junção com a tabela de visualizações
    `;

    // Adiciona GROUP BY corretamente
    query += `
        GROUP BY 
            a.id_animal, a.nome, a.especie, a.tamanho, a.descricao, 
            a.localizacao, a.data_nascimento, a.data_cadastro
    `;

    // Aplica filtros com base no parâmetro recebido
    if (filter === 'idade') {
        query += ' ORDER BY idade ASC'; // Ordenar por idade (mais jovens primeiro)
    } else if (filter === 'especie') {
        query += ' ORDER BY a.especie ASC'; // Ordenar por espécie
    }

    // Executa a consulta no banco de dados
    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao consultar os animais:', err);
            return res.status(500).json({ message: 'Erro ao consultar os animais' });
        }

        // Organiza os resultados para que cada animal tenha um array de fotos
        const animals = results.map(row => ({
            id_animal: row.id_animal,
            nome: row.nome,
            especie: row.especie,
            tamanho: row.tamanho,
            descricao: row.descricao,
            localizacao: row.localizacao,
            data_nascimento: row.data_nascimento,
            data_cadastro: row.data_cadastro,
            idade: row.idade,
            fotos: row.fotos_url ? row.fotos_url.split(',') : [],  // Converte a string de fotos em array
            total_visualizacoes: row.total_visualizacoes
        }));

        res.json(animals); // Retorna os dados dos animais com fotos
    });
});

// Endpoint para buscar detalhes de um animal específico
router.get('/api/animals/:id', (req, res) => {
    const idAnimal = req.params.id; // Captura o ID do animal na URL

    // Consulta detalhada de um animal específico
    let query = `
        SELECT 
            a.id_animal, 
            a.nome, 
            a.especie, 
            a.tamanho, 
            a.descricao, 
            a.localizacao, 
            a.data_nascimento, 
            a.data_cadastro,
            FLOOR(DATEDIFF(CURDATE(), a.data_nascimento) / 365) AS idade,  -- Calcula a idade
            GROUP_CONCAT(f.url ORDER BY f.ordem) AS fotos_url,  -- Concatena as fotos ordenadas
            COUNT(v.id_visualizacao) AS total_visualizacoes  -- Contagem das visualizações
        FROM Animais a
        LEFT JOIN Fotos f ON a.id_animal = f.id_animal  -- Faz a junção com a tabela de fotos
        LEFT JOIN Visualizacoes v ON a.id_animal = v.id_animal  -- Faz a junção com a tabela de visualizações
        WHERE a.id_animal = ?  -- Filtro pelo ID do animal
    `;

    // Executa a consulta no banco de dados
    db.query(query, [idAnimal], (err, results) => {
        if (err) {
            console.error('Erro ao consultar o animal:', err);
            return res.status(500).json({ message: 'Erro ao consultar o animal' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Animal não encontrado' });
        }

        // Organiza os resultados para que o animal tenha suas fotos e informações detalhadas
        const pet = results[0]; // Como é um único animal, pegamos o primeiro (e único) resultado
        const petDetails = {
            id_animal: pet.id_animal,
            nome: pet.nome,
            especie: pet.especie,
            tamanho: pet.tamanho,
            descricao: pet.descricao,
            localizacao: pet.localizacao,
            data_nascimento: pet.data_nascimento,
            data_cadastro: pet.data_cadastro,
            idade: pet.idade,
            fotos: pet.fotos_url ? pet.fotos_url.split(',') : [],  // Converte a string de fotos em array
            total_visualizacoes: pet.total_visualizacoes
        };

        res.json(petDetails); // Retorna os detalhes completos do animal
    });
});

module.exports = router;
