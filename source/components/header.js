import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header className="as-header">
    <div className="as-header-container">
      <NavLink to="/my-lists" activeClassName="as-active">
        <h1 className="as-header-title">Do it now</h1>
      </NavLink>
      <p className="as-user">Usuário 1</p>
    </div>
  </header>
);

export default Header;
