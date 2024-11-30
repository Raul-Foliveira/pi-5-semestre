import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminAnimalList.module.css';
import { FaPaw } from 'react-icons/fa'; // Ícone de pata para os animais
import { FaPencilAlt } from 'react-icons/fa';

const AdminAnimalList = () => {
  const router = useRouter();

  // Dados estáticos de animais (exemplo)
  const [animals, setAnimals] = useState([
    { id: 1, name: 'Rex', species: 'Cão', age: 3, url: 'https://example.com/rex', description: 'Rex é um cão ativo e amigável.' },
    { id: 2, name: 'Mimi', species: 'Gato', age: 2, url: 'https://example.com/mimi', description: 'Mimi é um gato calmo e independente.' },
    { id: 3, name: 'Thor', species: 'Cão', age: 1, url: 'https://example.com/thor', description: 'Thor é um cachorro muito brincalhão.' },
  ]);

  // Estado para controlar a exibição do modal
  const [showModal, setShowModal] = useState(false);
  
  // Estado para armazenar os dados do animal sendo editado
  const [currentAnimal, setCurrentAnimal] = useState({ id: null, name: '', species: '', age: '', url: '', description: '' });

  // Função para excluir um animal
  const handleDelete = (id) => {
    const updatedAnimals = animals.filter((animal) => animal.id !== id);
    setAnimals(updatedAnimals);
  };


  const handleEdit = (animal) => {
    setCurrentAnimal(animal);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedAnimals = animals.map((animal) =>
      animal.id === currentAnimal.id ? currentAnimal : animal
    );
    setAnimals(updatedAnimals);
    setShowModal(false); 
  };

  // Função para atualizar os campos do animal no modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentAnimal((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para redirecionar para a tela "adminHome"
  const handleLogout = () => {
    router.push('/admin');
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    
    <div className={styles.container}>
    <h1 className={styles.title}>Lista de Animais</h1>
    <p className={styles.description}>
      Aqui estão os animais disponíveis para adoção. Você pode editar ou excluir qualquer um deles.
    </p>
  
    <div className={styles.tableContainer}>
      <table className={styles.animalTable}>
        <thead>
          <tr>
            <th>Espécie</th>
            <th>Nome</th>
            <th>Idade</th>
            <th>URL</th>
            <th>Descrição</th> {/* Nova coluna de Descrição */}
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
              <td><a href={animal.url} target="_blank" rel="noopener noreferrer">{animal.url}</a></td> {/* URL do animal */}
              <td>{animal.description}</td> {/* Descrição do animal */}
              <td className={styles.actionButtons}>
                <button
                  onClick={() => handleEdit(animal)}
                  className={styles.editButton}
                  title="Editar"
                >
                 <FaPencilAlt />
                </button>
                <button
                  onClick={() => handleDelete(animal.id)}
                  className={styles.deleteButton}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  
    {/* Botão de Logout */}
    <div className={styles.logoutContainer}>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </div>
  
    {/* Modal de Edição */}
    {showModal && (
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <button className={styles.closeButton} onClick={closeModal}>X</button>
          <h2 className={styles.modalTitle}>Editar Animal</h2>
          <form className={styles.form}>
            <label htmlFor="name">Nome:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={currentAnimal.name}
              onChange={handleChange}
            />
  
            <label htmlFor="species">Espécie:</label>
            <input
              type="text"
              id="species"
              name="species"
              value={currentAnimal.species}
              onChange={handleChange}
            />
  
            <label htmlFor="age">Idade:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={currentAnimal.age}
              onChange={handleChange}
            />
  
            <label htmlFor="url">URL:</label>
            <input
              type="text"
              id="url"
              name="url"
              value={currentAnimal.url}
              onChange={handleChange}
            />
  
            <label htmlFor="description">Descrição:</label>
            <textarea
              id="description"
              name="description"
              value={currentAnimal.description}
              onChange={handleChange}
            ></textarea>
  
            <button type="button" onClick={handleSaveEdit} className={styles.saveButton}>
              Salvar Alterações
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default AdminAnimalList;
