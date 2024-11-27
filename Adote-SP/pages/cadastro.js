import React, { useState } from 'react';
import axios from 'axios'; // Importando o axios para fazer requisições
import styles from '../styles/cadastro.module.css';
import { useRouter } from 'next/router';  // Importando o useRouter para navegação

const Cadastro = () => {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        senha: '',
        telefone: '',
        endereco: '',
    });

    const [error, setError] = useState(null); // Para capturar possíveis erros
    const router = useRouter();  // Inicializando o hook de roteamento

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/admin', formData);
            console.log(response.data); // Aqui você pode exibir uma mensagem de sucesso
            alert('Administrador cadastrado com sucesso!');
            setFormData({
                nome: '',
                email: '',
                senha: '',
                telefone: '',
                endereco: '',
            }); // Limpa o formulário após o envio
        } catch (error) {
            console.error('Erro ao cadastrar administrador:', error);
            setError(error.response ? error.response.data.message : 'Erro desconhecido'); // Exibe a mensagem de erro
        }
    };

    // Função para voltar à página de Admin Home
    const handleGoBack = () => {
        router.push('/admin');  // Redireciona para a página de Admin Home
    };

    return (
        <div className={styles.pageBackground}>
            <section className={styles.cadastro}>
                <h2>Cadastro</h2>
                {error && <p className={styles.error}>{error}</p>} {/* Exibe a mensagem de erro */}
                
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
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="senha">Senha</label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="telefone">Telefone</label>
                        <input
                            type="tel"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="endereco">Endereço</label>
                        <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.buttonContainer}>
                        <button onClick={handleGoBack} className={styles.backButton}>Voltar</button>
                        <button type="submit" className={styles.submitButton}>Cadastrar</button>
                    </div>
                </form>
            </section>
        </div>
    );
};

export default Cadastro;
