"use client"
import React, { useEffect, useState } from 'react';
import { FaSignInAlt, FaVolumeUp, FaVolumeMute, FaCaretDown } from 'react-icons/fa';
import baffle from 'baffle';
import axios from 'axios';
import '../../styles/styles.css';
import '../../styles/code_rain.css';
import { AUDIO_PATHS } from '../../constant/audio';
import API_BASE_URL from '../../constant/api';

export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isAudioInitialized, setIsAudioInitialized] = useState(false);
  const [username, setUsername] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  useEffect(() => {
    // Inicializar baffle.js
    const text = baffle(".titulo");
    text.set({
      characters: '█/▓█ ▓█▒▒ ▓░▒ ▓▓▒▓ <▒█▒░ >█> ▓▒▓>▓ ░▓▒>/ ​​▓▓▓',
      speed: 120
    });
    text.start();
    text.reveal(2000);

    const btn = baffle(".btn");
    btn.set({
      characters: '█/▓█ ▓█▒▒ ▓░▒ ▓▓▒▓ <▒█▒░ >█> ▓▒▓>▓ ░▓▒>/ ​​▓▓▓',
      speed: 120
    });
    btn.start();
    btn.reveal(50000);

    const rank = baffle(".rank-title");
    rank.set({
      characters: '█/▓█ ▓█▒▒ ▓░▒ ▓▓▒▓ <▒█▒░ >█> ▓▒▓>▓ ░▓▒>/ ​​▓▓▓',
      speed: 120
    });
    rank.start();
    rank.reveal(5000);

    const table = baffle("td");
    table.set({
      characters: '█/▓█ ▓█▒▒ ▓░▒ ▓▓▒▓ <▒█▒░ >█> ▓▒▓>▓ ░▓▒>/ ​​▓▓▓',
      speed: 120
    });
    table.start();
    table.reveal(9000);

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

    // Buscar informações do usuário da API
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        return; // Não faz a requisição se o token não estiver presente
      }

      try {
        const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUsername(response.data.username);
        console.log('Nome de usuário definido:', response.data.username); // Log para verificar se o estado está sendo atualizado
      } catch (error) {
        console.error('Erro ao buscar informações do usuário:', error);
        localStorage.removeItem('token'); // Remove o token inválido
        setUsername(''); // Garante que o ícone de login será exibido
      }
    };

    fetchUserData();

    return () => {
      document.body.removeChild(rainCodeScript);
      clearInterval(intervalId);
    };
  }, []);

  const toggleAudio = () => {
    const audio = document.querySelector('.background-audio');
    if (isAudioPlaying) {
      audio.pause();
    } else {
      audio.play().catch(error => {
        console.error('Erro ao reproduzir áudio:', error);
      });
    }
    setIsAudioPlaying(!isAudioPlaying);
  };

  const initializeAudio = () => {
    const audio = document.querySelector('.background-audio');
    audio.play().catch(error => {
      console.error('Erro ao reproduzir áudio:', error);
    });
    setIsAudioPlaying(true);
    setIsAudioInitialized(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUsername('');
    setIsDropdownVisible(false);
  };

  return (
    <>
      <div className="container">
        <h1 className="titulo">T.I QUIZZMASTER</h1>
        <canvas id="canvas"></canvas>

        <div className="botao">
          <a className="btn" href="/menu">Começar</a>
          <a className="btn" href="/ranking">Ranking</a>
          <a className="btn" href="/credit">Créditos</a>
        </div>

        {username ? (
          <div className="username" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
            <span>Vamos jogar, {username}!</span>
            <FaCaretDown size={20} color="#00FF00" />
            {isDropdownVisible && (
              <div className="dropdown">
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <a href="/login" className="login">
            <FaSignInAlt size={50} color="#00FF00" />
          </a>
        )}
        <audio className="background-audio" loop>
          <source src={AUDIO_PATHS.BACKGROUND_MUSIC} type="audio/mpeg" />
        </audio>
        <button onClick={initializeAudio} className="audio-toggle">
          {isAudioPlaying ? <FaVolumeUp size={50} color="#00FF00" /> : <FaVolumeMute size={50} color="#00FF00" />}
        </button>
      </div>
    </>
  );
}