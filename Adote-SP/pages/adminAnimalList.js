import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios'; // Certifique-se de importar o axios
import styles from '../styles/adminAnimalList.module.css';
import { FaPaw } from 'react-icons/fa'; // Ícone de pata para os animais
import { FaPencilAlt } from 'react-icons/fa';

const AdminAnimalList = () => {
  const router = useRouter();
  
  const [animals, setAnimals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentAnimal, setCurrentAnimal] = useState({ id: null, name: '', species: '', age: '', url: '', description: '' });

  // Função para buscar os animais da API
  const fetchAnimals = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/listar'); // Altere o URL conforme o seu backend
      setAnimals(response.data); // Atualiza o estado com os dados recebidos
    } catch (error) {
      console.error('Erro ao buscar animais:', error);
    }
  };

  // Chama a função fetchAnimals quando o componente é montado
  useEffect(() => {
    fetchAnimals();
  }, []);

  // Função para excluir um animal
  const handleDelete = (id) => {
    const updatedAnimals = animals.filter((animal) => animal.id_animal !== id);
    setAnimals(updatedAnimals);
  };

  // Função para editar um animal
  const handleEdit = (animal) => {
    setCurrentAnimal(animal);
    setShowModal(true);
  };

  const handleSaveEdit = () => {
    const updatedAnimals = animals.map((animal) =>
      animal.id_animal === currentAnimal.id ? currentAnimal : animal
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
              <th>Descrição</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => (
              <tr key={animal.id_animal}>
                <td>
                  <span className={styles.icon}>
                    <FaPaw /> {/* Ícone de pata */}
                  </span>
                  {animal.especie}
                </td>
                <td>{animal.nome}</td>
                <td>{animal.idade}</td>
                <td><a href={animal.url} target="_blank" rel="noopener noreferrer">{animal.url}</a></td>
                <td>{animal.descricao}</td>
                <td className={styles.actionButtons}>
                  <button
                    onClick={() => handleEdit(animal)}
                    className={styles.editButton}
                    title="Editar"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(animal.id_animal)}
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
