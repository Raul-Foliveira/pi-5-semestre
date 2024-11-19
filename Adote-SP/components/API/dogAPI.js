// components/API/dogAPI.js

// URL base da Dog CEO API
const BASE_URL = 'https://dog.ceo/api';

// Função para obter imagens de uma raça específica de cão
export const fetchDogImages = async (breed) => {
    try {
        const response = await fetch(`${BASE_URL}/breed/${breed}/images/random/3`);
        const data = await response.json();
        return data.message; // Array de URLs das imagens de cães
    } catch (error) {
        console.error("Erro ao buscar imagens de cães:", error);
        return [];
    }
};
