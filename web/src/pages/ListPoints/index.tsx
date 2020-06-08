import React, { useState, useEffect } from 'react';

import api from '../../services/api';

import Header from '../../components/Header';

import './styles.css';

const List: React.FC = () => {
  const [points, setPoints] = useState<string[]>([]);

  useEffect(() => {
    api.get('/points').then(response => {
      setPoints(response.data);
    });
  }, []);

  return (
    <>
      <Header />
      <h1>Listagem de pontos</h1>

    </>
  );
};

export default List;
