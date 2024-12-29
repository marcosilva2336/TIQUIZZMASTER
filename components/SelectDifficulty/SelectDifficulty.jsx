"use client"
import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/selectdifficulty.css';
import API_BASE_URL from '../../constant/api';

const SelectDifficulty = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const themeId = searchParams.get('themeId');
  const [themeName, setThemeName] = useState('');

  useEffect(() => {
    const fetchThemeName = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${API_BASE_URL}/api/themes/${themeId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setThemeName(response.data.name);
      } catch (error) {
        console.error('Erro ao buscar o nome do tema:', error);
      }
    };

    if (themeId) {
      fetchThemeName();
    }
  }, [themeId]);

  const handleDifficultySelection = (difficulty) => {
    router.push(`/questions?themeId=${themeId}&difficulty=${difficulty}`);
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
    <div className="select-difficulty-container">
      <canvas id="canvas"></canvas>
      <div className="select-difficulty-content">
        <div className="icon-close" onClick={() => router.push('/menu')}>
          <FaTimes />
        </div>
        <h1 className="select-difficulty-title">Escolha a Dificuldade</h1>
        <p className="select-difficulty-tema">Tema: {themeName}</p>
        <button onClick={() => handleDifficultySelection('Normal')}>Normal</button>
        <button onClick={() => handleDifficultySelection('Difícil')}>Difícil</button>
        <button onClick={() => handleDifficultySelection('TIQUIZZMASTER')}>TIQUIZZMASTER</button>
      </div>
    </div>
  );
};

export default SelectDifficulty;