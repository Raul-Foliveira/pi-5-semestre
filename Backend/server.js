const express = require('express');
const cors = require('cors');
const animalRoutes = require('./routes/animals'); // Importa as rotas dos animais
const adminRoutes = require('./routes/adminRegisterRoutes');
const adminLoginRoutes = require('./routes/adminLoginRoutes');// Certifique-se de que esta linha está correta

const app = express();

// Middleware
app.use(cors()); // Habilita CORS para permitir conexões do frontend
app.use(express.json()); // Lida com requisições JSON

// Rotas
app.use(animalRoutes); // Usa as rotas dos animais
app.use(adminRoutes); // Usa as rotas de registro de administrador
app.use(adminLoginRoutes);

// Porta do servidor
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://127.0.0.1:${PORT}`);
});
