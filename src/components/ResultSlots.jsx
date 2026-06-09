import React from 'react';
import styles from './ResultSlots.module.css';

function ResultSlots({ refs, revealedSlots }) {
  return (
    <div className={styles.row}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          ref={refs[i]}
          className={`${styles.slot} ${revealedSlots[i] !== null ? styles.filled : ''}`}
        >
          {revealedSlots[i] !== null ? (
            <div className={styles.ball}>
              <span className={styles.number}>{revealedSlots[i]}</span>
            </div>
          ) : (
            <span className={styles.placeholder}>?</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default ResultSlots;