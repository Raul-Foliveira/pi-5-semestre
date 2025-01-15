import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { FaCheck } from 'react-icons/fa'; // Ícone de check
import axios from 'axios'; // Importando axios
import styles from '../styles/historicoForm.module.css';

const HistoricoFormularios = () => {
  const router = useRouter();
  const [forms, setForms] = useState([]); // Estado para armazenar os formulários

  useEffect(() => {
    // Função para buscar os formulários do backend
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/historico-formularios'); // URL correta
        setForms(response.data); // Atualiza o estado com os formulários recebidos
      } catch (error) {
        console.error('Erro ao buscar formulários:', error);
      }
    };
    
    

    fetchForms(); // Chama a função quando o componente for montado
  }, []); // O array vazio garante que a busca seja feita apenas uma vez

  // Função para redirecionar para a página de "Formulários Pendentes"
  const handleBackToPending = () => {
    router.push('/admin');
  };

  return (
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
            {forms.map((form) => (
              <tr key={form.id_form}>
                <td>{form.nome}</td>
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
        Voltar para Formulários Pendentes
      </button>
    </div>
  );
};

export default HistoricoFormularios;
