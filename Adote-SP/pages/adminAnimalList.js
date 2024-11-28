import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminAnimalList.module.css';
import { FaPaw } from 'react-icons/fa'; // Ícone de pata para os animais

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
    const updatedAnimals = animals.filter((animal) => animal.id !== id);
    setAnimals(updatedAnimals);
  };

  const handleEdit = (id) => {
    alert(`Editar item com ID: ${id}`);
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
              <th>Espécie</th>
              <th>Nome</th>
              <th>Idade</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id}>
                <td>
                  <span className={styles.icon}>
                    <FaPaw /> {/* Ícone de pata */}
                  </span>
                  {animal.species}
                </td>
                <td>{animal.name}</td>
                <td>{animal.age}</td>
                <td className={styles.actionButtons}>
                  <button
                    onClick={() => handleEdit(animal.id)}
                    className={styles.editButton}
                    title="Editar"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(animal.id)}
                    className={styles.deleteButton}
                  >
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
