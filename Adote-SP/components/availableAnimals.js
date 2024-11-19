import styles from '../styles/animals.module.css';

const AvailableAnimals = ({ animals }) => {
    return (
        <section className={styles.featured}>
            <h2>Animais Disponíveis para Adoção</h2>
            <div className={styles.animalGrid}>
                {animals.length === 0 ? (
                    <p>Nenhum animal encontrado.</p>
                ) : (
                    animals.map(animal => (
                        <div key={animal.id_animal} className={styles.animalCard}>
                            {/* Exibe a primeira foto ou uma imagem padrão */}
                            <img 
                                src={animal.fotos.length > 0 ? animal.fotos[0].url : '/images/cat-gif.gif'} 
                                alt={animal.nome} 
                                className={styles.animalImage}
                            />
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

const handleAdoption = (animal) => {
    console.log('Iniciando processo de adoção para', animal.nome);
    // Aqui você pode redirecionar o usuário para uma página de adoção ou mostrar um modal
};

export default AvailableAnimals;
