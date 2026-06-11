// components/LottoBall.jsx
import React from 'react';
import styles from './LottoBall2.module.css';

const LottoBall = ({ number = "00", color = "#d400ff" }) => {
  return (
    <div className={styles.lottoBall}>
      <div 
        className={styles.ballInner}
        style={{ '--ball-color': color }}
      >
        {/* Main front panel */}
        <div className={styles.frontPanel}>
          <span className={styles.frontNumber}>{number}</span>
        </div>
        
        {/* Small white number panels around the sphere */}
        <div className={`${styles.smallPanel} ${styles.panelTop}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelBottom}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelLeft}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelRight}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelTopLeft}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelTopRight}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelBottomLeft}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelBottomRight}`}>00</div>
        <div className={`${styles.smallPanel} ${styles.panelBack}`}>00</div>
        
        {/* Glossy highlight overlay */}
        <div className={styles.glossOverlay}></div>
      </div>
    </div>
  );
};

export default LottoBall;