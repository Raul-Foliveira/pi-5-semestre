import styles from '../styles/sideBar.module.css';
import { useRouter } from 'next/router';

const Sidebar = ({ onFilterChange }) => {
    const router = useRouter();

    const handleBackButtonClick = () => {
        router.push('/'); // Rota do banner ou página principal
    };

    const handleFilterClick = (filter) => {
        onFilterChange(filter); // Atualiza o filtro no estado principal
    };

    return (
        <div className={styles.sidebar}>
            <div className={styles.filterTitle}>
                <h1>Menu</h1>
                <h3>Ordenar por:</h3>
                <button onClick={() => handleFilterClick('idade')}>Ordenar por Idade</button>
                <button onClick={() => handleFilterClick('especie')}>Ordenar por Espécie</button>
                <button onClick={() => handleFilterClick('')}>Limpar Filtro</button>
                <button className={styles.backButton} onClick={handleBackButtonClick}>
                Voltar à página inicial
            </button>
            </div>
        </div>
    );
};

export default Sidebar;
