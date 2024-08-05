import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ toggleTheme, theme }) => {
  return (
    <header className="header-container">
      <div className="menu-button-link">
        <Link to="/" className="menu-button-link">
          <button className="menu-button">Main Menu</button>
        </Link>
      </div>
      <div className="theme-toggle-button-link">
        <button
          onClick={toggleTheme}
          className="theme-toggle-button"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </div>
    </header>
  );
};

export default Header;
