import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminList.module.css';

const AdminList = () => {
  const router = useRouter();
  
  // Dados estáticos de administradores (exemplo)
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Raul Silva', email: 'raul@email.com', phone: '(11) 99999-9999' },
    { id: 2, name: 'Ana Souza', email: 'ana@email.com', phone: '(11) 98888-8888' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com', phone: '(11) 97777-7777' },
  ]);

  // Função para excluir um administrador
  const handleDelete = (id) => {
    // Simulação de exclusão com dados estáticos
    const updatedAdmins = admins.filter(admin => admin.id !== id);
    setAdmins(updatedAdmins);

    // Aqui, você pode adicionar a lógica para exclusão do banco de dados quando o back-end estiver pronto.
    // Exemplo: await fetch(`/api/admins/${id}`, { method: 'DELETE' });
  };

  // Função para redirecionar para a tela "adminHome"
  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Administradores</h1>
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
      <div className={styles.tableContainer}>
        <table className={styles.adminTable}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail</th>
              <th>Telefone</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {admins.map(admin => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.phone}</td>
                <td>
                  <button onClick={() => handleDelete(admin.id)} className={styles.deleteButton}>
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

export default AdminList;
