"use client"
import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import '../../styles/cadastro.css';
import '../../styles/code_rain.css';

const Cadastro = () => {
  const [isClosing, setIsClosing] = useState(false);
  const router = useRouter();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      router.push('/'); 
    }, 500);
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
          <div className="input-box">
            <input type="text" required />
            <label>Username</label>
            <span className="icon">
              <FaUser />
            </span>
          </div>
          <div className="input-box">
            <input type="email" required />
            <label>Email</label>
            <span className="icon">
              <FaEnvelope />
            </span>
          </div>
          <div className="input-box">
            <input type="password" required />
            <label>Password</label>
            <span className="icon">
              <FaLock />
            </span>
          </div>
          <button className="button">Cadastrar</button>
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