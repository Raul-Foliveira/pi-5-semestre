import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from '../styles/adoptionForm.module.css';


const AdoptionForm = () => {
  const [step, setStep] = useState(0); // Controla o passo atual do formulário
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const router = useRouter();  // Inicializa o hook do Next.js para redirecionamento

  const questions = [
    { id: 1, question: "Qual é o seu nome completo?", inputType: "text", name: "fullName", required: true },
    { id: 2, question: "Qual é o seu CPF?", inputType: "text", name: "cpf", required: true },
    { id: 3, question: "Qual é o seu e-mail?", inputType: "email", name: "email", required: true },
    { id: 4, question: "Qual é o seu telefone?", inputType: "tel", name: "phone", required: true },
    { id: 5, question: "Por que deseja adotar este pet?", inputType: "textarea", name: "reason", required: false },
    {
      id: 6,
      question: "Você tem experiência em cuidar de animais?",
      inputType: "radio",
      name: "experience",
      options: ["Sim", "Não"],
      required: true
    },
    {
      id: 7,
      question: "Você possui um espaço adequado e seguro para o pet?",
      inputType: "radio",
      name: "space",
      options: ["Sim", "Não"],
      required: true
    },
    {
      id: 8,
      question: "Você tem disponibilidade de tempo para cuidar do pet?",
      inputType: "radio",
      name: "timeAvailability",
      options: ["Sim", "Não"],
      required: true
    },
    {
      id: 9,
      question: "Você tem noção das responsabilidades envolvidas na adoção de um animal?",
      inputType: "radio",
      name: "responsibilities",
      options: ["Sim", "Não"],
      required: true
    },
    {
      id: 10,
      question: "Se você já tiver outros animais, como eles convivem com outros pets?",
      inputType: "radio",
      name: "petCompatibility",
      options: ["Sim, eles são sociáveis", "Não, eles não são sociáveis"],
      required: true
    },
    {
      id: 11,
      question: "Você concorda em seguir as orientações da organização sobre cuidados com o animal após a adoção?",
      inputType: "radio",
      name: "agreeToFollowGuidelines",
      options: ["Sim", "Não"],
      required: true
    },
    {
      id: 12,
      question: "Você concorda em fornecer atualizações periódicas sobre o bem-estar do animal após a adoção?",
      inputType: "radio",
      name: "agreeToProvideUpdates",
      options: ["Sim", "Não"],
      required: true
    }
  ];

  const handleNext = () => {
    const currentQuestion = questions[step];

    if (currentQuestion.required) {
      const inputElements = document.querySelectorAll(`[name="${currentQuestion.name}"]`);
      const isValid = Array.from(inputElements).some(input => input.checked || input.value);
      if (!isValid) {
        setShowModal(true); // Exibe o modal caso a pergunta obrigatória não tenha resposta
        return; // Impede a navegação para a próxima pergunta
      }
    }

    if (step < questions.length - 1) setStep(step + 1);
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Formulário enviado com sucesso!");
  };

  // Função para redirecionar para a tela de "animais-disponiveis"
  const redirectToAnimalsAvailable = () => {
    router.push('/animais-disponiveis');
  };

  // Função para fechar o modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        {/* Logo do formulário */}
        <img src="/images/patasUnidas.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          {/* Botão "X" para fechar */}
          <button 
            className={styles.closeButton} 
            onClick={redirectToAnimalsAvailable}
          >
            X
          </button>

          {/* Carrossel de perguntas */}
          <motion.div
            key={step} // Garante que o Framer Motion anima corretamente as mudanças
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className={styles.questionContainer}
          >
            <label>{questions[step].question}</label>
            {questions[step].inputType === "radio" ? (
              questions[step].options.map((option, index) => (
                <div key={index} className={styles.radioOption}>
                  <input
                    type="radio"
                    id={`${questions[step].name}-${index}`}
                    name={questions[step].name}
                    value={option}
                    required={questions[step].required} // Torna as opções de rádio obrigatórias
                  />
                  <label htmlFor={`${questions[step].name}-${index}`}>{option}</label>
                </div>
              ))
            ) : questions[step].inputType === "textarea" ? (
              <textarea name={questions[step].name} /> // Não é obrigatório para o campo de texto
            ) : (
              <input
                type={questions[step].inputType}
                name={questions[step].name}
                required={questions[step].required} // Torna os campos de texto obrigatórios
              />
            )}
          </motion.div>

          {/* Botões de navegação */}
          <div className={styles.buttons}>
            {step > 0 && (
              <button type="button" onClick={handlePrevious} className={styles.button}>
                Voltar
              </button>
            )}
            {step < questions.length - 1 ? (
              <button type="button" onClick={handleNext} className={styles.button}>
                Próximo
              </button>
            ) : (
              <button type="submit" className={styles.submitButton}>
                Enviar
              </button>

            )}
          </div>
        </form>
        <div className={styles.lgpdNotice}>
    <h3>Transparência no Uso de Dados</h3>
    <p>
        Os dados fornecidos neste formulário serão utilizados exclusivamente para o processo de adoção 
        do animal selecionado. Garantimos que nenhuma informação será compartilhada com terceiros sem 
        sua autorização. Seguimos as diretrizes da <strong>Lei Geral de Proteção de Dados (LGPD)</strong> 
    </p>
    <p>
        Caso tenha dúvidas sobre como seus dados serão tratados, entre em contato conosco pelo e-mail: 
        <a href="mailto:suporte@patasunidas.com"> suporte@patasunidas.com</a>.
    </p>
    </div>
      </div>

      {/* Modal de alerta */}
      {showModal && (
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          <div className={styles.modalContent}>
            <p>Por favor, responda a pergunta obrigatória.</p>
            <button onClick={closeModal} className={styles.closeModalButton}>
              Fechar
            </button>
          </div>
        </motion.div>
      )}
    </div>

    

  );
};

export default AdoptionForm;
