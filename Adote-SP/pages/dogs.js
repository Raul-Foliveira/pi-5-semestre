import { useState, useEffect } from 'react';
import styles from '../styles/dogsList.module.css';

const DogPage = () => {
  const [dogs, setDogs] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState(null);
  const [selectedBreedDetails, setSelectedBreedDetails] = useState(null); // Novo estado para os detalhes da raça

  // Função para buscar os cães (agora com filtro por raça)
  const fetchDogs = async (breedId = null) => {
    try {
      let url = 'https://api.thedogapi.com/v1/images/search?limit=10';
      if (breedId) {
        url = `https://api.thedogapi.com/v1/images/search?limit=10&breed_ids=${breedId}`; // Busca cães da raça selecionada
      }

      const response = await axios.get(url, {
        headers: {
          'x-api-key': process.env.REACT_APP_DOG_API_KEY, // Sua chave de API
        }
      });
      setDogs(response.data);
    } catch (error) {
      console.error('Erro ao buscar cães:', error);
    }
  };

  // Função para buscar as raças
  const fetchBreeds = async () => {
    try {
      const response = await axios.get('https://api.thedogapi.com/v1/breeds', {
        headers: {
          'x-api-key': process.env.REACT_APP_DOG_API_KEY,
        }
      });
      setBreeds(response.data);
    } catch (error) {
      console.error('Erro ao buscar raças:', error);
    }
  };

  // Função para buscar os detalhes de uma raça
  const fetchBreedDetails = async (breedId) => {
    try {
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${breedId}`, {
        headers: {
          'x-api-key': process.env.REACT_APP_DOG_API_KEY,
        }
      });
      setSelectedBreedDetails(response.data); // Salva os detalhes da raça selecionada
    } catch (error) {
      console.error('Erro ao buscar detalhes da raça:', error);
    }
  };

  // Executa as funções ao carregar a página
  useEffect(() => {
    fetchDogs(); // Chama a função de cães ao iniciar a página
    fetchBreeds(); // Chama a função de raças
  }, []);

  // Quando o usuário escolhe uma raça, chamamos a função de busca novamente para filtrar os cães e os detalhes da raça
  const handleBreedSelect = (breedId) => {
    setSelectedBreedDetails(null); // Limpa os detalhes da raça selecionada
    fetchDogs(breedId); // Faz a requisição filtrando pela raça
    fetchBreedDetails(breedId); // Busca os detalhes da raça selecionada
  };

  return (
    <div className={styles.dogsContainer}>
      <h1>Veja os Cães Disponíveis</h1>

      {/* Filtro para selecionar uma raça */}
      <div className={styles.filter}>
        <label htmlFor="breed">Filtrar por Raça:</label>
        <select id="breed" onChange={(e) => handleBreedSelect(e.target.value)} defaultValue="">
          <option value="">Selecione uma raça</option>
          {breeds.map((breed) => (
            <option key={breed.id} value={breed.id}>
              {breed.name}
            </option>
          ))}
        </select>
      </div>

      {/* Exibe as imagens dos cães */}
      <div className={styles.dogList}>
        {dogs.map((dog) => (
          <div key={dog.id} className={styles.dogCard}>
            <img src={dog.url} alt="Dog" className={styles.dogImage} />
          </div>
        ))}
      </div>

      {/* Exibe os detalhes da raça selecionada */}
      {selectedBreedDetails && (
        <div className={styles.breedDetails}>
          <h2>{selectedBreedDetails.name}</h2>
          <p><strong>Descrição:</strong> {selectedBreedDetails.description || "Não disponível"}</p>
          <p><strong>Temperamento:</strong> {selectedBreedDetails.temperament || "Não disponível"}</p>
          <p><strong>Expectativa de vida:</strong> {selectedBreedDetails.life_span} anos</p>
          <p><strong>Peso médio:</strong> {selectedBreedDetails.weight?.metric || "Não disponível"} kg</p>
          <p><strong>Altura média:</strong> {selectedBreedDetails.height?.metric || "Não disponível"}</p>
          <p><strong>Função original:</strong> {selectedBreedDetails.bred_for || "Não disponível"}</p>
          <p><strong>Origem:</strong> {selectedBreedDetails.origin || "Não disponível"}</p>
        </div>
      )}
    </div>
  );
};

export default DogPage;
