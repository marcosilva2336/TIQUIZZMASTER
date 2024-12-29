"use client"
import React, { useState, useEffect, useContext } from 'react';
import { FaUser, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import AuthContext from '../../context/AuthContext';
import '../../styles/cadastro.css';

const Cadastro = () => {
  const [isClosing, setIsClosing] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { register } = useContext(AuthContext);
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
      await register(username, email, password);
      router.push('/menu');
    } catch (error) {
      console.error('Erro ao criar usuário:', error.message);
      setError(error.message);
    }
  };

  useEffect(() => {
    // Script para rain_code.js
    const rainCodeScript = document.createElement('script');
    rainCodeScript.innerHTML = `
      var canvas = document.getElementById('canvas');
      var context = canvas.getContext('2d');
      var matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|` + "`" + `]}";
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

  return (
    <div className={`container ${isClosing ? 'closing' : ''}`}>
      <canvas id="canvas"></canvas>
      <div className="wrapper">
        <div className="icon-close" onClick={handleClose}>
          <FaTimes />
        </div>
        <div className="form-box">
          <h2 className="title">Cadastro</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Username</label>
              <span className="icon">
                <FaUser />
              </span>
            </div>
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
            <button className="button" type="submit">Cadastrar</button>
          </form>
          <div className="login-register">
            <p>
              Já tem uma conta? <a href="/login" className="link">Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cadastro;