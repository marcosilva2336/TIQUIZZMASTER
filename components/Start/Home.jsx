"use client"
import React, { useEffect, useState } from 'react';
import { FaSignInAlt, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';
import baffle from 'baffle';
import '../../styles/styles.css';
import '../../styles/code_rain.css';
import { AUDIO_PATHS } from '../../constant/audio';

export default function Home() {
  const [isAudioPlaying, setIsAudioPlaying] = useState(true);

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
      audio.play();
    }
    setIsAudioPlaying(!isAudioPlaying);
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

        <a href="/login" className="login">
          <FaSignInAlt size={50} color="#00FF00" />
        </a>
        <audio className="background-audio" autoPlay loop>
          <source src={AUDIO_PATHS.BACKGROUND_MUSIC} type="audio/mpeg" />
        </audio>
        <button onClick={toggleAudio} className="audio-toggle">
          {isAudioPlaying ? <FaVolumeUp size={50} color="#00FF00" /> : <FaVolumeMute size={50} color="#00FF00" />}
        </button>
      </div>
    </>
  );
}