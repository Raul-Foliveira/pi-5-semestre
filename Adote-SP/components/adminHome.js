import { useRouter } from 'next/router';
import styles from '../styles/adminHome.module.css';

const AdminHome = () => {
    const router = useRouter();

    const handleAnimalRegister = () => {
        router.push('/admin/register-animal');
    };

    const handleAdminRegister = () => {
        router.push('/cadastro');
    };

    const handleLogout = () => {
        router.push('/'); // Redireciona para a página principal
    };

    const handleListAdmin = () => {
        router.push('/adminList'); // Redireciona para a página principal
    };

    const handleListAdminAnimal = () => {
        router.push('/adminAnimalList'); // Redireciona para a página principal
    };

    const handleListForm = () => {
        router.push('/pendingForms'); // Redireciona para a página principal
    };

    return (
        <div className={styles.adminHome}>
            <div className={styles.sidebar}>
                <h2 className={styles.sidebarTitle}>Menu</h2>
                <button onClick={handleAnimalRegister} className={styles.sidebarButton}>
                    Cadastrar Novo Animal
                </button>

                <button onClick={handleAdminRegister} className={styles.sidebarButton}>
                    Cadastrar Novo Administrador
                </button>
                
                <button onClick={handleListAdminAnimal} className={`${styles.sidebarButton} ${styles.listing}`}>
                        Listar Animais
                </button>

                <button onClick={handleListAdmin} className={`${styles.sidebarButton} ${styles.listing}`}>
                    Listar Administradores
                </button>

                <button onClick={handleListForm} className={`${styles.sidebarButton} ${styles.listing}`}>
                    Formulários pendentes
                </button>

                <button onClick={handleLogout} className={`${styles.sidebarButton} ${styles.logout}`}>
                        Sair
                </button>
                
            </div>
            <div className={styles.mainContent}>
                <h1 className={styles.title}>Área do Administrador</h1>
                <p className={styles.description}>
                    Aqui você pode gerenciar os animais disponíveis para adoção e administrar os cadastros.
                </p>
                <div className={styles.infoCards}>
                    <div className={styles.card}>
                        <h3>Total de Animais</h3>
                        <p>12 disponíveis</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Adoções Realizadas</h3>
                        <p>5 este mês</p>
                    </div>
                    <div className={styles.card}>
                        <h3>Novos Cadastros</h3>
                        <p>2 administradores</p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default AdminHome;
