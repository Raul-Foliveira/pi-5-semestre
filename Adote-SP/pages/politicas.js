// pages/politicas.js
import styles from '../styles/estilos.module.css';

const Politicas = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul>
          <li><a href="#termosDeUso">Termos de Uso</a></li>
          <li><a href="#politicaDePrivacidade">Política de Privacidade</a></li>
          <li><a href="#faq">Perguntas Frequentes</a></li>
        </ul>
      </nav>

      <div id="termosDeUso" className={styles.section}>
        <h3>Termos de Uso</h3>
        <p>
          Bem-vindo ao site da **Patas Unidas**! Ao acessar e utilizar nosso serviço, você concorda com os seguintes Termos de Uso. Caso não concorde com estes termos, recomendamos que não utilize a plataforma.
        </p>
        <h4>1. Objetivo do Site</h4>
        <p>
          O site <strong>Patas Unidas</strong> tem como objetivo facilitar o encontro de lares responsáveis para cães e gatos em situação de vulnerabilidade, promovendo adoções conscientes.
        </p>
        <h4>2. Responsabilidades do Usuário</h4>
        <p>
          O usuário se compromete a fornecer informações verdadeiras durante o cadastro e respeitar os processos estabelecidos pela **Patas Unidas**. Adoções irresponsáveis ou dados falsos podem resultar em banimento.
        </p>
        <h4>3. Limitações do Serviço</h4>
        <p>
          A **Patas Unidas** não garante a disponibilidade de todos os animais listados, pois a adoção é um processo dinâmico. Além disso, não nos responsabilizamos por problemas comportamentais ou de saúde do animal após a adoção.
        </p>
        <h4>4. Direitos de Propriedade</h4>
        <p>
          Todo o conteúdo deste site, incluindo textos, imagens e logos, pertence à **Patas Unidas** e é protegido por leis de direitos autorais. O uso não autorizado é proibido.
        </p>
      </div>

      <div id="politicaDePrivacidade" className={styles.section}>
        <h3>Política de Privacidade</h3>
        <p>
          Na **Patas Unidas**, valorizamos a privacidade e a segurança dos seus dados. Este documento detalha como coletamos, usamos e protegemos as informações fornecidas pelos usuários.
        </p>
        <h4>1. Dados Coletados</h4>
        <p>
          Coletamos informações como nome, endereço, telefone e e-mail para identificar os adotantes e facilitar a comunicação. Dados adicionais podem ser coletados durante o processo de adoção.
        </p>
        <h4>2. Finalidade do Uso</h4>
        <p>
          Os dados são usados exclusivamente para gerenciar adoções, responder dúvidas e informar sobre campanhas e eventos da **Patas Unidas**.
        </p>
        <h4>3. Segurança</h4>
        <p>
          Adotamos medidas técnicas e organizacionais para proteger seuss dados e informações.
        </p>
        <h4>4. Compartilhamento de Dados</h4>
        <p>
          Os dados são compartilhados apenas com ONGs parceiras envolvidas no processo de adoção. Não vendemos ou disponibilizamos informações pessoais a terceiros para fins comerciais.
        </p>
      </div>

      <div id="faq" className={styles.section}>
        <h3>Perguntas Frequentes</h3>

        <h4>1. Como funciona o processo de adoção?</h4>
        <p>
          Após escolher um animal no site, você deverá preencher um formulário detalhado. Nossa equipe ou parceiros entrarão em contato para verificar a aptidão para adoção e concluir o processo.
        </p>

        <h4>2. Quais são os requisitos para adoção?</h4>
        <p>
          É necessário ser maior de 21 anos, apresentar comprovante e documento de identificação, além de assinar um termo de responsabilidade no momento da retirada do animal.
        </p>

        <h4>3. Adotei um pet e ele não se adaptou, é possível a devolução?</h4>
        <p>
           Sim, mas antes de adotar um pet é importante ter a ciência que são animais que podem exigir um período de adaptação junto ao adotante, uma vez que, geralmente, são animais com históricos de abandono, maus tratos, e por esses motivos, podem demorar um pouco mais para se adaptarem com outras pessoas, pets e/ou novos ambientes. Seja paciente, esses pets precisam de carinho e amor. Em casos de devoluções/não adaptação, o contato deve ser realizado diretamente com a Patas Unidas.
        </p>

        <h4>4. Após o preenchimento do formulário, quanto tempo devo aguardar?</h4>
        <p>
          A **Patas Unidas** tem o prazo de 48 horas para entrar em contato com o possível adotante.
        </p>

        <h4>5. Posso doar ração ou outros itens?</h4>
        <p>
          Sim! Aceitamos doações de ração, brinquedos, coleiras, cobertores e outros itens essenciais. Entre em contato conosco para saber como contribuir.
        </p>

        <h4>6. Animais são vacinados e castrados?</h4>
        <p>
          Todos os animais disponibilizados para adoção são castrados, vacinados e vermifugados. Caso contrário, essa informação será detalhada no perfil do animal.
        </p>

      </div>
    </div>
  );
};

export default Politicas;
