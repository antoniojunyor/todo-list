import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import imgResponsive from '../assets/images/responsive.png';

const Home = () => (
  <div className="as-home-page">
    <div className="as-wrap-content">
      <img src={imgResponsive} alt="Devices Responsivos"/>
      <h1>Do it now</h1>
      <Link to="/create-account" className="as-button-orange"><span>Criar Conta</span></Link>
      <Link to="/login" className="as-button-green"><span>Entrar</span></Link>
    </div>
  </div>
);
