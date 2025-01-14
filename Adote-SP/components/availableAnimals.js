import { useRouter } from 'next/router';
import styles from '../styles/animals.module.css';

const AvailableAnimals = ({ animals }) => {
    const router = useRouter();

    const handleAdoption = (animal) => {
        console.log('Iniciando processo de adoção para', animal.nome);
        // Redireciona para a página de adoção, passando o ID do animal como parâmetro na URL
        router.push(`/adoptionForm?id=${animal.id_animal}`);
    };

    return (
        <section className={styles.featured}>
            <h2>Animais Disponíveis para Adoção</h2>
            <div className={styles.animalGrid}>
                {animals.length === 0 ? (
                    <p>Nenhum animal encontrado.</p>
                ) : (
                    animals.map((animal) => (
                        <div key={animal.id_animal} className={styles.animalCard}>
                            {/* Exibe a primeira foto ou uma imagem padrão */}
                            <img src="/images/jimmy.jpg" alt="Patas Unidas" className={styles.logoImage} />
                            <h3>{animal.nome}</h3>
                            <p>{animal.especie} - {animal.idade} anos</p>
                            <button onClick={() => handleAdoption(animal)}>Adotar</button>
                        </div>
                    ))
                )}
            </div>
        </section>
    );
};

export default AvailableAnimals;
