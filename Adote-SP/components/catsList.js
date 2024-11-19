import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/catsList.module.css';

const CatsList = () => {
    const [cats, setCats] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchCats = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://api.thecatapi.com/v1/images/search?limit=10', {
                    headers: {
                        'x-api-key': 'YOUR_API_KEY_HERE',  // Substitua pela sua chave API
                    },
                });
                setCats(response.data); // Armazena as imagens de gatos
            } catch (error) {
                console.error("Erro ao buscar gatos:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCats();
    }, []);

    return (
        <div className={styles.catContainer}>
            <h1>Veja os Gatos Disponíveis</h1>
            {loading ? (
                <p>Carregando...</p>
            ) : (
                <div className={styles.catList}>
                    {cats.map((cat, index) => (
                        <div key={index} className={styles.catCard}>
                            <img src={cat.url} alt={`Cat ${index}`} className={styles.catImage} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CatsList;
