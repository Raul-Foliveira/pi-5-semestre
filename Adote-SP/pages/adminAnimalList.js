// pages/adminAnimalList.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminAnimalList.module.css';

const AdminAnimalList = () => {
  const router = useRouter();

  // Dados estáticos de animais (exemplo)
  const [animals, setAnimals] = useState([
    { id: 1, name: 'Rex', species: 'Cão', age: 3 },
    { id: 2, name: 'Mimi', species: 'Gato', age: 2 },
    { id: 3, name: 'Thor', species: 'Cão', age: 1 },
  ]);

  // Função para excluir um animal
  const handleDelete = (id) => {
    // Simulação de exclusão com dados estáticos
    const updatedAnimals = animals.filter(animal => animal.id !== id);
    setAnimals(updatedAnimals);

    // Aqui, você pode adicionar a lógica para exclusão do banco de dados quando o back-end estiver pronto.
    // Exemplo: await fetch(`/api/animals/${id}`, { method: 'DELETE' });
  };

  // Função para redirecionar para a tela "adminHome"
  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Animais</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.animalTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Espécie</th>
              <th>Idade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {animals.map(animal => (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.species}</td>
                <td>{animal.age}</td>
                <td>
                  <button onClick={() => handleDelete(animal.id)} className={styles.deleteButton}>
                    Excluir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminAnimalList;
