import React from 'react';
import Header from '../components/Header';
import styles from './About.module.css';

function About() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1 className={styles.title}>APEX WINNING PLATFORM</h1>
        <p className={styles.subtitle}>Transforming Lives Through Lotto Gaming</p>

        <section className={styles.section}>
          <h2>Our Mission</h2>
          <p>
            APEX WINNING PLATFORM is specifically designed to empower our members to achieve
            financial freedom through lottery participation. We understand the struggles of
            financial constraints and have created a platform that provides genuine opportunities
            to change lives.
          </p>
          <p>
            Our platform is setup to help our Members to boom and win big in Lotto, to pay their
            debts, to pay their Children School fees, their Rents, to buy their dream cars, buy
            their dream houses, and to make a living.
          </p>
          <p>
            We believe that everyone deserves a chance to overcome financial obstacles and achieve
            their dreams. Through our carefully developed strategies and dedicated support system,
            we've created a community where financial breakthroughs are not just possible, they're
            expected.
          </p>
        </section>

        <section className={styles.section}>
          <h2>How We Help You Win</h2>
          <div className={styles.grid}>
            <div className={styles.card}>💰 Debt Freedom – Break free from the burden of debts and loans.</div>
            <div className={styles.card}>🎓 Education Security – Ensure your children's education is never compromised.</div>
            <div className={styles.card}>🏠 Home Ownership – Move from worrying about rent to owning your dream home.</div>
            <div className={styles.card}>🚗 Dream Vehicles – Acquire reliable or luxury transportation.</div>
            <div className={styles.card}>🏖️ Better Living – Experience joy of financial security and freedom.</div>
            <div className={styles.card}>📈 Wealth Building – Create sustainable generational wealth.</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Our Approach</h2>
          <p>Statistical analysis, pattern recognition, and strategic betting – combined for maximum winning potential.</p>
          <div className={styles.steps}>
            <div className={styles.step}>1. Registration – Join our community of winners.</div>
            <div className={styles.step}>2. Winning Numbers Access – Get proven 3 straight numbers and bonus.</div>
            <div className={styles.step}>3. Implementation – Apply methods with dedicated support.</div>
            <div className={styles.step}>4. Transformation – Experience life-changing results.</div>
          </div>
        </section>

        <section className={styles.section}>
          <h2>Success Stories</h2>
          <blockquote className={styles.quote}>
            “Before joining APEX WINNING PLATFORM, I was struggling with debt and could barely make ends meet.
            Today, I've paid off all my loans and purchased my first home. This platform truly changes lives.”
            <footer>— Thabo M., Member since 2022</footer>
          </blockquote>
        </section>

        <div className={styles.cta}>
          <a href="https://uk49-livid.vercel.app/login" className={styles.ctaButton}>
            Start Your Journey Now
          </a>
        </div>

        <footer className={styles.footer}>
          <p>© 2023 APEX WINNING PLATFORM. Responsible gaming is encouraged.</p>
        </footer>
      </div>
    </>
  );
}

export default About;