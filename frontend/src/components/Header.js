import React from 'react';
import { MessageSquare } from 'lucide-react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <MessageSquare size={32} />
          <h1>Feedback Dashboard</h1>
        </div>
        <p className="subtitle">Share your thoughts and help us improve</p>
      </div>
    </header>
  );
};

export default Header;
