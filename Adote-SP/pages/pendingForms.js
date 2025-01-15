import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/pendingForms.module.css';

const PendingForms = () => {
  const router = useRouter();

  // Dados estáticos para teste
  const [forms, setForms] = useState([
    {
      id: 1,
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@example.com',
      animal: 'Rex',
      especie: 'Cão',
      isCompleted: false, // Indica se o formulário está concluído
    },
    {
      id: 2,
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      email: 'maria@example.com',
      animal: 'Mimi',
      especie: 'Gato',
      isCompleted: false,
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      cpf: '111.222.333-44',
      email: 'carlos@example.com',
      animal: 'Thor',
      especie: 'Cão',
      isCompleted: false,
    },
  ]);

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
  };

  // Função para excluir um formulário
  const handleDelete = (id) => {
    setForms(forms.filter((form) => form.id !== id));
  };

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
  };

  // Função para redirecionar para a tela "/admin"
  const handleLogout = () => {
    router.push('/admin');
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
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h1 className={styles.title}>Formulários Pendentes</h1>
        <p className={styles.description}>
          Abaixo estão os formulários pendentes enviados pelos usuários. Você pode editá-los, marcá-los como concluídos ou excluí-los.
        </p>

        <div className={styles.tableContainer}>
          <table className={styles.formsTable}>
            <thead>
              <tr>
                <th>Nome Completo</th>
                <th>CPF</th>
                <th>Email</th>
                <th>Animal Interessado</th>
                <th>Espécie</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr
                  key={form.id}
                  className={form.isCompleted ? styles.completedRow : ''}
                >
                  <td>{form.name}</td>
                  <td>{form.cpf}</td>
                  <td>{form.email}</td>
                  <td>{form.animal}</td>
                  <td>{form.especie}</td>
                  <td className={styles.actionButtons}>
                    <button
                      onClick={() => handleEdit(form.id)}
                      className={styles.editButton}
                      title="Editar"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleConclude(form.id)}
                      className={styles.completeButton}
                      title="Concluir"
                    >
                      Concluir
                    </button>
                    <button
                      onClick={() => handleDelete(form.id)}
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
    </div>
  );
};

export default PendingForms;
