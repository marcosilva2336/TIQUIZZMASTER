"use client"
import React, { useState, useContext, useEffect } from 'react';
import { FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import '../../styles/login.css';

const Login = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [email, setEmail] = useState('joao1245marcos@outlook.com');
  const [password, setPassword] = useState('123456');
  const { login, error, success } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertColor, setAlertColor] = useState('#f44336');
  const router = useRouter();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.push('/'); 
    }, 500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setAlertColor('#00FF00'); // Cor verde para sucesso
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        router.push('/');
      }, 1000);
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      setAlertColor('#f44336'); // Cor vermelha para erro
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  useEffect(() => {
    // Script para rain_code.js
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
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (success) {
      setAlertColor('#00FF00'); // Cor verde para sucesso
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  }, [success]);

  return (
    <div className={`container ${isClosing ? 'closing' : ''}`}>
      <canvas id="canvas"></canvas>
      {showAlert && (
        <div className="alert" style={{ backgroundColor: alertColor }}>
          <span className="alert-message">{error || success}</span>
          <button className="alert-close" onClick={() => setShowAlert(false)}>X</button>
        </div>
      )}
      <div className="wrapper">
        <div className="icon-close" onClick={handleClose}>
          <FaTimes />
        </div>
        <div className="form-box">
          <h2 className="title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label>Email</label>
              <span className="icon">
                <FaEnvelope />
              </span>
            </div>
            <div className="input-box">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Password</label>
              <span className="icon">
                <FaLock />
              </span>
            </div>
            <div className="remember-forgot">
              <a href="#" className="link">Esqueceu a senha?</a>
            </div>
            <button className="button" type="submit">Login</button>
          </form>
          <div className="login-register">
            <p>
              Não tem uma conta? <a href="/cadastro" className="link">Registre-se</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;