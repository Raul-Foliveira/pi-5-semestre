// src/components/AnimalButtons.js

import React from "react";
import { useRouter } from "next/router";
import styles from "../styles/animalButtons.module.css";

const AnimalButtons = () => {
  const router = useRouter();

  // Funções para navegar para as páginas de raças de cães e gatos
  const goToDogBreeds = () => router.push("/dogs");
  const goToCatBreeds = () => router.push("/cats");

  return (
    <div className={styles.buttonsContainer}>
      <div className={styles.buttonWrapper}>
        <button onClick={goToDogBreeds} className={styles.button}>
          Conheça todas as raças de cachorros
        </button>
        <p className={styles.description}>
          Conheça todos os cuidados, dicas e características sobre cada raça de cachorro.
        </p>
      </div>
      <div className={styles.buttonWrapper}>
        <button onClick={goToCatBreeds} className={styles.button}>
          Conheça todas as raças de gatos
        </button>
        <p className={styles.description}>
          Descubra todos os cuidados, dicas e características sobre cada raça de gato.
        </p>
      </div>
    </div>
  );
};

export default AnimalButtons;
