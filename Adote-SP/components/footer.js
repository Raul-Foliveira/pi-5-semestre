// components/Footer.js
import Link from 'next/link'; // Importação do Link do Next.js
import styles from '../styles/footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.companyInfo}>
          <h4>Adote SP</h4>
          <p>
            Conectando você ao melhor amigo que está esperando por você. 
            Dedicados à adoção responsável e ao bem-estar animal.
          </p>
        </div>
        <div className={styles.quickLinks}>
          <h4>Links Rápidos</h4>
          <ul>
            <ul>
              <li><Link href="/politicas">Termos de Uso / Politica de privacidade / FAQ</Link></li>
            </ul>


          </ul>
        </div>
        <div className={styles.contactInfo}>
          <h4>Fale Conosco</h4>
          <p>Email: <a href="mailto:contato@adotesp.com">contato@adotesp.com</a></p>
          <p>Telefone: <a href="tel:+5511999999999">(11) 99999-9999</a></p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <div className={styles.socialLinks}>
          <a href="#" aria-label="Facebook">Facebook</a>
          <a href="#" aria-label="Instagram">Instagram</a>
          <a href="#" aria-label="Twitter">Twitter</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Adote SP. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
