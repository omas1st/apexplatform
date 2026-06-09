import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>APEX WINNING PLATFORM</div>
      <nav className={styles.nav}>
        <a
          href="https://uk49-livid.vercel.app/register"
          className={styles.btn}
        >
          Register
        </a>
        <a
          href="https://uk49-livid.vercel.app/login"
          className={styles.btn}
        >
          Login
        </a>
        <Link to="/about" className={styles.btn}>
          About Us
        </Link>
      </nav>
    </header>
  );
}

export default Header;