import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Analytics from './components/Analytics';

export default function App() {
  return (
    <Router>
      <div style={styles.navbar}>
        <h2 style={styles.logo}>SnackShelf</h2>
        <nav>
          <Link to="/" style={styles.link}>Home</Link>
          <Link to="/analytics" style={styles.link}>Analytics</Link>
        </nav>
      </div>

      <div style={styles.container}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analytics" element={<Analytics />} />
        </Routes>
      </div>
    </Router>
  );
}

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    alignItems: 'center',
    color: '#fff',
  },
  logo: {
    margin: 0,
    fontSize: '1.5rem',
  },
  link: {
    marginLeft: '1rem',
    textDecoration: 'none',
    color: '#61dafb',
    fontWeight: 'bold',
  },
  container: {
    padding: '2rem',
  },
};
