// server.js

const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animals'); // Rotas para animais
const adminRoutes = require('./routes/adminRegisterRoutes');
const adminLoginRoutes = require('./routes/adminLoginRoutes');
const adminListRoutes = require('./routes/adminListRoutes');
const animalListRoutes = require('./routes/animalListRoutes');
const adoptionFormRoutes = require('./routes/adoptionFormRoutes'); // Importe a rota de formulário de adoção

const app = express();

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite requisições JSON

// Rotas
app.use(animalRoutes); // Rotas para animais
app.use(adminRoutes); // Rotas de registro de admin
app.use(adminLoginRoutes); // Rotas de login de admin
app.use(adminListRoutes); // Rota de listagem de administradores
app.use(animalListRoutes); // Rota de listagem de animais
app.use(adoptionFormRoutes); // Rota de submissão do formulário de adoção

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
