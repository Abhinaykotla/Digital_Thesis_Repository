import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
const AdminHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header>
      <div className="container1">
        <div className="logo">
          <h1 >Thesis Repository</h1>
        </div>
        <button className="menu-toggle" aria-label="Toggle menu" onClick={toggleMenu}>
          &#9776;
        </button>

        <nav>
          <ul className={menuOpen ? 'open' : ''}>
            <li>
              <button
                className="close-menu"
                aria-label="Close menu"
                onClick={toggleMenu}
                style={{ display: menuOpen ? 'inline-block' : 'none' }}
              >
                X
              </button>
            </li>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/admindashboard">Dashboard</Link></li>
            <li><Link to="/search">Repository</Link></li>
            {/* <li><Link to="/submitthesis">Submit Thesis</Link></li> */}
            {/* <li><Link to="/thesistable">Thesis Submissions</Link></li> */}
            {/* <li><Link to="/statistics">Statistics</Link></li> */}
            {/* <li><Link to="/thesistable">Peer Review</Link></li> */}
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            {/* <li><a  href="" target="_blank">Blog</a></li> */}
            {/* <li><Link to="/login">Login</Link></li> */}
            {/* <li><Link to="/register">Register</Link></li> */}
            <li><Link to='/chat'>Chat</Link></li>
            <li><Link to='logout'>Logout</Link></li>

          </ul>
        </nav>
      </div>
    </header>
  );
};

export default AdminHeader;
