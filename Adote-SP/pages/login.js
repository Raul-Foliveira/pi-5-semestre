import React, { useState } from 'react';
import styles from '../styles/login.module.css'; // Ajuste o caminho conforme necessário
import axios from 'axios';
import { useRouter } from 'next/router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState(null); // Mensagem de alerta
    const [loading, setLoading] = useState(false); // Estado de carregamento
    const router = useRouter();

    // Função para validar email
    const validateEmail = (email) => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setAlert(null); // Limpar alertas anteriores

        // Validações de entrada
        if (!email) {
            setAlert({ type: 'error', message: 'Por favor, insira um e-mail.' });
            setLoading(false);
            return;
        }

        if (!validateEmail(email)) {
            setAlert({ type: 'error', message: 'Por favor, insira um e-mail válido.' });
            setLoading(false);
            return;
        }

        if (!password) {
            setAlert({ type: 'error', message: 'Por favor, insira a sua senha.' });
            setLoading(false);
            return;
        }

        try {
            // Envia os dados para o backend
            const response = await axios.post('http://localhost:5000/api/admin/login', {
                email,
                senha: password,
            });

            // Sucesso: Redirecionar para a página de admin
            router.push('/admin');
        } catch (err) {
            if (err.response) {
                // Tratamento de erros do backend
                switch (err.response.status) {
                    case 404:
                        setAlert({ type: 'error', message: 'Administrador não encontrado.' });
                        break;
                    case 401:
                        setAlert({ type: 'error', message: 'Senha incorreta. Tente novamente.' });
                        break;
                    default:
                        setAlert({ type: 'error', message: 'Erro ao realizar login. Tente novamente.' });
                        break;
                }
            } else {
                // Erro de conexão
                setAlert({ type: 'error', message: 'Erro na conexão com o servidor. Tente novamente mais tarde.' });
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            {/* Imagem de fundo */}
            <div className={styles.imageContainer}>
                <img src="/images/gatoLogin.jpg" alt="Imagem de fundo" className={styles.image} />
            </div>

            {/* Formulário de login */}
            <div className={styles.loginContainer}>
                <h1 className={styles.welcomeTitle}>Login</h1>
                <h2 className={styles.title}>Administrador</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password" className={styles.label}>Senha:</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />
                    </div>

                    {/* Exibição do alerta */}
                    {alert && (
                        <div className={`${styles.alert} ${alert.type === 'error' ? styles.alertError : styles.alertSuccess}`}>
                            {alert.message}
                        </div>
                    )}

                    <button type="submit" className={styles.button} disabled={loading}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
