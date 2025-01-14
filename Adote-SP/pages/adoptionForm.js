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
    nome: '',
    idade: '',
    cpf: '',
    email: '',
    telefone: '',
    motivo_adocao: '',
    experiencia_cuidados: '',
    espaco_adequado: '',
    disponibilidade_tempo: '',
    responsabilidades_adocao: '',
    compatibilidade_animais: '',
    concorda_com_orientacoes: '',
    concorda_com_atualizacoes: '',
  });

  const questions = [
    { id: 1, question: "Qual é o seu nome completo?", inputType: "text", name: "nome", required: true },
    { id: 2, question: "Qual é a sua idade?", inputType: "radio", name: "idade", options: ["Menor de 21 anos", "Maior de 21 anos"], required: true },
    { id: 3, question: "Qual é o seu CPF?", inputType: "text", name: "cpf", required: true },
    { id: 4, question: "Qual é o seu e-mail?", inputType: "email", name: "email", required: true },
    { id: 5, question: "Qual é o seu telefone?", inputType: "tel", name: "telefone", required: true },
    { id: 6, question: "Por que deseja adotar este pet?", inputType: "textarea", name: "motivo_adocao", required: false },
    { id: 7, question: "Você tem experiência em cuidar de animais?", inputType: "radio", name: "experiencia_cuidados", options: ["Sim", "Não"], required: true },
    { id: 8, question: "Você possui um espaço adequado e seguro para o pet?", inputType: "radio", name: "espaco_adequado", options: ["Sim", "Não"], required: true },
    { id: 9, question: "Você tem disponibilidade de tempo para cuidar do pet?", inputType: "radio", name: "disponibilidade_tempo", options: ["Sim", "Não"], required: true },
    { id: 10, question: "Você tem noção das responsabilidades envolvidas na adoção de um animal?", inputType: "radio", name: "responsabilidades_adocao", options: ["Sim", "Não"], required: true },
    { id: 11, question: "Se você já tiver outros animais, como eles convivem com outros pets?", inputType: "radio", name: "compatibilidade_animais", options: ["Sim, eles são sociáveis", "Não, eles não são sociáveis"], required: true },
    { id: 12, question: "Você concorda em seguir as orientações da organização sobre cuidados com o animal após a adoção?", inputType: "radio", name: "concorda_com_orientacoes", options: ["Sim", "Não"], required: true },
    { id: 13, question: "Você concorda em fornecer atualizações periódicas sobre o bem-estar do animal após a adoção?", inputType: "radio", name: "concorda_com_atualizacoes", options: ["Sim", "Não"], required: true }
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSubmit = { ...formData };
  
    try {
      const response = await fetch('http://127.0.0.1:5000/submitAdoptionForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDataToSubmit),
      });
  
      const data = await response.json();
  
      if (data.success) {
        console.log('Formulário enviado com sucesso');
        setShowSuccessModal(true); 
      } else {
        console.error('Erro ao enviar o formulário:', data.message);
      }
    } catch (error) {
      console.error('Erro ao enviar o formulário:', error);
    }
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

  const handleSuccessModalClose = () => {
    router.push('/animais-disponiveis'); 
    setShowSuccessModal(false);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.logoContainer}>
        <img src="/images/patasUnidas.png" alt="Logo" className={styles.logo} />
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <button className={styles.closeButton} onClick={redirectToAnimalsAvailable}>X</button>

          {/* Passo 0 - Pergunta sobre nome completo */}
          {step === 0 && (
            <motion.div key={step} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className={styles.questionContainer}>
              <div className={styles.questionNumber}>1</div>
              <label>Qual é o seu nome completo?</label>
              <input type="text" name="nome" value={formData.nome} onChange={handleChange} required />
            </motion.div>
          )}

          {/* Passo 1 - Pergunta sobre idade */}
          {step === 1 && (
            <motion.div key={step} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className={styles.questionContainer}>
              <div className={styles.questionNumber}>2</div>
              <label>Qual é a sua idade?</label>
              <div>
                <input type="radio" id="idade1" name="idade" value="Menor de 21 anos" onChange={handleChange} required />
                <label htmlFor="idade1">Menor de 21 anos</label>
              </div>
              <div>
                <input type="radio" id="idade2" name="idade" value="Maior de 21 anos" onChange={handleChange} required />
                <label htmlFor="idade2">Maior de 21 anos</label>
              </div>
            </motion.div>
          )}

          {/* Passos seguintes - Perguntas do formulário */}
          {step > 1 && step < questions.length && (
            <motion.div key={step} initial={{ opacity: 0, x: 100 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -100 }} transition={{ duration: 0.5 }} className={styles.questionContainer}>
              <div className={styles.questionNumber}>{step + 1}</div>
              <label>{questions[step].question}</label>
              {questions[step].inputType === "radio" ? (
                questions[step].options.map((option, index) => (
                  <div key={index} className={styles.radioOption}>
                    <input type="radio" id={`${questions[step].name}-${index}`} name={questions[step].name} value={option} onChange={handleChange} required={questions[step].required} />
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
                />
              )}
            </motion.div>
          )}

          <div className={styles.buttonContainer}>
            <button type="button" onClick={handlePrevious} disabled={step === 0} className={styles.button}>Voltar</button>
            {step === questions.length - 1 ? (
              <button type="submit" className={styles.button}>Enviar</button>
            ) : (
              <button type="button" onClick={handleNext} className={styles.button}>Próximo</button>
            )}
          </div>
        </form>
      </div>

      {/* Modal de aviso para campos obrigatórios */}
      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Por favor, preencha todos os campos obrigatórios antes de continuar.</p>
            <button onClick={closeModal}>Fechar</button>
          </div>
        </div>
      )}

      {/* Modal de sucesso */}
      {showSuccessModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Formulário enviado com sucesso!</p>
            <button onClick={handleSuccessModalClose}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptionForm;
