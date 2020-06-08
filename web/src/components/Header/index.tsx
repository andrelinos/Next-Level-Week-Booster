import React from 'react';
import { Link } from 'react-router-dom';
import {FiSearch} from 'react-icons/fi';

import logo from '../../assets/logo.svg';

import { Container } from './styles';

const Header: React.FC = () => {
  return (
    <>
      <Container>
      <Link to="/"><img src={logo} alt="Ecoleta" /></Link>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/create-point">Cadastrar</Link></li>
            <li><Link to="/list-points">Pontos</Link></li>
          </ul>
            <div>
              <input type="search" placeholder="Procurar..." />
              <button type="submit"> <FiSearch size={24} color="#fff"/> </button>
            </div>
        </nav>
      </Container>
    </>
  );
};

export default Header;
