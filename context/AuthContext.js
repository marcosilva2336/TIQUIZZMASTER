"use client";
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import API_BASE_URL from '../constant/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/api/auth/me`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setUser(response.data);
        } catch (error) {
          console.error('Erro ao buscar informações do usuário:', error);
          localStorage.removeItem('token');
          setError('Você precisa estar logado para acessar esta página.');
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setSuccess('Login realizado com sucesso!');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Email ou senha incorretos.');
      } else if (error.response && error.response.status === 400) {
        setError('Preencha todos os campos corretamente.');
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
      throw new Error(error.response ? error.response.data.message : 'Erro ao fazer login');
    }
  };

  const register = async (username, email, password) => {
    setError('');
    setSuccess('');
    try {
      const response = await axios.post(`${API_BASE_URL}/api/auth/register`, { username, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      setSuccess('Registro realizado com sucesso!');
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError('Preencha todos os campos corretamente.');
      } else if (error.response && error.response.status === 409) {
        setError('Email já está em uso.');
      } else {
        setError('Ocorreu um erro inesperado. Tente novamente mais tarde.');
      }
      throw new Error(error.response ? error.response.data.message : 'Erro ao fazer registro');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const isAuthenticated = () => {
    return !!user;
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, success, login, register, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;