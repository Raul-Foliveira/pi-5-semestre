const express = require('express');
const cors = require('cors');

// Importando as rotas
const animalRoutes = require('./routes/animals');
const adminRoutes = require('./routes/adminRegisterRoutes');
const adminLoginRoutes = require('./routes/adminLoginRoutes');
const adminListRoutes = require('./routes/adminListRoutes');
const animalListRoutes = require('./routes/animalListRoutes');
const adoptionFormRoutes = require('./routes/adoptionFormRoutes');
const registerAnimalRoutes = require('./routes/registerAnimalRoutes');
const formRoutes = require('./routes/formRoutes');
const historicoRoutes = require('./routes/historicoRoutes'); // Importando a rota de histórico de formulários
const quantidades = require('./routes/quantidades'); // Importando a rota de histórico de formulários

const app = express();

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Permite requisições JSON

// Usando as rotas
app.use(animalRoutes);
app.use(adminRoutes);
app.use(adminLoginRoutes);
app.use(adminListRoutes);
app.use(animalListRoutes);
app.use(adoptionFormRoutes);
app.use(registerAnimalRoutes);
app.use(formRoutes);
app.use(historicoRoutes); // Adicionando as rotas de histórico de formulários
app.use(quantidades);

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});

