"use client"
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/ranking.css';

const Rank = () => {
  const [difficulty, setDifficulty] = useState('TIQUIZZMASTER');

  const players = [
    { name: 'Jogador 1', score: 1000, difficulty: 'TIQUIZZMASTER' },
    { name: 'Jogador 2', score: 900, difficulty: 'Difícil' },
    { name: 'Jogador 3', score: 800, difficulty: 'Normal' },
    { name: 'Jogador 4', score: 700, difficulty: 'TIQUIZZMASTER' },
    { name: 'Jogador 5', score: 600, difficulty: 'Difícil' },
    // Adicione mais jogadores conforme necessário
  ];

  const filteredPlayers = players
    .filter(player => player.difficulty === difficulty)
    .sort((a, b) => b.score - a.score)
    .map((player, index) => ({ ...player, position: index + 1 }));

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
      <div className="difficulty-selector">
        <label htmlFor="difficulty">Selecione a Dificuldade:</label>
        <select id="difficulty" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
          <option value="Normal">Normal</option>
          <option value="Difícil">Difícil</option>
          <option value="TIQUIZZMASTER">TIQUIZZMASTER</option>
        </select>
      </div>
      <table className="rank-table">
        <thead>
          <tr>
            <th>Posição</th>
            <th>Nome</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {filteredPlayers.map((player, index) => (
            <tr key={index}>
              <td>{player.position}</td>
              <td>{player.name}</td>
              <td>{player.score}</td>
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