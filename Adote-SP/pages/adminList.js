import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/adminList.module.css';
import { FaPencilAlt } from 'react-icons/fa';
import axios from 'axios';

const AdminList = () => {
  const router = useRouter();

  const [admins, setAdmins] = useState([]);
  const [editingAdmin, setEditingAdmin] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [adminData, setAdminData] = useState({ name: '', email: '', phone: '' });

  // Função para buscar administradores
  const fetchAdmins = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/admins');
      setAdmins(response.data);
    } catch (error) {
      console.error('Erro ao buscar administradores', error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  const handleEdit = (admin) => {
    setEditingAdmin(admin.id_admin);
    setAdminData({ name: admin.nome, email: admin.email, phone: admin.telefone });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!adminData.name || !adminData.email || !adminData.phone) {
      alert('Todos os campos (nome, email, telefone) são obrigatórios.');
      return;
    }

    try {
      // Envia a requisição PUT para o backend
      await axios.put(`http://127.0.0.1:5000/admins/${editingAdmin}`, {
        nome: adminData.name,
        email: adminData.email,
        telefone: adminData.phone
      });

      // Atualiza a lista no frontend
      setAdmins(admins.map((admin) =>
        admin.id_admin === editingAdmin ? { ...admin, ...adminData } : admin
      ));
      setShowModal(false); // Fecha o modal
    } catch (error) {
      console.error('Erro ao atualizar administrador', error);
      alert('Erro ao tentar atualizar o administrador.');
    }
  };

  const handleDelete = async (id) => {
    try {
      // Excluir o administrador do backend
      await axios.delete(`http://127.0.0.1:5000/admins/${id}`);
      // Atualiza a lista de administradores no frontend
      setAdmins(admins.filter(admin => admin.id_admin !== id));
    } catch (error) {
      console.error('Erro ao excluir administrador', error);
    }
  };

  const handleLogout = () => {
    router.push('/admin');
  };

  return (
    <div className={styles.pageBackground}> {/* Adicionado para estilizar o fundo da página */}
      <div className={styles.container}>
        <h1 className={styles.title}>Lista de Administradores</h1>
        <p className={styles.description}>
          Aqui estão os administradores cadastrados em nosso sistema. 
        </p>
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
                <tr key={admin.id_admin}>
                  <td>{admin.nome}</td>
                  <td>{admin.email}</td>
                  <td>{admin.telefone}</td>
                  <td className={styles.actionButtons}>
                    <button
                      onClick={() => handleEdit(admin)}
                      className={styles.editButton}
                      title="Editar"
                    >
                      <FaPencilAlt />
                    </button>
                    <button
                      onClick={() => handleDelete(admin.id_admin)}
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

        {/* Modal de Edição */}
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

        {/* Botão de Logout */}
        <button onClick={handleLogout} className={styles.logoutButton}>
          Sair
        </button>
      </div>
    </div>
  );
};

export default AdminList;
