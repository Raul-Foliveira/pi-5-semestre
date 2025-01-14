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
  };

  const handleLogout = () => {
    if (confirm('Você tem certeza que deseja sair?')) {
      localStorage.removeItem('authToken');
      router.push('/admin');
    }
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
                      onClick={() => handleToggleComplete(form.id_form, form.isCompleted)}
                      className={styles.completeButton}
                      title="Concluir"
                    >
                      {form.isCompleted ? 'Desmarcar' : 'Concluir'}
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
    </div>
  );
};

export default PendingForms;
