import React from 'react';
import { Link } from 'react-router-dom';
import './sidebar.css';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <Link to="/dashboard" className="sidebar-icon">
        <i className="fas fa-th"></i>
      </Link>
      <Link to="/prediction" className="sidebar-icon">
         <i className="fas fa-file-alt"></i>
      </Link>
    </aside>
  );
};

export default Sidebar;
