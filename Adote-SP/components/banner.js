import { useRouter } from 'next/router';
import styles from '../styles/banner.module.css';

const Banner = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        router.push('/animais-disponiveis'); // Redireciona para a página dos animais
    };

    return (
        <section className={styles.banner}>
            <div className={styles.bannerContent}>
                {/* Texto à esquerda */}
                <div className={styles.bannerText}>
                    <h1>Encontre seu novo <strong>melhor amigo</strong></h1>
                    <h2>Adote cães e gatos em São Paulo e dê um lar cheio de amor.</h2>
                    <p>Faça a diferença. Adotar é transformar vidas — tanto a sua quanto a deles!</p>
                    <p>Quando você adota, não está apenas salvando um animal, mas está enriquecendo sua vida com lealdade e amor incondicional.</p>
                    <p>Eles são companheiros, guardiões e trazem alegria para o seu lar. Ao adotar, você dá ao seu novo amigo a oportunidade de ter um lar cheio de carinho e cuidado.</p>
                    <button onClick={handleButtonClick}>Ver Animais Disponíveis</button>
                </div>

                {/* Imagem à direita */}
                <div className={styles.bannerImage}>
                    <img src="/images/banner2.jpg" alt="Imagem de adoção de pets" />
                </div>
            </div>
        </section>
    );
};

export default Banner;
