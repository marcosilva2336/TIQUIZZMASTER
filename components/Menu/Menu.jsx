"use client"
import React, { useEffect, useState, useContext } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import '../../styles/menu.css';
import API_BASE_URL from '../../constant/api';
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 6;

const Menu = () => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [temas, setTemas] = useState([]);
  const [loadingTemas, setLoadingTemas] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated()) {
      alert('Você precisa estar logado para acessar esta página.');
      router.push('/');
    } else if (isAuthenticated()) {
      fetchTemas();
    }
  }, [loading, isAuthenticated]);

  const fetchTemas = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`${API_BASE_URL}/api/themes`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTemas(response.data);
      setLoadingTemas(false);
    } catch (error) {
      console.error('Erro ao buscar temas:', error);
      setLoadingTemas(false);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTemaSelection = (temaId) => {
    router.push(`/select-difficulty?themeId=${temaId}`);
  };

  useEffect(() => {
    // Cria o elemento canvas e adiciona ao DOM
    const canvas = document.createElement('canvas');
    canvas.id = 'canvas';
    document.body.appendChild(canvas);

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
      document.body.removeChild(canvas);
      clearInterval(intervalId);
    };
  }, []);

  // Paginação
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = temas.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(temas.length / ITEMS_PER_PAGE);

  if (loadingTemas) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="menu-container">
      <canvas id="canvas"></canvas>
      <h1 className="menu-title">Escolha um Tema</h1>
      <div className="menu-grid">
        {currentItems.map((tema, index) => (
          <div key={index} className="menu-item" onClick={() => handleTemaSelection(tema._id)}>
            {tema.name}
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

      <a href="/" className="back-home">
        <FaArrowLeft size={30} color="#00FF00" />
      </a>
    </div>
  );
};

export default Menu;