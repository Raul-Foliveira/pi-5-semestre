import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminList.module.css';
import { FaPencilAlt } from 'react-icons/fa';

const AdminList = () => {
  const router = useRouter();
  
  // Dados estáticos de administradores (exemplo)
  const [admins, setAdmins] = useState([
    { id: 1, name: 'Raul Silva', email: 'raul@email.com', phone: '(11) 99999-9999' },
    { id: 2, name: 'Ana Souza', email: 'ana@email.com', phone: '(11) 98888-8888' },
    { id: 3, name: 'Carlos Lima', email: 'carlos@email.com', phone: '(11) 97777-7777' },
  ]);

  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({ name: '', email: '', phone: '' });

  // Função para editar um administrador
  const handleEdit = (admin) => {
    setEditingAdmin(admin.id);
    setAdminData(admin);
    setShowModal(true);
  };

  // Função para atualizar um administrador após edição
  const handleUpdate = () => {
    const updatedAdmins = admins.map((admin) =>
      admin.id === editingAdmin ? { ...admin, ...adminData } : admin
    );
    setAdmins(updatedAdmins);
    setShowModal(false);
  };

  // Função para excluir um administrador
  const handleDelete = (id) => {
    const updatedAdmins = admins.filter(admin => admin.id !== id);
    setAdmins(updatedAdmins);
  };

  // Função para redirecionar para a tela "adminHome"
  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Lista de Administradores</h1>
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
                <td className={styles.actionButtons}>
                  <button
                    onClick={() => handleEdit(admin)}
                    className={styles.editButton}
                    title="Editar"
                  >
                    <FaPencilAlt />
                  </button>
                  <button
                    onClick={() => handleDelete(admin.id)}
                    className={styles.deleteButton}
                    title="Excluir"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={() => setShowModal(false)}>X</button>
            <h2 className={styles.modalTitle}>Editar Administrador</h2>
            <form className={styles.form}>
              <label>Nome</label>
              <input
                type="text"
                value={adminData.name}
                onChange={(e) => setAdminData({ ...adminData, name: e.target.value })}
              />
              <label>E-mail</label>
              <input
                type="email"
                value={adminData.email}
                onChange={(e) => setAdminData({ ...adminData, email: e.target.value })}
              />
              <label>Telefone</label>
              <input
                type="text"
                value={adminData.phone}
                onChange={(e) => setAdminData({ ...adminData, phone: e.target.value })}
              />
              <button type="button" className={styles.saveButton} onClick={handleUpdate}>Salvar</button>
            </form>
          </div>
        </div>
      )}
      
      <button onClick={handleLogout} className={styles.logoutButton}>
        Sair
      </button>
    </div>
  );
};

export default AdminList;
