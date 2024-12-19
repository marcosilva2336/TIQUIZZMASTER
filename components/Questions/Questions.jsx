"use client"
import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import '../../styles/questions.css';

const Questions = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);

    const questions = [
        {
            question: "Explique o conceito de encapsulamento na programação orientada a objetos e como ele pode ser utilizado para melhorar a segurança e a modularidade do código em um sistema de software complexo.",
            answers: [
                "Encapsulamento é um princípio da programação orientada a objetos que restringe o acesso direto aos dados de um objeto e só permite que eles sejam manipulados através de métodos definidos.",
                "Encapsulamento é um conceito que permite que os dados de um objeto sejam acessados diretamente, sem a necessidade de métodos intermediários.",
                "Encapsulamento é uma técnica de programação que permite que os dados de um objeto sejam compartilhados livremente entre diferentes partes de um sistema.",
                "Encapsulamento é um princípio que impede completamente o acesso aos dados de um objeto, tornando-os inacessíveis para qualquer outra parte do sistema."
            ]
        }

    ];

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
        <div className="container">
            <canvas id="canvas"></canvas>

            <div className="container-terminal">
                <div className="terminal">
                    <h1 className="pergunta">{questions[currentQuestion].question}</h1>
                </div>
            </div>

            <div className="grid-container">
                {questions[currentQuestion].answers.map((answer, index) => (
                    <div key={index} className="box">
                        <p className="answer">{answer}</p>
                    </div>
                ))}
            </div>

            <a href="/" className="back-home2">
                <FaArrowLeft size={30} color="#00FF00" />
            </a>
        </div>
    );
};

export default Questions;