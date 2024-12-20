"use client"
import React, { useEffect, useState } from 'react';
import { FaTimes, FaArrowLeft } from 'react-icons/fa';
import '../../styles/menu.css';

const temas = [
    // Conceitos de Programação
    'Lógica de Programação',
    'Estrutura de Dados',
    'POO',

    // Linguagens de Programação
    'Python',
    'Java',
    'C',
    'C#',
    'JavaScript',

    // Desenvolvimento
    'Desenvolvimento Web',
    'Desenvolvimento Mobile',

    // Banco de Dados e Redes
    'Banco de Dados',
    'Redes',

    // Ferramentas e Outros
    'Git',
    'Testes',

    // Segurança da Informação
    'Segurança da Informação',

    // Inteligência Artificial
    'I.A'
];

const ITEMS_PER_PAGE = 6;

const Menu = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTema, setSelectedTema] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const openModal = (tema) => {
        setSelectedTema(tema);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedTema('');
    };

    const handleDifficultySelection = (difficulty) => {
        console.log(`Tema: ${selectedTema}, Dificuldade: ${difficulty}`);
        closeModal();
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
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

    // Paginação
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = temas.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(temas.length / ITEMS_PER_PAGE);

    return (
        <div className="menu-container">
            <canvas id="canvas"></canvas>
            <h1 className="menu-title">Escolha um Tema</h1>
            <div className="menu-grid">
                {currentItems.map((tema, index) => (
                    <div key={index} className="menu-item" onClick={() => openModal(tema)}>
                        {tema}
                    </div>
                ))}
            </div>

            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="icon-close" onClick={closeModal}>
                            <FaTimes />
                        </div>
                        <h2>Escolha a Dificuldade</h2>
                        <p>Tema: {selectedTema}</p>
                        <button onClick={() => handleDifficultySelection('Normal')}>Normal</button>
                        <button onClick={() => handleDifficultySelection('Difícil')}>Difícil</button>
                        <button onClick={() => handleDifficultySelection('TIQUIZZMASTER')}>TIQUIZZMASTER</button>
                    </div>
                </div>
            )}

            <a href="/" className="back-home">
                <FaArrowLeft size={30} color="#00FF00" />
            </a>
        </div>
    );
};

export default Menu;