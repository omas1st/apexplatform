// components/TeaTimeDraw.jsx
import React from 'react';
import LottoBall from './LottoBall2';
import styles from './DrawCard.module.css';

const TeaTimeDraw = () => {
  const mainColors = ['#1abc9c', '#9b59b6', '#f1c40f']; // Cyan, Purple, Yellow
  const bonusColor = '#FF5722'; // Deep Orange

  return (
    <div className={styles.drawCard}>
      <h3 className={styles.drawTitle}>TeaTime Draw</h3>
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

export default TeaTimeDraw;