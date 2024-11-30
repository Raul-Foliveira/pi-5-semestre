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

  // Função para editar
  const handleEdit = (id) => {
    alert(`Editar formulário ID ${id}.`);
  };

  // Função para redirecionar para a tela "/admin"
  const handleLogout = () => {
    router.push('/admin');
  };

  return (
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
                    onClick={() => handleToggleComplete(form.id)}
                    className={styles.completeButton}
                    title="Concluir"
                  >
                    {form.isCompleted ? 'Desmarcar' : 'Concluir'}
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
    </div>
  );
};

export default PendingForms;
