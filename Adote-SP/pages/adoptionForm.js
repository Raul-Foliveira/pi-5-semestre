import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import styles from '../styles/adoptionForm.module.css';

const AdoptionForm = () => {
  const [step, setStep] = useState(0); // Controla o passo atual do formulário
  const [showModal, setShowModal] = useState(false); // Controla a visibilidade do modal
  const [showSuccessModal, setShowSuccessModal] = useState(false); // Modal de sucesso
  const router = useRouter();  // Inicializa o hook do Next.js para redirecionamento

  const [formData, setFormData] = useState({
    fullName: '',
    cpf: '',
    email: '',
    phone: '',
    reason: '',
    experience: '',
    space: '',
    timeAvailability: '',
    responsibilities: '',
    petCompatibility: '',
    agreeToFollowGuidelines: '',
    agreeToProvideUpdates: '',
    age: '',
  });

  const questions = [
    { id: 1, question: "Qual é o seu nome completo?", inputType: "text", name: "fullName", required: true },
    { id: 2, question: "Qual é o seu CPF?", inputType: "text", name: "cpf", required: true },
    { id: 3, question: "Qual é o seu e-mail?", inputType: "email", name: "email", required: true },
    { id: 4, question: "Qual é o seu telefone?", inputType: "tel", name: "phone", required: true },
    { id: 5, question: "Por que deseja adotar este pet?", inputType: "textarea", name: "reason", required: false },
    { id: 6, question: "Você tem experiência em cuidar de animais?", inputType: "radio", name: "experience", options: ["Sim", "Não"], required: true },
    { id: 7, question: "Você possui um espaço adequado e seguro para o pet?", inputType: "radio", name: "space", options: ["Sim", "Não"], required: true },
    { id: 8, question: "Você tem disponibilidade de tempo para cuidar do pet?", inputType: "radio", name: "timeAvailability", options: ["Sim", "Não"], required: true },
    { id: 9, question: "Você tem noção das responsabilidades envolvidas na adoção de um animal?", inputType: "radio", name: "responsibilities", options: ["Sim", "Não"], required: true },
    { id: 10, question: "Se você já tiver outros animais, como eles convivem com outros pets?", inputType: "radio", name: "petCompatibility", options: ["Sim, eles são sociáveis", "Não, eles não são sociáveis"], required: true },
    { id: 11, question: "Você concorda em seguir as orientações da organização sobre cuidados com o animal após a adoção?", inputType: "radio", name: "agreeToFollowGuidelines", options: ["Sim", "Não"], required: true },
    { id: 12, question: "Você concorda em fornecer atualizações periódicas sobre o bem-estar do animal após a adoção?", inputType: "radio", name: "agreeToProvideUpdates", options: ["Sim", "Não"], required: true }
  ];

  const handleNext = () => {
    const currentQuestion = questions[step];
    const isValid = formData[currentQuestion.name] !== "" || (currentQuestion.inputType === "radio" && formData[currentQuestion.name] !== "");

    if (currentQuestion.required && !isValid) {
      setShowModal(true);
      return; // Impede a navegação para a próxima pergunta
    }

    if (step < questions.length - 1) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccessModal(true); // Exibe o modal de sucesso após o envio
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const redirectToAnimalsAvailable = () => {
    router.push('/animais-disponiveis');
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleAgeSelection = (age) => {
    setFormData(prevData => ({ ...prevData, age }));
    if (age === "Não, sou menor de 21 anos") {
      redirectToAnimalsAvailable(); // Redireciona se menor de 21 anos
    } else {
      setStep(1); // Avança para o próximo passo se maior de 21 anos
    }
  };

  const handleSuccessModalClose = () => {
    router.push('/animais-disponiveis'); // Redireciona para o Banner
    setShowSuccessModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        <img src="/images/patasUnidas.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <button 
            className={styles.closeButton} 
            onClick={redirectToAnimalsAvailable}
          >
            X
          </button>

          {step === 0 && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={styles.questionContainer}
            >
              <div className={styles.questionNumber}>1</div>
              <label>Você é maior de 21 anos e está ciente da legislação mínima da Patas Unidas?</label>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="adult-no"
                  name="age"
                  value="Não, sou menor de 21 anos"
                  onChange={() => handleAgeSelection("Não, sou menor de 21 anos")}
                  required
                />
                <label htmlFor="adult-no">Não, sou menor de 21 anos</label>
              </div>
              <div className={styles.radioOption}>
                <input
                  type="radio"
                  id="adult-yes"
                  name="age"
                  value="Sim, sou maior de 21 anos"
                  onChange={() => handleAgeSelection("Sim, sou maior de 21 anos")}
                  required
                />
                <label htmlFor="adult-yes">Sim, sou maior de 21 anos</label>
              </div>
            </motion.div>
          )}

          {step > 0 && step < questions.length && (
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className={styles.questionContainer}
            >
              <div className={styles.questionNumber}>{step + 1}</div>
              <label>{questions[step].question}</label>
              {questions[step].inputType === "radio" ? (
                questions[step].options.map((option, index) => (
                  <div key={index} className={styles.radioOption}>
                    <input
                      type="radio"
                      id={`${questions[step].name}-${index}`}
                      name={questions[step].name}
                      value={option}
                      onChange={handleChange}
                      required={questions[step].required}
                    />
                    <label htmlFor={`${questions[step].name}-${index}`}>{option}</label>
                  </div>
                ))
              ) : (
                <input
                  type={questions[step].inputType}
                  name={questions[step].name}
                  value={formData[questions[step].name]}
                  onChange={handleChange}
                  required={questions[step].required}
                  className={styles.inputField}
                />
              )}
            </motion.div>
          )}

          <div className={styles.buttonsContainer}>
            <button type="button" onClick={handlePrevious} disabled={step === 0}>
              Voltar
            </button>
            <button type="button" onClick={handleNext}>
              {step === questions.length - 1 ? 'Finalizar' : 'Próximo'}
            </button>
          </div>
        </form>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Por favor, preencha todos os campos obrigatórios!</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className={styles.successModal}>
          <div className={styles.successModalContent}>
            <p>Adoção concluída com sucesso!</p>
            <button onClick={handleSuccessModalClose}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionForm;
