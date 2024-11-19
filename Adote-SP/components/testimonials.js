// components/Testimonials.js
import styles from '../styles/testimonials.module.css';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      nome: 'Ana Silva',
      depoimento: 'Adotei o Rex e ele trouxe tanta alegria para minha casa!',
    },
    {
      id: 2,
      nome: 'Carlos Pereira',
      depoimento: 'Mia é uma gatinha incrível, muito carinhosa e brincalhona.',
    },
    {
      id: 2,
      nome: 'Carlos Pereira',
      depoimento: 'Mia é uma gatinha incrível, muito carinhosa e brincalhona.',
    },
  ];

  return (
    <section className={styles.testimonials}>
      <h2>Histórias de Adoção</h2>
      <div className={styles.testimonialList}>
        {testimonials.map(testimonial => (
          <div key={testimonial.id} className={styles.testimonial}>
            <p>"{testimonial.depoimento}"</p>
            <h4>- {testimonial.nome}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
