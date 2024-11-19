// components/Footer.js
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Adote SP. Todos os direitos reservados.</p>
      <div className={styles.socialLinks}>
        <a href="#" aria-label="Facebook">Facebook</a>
        <a href="#" aria-label="Instagram">Instagram</a>
        <a href="#" aria-label="Twitter">Twitter</a>
      </div>
    </footer>
  );
};

export default Footer;
