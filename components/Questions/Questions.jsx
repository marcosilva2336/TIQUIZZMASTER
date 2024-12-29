"use client"
import React, { useEffect, useState, useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import '../../styles/questions.css';
import API_BASE_URL from '../../constant/api';
import AuthContext from '../../context/AuthContext';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Questions = () => {
  const { user } = useContext(AuthContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [resultMessage, setResultMessage] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFinalModal, setShowFinalModal] = useState(false);
  const [finalMessage, setFinalMessage] = useState('');
  const searchParams = useSearchParams();
  const themeId = searchParams.get('themeId');
  const difficulty = searchParams.get('difficulty');
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      console.log('Fetching questions...');
      await delay(1000);
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/questions/theme/${themeId}?difficulty=${difficulty}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Questions fetched:', response.data);
        setQuestions(response.data);
      } catch (error) {
        console.error('Erro ao buscar perguntas:', error);
      }
    };

    fetchQuestions();
  }, [themeId, difficulty]);

  useEffect(() => {
    // Cria o elemento canvas e adiciona ao DOM
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);

    const rainCodeScript = document.createElement('script');
    rainCodeScript.innerHTML = `
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|]}";
      matrix = matrix.split('');

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      var columns = canvas.width / 20;
      var drops = [];

      var gradientSpeed = 0.002;
      var gradient = null;
      var colorCount = 0;

      function createGradient() {
        gradient = context.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop(0, "#0F0");
        gradient.addColorStop(0.5, "#00FF00");
        gradient.addColorStop(1, "#0F0");
      }

      function updateGradient() {
        if (colorCount > 1 / gradientSpeed) {
          colorCount = 0;
          createGradient();
        }

        gradient.addColorStop(0, "#0F0");
        gradient.addColorStop(0.5, "#00FF00");
        gradient.addColorStop(1, "#0F0");

        colorCount += gradientSpeed;
      }

      createGradient();

      for (var i = 0; i < columns; i++) {
        drops[i] = 1;
      }

      function draw() {
        context.fillStyle = 'rgba(0, 0, 0, 0.05)';
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = gradient;
        context.font = '15px arial';

        for (var i = 0; i < drops.length; i++) {
          var text = matrix[Math.floor(Math.random() * matrix.length)];
          context.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975)
            drops[i] = 0;

          drops[i]++;
        }

        updateGradient();
      }

      var intervalId = setInterval(draw, 30);
    `;
    document.body.appendChild(rainCodeScript);

    return () => {
      document.body.removeChild(rainCodeScript);
      document.body.removeChild(canvas);
      clearInterval(intervalId);
    };
  }, []);

  const handleAnswerClick = (isCorrect, index) => {
    console.log('Answer clicked:', isCorrect);
    setSelectedAnswer(index);
    if (isCorrect) {
      setScore(prevScore => prevScore + 10); // Cada questão correta vale 10 pontos
      setResultMessage('Você acertou!');
    } else {
      setResultMessage('Você errou!');
    }
    setShowResult(true);
    setTimeout(() => {
      setShowResult(false);
      setResultMessage('');
      setSelectedAnswer(null);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Enviar pontuação para o backend
        const finalScore = isCorrect ? score + 10 : score; // Atualizar a pontuação final
        const token = localStorage.getItem('token');
        axios.post(`${API_BASE_URL}/api/scores`, {
          userId: user._id, // Usar o ID real do usuário logado
          themeId,
          difficulty,
          score: finalScore
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(() => {
          const percentage = (finalScore / (questions.length * 10)) * 100;
          if (percentage === 100) {
            setFinalMessage('Incrível! Você acertou todas as questões! Você pode subir de nível.');
          } else if (percentage >= 80 && percentage < 100) {
            setFinalMessage('Parabéns! Você acertou mais de 80% das questões! Você pode arriscar subir de nível.');
          } else {
            setFinalMessage('Você acertou menos de 80% das questões. Estude mais para subir a dificuldade!');
          }
          setShowFinalModal(true);
        }).catch(error => {
          console.error('Erro ao enviar pontuação:', error);
        });
      }
    }, 2000);
  };

  if (questions.length === 0) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="container">
      <canvas id="canvas"></canvas>

      <div className="container-terminal">
        <div className="terminal">
          <h1 className="pergunta">{questions[currentQuestion].questionText}</h1>
        </div>
      </div>

      <div className="grid-container">
        {questions[currentQuestion].answers.map((answer, index) => (
          <div
            key={index}
            className={`box ${selectedAnswer !== null ? (answer.isCorrect ? 'correct' : (selectedAnswer === index ? 'incorrect' : '')) : ''}`}
            onClick={() => handleAnswerClick(answer.isCorrect, index)}
          >
            <p className="answer">{answer.text}</p>
          </div>
        ))}
      </div>

      {showResult && <div className="result-message">{resultMessage}</div>}

      <div className="score-counter">
        Pontuação: {score} | Progresso: {currentQuestion + 1}/{questions.length}
      </div>

      <a href="/menu" className="back-home2">
        <FaArrowLeft size={30} color="#00FF00" />
      </a>

      {showFinalModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{finalMessage}</h2>
            <div>
              <button onClick={() => router.push('/menu')} className="modal-button">
                Ir ao Menu
              </button>
              <button onClick={() => router.push('/ranking')} className="modal-button">
                Ver Ranking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Questions;