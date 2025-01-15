import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import styles from '../styles/pendingForms.module.css';

const PendingForms = () => {
  const router = useRouter();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formToEdit, setFormToEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchPendingForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/pendingForms');
        setForms(response.data);
      } catch (error) {
        console.error('Erro ao carregar os formulários:', error);
      } finally {
        setLoading(false);
      }
    };

<<<<<<< HEAD
  // Estado para controlar o modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Estado para armazenar os dados do formulário que está sendo editado
  const [editingForm, setEditingForm] = useState(null);

  // Função para alternar o estado de concluído
  const handleToggleComplete = (id) => {
    setForms(
      forms.map((form) =>
        form.id === id ? { ...form, isCompleted: !form.isCompleted } : form
      )
    );
=======
    fetchPendingForms();
  }, []);

  const handleToggleComplete = async (id, isCompleted) => {
    try {
      const url = isCompleted
        ? `http://localhost:5000/pendingForms/uncomplete/${id}`
        : `http://localhost:5000/pendingForms/complete/${id}`;

      const response = await axios.put(url);
      alert(response.data.message);

      setForms(
        forms.map((form) =>
          form.id_form === id ? { ...form, isCompleted: !isCompleted } : form
        )
      );
    } catch (error) {
      console.error('Erro ao alternar o estado de concluído:', error);
      alert('Erro ao alternar o estado de concluído');
    }
>>>>>>> f2ec82e85b2e780fa414ed7d4a0cfc7fc3887c6a
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/pendingForms/${id}`);
      alert(response.data.message);
      setForms(forms.filter((form) => form.id_form !== id));
    } catch (error) {
      console.error('Erro ao excluir o formulário:', error);
      alert('Erro ao excluir o formulário');
    }
  };

<<<<<<< HEAD
  // Função para abrir o modal e carregar os dados do formulário selecionado
  const handleEdit = (id) => {
    const formToEdit = forms.find((form) => form.id === id);
    if (formToEdit) {
      setEditingForm(formToEdit); // Define o formulário que está sendo editado
      setIsModalOpen(true); // Abre o modal
    }
  };

  // Função para concluir e redirecionar ao histórico
  const handleConclude = (id) => {
    const formToConclude = forms.find((form) => form.id === id);
    if (formToConclude) {
      console.log(`Formulário ${id} concluído!`);
      setForms(forms.filter((form) => form.id !== id));
      router.push('/historico');
    }
=======
  const handleEdit = (form) => {
    setFormToEdit(form);
    setIsModalOpen(true);
  };

  const handleSaveEdit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:5000/pendingForms/${formToEdit.id_form}`, formToEdit);
      alert(response.data.message);
      setIsModalOpen(false);
      setFormToEdit(null);

      const updatedForms = forms.map((form) =>
        form.id_form === formToEdit.id_form ? formToEdit : form
      );
      setForms(updatedForms);
    } catch (error) {
      console.error('Erro ao salvar edição:', error);
      alert('Erro ao salvar edição');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setFormToEdit(null);
>>>>>>> f2ec82e85b2e780fa414ed7d4a0cfc7fc3887c6a
  };

  const handleLogout = () => {
    if (confirm('Você tem certeza que deseja sair?')) {
      localStorage.removeItem('authToken');
      router.push('/admin');
    }
  };

  // Função para salvar as alterações do formulário
  const handleSave = () => {
    setForms(
      forms.map((form) =>
        form.id === editingForm.id ? { ...editingForm } : form
      )
    );
    setIsModalOpen(false); // Fecha o modal
    setEditingForm(null); // Reseta o estado do formulário editado
  };

  // Função para fechar o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingForm(null);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Formulários Pendentes</h1>
      <p className={styles.description}>
        Abaixo estão os formulários pendentes enviados pelos usuários. Você pode editá-los, marcá-los como concluídos ou excluí-los.
      </p>

      {/* Botão de sair */}
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className={styles.tableContainer}>
          <table className={styles.formsTable}>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Telefone</th>
                <th>Motivo Adoção</th>
                <th>Experiência Cuidados</th>
                <th>Espaço Adequado</th>
                <th>Disponibilidade Tempo</th>
                <th>Responsabilidades Adoção</th>
                <th>Compatibilidade com Animais</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr
                  key={form.id_form}
                  className={form.isCompleted ? styles.completedRow : ''}
                >
                  <td>{form.nome}</td>
                  <td>{form.cpf}</td>
                  <td>{form.email}</td>
                  <td>{form.telefone}</td>
                  <td>{form.motivo_adocao}</td>
                  <td>{form.experiencia_cuidados}</td>
                  <td>{form.espaco_adequado}</td>
                  <td>{form.disponibilidade_tempo}</td>
                  <td>{form.responsabilidades_adocao}</td>
                  <td>{form.compatibilidade_animais}</td>
                  <td className={styles.actionButtons}>
                    <button
                      onClick={() => handleEdit(form)}
                      className={styles.editButton}
                      title="Editar"
                    >
                      Editar
                    </button>
                    <button
<<<<<<< HEAD
                      onClick={() => handleConclude(form.id)}
=======
                      onClick={() => handleToggleComplete(form.id_form, form.isCompleted)}
>>>>>>> f2ec82e85b2e780fa414ed7d4a0cfc7fc3887c6a
                      className={styles.completeButton}
                      title="Concluir"
                    >
                      Concluir
                    </button>
                    <button
                      onClick={() => handleDelete(form.id_form)}
                      className={styles.deleteButton}
                      title="Excluir"
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

<<<<<<< HEAD
        {/* Botão de sair */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>

        {/* Modal */}
        {isModalOpen && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <h2>Editar Formulário</h2>
              <label>
                Nome Completo:
                <input
                  type="text"
                  value={editingForm.name}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, name: e.target.value })
                  }
                />
              </label>
              <label>
                CPF:
                <input
                  type="text"
                  value={editingForm.cpf}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, cpf: e.target.value })
                  }
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  value={editingForm.email}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, email: e.target.value })
                  }
                />
              </label>
              <label>
                Animal Interessado:
                <input
                  type="text"
                  value={editingForm.animal}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, animal: e.target.value })
                  }
                />
              </label>
              <label>
                Espécie:
                <input
                  type="text"
                  value={editingForm.especie}
                  onChange={(e) =>
                    setEditingForm({ ...editingForm, especie: e.target.value })
                  }
                />
              </label>
              <div className={styles.modalActions}>
                <button onClick={handleSave} className={styles.saveButton}>
                  Salvar
                </button>
                <button onClick={handleCloseModal} className={styles.closeButton}>
                  Fechar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
=======
      {isModalOpen && formToEdit && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Editar Formulário</h2>
            <form onSubmit={handleSaveEdit}>
              <input
                type="text"
                name="nome"
                value={formToEdit.nome}
                onChange={(e) => setFormToEdit({ ...formToEdit, nome: e.target.value })}
                required
              />
              <input
                type="text"
                name="cpf"
                value={formToEdit.cpf}
                onChange={(e) => setFormToEdit({ ...formToEdit, cpf: e.target.value })}
                required
              />
              <input
                type="email"
                name="email"
                value={formToEdit.email}
                onChange={(e) => setFormToEdit({ ...formToEdit, email: e.target.value })}
                required
              />
              <input
                type="text"
                name="telefone"
                value={formToEdit.telefone}
                onChange={(e) => setFormToEdit({ ...formToEdit, telefone: e.target.value })}
                required
              />
              <button type="submit">Salvar</button>
            </form>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}
>>>>>>> f2ec82e85b2e780fa414ed7d4a0cfc7fc3887c6a
    </div>
  );
};

export default PendingForms;
