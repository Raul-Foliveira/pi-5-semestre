import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { FaCheck } from 'react-icons/fa'; // Importando o ícone de check
import styles from '../styles/historicoForm.module.css';

const HistoricoFormularios = () => {
  const router = useRouter();

  // Dados estáticos para teste (simulando o estado de formulários concluídos)
  const [forms, setForms] = useState([
    {
      id: 1,
      name: 'João Silva',
      cpf: '123.456.789-00',
      email: 'joao@example.com',
      animal: 'Rex',
      especie: 'Cão',
      isCompleted: true, // Formulário concluído
    },
    {
      id: 2,
      name: 'Maria Santos',
      cpf: '987.654.321-00',
      email: 'maria@example.com',
      animal: 'Mimi',
      especie: 'Gato',
      isCompleted: true, // Formulário concluído
    },
    {
      id: 3,
      name: 'Carlos Oliveira',
      cpf: '111.222.333-44',
      email: 'carlos@example.com',
      animal: 'Thor',
      especie: 'Cão',
      isCompleted: false, // Formulário pendente
    },
  ]);

  // Filtrando os formulários concluídos
  const completedForms = forms.filter((form) => form.isCompleted);

  // Função para redirecionar para a página de "Formulários Pendentes"
  const handleBackToPending = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.pageBackground}>
      <div className={styles.container}>
        <h1 className={styles.title}>Histórico de Formulários Concluídos</h1>
        <p className={styles.description}>
          Abaixo estão os históricos de formulários que foram concluídos.
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
                <th>Concluído</th> {/* Nova coluna para o ícone de check */}
              </tr>
            </thead>
            <tbody>
              {completedForms.map((form) => (
                <tr key={form.id}>
                  <td>{form.name}</td>
                  <td>{form.cpf}</td>
                  <td>{form.email}</td>
                  <td>{form.animal}</td>
                  <td>{form.especie}</td>
                  <td>
                    {/* Exibindo o ícone de check se o formulário foi concluído */}
                    <FaCheck className={styles.checkIcon} title="Concluído" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Botão de voltar para a tela de pendentes */}
        <button onClick={handleBackToPending} className={styles.backButton}>
          Voltar
        </button>
      </div>
    </div>
  );
};

export default HistoricoFormularios;
