import { useState, useEffect } from 'react';
import AvailableAnimals from '../components/availableAnimals';
import Sidebar from '../components/sideBar';
import styles from '../styles/animais-disponiveis.module.css';

const AnimalsPage = () => {
    const [animals, setAnimals] = useState([]);
    const [filter, setFilter] = useState('');  // Estado para armazenar o filtro selecionado
    const [error, setError] = useState(null);  // Estado para armazenar mensagens de erro

    // Função para buscar os animais com o filtro
    const fetchAnimals = async (filter) => {
        try {
            const queryParam = filter ? `?filter=${filter}` : '';  // Adiciona o filtro como parâmetro de consulta
            const response = await fetch(`http://127.0.0.1:5000/api/animals${queryParam}`);
            if (!response.ok) {
                throw new Error('Erro ao buscar animais');
            }
            const data = await response.json();
            setAnimals(data);  // Atualiza o estado com os dados dos animais
            setError(null);  // Limpa qualquer erro anterior
        } catch (error) {
            console.error('Erro:', error);
            setError('Não foi possível carregar os animais. Tente novamente mais tarde.');  // Atualiza o estado com o erro
        }
    };

    // Atualiza os animais sempre que o filtro mudar
    useEffect(() => {
        fetchAnimals(filter);  // Recarrega os animais com o filtro
    }, [filter]);  // A dependência 'filter' faz com que a função seja chamada sempre que o filtro mudar

    // Função chamada ao selecionar um filtro na Sidebar
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);  // Atualiza o filtro no estado
    };

    return (
        <div className={styles.animalsPage}>
            <Sidebar onFilterChange={handleFilterChange} />  {/* Passa a função de atualização de filtro */}
            {error && <p className={styles.error}>{error}</p>}  {/* Exibe erro se houver */}
            <AvailableAnimals animals={animals} />  {/* Passa os dados dos animais para o componente */}
        </div>
    );
};

export default AnimalsPage;
