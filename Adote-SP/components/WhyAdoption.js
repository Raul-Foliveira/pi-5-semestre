import styles from '../styles/whyAdoption.module.css';

const WhyAdoption = () => {
  return (
    <section className={styles.whyAdoption}>
      <h2>Por que a adoção é importante?</h2>
      <div className={styles.content}>
        <p>
          A adoção de animais não apenas oferece um novo lar para um pet que muitas vezes foi abandonado ou maltratado, 
          mas também ajuda a reduzir o número de animais sem teto nas ruas e nos abrigos. Ao adotar, você está salvando uma vida e dando ao seu novo amigo uma segunda chance de ser feliz.
        </p>
        <p>
          Além disso, a adoção promove a conscientização sobre a posse responsável, incentivando mais pessoas a cuidarem bem de seus animais e a considerarem adotar em vez de comprar. 
          A adoção é um ato de amor e compaixão que beneficia tanto o animal quanto o adotante, criando um vínculo duradouro.
        </p>
      </div>
    </section>
  );
};

export default WhyAdoption;
