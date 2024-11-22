import { useRouter } from 'next/router'; // Importação do roteador
import styles from '../styles/adminHome.module.css';

const AdminHome = () => {
    const router = useRouter();

    // Função para redirecionar ao cadastro de animais
    const handleAnimalRegister = () => {
        router.push('/admin/register-animal'); // Verifique se essa rota existe
    };

    // Função para redirecionar ao cadastro de administradores
    const handleAdminRegister = () => {
        router.push('/cadastro'); // Verifique se essa rota existe
    };

    return (
        <div className={styles.adminHome}>
            <h1 className={styles.title}>Área do Administrador</h1>
            <p className={styles.description}>
                Bem-vindo à área administrativa. Escolha uma das opções abaixo:
            </p>
            <div className={styles.buttonContainer}>
                {/* Botão para cadastro de novo animal */}
                <button
                    onClick={handleAnimalRegister}
                    className={styles.button}>
                    Cadastrar Novo Animal
                </button>

                {/* Botão para cadastro de novo administrador */}
                <button
                    onClick={handleAdminRegister}
                    className={styles.button}>
                    Cadastrar Novo Administrador
                </button>
            </div>
        </div>
    );
};

export default AdminHome;
