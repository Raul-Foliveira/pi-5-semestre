import React, { useEffect, useState } from 'react';
import '@/styles/globals.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FeaturedAnimals from './components/FeaturedAnimals';
import PetDetails from './components/PetDetails';

const App = () => {
    const [animals, setAnimals] = useState([]);

    useEffect(() => {
        // Função para buscar os animais do backend
        const fetchAnimals = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/animals');  // URL da API backend
                const data = await response.json();
                setAnimals(data);  // Atualiza o estado com os dados dos animais
            } catch (error) {
                console.error('Erro ao buscar os animais:', error);
            }
        };

        fetchAnimals();
    }, []);  // Executa a busca apenas uma vez quando o componente for montado

    return (
        <Router>
            <Switch>
                <Route path="/" exact>
                    <FeaturedAnimals animals={animals} />
                </Route>
                <Route path="/pet/:id" render={({ match }) => {
                    const pet = animals.find(animal => animal.id_animal === parseInt(match.params.id));
                    return pet ? <PetDetails pet={pet} /> : <div>Pet não encontrado</div>;
                }} />
            </Switch>
        </Router>
    );
};

export default App;
