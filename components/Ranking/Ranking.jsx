"use client"
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import '../../styles/ranking.css';

const API_BASE_URL = 'http://localhost:5000'; // Atualize para o URL correto da sua API

const Rank = () => {
  const [difficulty, setDifficulty] = useState('TIQUIZZMASTER');
  const [theme, setTheme] = useState('');
  const [players, setPlayers] = useState([]);
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    const fetchThemes = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado');
        }
        const response = await axios.get(`${API_BASE_URL}/api/themes`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setThemes(response.data);
      } catch (error) {
        console.error('Erro ao buscar temas:', error);
      }
    };

    fetchThemes();
  }, []);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('Token não encontrado');
        }
        const response = await axios.get(`${API_BASE_URL}/api/scores?difficulty=${difficulty}&themeId=${theme}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('Dados recebidos da API:', response.data); // Adicionando console.log para verificar os dados
        const aggregatedScores = aggregateScores(response.data);
        setPlayers(aggregatedScores);
      } catch (error) {
        console.error('Erro ao buscar pontuações:', error);
      }
    };

    fetchPlayers();
  }, [difficulty, theme]);

  const aggregateScores = (scores) => {
    const aggregated = scores.reduce((acc, score) => {
      const key = `${score.userId._id}-${score.themeId._id}-${score.difficulty}`;
      if (!acc[key]) {
        acc[key] = {
          userId: score.userId._id,
          username: score.userId.username,
          themeId: score.themeId._id,
          themeName: score.themeId.name,
          difficulty: score.difficulty,
          totalScore: 0
        };
      }
      acc[key].totalScore += score.score;
      return acc;
    }, {});

    return Object.values(aggregated).sort((a, b) => b.totalScore - a.totalScore);
  };

  const filteredPlayers = players.map((player, index) => ({
    ...player,
    position: index + 1
  }));

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
    <div className="rank-container">
      <canvas id="canvas"></canvas>
      <h1 className="rank-title">Ranking de Jogadores</h1>
      <div className="selectors-container">
        <div className="difficulty-selector">
          <label htmlFor="difficulty">Dificuldade:</label>
          <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Normal">Normal</option>
            <option value="Difícil">Difícil</option>
            <option value="TIQUIZZMASTER">TIQUIZZMASTER</option>
          </select>
        </div>
        <div className="theme-selector">
          <label htmlFor="theme">Tema:</label>
          <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themes.map((theme) => (
              <option key={theme._id} value={theme._id}>{theme.name}</option>
            ))}
          </select>
        </div>
      </div>
      <table className="rank-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Tema</th>
            <th>Pontuação Total</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.position}</td>
              <td>{player.username}</td>
              <td>{player.themeName}</td>
              <td>{player.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <a href="/" className="back-home">
        <FaArrowLeft size={30} color="#00FF00" />
      </a>
    </div>
  );
};

export default Rank;