// components/DriveTimeDraw.jsx
import React from 'react';
import LottoBall from './LottoBall2';
import styles from './DrawCard.module.css';

const DriveTimeDraw = () => {
  const mainColors = ['#1E88E5', '#E91E63', '#2ecc71']; // Royal Blue, Magenta, Emerald Green
  const bonusColor = '#FFD700'; // Gold

  return (
    <div className={styles.drawCard}>
      <h3 className={styles.drawTitle}>DriveTime Draw</h3>
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

export default DriveTimeDraw;