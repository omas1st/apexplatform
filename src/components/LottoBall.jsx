import React from 'react';
import styles from './LottoBall.module.css';

// Vibrant colors for the balls (no white)
const BALL_COLORS = [
  '#F59E0B', // gold
  '#EF4444', // red
  '#3B82F6', // blue
  '#10B981', // green
  '#8B5CF6', // purple
  '#EC4899', // pink
  '#06B6D4', // cyan
  '#F97316', // orange
  '#84CC16', // lime
  '#E11D48', // rose
];

function LottoBall({ number, x, y, highlighted, spinning }) {
  const color = BALL_COLORS[number % BALL_COLORS.length];
  return (
    <div
      className={`${styles.ball} ${highlighted ? styles.highlighted : ''}`}
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        transition: spinning
          ? 'left 0.1s linear, top 0.1s linear'
          : 'left 0.5s ease-out, top 0.5s ease-out',
        background: `radial-gradient(circle at 36% 28%, #ffffff 0%, ${color} 100%)`,
        boxShadow: `inset 0 -4px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.4)`,
      }}
    >
      <span className={styles.number}>{number}</span>
    </div>
  );
}

export default LottoBall;