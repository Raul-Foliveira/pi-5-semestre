// components/DogGallery.js
//API DO BOTAO PROXIMO AO FOOTER
import React, { useState, useEffect } from 'react';
import { fetchDogImages } from './API/dogAPI';
import styles from '../styles/DogGallery.module.css';

const DogGallery = ({ breed }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            const dogImages = await fetchDogImages(breed);
            setImages(dogImages);
        };
        loadImages();
    }, [breed]);

    return (
        <div className={styles.gallery}>
            <h2>Imagens de {breed}</h2>
            <div className={styles.imagesContainer}>
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Imagem de um ${breed}`} className={styles.image} />
                ))}
            </div>
        </div>
    );
};

export default DogGallery;
