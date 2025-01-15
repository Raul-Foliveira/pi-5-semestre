import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/animals.module.css';

const FeaturedAnimals = () => {
    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        // Função para buscar os animais do backend
        const fetchAnimals = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/api/animals');  // URL da sua API backend
                const data = await response.json();
                console.log(data);  // Verifique o formato dos dados recebidos

                // Verifique se a resposta é um array
                if (Array.isArray(data)) {
                    setAnimals(data);  // Atualiza o estado com os dados dos animais
                } else {
                    console.error('Os dados recebidos não são um array:', data);
                }

                setLoading(false);  // Desativa o estado de loading
            } catch (error) {
                console.error('Erro ao buscar os animais:', error);
                setLoading(false);  // Desativa o loading mesmo com erro
            }
        };

        fetchAnimals();
    }, []);  // Executa apenas uma vez quando o componente é montado

    const handleAdoptClick = (id) => {
        router.push(`/pet/${id}`); // Verifique se a rota está correta
    };

    if (loading) {
        return <div>Carregando...</div>;  // Exibe mensagem de carregamento
    }

    return (
        <section className={styles.featured}>
            <h2>Animais em Destaque</h2>
            <div className={styles.animalGrid}>
                {animals.length > 0 ? (
                    animals.map((animal) => (
                        <div key={animal.id_animal} className={styles.animalCard}>
                            <img src="/images/jimmy.jpg" alt="jimmy" className={styles.imganimais}/>
                            <h3>{animal.nome}</h3>
                            <p>{animal.especie} - {animal.idade} anos</p>
                            <p>Tamanho: {animal.tamanho}</p>
                            <button onClick={() => handleAdoptClick(animal.id_animal)}>Adotar</button>
                        </div>
                    ))
                ) : (
                    <p>Nenhum animal encontrado.</p>
                )}
            </div>
        </section>
    );
};

export default FeaturedAnimals;
