// components/Testimonials.js
import { useEffect, useState } from 'react';
import styles from '../styles/testimonials.module.css';

const Testimonials = () => {
<<<<<<< HEAD
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
      id: 3,
      nome: 'Carlos Pereira',
      depoimento: 'Mia é uma gatinha incrível, muito carinhosa e brincalhona.',
    },
  ];
=======
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch depoimentos da API
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/api/testimonials');
        if (!response.ok) {
          throw new Error('Erro ao buscar depoimentos');
        }
        const data = await response.json();
        setTestimonials(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return <p>Carregando depoimentos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }
>>>>>>> 35b27a3d66a2e87264878b5b1fafe27cba5b1d25

  return (
    <section className={styles.testimonials}>
      <h2>Histórias de Adoção</h2>
      <div className={styles.testimonialList}>
        {testimonials.length === 0 ? (
          <p>Nenhum depoimento disponível.</p>
        ) : (
          testimonials.map(testimonial => (
            <div key={testimonial.id} className={styles.testimonial}>
              <p>"{testimonial.depoimento}"</p>
              <h4>- {testimonial.nome_administrador}</h4>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Testimonials;
