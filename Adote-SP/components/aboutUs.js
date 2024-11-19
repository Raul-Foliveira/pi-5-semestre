import React from 'react';
import styles from '../styles/aboutUs.module.css';

const AboutUs = () => {
    return (
        <section id="about-us" className={styles.aboutUs}>
            <h2>Sobre nós</h2>
            <div className={styles.content}>
                <p>
                    A Patas Unidas é uma organização dedicada a facilitar a adoção de cães e gatos na cidade de São Paulo. 
                    Nosso objetivo é unir pessoas que estão prontas para dar um lar cheio de carinho aos animais que resgatamos e cuidamos com amor. 
                    Acreditamos que cada animal merece uma segunda chance e trabalhamos para tornar isso possível, criando um ambiente de acolhimento e suporte tanto para os pets quanto para os adotantes.
                </p>
                <p>
                    Se você quer fazer a diferença na vida de um animal, venha conhecer nossos projetos e eventos. 
                    Juntos, podemos construir um futuro melhor, uma adoção por vez!
                </p>
            </div>
        </section>
    );
};

export default AboutUs;
