// components/LunchtimeDraw.jsx
import React from 'react';
import LottoBall from './LottoBall2';
import styles from './DrawCard.module.css';

const LunchtimeDraw = () => {
  const mainColors = ['#e74c3c', '#f39c12', '#2ecc71']; // Red, Orange, Green
  const bonusColor = '#C0C0C0'; // Silver

  return (
    <div className={styles.drawCard}>
      <h3 className={styles.drawTitle}>Lunchtime Draw</h3>
      <div className={styles.drawContent}>
        <div className={styles.mainBalls}>
          <LottoBall number="00" color={mainColors[0]} />
          <LottoBall number="00" color={mainColors[1]} />
          <LottoBall number="00" color={mainColors[2]} />
        </div>
        <div className={styles.bonusSection}>
          <span className={styles.bonusLabel}>Bonus:</span>
          <LottoBall number="00" color={bonusColor} />
        </div>
      </div>
    </div>
  );
};

export default LunchtimeDraw;