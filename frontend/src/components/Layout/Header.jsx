import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        📋 Task Manager
      </Link>
      <nav className="header-nav">
        <Link to="/">Board</Link>
        <Link to="/profile">Profile</Link>
        <div className="user-info">
          <span>Hi, {user?.name}</span>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;