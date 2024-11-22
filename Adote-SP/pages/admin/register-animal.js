// pages/admin/register-animal.js
import React, { useState } from 'react';
import axios from 'axios'; // Para fazer requisições HTTP
import { useRouter } from 'next/router'; // Importando o hook useRouter
import styles from '../../styles/cadastro.module.css'; // Usando o mesmo estilo do cadastro de admins

const RegisterAnimal = () => {
    const [formData, setFormData] = useState({
        nome: '',
        especie: '',
        raca: '',
        idade: '',
        sexo: '',
        descricao: '',
        foto: null,
    });

    const [error, setError] = useState(null); // Para erros
    const [success, setSuccess] = useState(false); // Para mensagem de sucesso
    const router = useRouter(); // Criando a instância do router

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, foto: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepara os dados para envio (convertendo foto em FormData se houver)
        const animalData = new FormData();
        for (const key in formData) {
            animalData.append(key, formData[key]);
        }

        try {
            const response = await axios.post('http://localhost:5000/api/animals', animalData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Para envio de arquivos
                }
            });
            setSuccess(true); // Exibe a mensagem de sucesso
            setError(null); // Limpa erros anteriores
            setFormData({
                nome: '',
                especie: '',
                raca: '',
                idade: '',
                sexo: '',
                descricao: '',
                foto: null,
            }); // Limpa o formulário após sucesso
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Erro desconhecido');
            setSuccess(false);
        }
    };

    const handleGoBack = () => {
        router.push('/admin');  // Redireciona para a página de Admin Home
    };

    return (
        <div className={styles.pageBackground}>
            <section className={styles.cadastro}>
                <h2>Cadastro de Novo Animal</h2>
                {error && <p className={styles.error}>{error}</p>}
                {success && <p className={styles.success}>Animal cadastrado com sucesso!</p>}
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={formData.nome}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="especie">Espécie</label>
                        <input
                            type="text"
                            id="especie"
                            name="especie"
                            value={formData.especie}
                            onChange={handleChange}
                            required
                        />
                    </div>
                
                    <div className={styles.formGroup}>
                        <label htmlFor="idade">Idade</label>
                        <input
                            type="number"
                            id="idade"
                            name="idade"
                            value={formData.idade}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label htmlFor="sexo">Sexo</label>
                        <select
                            id="sexo"
                            name="sexo"
                            value={formData.sexo}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecione...</option>
                            <option value="Macho">Macho</option>
                            <option value="Fêmea">Fêmea</option>
                        </select>
                        
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="descricao">Descrição</label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleChange}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="foto">Foto</label>
                        <input
                            type="file"
                            id="foto"
                            name="foto"
                            onChange={handleFileChange}
                        />
                    </div>
                    <button type="submit" className={styles.submitButton}>Cadastrar</button>
                </form>
                <button onClick={handleGoBack} className={styles.submitButton}>Voltar</button>
            </section>
        </div>
    );
};

export default RegisterAnimal;
