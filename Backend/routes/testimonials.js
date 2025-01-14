const express = require('express');
const db = require('../db'); // Conexão com o banco de dados

const router = express.Router();

// Lista de palavras proibidas para análise
const palavrasProibidas = [
    'violência', 'abuso', 'discriminação', 'xenofobia', 'racismo', // Exemplo de palavras, adicione mais conforme necessário
    'discurso de ódio', 'agressão', 'sexo', 'pornografia', 'exploração infantil'
];

// Função para analisar o depoimento e verificar se contém palavras proibidas
function analisarDepoimento(depoimento) {
    // Converte o texto para minúsculas para uma análise insensível ao caso
    for (let palavra of palavrasProibidas) {
        if (depoimento.toLowerCase().includes(palavra)) {
            return true;  // Se encontrar uma palavra proibida
        }
    }
    return false;  // Se não encontrar palavras proibidas
}

// Endpoint para buscar depoimentos aprovados
router.get('/api/testimonials', (req, res) => {
    const query = `
        SELECT 
            aval.id_avaliacao AS id,
            ad.nome AS nome_administrador,
            aval.depoimento
        FROM avaliacoes aval
        JOIN administradores ad ON aval.id_admin = ad.id_admin
        WHERE aval.status = 'aprovado';
    `;

    db.query(query, (err, results) => {
        if (err) {
            console.error('Erro ao buscar depoimentos:', err);
            return res.status(500).json({ message: 'Erro ao buscar depoimentos' });
        }

        // Filtrando os depoimentos que não contêm palavras proibidas
        const depoimentosFiltrados = results.filter((item) => {
            return !analisarDepoimento(item.depoimento); // Só mantém os depoimentos sem palavras proibidas
        });

        res.json(depoimentosFiltrados);  // Retorna apenas os depoimentos sem palavras proibidas
    });
});

module.exports = router;
